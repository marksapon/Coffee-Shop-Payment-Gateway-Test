# Xendit Coffee Sandbox — Project Blueprint & Implementation Plan

**Version:** 2.0 (implemented) · **Repo:** `coffee-shop/` · **App lives in:** `frontend/` · **API scaffold lives in:** `backend/`

---

## 1. Executive Summary & Purpose

A local-first, developer-facing coffee-shop test UI built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 + lucide-react**. It renders a static café menu, runs a fully functional cart (quantities, delete, live totals), and — on checkout — generates a **complete, copy-paste-ready Xendit Invoice request payload** for `POST /v2/invoices`.

The app itself **never** calls Xendit and holds no API key. The developer takes the generated payload and creates the payment link themselves (curl / Postman / the `backend/` Express API). This is the test harness for rehearsing Xendit invoice, direct-payment, and callback flows with zero external dependencies.

### Goals
| Goal | Detail |
|---|---|
| Realistic UI | Believable café storefront for demos. |
| Cart correctness | Accurate subtotal / service fee / VAT / grand-total math. |
| Transaction-ready data | Checkout emits a copy-able invoice payload (amounts in **cents**). |
| Reversible checkout | Single documented seam (`handleCheckout` in `CartDrawer`) where real Xendit calls plug in later. |
| Local-first | No database, no auth, no network calls. |

---

## 2. Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19, scaffolded with `create-next-app`
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 (`@theme` tokens, no config file)
- **Icons:** `lucide-react`
- **State:** React Context (`CartContext`) + `useMemo` derived totals
- **Package manager:** pnpm

---

## 3. Feature List

- **Menu display**: category filter tabs (All / Espresso / Cold Brew / Pastries), cards with SVG-placeholder art, name, description, PHP price, and an "Add to Order" button with transient feedback.
- **Cart management**: sliding drawer (right panel; full-width on mobile), quantity **+ / −** steppers, per-item delete, live badge counter in the navbar, empty-cart state.
- **Order summary**: Subtotal, Service Fee, VAT (12%), Grand Total — all memoized from cart state.
- **Checkout (stubbed, local only)**:
  - Builds an `XenditInvoiceRequest` payload from cart state.
  - Logs it to console and reveals a **copy-able JSON panel** in the drawer.
  - Amount auto-converted to **minor units (cents)**; `external_id` auto-generated.
  - Toast: *"Order ready for payment link — paste payload into POST /v2/invoices"*.

### Non-goals (current iteration)
- No Xendit API calls, no keys, no auth, no persistence, no inventory limits.

---

## 4. File & Component Architecture

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # fonts, CartProvider, Navbar, Footer, CartDrawer, Toaster
│   │   ├── page.tsx          # "/" hero + <Menu/>
│   │   └── globals.css       # Tailwind import + coffee palette + animations
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # sticky header w/ branding (client)
│   │   │   ├── CartBadge.tsx      # live count pill, opens drawer (client)
│   │   │   └── Footer.tsx
│   │   ├── menu/
│   │   │   ├── Menu.tsx           # tab state + filtered grid (client)
│   │   │   ├── CategoryTabs.tsx
│   │   │   ├── MenuCard.tsx       # Add-to-Order w/ feedback (client)
│   │   │   └── ProductImage.tsx   # gradient SVG placeholder per category
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx     # drawer shell + checkout seam (client)
│   │   │   ├── CartItemRow.tsx
│   │   │   ├── QuantityStepper.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   ├── EmptyCart.tsx
│   │   │   └── InvoicePayloadPanel.tsx  # copy-able JSON (amounts in cents)
│   │   └── ui/
│   │       ├── PriceTag.tsx       # formatPHP() renderer
│   │       ├── CopyButton.tsx     # clipboard w/ "Copied" state (client)
│   │       └── Toaster.tsx        # toast viewport (client)
│   ├── context/
│   │   └── CartContext.tsx        # CartProvider + useCart hook
│   ├── data/
│   │   ├── types.ts               # MenuItem, CartItem, category types
│   │   └── menu.ts                # CATEGORIES + static MENU dataset
│   ├── lib/
│   │   ├── config.ts              # TAX_RATE, CONVENIENCE_FEE_PHP, BASE_EXTERNAL_ID
│   │   ├── format.ts              # formatPHP(), toCents(), round2()
│   │   └── order.ts               # computeTotals(), buildInvoicePayload()
│   └── hooks/
│       └── useToast.ts            # useSyncExternalStore toast store
├── package.json                   # "xendit-coffee-sandbox"
├── tsconfig.json
└── next.config.ts
```

### Rendering model
- Server Components: `layout.tsx`, `page.tsx`, `Footer`, presentational children.
- Client Components (`"use client"`): anything interactive (`Navbar`, `Menu`, `CartDrawer`, `CartProvider`, `CopyButton`, `Toaster`, `useToast`, `MenuCard`).

---

## 5. Static Data Schema

### `data/types.ts`
```ts
export type MenuCategory = "espresso" | "cold-brew" | "pastries";
export type CategoryId = "all" | MenuCategory;

