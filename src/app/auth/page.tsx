"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { ArogyaIcon } from "@/components/ArogyaIcon";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", "").replace(/\(auth.*\)/, ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{background: "linear-gradient(135deg, #f0f7e6 0%, #e8f4f0 50%, #f5f0e8 100%)"}}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-primary/20">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/20 rounded-2xl p-3 mb-3">
            <ArogyaIcon className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">VaidyaAI</h1>
          <p className="text-sm text-foreground/60 mt-1">Your Personal Health Assistant</p>
        </div>

        {/* Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              isLogin ? "bg-primary text-white shadow" : "text-foreground/60"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              !isLogin ? "bg-primary text-white shadow" : "text-foreground/60"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-foreground/80 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border-2 border-primary/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground/80 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full border-2 border-primary/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-red-600 text-xs">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="text-xs text-center text-foreground/40 mt-6">
          VaidyaAI — AI-Powered Public Health Assistant
        </p>
      </div>
    </div>
  );
}