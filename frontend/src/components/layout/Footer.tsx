export default function Footer() {
  return (
    <footer className="border-t border-espresso/10 bg-espresso text-center text-xs leading-relaxed text-latte/70">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        Xendit Coffee Sandbox — developer test UI. No real charges. Checkout builds a copy-ready
        invoice payload for <span className="font-mono text-latte">POST /v2/invoices</span>.
      </div>
    </footer>
  );
}