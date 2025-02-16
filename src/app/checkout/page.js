"use client";
import { useCart } from "@contexts/cart-context";
import { Navbar } from "@/app/nav/page";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Image from "next/image";
import Link from "next/link";

// Load Stripe.js
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// Payment Form Component
const PaymentForm = ({ shippingInfo, totalPrice, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe has not loaded yet.");
      return;
    }

    try {
      const response = await fetch(
        "https://supa-threads-backend.onrender.com/api/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            totalPrice: totalPrice * 100,
            shippingInfo,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment intent");
      }

      if (!data.clientSecret) {
        throw new Error("No clientSecret received from server.");
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: shippingInfo.name,
              address: {
                line1: shippingInfo.address,
                city: shippingInfo.city,
                postal_code: shippingInfo.postalCode,
                country: shippingInfo.country,
              },
            },
          },
        }
      );

      if (error) {
        console.error("Payment failed:", error.message);
        onError(error);
      } else if (paymentIntent.status === "succeeded") {
        onSuccess();
      }
    } catch (error) {
      console.error("Payment error:", error);
      onError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-lg max-w-md mx-auto">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="w-1/3 py-3 mx-auto flex justify-center items-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Pay Now
      </button>
    </form>
  );
};

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "GB",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentSuccess = () => {
    alert("Payment successful! Thank you for your purchase.");
    clearCart();
    router.push("/checkout/success");
  };

  const handlePaymentError = (error) => {
    console.error("Payment failed:", error);
    alert("Payment failed. Please try again.");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Navbar />
        <h2 className="text-2xl font-bold text-gray-900">Your Cart is Empty</h2>
        <Link href="/" className="text-indigo-600 hover:text-indigo-800">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <h1 className="text-3xl font-bold mb-8 mt-10text-center">Checkout</h1>

      {/* Shipping Information */}
      <div className="mb-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Shipping Information
        </h2>
        <form className="grid grid-cols-1 gap-4">
          {Object.keys(shippingInfo).map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={shippingInfo[field]}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
              required
            />
          ))}
        </form>
      </div>

      {/* Order Summary */}
      <div className="mb-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Your Order</h2>
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.product._id}-${item.size}`}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 relative">
                  {item.product.image && (
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-semibold">
                £{(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Section */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-xl font-bold">£{totalPrice.toFixed(2)}</span>
        </div>
        <Elements stripe={stripePromise}>
          <PaymentForm
            shippingInfo={shippingInfo}
            totalPrice={totalPrice}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </Elements>
      </div>
    </div>
  );
}
