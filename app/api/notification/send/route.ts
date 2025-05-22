import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

if (!vapidPublicKey || !vapidPrivateKey) {
  throw new Error("VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY must be defined in environment variables.");
}

webpush.setVapidDetails(
  "mailto:numdar.r2@gmail.com",
  vapidPublicKey,
  vapidPrivateKey
);

export async function POST(request: NextRequest) {
  const { subscription, title, body } = await request.json();

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({ title, body })
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}