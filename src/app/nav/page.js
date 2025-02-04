import React from "react";
import { ShoppingBag, Menu, Search, User, ShoppingCart } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // State for user dropdown toggle

  return (
    <>
      {/* Navigation */}
      <nav className="bg-white shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md  text-gray-400 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <ShoppingBag className="h-8 w-8 text-indigo-600" />
                <a href="/">
                  <span className="ml-2 text-2xl font-bold text-gray-900">
                    SUPA THREADS
                  </span>
                </a>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Women
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Men
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Accessories
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                Sale
              </a>
            </div>

            {/* Icons (Search, User, Cart) */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Search className="h-6 w-6" />
              </button>
              {/* User Icon with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="p-2  text-gray-400 hover:text-gray-500"
                >
                  <User className="h-6 w-6" />
                </button>
                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-[90px] bg-white border border-gray-200 rounded-md shadow-lg">
                    <div className="py-1">
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
                    </div>
                  </div>
                )}
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <ShoppingCart className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Women
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Men
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Accessories
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Sale
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
