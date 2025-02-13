"use client";
import { useCart } from "@contexts/cart-context"; // Import the CartContext
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/app/nav/page";

export default function Basket() {
  const { cart, totalPrice, removeFromCart, updateQuantity, clearCart } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <Navbar />
        <h2 className="text-2xl font-bold flex mx-auto items-center mt-20 justify-center text-gray-900">
          Your Cart is Empty
        </h2>
        <Link
          href="/"
          className="text-indigo-600 flex mx-auto items-center justify-center hover:text-indigo-800"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Your Cart</h2>
      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.product._id + item.size}
            className="flex items-center justify-between py-4 border-b border-gray-200"
          >
            <div className="flex items-center">
              {/* Clickable Product Image */}
              <Link href={`/products/${item.product._id}`} passHref>
                <div className="w-20 h-20 relative cursor-pointer">
                  {item.product.image ? (
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      quality={100}
                      sizes="(max-width: 640px) 25vw, (max-width: 1024px) 15vw, 10vw"
                      style={{ objectFit: "cover" }}
                      className="rounded-md transition-transform transform hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image Available</span>
                    </div>
                  )}
                </div>
              </Link>

              <div className="ml-4">
                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">{item.size}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.product._id,
                      item.size,
                      item.quantity - 1
                    )
                  }
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(
                      item.product._id,
                      item.size,
                      item.quantity + 1
                    )
                  }
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.product._id, item.size)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Clear Cart
        </button>
        <div className="text-xl font-semibold">
          Total Price: £{totalPrice.toFixed(2)}
        </div>
        {/* Updated Checkout Button */}
        <Link
          href="/checkout" // Link to the checkout page
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
