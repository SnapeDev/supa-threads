"use client";
import Link from "next/link";
import { Navbar } from "@/app/nav/page";

export default function SuccessPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Navbar />
      <div className="text-center mt-20 ">
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg mb-4">Thank you for your purchase.</p>
        <Link href="/" className="text-indigo-600 hover:text-indigo-800">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
