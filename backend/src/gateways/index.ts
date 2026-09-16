import type { PaymentGateway } from "./types.ts";
import { XenditGateway } from "./xendit.ts";
import { HitpayGateway } from "./hitpay.ts";

export type { PaymentGateway, PaymentSessionRequest, PaymentSessionResponse } from "./types";

export function getPaymentGateway(): PaymentGateway {
  const provider = (process.env.PAYMENT_GATEWAY ?? "xendit").toLowerCase();

  switch (provider) {
    case "hitpay": {
      const apiKey = process.env.HITPAY_API_KEY;
      const apiUrl = process.env.HITPAY_API_URL ?? "https://api.hitpay.me/v1";
      if (!apiKey) throw new Error("HITPAY_API_KEY is not configured");
      return new HitpayGateway({ apiKey, apiUrl });
    }
    case "xendit":
    default: {
      const apiKey = process.env.XENDIT_API_KEY;
      if (!apiKey) throw new Error("XENDIT_API_KEY is not configured");
      return new XenditGateway(apiKey);
    }
  }
}
