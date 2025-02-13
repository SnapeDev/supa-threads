// context/WishlistContext.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // const addToWishlist = (item) => {
  //   console.log(item);
  //   console.log("now using context");
  //   let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  //   if (!wishlist.some((w) => w._id === item._id)) {
  //     wishlist.push(item);
  //     localStorage.setItem("wishlist", JSON.stringify(wishlist));

  //     // Dispatch a custom event to notify listeners
  //     window.dispatchEvent(new Event("wishlistUpdated"));
  //   }
  // };
  const addToWishlist = (item) => {
    console.log(item);
    console.log("now using context");

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const index = wishlist.findIndex((w) => w._id === item._id);

    if (index === -1) {
      // Item not in wishlist, add it
      wishlist.push(item);
    } else {
      // Item already in wishlist, remove it
      wishlist.splice(index, 1);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setWishlist(JSON.parse(localStorage.getItem("wishlist")));

    // Dispatch a custom event to notify listeners
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
