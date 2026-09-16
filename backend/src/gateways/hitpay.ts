import type {
  PaymentGateway,
  PaymentSessionRequest,
  PaymentSessionResponse,
} from "./types.ts";

interface HitpayConfig {
  apiKey: string;
  apiUrl: string;
}

// ponytail: skeleton — fill in when Hitpay integration is needed
export class HitpayGateway implements PaymentGateway {
  private apiKey: string;
  private apiUrl: string;

  constructor(config: HitpayConfig) {
    this.apiKey = config.apiKey;
    this.apiUrl = config.apiUrl;
  }

  async createSession(
    data: PaymentSessionRequest,
  ): Promise<PaymentSessionResponse> {
    const payload = {
      amount: data.amount,
      currency: data.currency,
      description: data.description,
      reference_id: data.reference_id,
      redirect_url: data.success_return_url,
      cancel_url: data.cancel_return_url,
      metadata: {
        items: data.items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
      },
    };

    const response = await fetch(`${this.apiUrl}/payment-requests`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Hitpay payment request failed");
    }

    const result = await response.json();

    return {
      session_id: result.id,
      payment_url: result.payment_url,
      status: result.status,
    };
  }

  webhookSecret(): string {
    return process.env.HITPAY_WEBHOOK_SECRET ?? "";
  }
}
