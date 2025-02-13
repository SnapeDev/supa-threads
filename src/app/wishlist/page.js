"use client";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/app/nav/page";
import { useWishlist } from "../../../contexts/wish-context";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist(); // Ensure removeFromWishlist is available

  return (
    <div className="container mx-auto">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wishlist.map((product, index) => {
            const imageSrc = product.images?.[0]?.url?.trim();

            return (
              <div
                key={product._id || `wishlist-item-${index}`}
                className="relative border p-2"
              >
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="absolute top-3 right-3 bg-none text-black  w-6 h-6 flex items-center justify-center text-xl transition"
                >
                  ✕
                </button>

                <Link href={`/products/${product._id}`} className="block">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={product.name || "Wishlist Product"}
                      width={100}
                      height={100}
                      quality={100}
                      unoptimized
                      className="object-contain w-full h-50"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                      <span>No Image</span>
                    </div>
                  )}
                  <p className="text-center mt-2">{product.name}</p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
