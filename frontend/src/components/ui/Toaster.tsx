"use client";

import { CheckCircle2, Info, X } from "lucide-react";
import { dismissToast, useToasts } from "@/hooks/useToast";

export default function Toaster() {
  const toasts = useToasts();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex flex-col items-center gap-2 px-4 sm:right-6 sm:bottom-6 sm:items-end sm:px-0"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex w-full max-w-sm animate-[toast-in_0.25s_ease-out] items-start gap-3 rounded-xl bg-espresso px-4 py-3 text-cream shadow-2xl ring-1 ring-white/10"
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-caramel" />
          ) : (
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-caramel" />
          )}
          <p className="flex-1 text-sm leading-snug">{toast.message}</p>
          <button
            onClick={() => dismissToast(toast.id)}
            className="rounded p-0.5 text-cream/60 transition hover:bg-white/10 hover:text-cream"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}