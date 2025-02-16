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
          credentials: "include", // Ensures cookies are sent/received
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      login(data.user); // Use the login function from context to update the global user state
      router.push("/"); // Redirect to home after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  // const fizzBuzz = (num) => {
  //   for (let i = 1; i <= num; i++) {
  //     if (i % 15 === 0) {
  //       console.log("FizzBuzz");
  //     } else if (i % 3 === 0) {
  //       console.log("Fizz");
  //     } else if (i % 5 === 0) {
  //       console.log("Buzz");
  //     } else {
  //       console.log(i);
  //     }
  //   }
  // };
  // fizzBuzz(100);

  return (
    <div className="bg-white-100 min-h-screen flex flex-col">
      <Navbar
        user={user}
        onLogout={() => {
          logout;
        }}
      />{" "}
      {/* Pass the user directly from context */}
      {/* Login Form (Hidden if logged in) */}
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
