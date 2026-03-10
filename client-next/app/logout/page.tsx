"use client";

import PrivateRoute from "@/components/auth/PrivateRoute";
import Layout from "@/components/layouts/Layout";
import { AUTH_TOKEN_KEY } from "@/lib/constants";
import { setPageTitle } from "@/lib/helpers";
import { useLogoutMutation } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { clearCredentials } from "@/store/slices/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutPage() {
  setPageTitle("Logout");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const [step, setStep] = useState<"confirm" | "loading" | "done">("confirm");

  const handleLogout = async () => {
    setStep("loading");
    try {
      await logout(undefined).unwrap();
    } catch {
      // proceed even if server-side logout fails
    }
    localStorage.removeItem(AUTH_TOKEN_KEY);
    dispatch(clearCredentials());
    setTimeout(() => setStep("done"), 800);
  };

  return (
    <PrivateRoute>
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center max-w-md w-full">
            {step === "confirm" && (
              <>
                <div className="text-5xl mb-4">⚠️</div>
                <h2 className="text-xl font-bold mb-2">Confirm Logout</h2>
                <p className="text-gray-500 mb-6">
                  Are you sure you want to log out?
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer border-none hover:bg-red-700 transition-colors"
                  >
                    Yes, Logout
                  </button>
                  <button
                    onClick={() => router.back()}
                    className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer border-none hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {step === "loading" && (
              <>
                <div className="text-5xl mb-4">⏳</div>
                <h2 className="text-xl font-bold mb-2">Logging you out...</h2>
                <p className="text-gray-500">Please wait a moment.</p>
              </>
            )}

            {step === "done" && (
              <>
                <div className="text-5xl mb-4">👋</div>
                <h2 className="text-xl font-bold mb-2">
                  You&apos;ve been logged out
                </h2>
                <p className="text-gray-500 mb-6">
                  Thank you for using our system.
                </p>
                <div className="flex gap-3 justify-center">
                  <Link
                    href="/login"
                    className="bg-[#003366] text-white px-5 py-2.5 rounded-lg text-sm font-medium no-underline hover:bg-[#002244] transition-colors"
                  >
                    Login Again
                  </Link>
                  <Link
                    href="/"
                    className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium no-underline hover:bg-gray-200 transition-colors"
                  >
                    Go Home
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
}
