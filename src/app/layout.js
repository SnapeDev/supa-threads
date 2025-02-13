"use client";
import "./globals.css";
import { AuthProvider } from "../../contexts/auth-context";
import { CartProvider } from "../../contexts/cart-context"; // Import CartProvider
import { WishlistProvider } from "../../contexts/wish-context"; // Import WishlistProvider

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {" "}
              {/* Wrap your children with WishlistProvider here */}
              {children}
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
