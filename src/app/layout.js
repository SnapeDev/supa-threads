"use client";
import "./globals.css";
import { AuthProvider } from "../../contexts/auth-context";
import { CartProvider } from "../../contexts/cart-context";
import { WishlistProvider } from "../../contexts/wish-context";
import { Suspense } from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
