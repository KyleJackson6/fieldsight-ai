"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate slight backend delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      await login(email, password);
      router.push("/analyze");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0f0d] text-white px-6 py-24">
      <div className="max-w-md mx-auto rounded-2xl border border-emerald-900/40 bg-[#0d1612] p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-2 text-white">Welcome Back</h1>
        <p className="text-gray-400 mb-8">
          Log in to access your field analyses and reports.
        </p>

        <form onSubmit={handleLogin} className="grid gap-5">
          <div>
             <label className="text-sm text-gray-400 font-medium mb-1 block">Email Address</label>
             <input
               type="email"
               placeholder="Enter your email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
               className="w-full rounded-lg border border-emerald-900/40 bg-[#111c17] px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-emerald-500 transition-colors"
             />
          </div>

          <div>
             <label className="text-sm text-gray-400 font-medium mb-1 block">Password</label>
             <input
               type="password"
               placeholder="••••••••"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
               className="w-full rounded-lg border border-emerald-900/40 bg-[#111c17] px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-emerald-500 transition-colors"
             />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-500 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Log In"}
          </button>
        </form>
        
        <p className="mt-8 text-sm text-gray-500 text-center">
           Don't have an account? <a href="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">Sign up here</a>
        </p>
      </div>
    </main>
  );
}
