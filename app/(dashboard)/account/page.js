"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { user, isLoaded, logout } = useAuth();
  const [deleteInput, setDeleteInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  if (isLoaded && !user) {
    router.push("/login");
    return null;
  }

  const handleDelete = async () => {
    if (deleteInput !== "DELETE") return;
    setIsDeleting(true);

    try {
      const res = await fetch("/api/auth/delete", { method: "DELETE" });
      if (res.ok) {
        // Log out context and redirect
        await logout();
        router.push("/");
      } else {
        alert("Failed to delete account. Please contact support.");
        setIsDeleting(false);
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred");
      setIsDeleting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-white px-6 py-16 animate-in fade-in zoom-in duration-300">
      <div className="max-w-4xl mx-auto space-y-10">
        
        <header className="border-b border-emerald-900/40 pb-6">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Account Settings</h1>
          <p className="text-gray-400 text-lg">Manage your personal information and security preferences.</p>
        </header>

        <section className="bg-[#0d1612] border border-emerald-900/30 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-emerald-400 mb-6">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Full Name</p>
              <p className="text-lg font-medium bg-[#111c17] p-3 rounded-lg border border-emerald-900/40">{user.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">Email Address</p>
              <p className="text-lg font-medium bg-[#111c17] p-3 rounded-lg border border-emerald-900/40">{user.email}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-6 pb-2 border-b border-emerald-900/30">
            For changes to your Email Address or Full Name, please contact our support team.
          </p>
        </section>

        <section className="bg-[#0d1612] border border-red-900/50 rounded-2xl p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
          <h2 className="text-xl font-bold text-red-500 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Danger Zone
          </h2>
          <p className="text-sm text-gray-400 mb-6 max-w-2xl">
            Deleting your account is permanent. All of your uploaded field imagery, analysis reports, and subscription data will be completely wiped from our servers immediately. This cannot be undone.
          </p>

          <div className="bg-[#111c17]/50 border border-red-900/30 p-6 rounded-xl space-y-4">
            <p className="text-sm text-gray-300 font-medium">To confirm, please type <span className="text-red-400 font-mono font-bold select-all bg-red-900/20 px-2 py-0.5 rounded">DELETE</span> below:</p>
            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              className="w-full md:w-64 bg-[#0a0f0d] text-red-100 border border-red-900/50 rounded-lg px-4 py-2.5 focus:outline-none focus:border-red-500 font-mono transition-colors"
              placeholder="DELETE"
            />
            
            <div className="pt-2">
              <button
                onClick={handleDelete}
                disabled={deleteInput !== "DELETE" || isDeleting}
                className={`px-8 py-3 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                  deleteInput === "DELETE" && !isDeleting
                    ? "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-900/20"
                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isDeleting ? (
                   <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Wiping Account...
                   </>
                ) : (
                  "Permanently Delete My Account"
                )}
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
