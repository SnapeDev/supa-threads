"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/app/nav/page";
import { useAuth } from "../../../contexts/auth-context"; // Import useAuth hook

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, login } = useAuth(); // Access user and login method from context
  const router = useRouter();

  // Check if user is already logged in when the component mounts
  useEffect(() => {
    if (user) {
      router.push("/"); // Redirect to home if already logged in
    }
  }, [user, router]); // Re-run if the user state changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const res = await fetch(
        "https://supa-threads-backend.onrender.com/api/login",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
  
      const data = await res.json();
      console.log("Login response:", data); // Debug the response
      if (!res.ok) throw new Error(data.message || "Login failed");
  
      login(data.user); // Update context
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white-100 min-h-screen flex flex-col">
      <Navbar />
      {!user ? (
        <div className="flex flex-grow items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
              Login
            </h2>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                Login
              </button>
            </form>

            <p className="text-sm text-gray-600 mt-4 text-center">
              Don't have an account?{" "}
              <a href="/signup" className="text-indigo-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      ) : (
        <h2 className="text-center text-2xl font-semibold mt-8">
          Welcome, {user.username}!
        </h2>
      )}
    </div>
  );
};

export default Login;
