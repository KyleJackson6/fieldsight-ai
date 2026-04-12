"use client";

import { useState } from "react";

export default function ReportTestPage() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Sending...");

    const response = await fetch("/api/report-ready", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Report-ready email sent successfully.");
      setForm({ name: "", email: "" });
    } else {
      setMessage(data.error || "Something went wrong.");
    }
  };

  return (
    <main style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h1>Test Report Ready Email</h1>
      <p>Send a test report-ready email for FieldSight AI.</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ padding: "12px", fontSize: "16px" }}
        />

        <input
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={{ padding: "12px", fontSize: "16px" }}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "#1b5e20",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            borderRadius: "6px",
          }}
        >
          Send Report Email
        </button>
      </form>

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </main>
  );
}