"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel ${
        copied
          ? "bg-caramel text-espresso"
          : "bg-espresso text-cream hover:bg-latte hover:text-espresso"
      }`}
      aria-live="polite"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : label}
    </button>
  );
}