export interface MenuItem {
  id: string;            // stable slug → used as Xendit item.reference_id
  name: string;
  description: string;
  pricephp: number;      // e.g. 150.0
  category: MenuCategory;
  image: string;         // reserved for future real assets
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}
```

### `lib/config.ts`
```ts
export const TAX_RATE = 0.12;              // shown as "VAT (12%)"
export const CONVENIENCE_FEE_PHP = 10.0;   // flat "Service Fee"
export const BASE_EXTERNAL_ID = "xendit-coffee-sandbox";
```

### `lib/order.ts`
```ts
export interface OrderTotals { subtotal: number; serviceFee: number; tax: number; grandTotal: number; }

export interface XenditInvoiceItem {
  reference_id: string; name: string; quantity: number; price: number; // price in cents
}
export interface XenditInvoiceRequest {
  external_id: string;            // `${BASE_EXTERNAL_ID}-${Date.now()}`
  amount: number;                 // grandTotal in cents
  currency: "PHP";
  description: string;            // "2 x Signature Café Latte, 1 x Butter Croissant"
  items: XenditInvoiceItem[];
  success_redirect_url?: string;  // left undefined — set when you wire Xendit
  failure_redirect_url?: string;
}

computeTotals(items)      // subtotal + fee + tax, all round2()
buildInvoicePayload(items, totals)
```

### Sample payload output (example cart)
```json
{
  "external_id": "xendit-coffee-sandbox-1773600000000",
  "amount": 42440,
  "currency": "PHP",
  "description": "1 x Signature Café Latte, 1 x Butter Croissant",
  "items": [
    { "reference_id": "signature-cafe-latte", "name": "Signature Café Latte", "quantity": 1, "price": 15000 },
    { "reference_id": "butter-croissant", "name": "Butter Croissant", "quantity": 1, "price": 11000 }
  ]
}
```

### Static menu (7 items)
| id | name | category | price (PHP) |
|---|---|---|---|
| `classic-americano` | Classic Americano | espresso | ₱120.00 |
| `signature-cafe-latte` | Signature Café Latte | espresso | ₱150.00 |
| `caramel-macchiato` | Caramel Macchiato | espresso | ₱165.00 |
| `house-cold-brew` | House Cold Brew | cold-brew | ₱130.00 |
| `iced-spanish-latte` | Iced Spanish Latte | cold-brew | ₱160.00 |
| `butter-croissant` | Butter Croissant | pastries | ₱110.00 |
| `cheese-cinnamon-roll` | Cheese Cinnamon Roll | pastries | ₱140.00 |

---

## 6. UI/UX & Visual Design

### Palette (Tailwind v4 `@theme` tokens)
| Token | Hex | Usage |
|---|---|---|
| `espresso` | `#2E1A0E` | Navbar bg, primary text, dark surfaces |
| `latte` | `#C9A67B` | Active tab, accents, hover |
| `cream` | `#F7EFE6` | Page background |
| `mocha` | `#8B5E34` | Secondary text, borders |
| `caramel` | `#E2B57A` | Highlights, badge, gradients |
| `danger` | `#B3261E` | Delete affordance |

### Typography
- **Display:** Fraunces (Google, self-hosted via `next/font`) — `font-display`.
- **Body/Mono:** Geist / Geist Mono — prices rendered `font-mono tabular-nums`.

### Layout & responsiveness
- Sticky espresso navbar with live cart badge.
- Menu grid `1 → 2 → 3 → 4` columns (`sm/lg/xl`).
- Cart drawer: right slide-in (`max-w-md` / `sm:w-[28rem]`) with backdrop blur; full-width on mobile.
- Touch targets ≥ 44px (`h-10`/`h-11`/`h-12`).
- Animations: cart badge pop, toast slide-in, drawer translate (300ms).

---

## 7. Checkout Behavior (the Xendit seam)

```ts
const handleCheckout = () => {
  console.log("XenditInvoiceRequest", JSON.stringify({ payload }, null, 2));
  setShowPayload(true);
  showToast("Order ready for payment link — paste payload into POST /v2/invoices", "success");
};
```
- **No network requests.** No secrets.
- The `InvoicePayloadPanel` renders `JSON.stringify(payload, null, 2)` with a **Copy** button (`navigator.clipboard`).
- Future wiring: replace this handler to POST to your API (`backend/`) or Xendit, then redirect to the returned `invoice_url`.

---

## 8. Running the App

```bash
cd frontend
pnpm install
pnpm dev        # http://localhost:3000
pnpm lint
pnpm build      # production build
```

---

## 9. Next Steps

### Done (current iteration)
- Scaffolded Next.js 16 App Router + TS + Tailwind v4 + lucide-react (pnpm).
- Data layer, cart context, menu UI, cart drawer UI, checkout stub, toast system.
- Verified: `pnpm lint` clean, `pnpm build` passes, `/` renders all 7 items with PHP pricing.

### Next: attach Xendit payment session
1. Copy the payload from the checkout panel (or dev console).
2. POST `https://api.xendit.co/v2/invoices` with the payload (curl / Postman / `backend/src/app.ts`, keeping `XENDIT_API_KEY` server-side).
3. Open the returned `invoice_url` to complete the payment link flow; watch `external_id` in webhook `PAID` events.

### Expanding the backend (`backend/`)
- Express server scaffold exists (`PORT=3210`, `XENDIT_API_KEY` env). Add routes like `/api/invoices` that forward the generated payload, and a webhook callback to verify signatures and reconcile by `external_id`.