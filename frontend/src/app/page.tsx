import Menu from "@/components/menu/Menu";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
      <section className="pt-12 pb-8 text-center sm:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mocha">
          Xendit Payments Sandbox
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Built &amp; Brewed for Testing
        </h1>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-mocha">
          Order like a customer, review live totals, then grab the copy-ready invoice payload to
          kick off your first Xendit payment link.
        </p>
      </section>
      <Menu />
    </main>
  );
}