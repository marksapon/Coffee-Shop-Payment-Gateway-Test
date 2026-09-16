export interface PaymentSessionRequest {
  amount: number;
  currency: string;
  description: string;
  reference_id: string;
  items: PaymentSessionItem[];
  success_return_url: string;
  cancel_return_url: string;
}

export interface PaymentSessionItem {
  reference_id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
}

export interface PaymentSessionResponse {
  session_id: string;
  payment_url: string;
  status: string;
}

export interface PaymentGateway {
  createSession(data: PaymentSessionRequest): Promise<PaymentSessionResponse>;
  webhookSecret(): string;
}
