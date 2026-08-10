import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectToDatabase } from "../../../src/server/database";
import { ContactUs } from "../../../src/server/models";

export async function POST(request) {
  const { name, phone, email, message = "" } = await request.json();

  if (!name || !phone || !email) {
    return NextResponse.json({ success: false, message: "Name, phone, and email are required." }, { status: 400 });
  }

  await connectToDatabase();
  await ContactUs.create({ name, phone, email, message });

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_SERVICE) {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
    });
  }

  return NextResponse.json({ success: true, message: "Contact form submitted successfully." }, { status: 201 });
}
