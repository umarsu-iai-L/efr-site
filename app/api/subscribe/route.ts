import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../src/server/database";
import { EmailSubscription } from "../../../src/server/models";

export async function POST(request) {
  const { email } = await request.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, message: "A valid email is required." }, { status: 400 });
  }

  await connectToDatabase();

  try {
    await EmailSubscription.create({ email: email.toLowerCase() });
    return NextResponse.json({ success: true, message: "Subscribed successfully." }, { status: 201 });
  } catch (error) {
    if (error?.code === 11000) {
      return NextResponse.json({ success: false, message: "Email already subscribed." }, { status: 409 });
    }
    throw error;
  }
}
