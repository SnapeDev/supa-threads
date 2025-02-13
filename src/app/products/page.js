"use client";
import { useState, useEffect } from "react";
import ProductGrid from "../../../components/ProductGrid";
import CategoryFilter from "../../../components/CategoryFilter";
import { useSearchParams } from "next/navigation";

import React from "react";
import { Navbar } from "@/app/nav/page";

export default function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [filters, setFilters] = useState({
    category: category ? category : "all",
    color: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    console.log(category);
    setFilters((prev) => {
      return {
        ...prev,
        category: category || "all",
      };
    });
  }, [category]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams({
          category: filters.category,
          color: filters.color,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        }).toString();

        const response = await fetch(
          `http://localhost:3001/api/products?${queryParams}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [filters]);

  // Function to determine collection title
  const getCollectionTitle = () => {
    switch (filters.category.toLowerCase()) {
      case "men":
        return "Men's Collection";
      case "women":
        return "Women's Collection";
      case "accessories":
        return "Accessories Collection";
      default:
        return "Fashion Collection";
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <h1 className="text-3xl font-bold my-8">{getCollectionTitle()}</h1>
      <CategoryFilter filters={filters} setFilters={setFilters} />
      <ProductGrid products={products} />
    </div>
  );
}
