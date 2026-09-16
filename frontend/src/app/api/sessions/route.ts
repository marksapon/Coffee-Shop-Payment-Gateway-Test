import { NextResponse, type NextRequest } from "next/server";

const XENDIT_API_URL = "https://api.xendit.co/sessions";

interface SessionItem {
  reference_id: string;
  name: string;
  net_unit_amount: number;
  quantity: number;
  category: string;
}

interface SessionRequest {
  amount: number;
  items: SessionItem[];
  description: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.XENDIT_WRITE_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "XENDIT_WRITE_KEY is not configured" },
      { status: 500 },
    );
  }

  let body: SessionRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { amount, items, description } = body;

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "No items provided" }, { status: 400 });
  }

  const referenceId = `coffee-${Date.now()}`;
  const successUrl = `${request.nextUrl.origin}/payment/success`;
  const cancelUrl = `${request.nextUrl.origin}/payment/cancel`;

  const payload = {
    reference_id: referenceId,
    session_type: "PAY",
    mode: "PAYMENT_LINK",
    amount,
    currency: "PHP",
    country: "PH",
    customer: {
      reference_id: `guest-${Date.now()}`,
      type: "INDIVIDUAL",
      individual_detail: {
        given_names: "Guest",
      },
    },
    items,
    description,
    success_return_url: successUrl,
    cancel_return_url: cancelUrl,
  };

  try {
    const credentials = Buffer.from(`${apiKey}:`).toString("base64");

    const response = await fetch(XENDIT_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Xendit API error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to create payment session" },
        { status: response.status },
      );
    }

    return NextResponse.json({
      payment_session_id: data.payment_session_id,
      payment_link_url: data.payment_link_url,
      status: data.status,
    });
  } catch (error) {
    console.error("Failed to call Xendit API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
