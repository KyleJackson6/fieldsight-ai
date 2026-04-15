"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("fieldSight_mockUser");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load user session", e);
    }
    setIsLoaded(true);
  }, []);

  const login = async (email, password = "mockPassword") => {
    // Mock login simulating a backend setup
    // Using simple substring for name parsing mock
    const mockUser = {
      id: "usr_" + Math.random().toString(36).substring(7),
      name: email.split("@")[0].replace(/[^a-zA-Z]/g, " ") || "FieldSight User",
      email: email,
    };
    setUser(mockUser);
    localStorage.setItem("fieldSight_mockUser", JSON.stringify(mockUser));
  };

  const signup = async (name, email) => {
    const mockUser = {
      id: "usr_" + Math.random().toString(36).substring(7),
      name,
      email,
    };
    setUser(mockUser);
    localStorage.setItem("fieldSight_mockUser", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fieldSight_mockUser");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
