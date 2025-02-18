import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useWishlist } from "@contexts/wish-context";

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsFavorite(storedFavorites.some((item) => item._id === product._id));
  }, [product]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToWishlist(product);
    const storedFavorites = JSON.parse(localStorage.getItem("wishlist")) || [];
    console.log(storedFavorites);
    setIsFavorite(storedFavorites.some((item) => item._id === product._id));
  };

  if (!product || !product._id) return null;

  const imageSrc = product.images?.[0]?.url?.trim();

  return (
    <div className="relative p-1 group">
      <div className="relative h-64">
        {/* Product Image Link */}
        <Link href={`/products/${product._id}`} className="block h-full">
          <div className="relative w-full h-full overflow-hidden">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={product.name || "Product image"}
                width={256}
                height={256}
                quality={100}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                unoptimized
                priority={true}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
        </Link>

        {/* Favorite Button - Positioned absolutely outside the Link */}
        <div>
          <button
            onClick={toggleFavorite}
            className="absolute right-0 bottom-2  mb-2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200 pointer-events-auto"
            style={{ transform: "translate(-2px, -40px)" }}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              size={20}
              className={`stroke-[1.5] ${
                isFavorite ? "text-black-500" : "text-black-600"
              }`}
              fill={isFavorite ? "black" : "none"}
            />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${product._id}`} className="hover:underline">
          <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
        </Link>
        <p className="text-gray-900 font-bold">£{product.price}</p>
      </div>
    </div>
  );
}
