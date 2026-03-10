"use client";

import GuestRoute from "@/components/auth/GuestRoute";
import AuthLayout from "@/components/layouts/AuthLayout";
import { AUTH_TOKEN_KEY } from "@/lib/constants";
import { setPageTitle } from "@/lib/helpers";
import { showErrorMessage, showSuccessMessage } from "@/lib/toast";
import { useLoginMutation } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  setPageTitle("Login");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      const res = await login({ username: email, password }).unwrap();
      const token = res?.key || res?.token;
      if (token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        dispatch(setCredentials({ token }));
      }
      showSuccessMessage(res?.message || "Logged in successfully");
      router.push("/dashboard");
    } catch {
      showErrorMessage("Email or password is incorrect!");
    }
  };

  return (
    <GuestRoute>
      <AuthLayout>
        <div className="min-h-[80vh] flex items-center justify-center bg-[#0f172a] px-4 py-12">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
            <h1 className="text-2xl font-bold text-white text-center mb-1">
              Welcome Back!
            </h1>
            <p className="text-center text-gray-300 text-sm mb-8">
              Sign in to continue to your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  className="peer w-full bg-white/5 border border-white/20 rounded-lg px-4 pt-5 pb-2 text-white text-sm outline-none focus:border-[#0fb2ff] transition-colors placeholder-transparent"
                />
                <label className="absolute left-4 top-1.5 text-[10px] text-gray-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#0fb2ff] transition-all pointer-events-none">
                  Email Address
                </label>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  className="peer w-full bg-white/5 border border-white/20 rounded-lg px-4 pt-5 pb-2 text-white text-sm outline-none focus:border-[#0fb2ff] transition-colors placeholder-transparent"
                />
                <label className="absolute left-4 top-1.5 text-[10px] text-gray-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#0fb2ff] transition-all pointer-events-none">
                  Password
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-[#003366] to-[#0b6aa8] hover:from-[#002244] hover:to-[#003366] transition-all disabled:opacity-60 cursor-pointer border-none"
              >
                {isLoading ? "Signing in…" : "Login"}
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-2 text-center text-sm">
              <Link
                href="/reset-password"
                className="text-[#0fb2ff] hover:underline no-underline"
              >
                Forgot password?
              </Link>
              <span className="text-gray-400">
                New here?{" "}
                <Link
                  href="/register"
                  className="text-[#0fb2ff] hover:underline no-underline"
                >
                  Create an account
                </Link>
              </span>
            </div>
          </div>
        </div>
      </AuthLayout>
    </GuestRoute>
  );
}
