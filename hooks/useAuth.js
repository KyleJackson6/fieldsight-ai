"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  // Securely load user context mapped from valid HttpOnly HTTP server calls
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const { user } = await res.json();
          setUser(user);
        }
      } catch (e) {
        console.error("Failed to load user session", e);
      } finally {
        setIsLoaded(true);
      }
    };
    checkSession();
  }, []);

  const login = async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    
    // Set actual authenticated user memory bridging into cookie-context setup
    setUser(data.user);
  };

  const signup = async (name, email, password) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    
    // Automatically parse cookie memory after DB write to prevent extra login bounce
    const meRes = await fetch("/api/auth/me");
    if (meRes.ok) {
        const meData = await meRes.json();
        setUser(meData.user);
    }
  };

  const logout = async () => {
    setUser(null);
    await fetch("/api/auth/logout", { method: "POST" });
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
