"use client"; // Add this directive to make it a Client Component
import React, { useState } from "react";
import { Navbar } from "@/app/nav/page";

export default function Home() {
  // Rename the component to `Home` (or any other name)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <div className="relative ">
        {" "}
        {/* Add fixed height */}
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover object-[center_25%] " // Adjust object position
            src="/couple.jpg"
            alt="Fashion hero"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            New Season Arrivals
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl">
            Discover the latest trends in fashion and explore our new
            collection.
          </p>
          <div className="mt-10">
            <a
              href="#"
              className="inline-block bg-white py-3 px-8 border border-transparent rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 ml-20 md:grid-cols-3 gap-20">
          {[
            {
              title: "Women's Collection",
              image:
                "https://www.next.co.uk/cms/resource/blob/856214/f5ba0671519742152c4b76701f043d01/28-01-25-trending-feature-2-womens-data.jpg",
            },
            {
              title: "Men's Collection",
              image:
                "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
            },
            {
              title: "Accessories",
              image:
                "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1065&q=80",
            },
          ].map((category, index) => (
            <div key={index} className="relative group">
              <div className="relative  bg-white sm:h-96 overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1  lg:aspect-w-1 lg:aspect-h-2">
                <img
                  src={category.image}
                  alt={category.title}
                  className=" h-full  w-[300px] object-cover object-center rounded-md"
                />
              </div>
              <h3 className="mt-6 text-sm text-gray-500">
                <a href="#">
                  <span className="absolute inset-0" />
                  {category.title}
                </a>
              </h3>
              <p className="text-base font-semibold text-gray-900">Shop now</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
