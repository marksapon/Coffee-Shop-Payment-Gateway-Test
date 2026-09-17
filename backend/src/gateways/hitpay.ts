import type {
  PaymentGateway,
  PaymentSessionRequest,
  PaymentSessionResponse,
} from "./types.ts";

interface HitpayConfig {
  apiKey: string;
  apiUrl: string;
}

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
      amount: (data.amount / 100).toFixed(2),
      currency: "PHP", //data.currency || "PHP",
      purpose: data.description,
      reference_number: data.reference_id,
      redirect_url: data.success_return_url,
      payment_methods: ["paynow_online"],
    };

    console.log("HitPay payload:", payload);

    const response = await fetch(`https://api.sandbox.hit-pay.com/v1/payment-requests`, {
      method: "POST",
      headers: {
        "X-BUSINESS-API-KEY": this.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("HitPay API error:", response.status, text);
      throw new Error(`Hitpay payment request failed (${response.status}): ${text}`);
    }

    const result = await response.json();

    return {
      session_id: result.id,
      payment_url: result.url,
      status: result.status,
    };
  }

  webhookSecret(): string {
    return process.env.HITPAY_WEBHOOK_SECRET ?? "";
  }
}
