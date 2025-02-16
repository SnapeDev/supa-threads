"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/app/nav/page";
import { useCart } from "../../../../contexts/cart-context"; // Import useCart hook

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart(); // Use addToCart function from CartContext
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [error, setError] = useState(null);
  const [size, setSize] = useState(""); // Add size state
  const [quantity, setQuantity] = useState(1); // Add quantity state

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://supa-threads-backend.onrender.com/api/products/${id}`
        );
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
        setMainImage(data.images[0]?.url || null);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;
  if (!product) return <p className="text-center text-lg">Loading...</p>;

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!size) {
      alert("Please select a size");
      return;
    }
    addToCart(product, size, quantity); // Add the product with selected size and quantity
    alert("Product added to cart!");
  };

  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            {/* Left Side: Image Gallery with Vertical Thumbnails */}
            <div className="flex flex-row items-start gap-6">
              {/* Vertical Thumbnails */}
              <div className="flex flex-col mt-6">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className="w-20 h-28 relative cursor-pointer border-2 hover:border-black transition mb-4"
                    style={{
                      borderColor:
                        mainImage === img.url ? "black" : "transparent",
                    }}
                    onClick={() => setMainImage(img.url)}
                  >
                    <Image
                      src={img.url}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 w-full h-[550px] relative">
                {mainImage && (
                  <Image
                    src={mainImage}
                    alt={product.name}
                    layout="fill"
                    quality={100}
                    loading="eager"
                    className="object-contain"
                  />
                )}
              </div>
            </div>

            {/* Right Side: Product Details */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-xl font-semibold text-gray-700 mt-2">
                £{product.price}
              </p>
              <p className="mt-4 text-gray-600">{product.description}</p>

              {/* Size Selection */}
              <div className="mt-4">
                <label htmlFor="size" className="block text-lg font-medium">
                  Select Size:
                </label>
                <select
                  id="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="mt-2 border-gray-300 border p-2 rounded"
                >
                  <option value="">Select Size</option>
                  {product.sizes?.map((s, index) => (
                    <option key={index} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Selection */}
              <div className="mt-4">
                <label htmlFor="quantity" className="block text-lg font-medium">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                  className="mt-2 border-gray-300 border p-2 rounded w-20"
                  min="1"
                />
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-black text-white px-6 py-3 mt-6 rounded hover:bg-gray-800"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
