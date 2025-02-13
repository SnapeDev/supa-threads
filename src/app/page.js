"use client";
import React, { useState } from "react";
import { Navbar } from "@/app/nav/page";
import { useAuth } from "../../contexts/auth-context";
import Link from "next/link";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const [name, setName] = useState(""); // State for user name

  return (
    <div className="min-h-screen bg-white">
      <Navbar user={user} onLogout={logout} setIsMenuOpen={setIsMenuOpen} />

      {/* Spotify Player (Bottom Left) */}
      <div className="fixed bottom-3 right-4 z-50 shadow-xl rounded-lg overflow-hidden">
        <iframe
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO4aAlb5?utm_source=generator&theme=0"
          width="300"
          height="80"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-lg"
        />
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover object-[center_25%]"
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
              href="/products"
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
              link: "/products?category=women",
              category: "women",
            },
            {
              title: "Men's Collection",
              image:
                "https://assets.digitalcontent.marksandspencer.app/images/w_1024,q_auto,f_auto/SD_03_T15_6021A_JR_X_EC_0/Tailored-Fit-Packable-Blazer",
              link: "/products?category=men",
              category: "men",
            },
            {
              title: "Accessories",
              image:
                "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1065&q=80",
              link: "/products",
            },
          ].map((category, index) => (
            <Link
              href={{
                pathname: "/products",
                query: { category: category.category },
              }}
              key={index}
              className="relative group"
            >
              <div className="relative bg-white sm:h-96 overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-2">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-[300px] object-cover object-center rounded-md"
                />
              </div>
              <h3 className="mt-6 text-sm text-gray-500">
                <span className="absolute inset-0" />
                {category.title}
              </h3>
              <p className="text-base font-semibold text-gray-900">Shop now</p>
            </Link>
          ))}
        </div>

        {/* OUR TOP PICKS Section */}
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
            OUR TOP PICKS
          </h2>
          <div className="grid w-full mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                id: "67a4ec914c43f7de34ab4365", // Add product ID
                title: "POLOS",
                image: "/polo.jpg",
              },
              {
                id: "67a4a491713c798aab02eea5", // Add product ID
                title: "PRINT TEES",
                image: "/oasis.jpg",
              },
              {
                id: "67a4ea4b4c43f7de34ab4346", // Add product ID
                title: "SHIRTS",
                image: "/pink.jpg",
              },
              {
                id: "67a4eb8d4c43f7de34ab4350", // Add product ID
                title: "TEES",
                image: "/khaki.jpg",
              },
            ].map((item, index) => (
              <Link
                href={`/products/${item.id}`} // Linking to the individual product page using product ID
                key={index}
                className="relative group w-full"
              >
                <div className="relative w-full h-[500px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/10" />
                  {/* Text Overlay */}
                  <h3 className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold tracking-wider drop-shadow-lg">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
