import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, sessionId } = await req.json();

    const payload = [
      {
        sessionId: sessionId ?? crypto.randomUUID(),
        action: "sendMessage",
        chatInput: message,
      },
    ];

    const apiKey = process.env.N8N_API_KEY;
    if (!apiKey) {
      throw new Error("N8N_API_KEY is not set in environment variables");
    }

    const res = await fetch(process.env.N8N_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse(
      JSON.stringify({ error: "Failed to send message." }),
      { status: 500 }
    );
  }
}
