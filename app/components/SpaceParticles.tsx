"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 1200;
const FIELD_DEPTH = 60;
const FIELD_WIDTH = 44;
const CAMERA_Z = 18;
const PHASE_SCROLL_SCREENS = 3;
const MOBILE_BREAKPOINT = 768;

function createCircleTexture(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.6, "rgba(255,255,255,0.6)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

export default function SpaceParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const particleCount = isMobile ? 560 : PARTICLE_COUNT;
    const fieldWidth = isMobile ? 34 : FIELD_WIDTH;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.z = CAMERA_Z;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Rounded, faded-blue starfield drifting through the z axis
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    const baseX = new Float32Array(particleCount);
    const baseY = new Float32Array(particleCount);
    const jitterPhase = new Float32Array(particleCount);
    const jitterFreq = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * fieldWidth;
      const y = (Math.random() - 0.5) * fieldWidth * 0.6;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = -Math.random() * FIELD_DEPTH;
      speeds[i] = 0.4 + Math.random() * 0.8;
      baseX[i] = x;
      baseY[i] = y;
      jitterPhase[i] = Math.random() * Math.PI * 2;
      jitterFreq[i] = 0.3 + Math.random() * 0.5;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      map: createCircleTexture(),
      color: new THREE.Color("#3b82f6"),
      size: 0.16,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.70,
      depthWrite: false,
    });
    const field = new THREE.Points(geometry, material);
    scene.add(field);

    const normalColor = new THREE.Color("#3b82f6");
    const skyBlueColor = new THREE.Color("#9ad6ff");
    const endWhiteColor = new THREE.Color("#f8fbff");
    const phaseColor = new THREE.Color();

    const mouse = { x: 0, y: 0 };
    const rotation = { x: 0, y: 0 };
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    const getBlueProgress = (y: number) => {
      const start = window.innerHeight * PHASE_SCROLL_SCREENS;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const span = Math.max(maxScroll - start, window.innerHeight);
      return THREE.MathUtils.clamp((y - start) / span, 0, 1);
    };

    let blueProgress = getBlueProgress(window.scrollY);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const handleWheel = (e: WheelEvent) => {
      scrollVelocity += e.deltaY * 0.0015;
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollVelocity += (currentY - lastScrollY) * 0.01;
      lastScrollY = currentY;
      blueProgress = getBlueProgress(currentY);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    let rafId: number;
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    const JITTER_AMOUNT = 0.12;

    const animate = (time: number) => {
      rafId = requestAnimationFrame(animate);

      rotation.x += (mouse.y * 0.08 - rotation.x) * 0.04;
      rotation.y += (mouse.x * 0.08 - rotation.y) * 0.04;
      field.rotation.x = rotation.x;
      field.rotation.y = rotation.y;

      // Particles drift forward only in response to scroll/wheel input
      scrollVelocity *= 0.9;
      const warp = THREE.MathUtils.clamp(scrollVelocity, -2, 2);
      const t = time * 0.001;

      const blueMix = Math.min(blueProgress / 0.72, 1);
      const endPhaseMix = THREE.MathUtils.clamp((blueProgress - 0.72) / 0.28, 0, 1);

      phaseColor.lerpColors(normalColor, skyBlueColor, blueMix);
      phaseColor.lerp(endWhiteColor, endPhaseMix);
      material.color.lerp(phaseColor, 0.06);
      const targetOpacity = THREE.MathUtils.lerp(0.24, 0.1, endPhaseMix);
      material.opacity += (targetOpacity - material.opacity) * 0.06;

      for (let i = 0; i < particleCount; i++) {
        const base = i * 3;

        // Tiny in-place wobble, bounded around each particle's origin
        posArray[base] = baseX[i] + Math.sin(t * jitterFreq[i] + jitterPhase[i]) * JITTER_AMOUNT;
        posArray[base + 1] =
          baseY[i] + Math.cos(t * jitterFreq[i] + jitterPhase[i]) * JITTER_AMOUNT;

        if (Math.abs(warp) > 0.0001) {
          let z = posArray[base + 2];
          z += warp * speeds[i];
          if (z > CAMERA_Z - 3) z -= FIELD_DEPTH;
          else if (z < CAMERA_Z - FIELD_DEPTH - 3) z += FIELD_DEPTH;
          posArray[base + 2] = z;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate(0);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.map?.dispose();
      material.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] h-screen w-screen"
      aria-hidden="true"
    />
  );
}
