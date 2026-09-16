import type {
  PaymentGateway,
  PaymentSessionRequest,
  PaymentSessionResponse,
} from "./types.ts";

const XENDIT_SESSION_URL = "https://api.xendit.co/sessions";

export class XenditGateway implements PaymentGateway {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async createSession(
    data: PaymentSessionRequest,
  ): Promise<PaymentSessionResponse> {
    const payload = {
      reference_id: data.reference_id,
      session_type: "PAY",
      mode: "PAYMENT_LINK",
      amount: data.amount,
      currency: data.currency,
      country: "PH",
      customer: {
        reference_id: `guest-${Date.now()}`,
        type: "INDIVIDUAL",
        individual_detail: { given_names: "Guest" },
      },
      items: data.items.map((item) => ({
        reference_id: item.reference_id,
        name: item.name,
        net_unit_amount: item.price,
        quantity: item.quantity,
        category: item.category,
      })),
      description: data.description,
      success_return_url: data.success_return_url,
      cancel_return_url: data.cancel_return_url,
    };

    const credentials = Buffer.from(`${this.apiKey}:`).toString("base64");

    const response = await fetch(XENDIT_SESSION_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to create Xendit payment session",
      );
    }

    return {
      session_id: result.payment_session_id,
      payment_url: result.payment_link_url,
      status: result.status,
    };
  }

  webhookSecret(): string {
    return process.env.XENDIT_WEBHOOK_SECRET ?? "";
  }
}
