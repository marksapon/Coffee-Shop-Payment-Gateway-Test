import express, { type Express, type Request, type Response } from "express";
import { getPaymentGateway } from "./gateways/index.ts";

const app: Express = express();

app.use(express.json());

// ponytail: manual CORS headers for dev, add cors package if needed for production
app.use((req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

const port = process.env.PORT || 3210;

app.get("/", (_req: Request, res: Response) => {
  res.send("Coffee Shop Payment API");
});

app.post("/api/payment/session", async (req: Request, res: Response) => {
  try {
    const gateway = getPaymentGateway();
    const session = await gateway.createSession({
      amount: req.body.amount,
      currency: req.body.currency ?? "PHP",
      description: req.body.description ?? "",
      reference_id: req.body.reference_id ?? `coffee-${Date.now()}`,
      items: req.body.items ?? [],
      success_return_url: req.body.success_return_url ?? "",
      cancel_return_url: req.body.cancel_return_url ?? "",
    });
    res.json(session);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Payment session failed";
    console.error("Payment session error:", message);
    res.status(500).json({ error: message });
  }
});

app.post("/api/payment/webhook", (_req: Request, res: Response) => {
  // ponytail: webhook verification placeholder
  res.json({ received: true });
});

app.listen(port, () => {
  console.log(`Payment API listening on :${port}`);
});
