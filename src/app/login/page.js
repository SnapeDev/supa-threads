"use client";
import React, { useState } from "react";
import { Navbar } from "@/app/nav/page";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    setError(""); // Clear errors
    console.log("Logging in with:", { email, password });

    // Here, you could send the data to an API for authentication
  };

  return (
    <div className="bg-white-200 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Login Section */}
      <div className="flex flex-grow items-center justify-center">
        <div className="bg-white p-8 rounded-lg drop-shadow-lg  w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Login
          </h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Don't have an account?{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
