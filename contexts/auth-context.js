// contexts/auth-context.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkUser = async () => {
    try {
      const res = await fetch(
        "https://supa-threads-backend.onrender.com/api/me",
        {
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error checking auth:", err);
      setUser(null);
    }
  };

  const login = async (credentials) => {
    try {
      const res = await fetch(
        "https://supa-threads-backend.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
          credentials: "include",
        }
      );
      if (res.ok) {
        await checkUser(); // Re-fetch user after successful login
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await fetch("https://supa-threads-backend.onrender.com/api/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  useEffect(() => {
    checkUser(); // Check user on mount
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);