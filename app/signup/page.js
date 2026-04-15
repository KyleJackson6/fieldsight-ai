"use client";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Creating account...");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        await signup(form.name, form.email);
        setMessage("Signup successful. Redirecting to your dashboard...");
        setTimeout(() => router.push("/analyze"), 1500);
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0f0d] text-white px-6 py-20">
      <div className="max-w-xl mx-auto rounded-2xl border border-emerald-900/40 bg-[#0d1612] p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-4 text-white">Sign Up for FieldSight AI</h1>
        <p className="text-gray-400 mb-8">
          Join FieldSight AI and receive a welcome email with your first steps.
        </p>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="rounded-lg border border-emerald-900/40 bg-[#111c17] px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-emerald-500"
          />

          <input
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="rounded-lg border border-emerald-900/40 bg-[#111c17] px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-emerald-500"
          />

          <button
            type="submit"
            className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-500 transition-colors"
          >
            Sign Up
          </button>
        </form>

        {message && <p className="mt-6 text-emerald-400">{message}</p>}
      </div>
    </main>
  );
}