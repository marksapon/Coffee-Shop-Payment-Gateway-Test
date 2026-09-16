import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import Toaster from "@/components/ui/Toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xendit Coffee Sandbox",
  description:
    "Developer test UI simulating a coffee shop checkout and preparing Xendit invoice payloads.",
};

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-espresso">
        <CartProvider>
          <Navbar />
          <div className="flex-1">{props.children}</div>
          <Footer />
          <CartDrawer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}