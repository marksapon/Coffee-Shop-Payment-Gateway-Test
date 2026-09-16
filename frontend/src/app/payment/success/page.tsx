"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <CheckCircle className="h-16 w-16 text-green-600" />
      <h1 className="mt-6 font-display text-3xl font-semibold text-espresso">
        Payment Successful
      </h1>
      <p className="mt-3 leading-relaxed text-mocha">
        Thank you for your order! Your payment has been confirmed.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center rounded-xl bg-gradient-to-r from-caramel to-latte px-8 font-semibold text-espresso shadow-md transition hover:brightness-105"
      >
        Back to Menu
      </Link>
    </main>
  );
}
