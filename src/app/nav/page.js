"use client";
import { useState, useEffect } from "react";
import {
  Menu,
  Search,
  ShoppingCart,
  ShoppingBag,
  User,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@contexts/auth-context";
import { useCart } from "@contexts/cart-context";
import emailjs from "emailjs-com"; // Import EmailJS for sending messages

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout, checkUser } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false); // State for chat widget
  const [message, setMessage] = useState(""); // State for chat message
  const [email, setEmail] = useState(""); // State for user email
  const [name, setName] = useState(""); // State for user name
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateWishlistCount = () => {
      const storedFavorites =
        JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(storedFavorites.length);
    };

    // Run initially
    updateWishlistCount();

    // Listen for custom event
    window.addEventListener("wishlistUpdated", updateWishlistCount);

    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
    };
  }, []);

  // check that authentication persists after page reload
  useEffect(() => {
    checkUser();
  }, []);

  // Function to handle sending messages via EmailJS
  const handleSendMessage = async (e) => {
    e.preventDefault();

    // Replace with your EmailJS service ID, template ID, and public key
    const serviceID = "service_4rhx73s";
    const templateID = "template_8gah933";
    const publicKey = "7Fy3F8fWPCK2d3_6o";

    try {
      await emailjs.send(
        serviceID,
        templateID,
        {
          to_email: "jacksnape89@gmail.com", // Your email address
          user_email: email, // User's email
          user_name: name, // User's name
          message: message, // User's message
        },
        publicKey
      );

      alert("Message sent successfully!");
      setMessage("");
      setEmail("");
      setName("");
      setIsChatOpen(false);
    } catch (error) {
      console.error("Failed to send message:", error);
      alert(`Failed to send message: ${error.text}`);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpenLocal(!isMenuOpen)}
                className="p-2 rounded-md text-gray-400 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex-shrink-0 flex items-center">
                <ShoppingBag className="h-8 w-8 text-indigo-600" />
                <a href="/">
                  <span className="ml-2 text-2xl font-bold text-gray-900">
                    SUPA THREADS
                  </span>
                </a>
              </div>
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <Link
                href="/products?category=women"
                className="text-gray-500 hover:text-gray-900"
              >
                Women
              </Link>
              <Link
                href="/products?category=men"
                className="text-gray-500 hover:text-gray-900"
              >
                Men
              </Link>
              <Link
                href="/products?category=accessories"
                className="text-gray-500 hover:text-gray-900"
              >
                Accessories
              </Link>
              <Link
                href="/products"
                className="text-gray-500 hover:text-gray-900"
              >
                Sale
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Search className="h-6 w-6" />
              </button>

              {/* Wishlist Heart Icon */}
              <div className="relative">
                <Link href="/wishlist">
                  <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                    <Heart className="h-5.2 w-5.2" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gray-300 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                        {wishlistCount}
                      </span>
                    )}
                  </button>
                </Link>
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <User className="h-6 w-6" />
                </button>
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-[90px] bg-white border border-gray-200 rounded-md shadow-lg">
                    {!user ? (
                      <>
                        <a
                          href="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Login
                        </a>
                        <a
                          href="/signup"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign Up
                        </a>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                          setIsMenuOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Logout
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="relative">
                <Link href="/basket">
                  <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                    <ShoppingCart className="h-6 w-6" />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gray-300 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                        {cart.length}
                      </span>
                    )}
                  </button>
                </Link>
              </div>

              {/* Chat Bubble */}
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-0 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50">
          <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Live Chat</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSendMessage} className="p-4 space-y-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-2 border border-gray-200 rounded-md"
                required
              />
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-2 border border-gray-300 rounded-md resize-none"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};
