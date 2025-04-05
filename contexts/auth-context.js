// contexts/auth-context.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkUser = async () => {
    try {
      const res = await fetch(
        "https://supa-threads-backend.onrender.com/api/login",
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

  useEffect(() => {
     checkUser();
   }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await fetch("https://supa-threads-backend.onrender.com/api/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
