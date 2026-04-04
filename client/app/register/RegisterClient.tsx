"use client";

import GuestRoute from "@/components/auth/GuestRoute";
import AuthLayout from "@/components/layouts/AuthLayout";
import { AUTH_TOKEN_KEY } from "@/lib/constants";
import { showErrorMessage, showSuccessMessage } from "@/lib/toast";
import { useGetBatchListQuery } from "@/store/api/alumniApi";
import { useRegisterMutation } from "@/store/api/authApi";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RegisterClient() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const { data: batchData } = useGetBatchListQuery(undefined);
  const sessions = batchData?.results || [];

  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [session, setSession] = useState("");

  useEffect(() => {
    if (!profilePicture) return setPreview(undefined);
    const url = URL.createObjectURL(profilePicture);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [profilePicture]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("email", email);
    formData.append("password1", password1);
    formData.append("password2", password2);
    formData.append("batch", session);
    if (profilePicture) formData.append("profile_picture", profilePicture);

    try {
      const res = await register(formData).unwrap();
      const token = res?.key || res?.token;
      if (token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        dispatch(setCredentials({ token }));
      }
      showSuccessMessage("Account created");
      router.push("/dashboard");
    } catch {
      showErrorMessage("Registration failed");
    }
  };

  return (
    <GuestRoute>
      <AuthLayout>
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
          <div className="w-full max-w-lg bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-1">
              Create Account
            </h1>
            <p className="text-center text-gray-500 text-sm mb-8">
              Join and complete your profile
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col items-center gap-3">
                <img
                  src={preview || "/images/default-male.jpg"}
                  alt="profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
                <label className="text-xs text-[#0fb2ff] cursor-pointer hover:underline">
                  Choose photo
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    className="hidden"
                    onChange={(e) =>
                      setProfilePicture(e.target.files?.[0] || null)
                    }
                  />
                </label>
              </div>

              <div className="relative">
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder=" "
                  className="peer w-full bg-gray-50 border border-gray-300 rounded-lg px-4 pt-5 pb-2 text-gray-800 text-sm outline-none focus:border-[#0fb2ff] transition-colors placeholder-transparent"
                />
                <label className="absolute left-4 top-1.5 text-[10px] text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#0fb2ff] transition-all pointer-events-none">
                  Full Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  className="peer w-full bg-gray-50 border border-gray-300 rounded-lg px-4 pt-5 pb-2 text-gray-800 text-sm outline-none focus:border-[#0fb2ff] transition-colors placeholder-transparent"
                />
                <label className="absolute left-4 top-1.5 text-[10px] text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#0fb2ff] transition-all pointer-events-none">
                  Email Address
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type={showPw1 ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    placeholder=" "
                    className="peer w-full bg-gray-50 border border-gray-300 rounded-lg px-4 pt-5 pb-2 pr-10 text-gray-800 text-sm outline-none focus:border-[#0fb2ff] transition-colors placeholder-transparent"
                  />
                  <label className="absolute left-4 top-1.5 text-[10px] text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#0fb2ff] transition-all pointer-events-none">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPw1((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 bg-transparent border-none cursor-pointer"
                  >
                    {showPw1 ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPw2 ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder=" "
                    className="peer w-full bg-gray-50 border border-gray-300 rounded-lg px-4 pt-5 pb-2 pr-10 text-gray-800 text-sm outline-none focus:border-[#0fb2ff] transition-colors placeholder-transparent"
                  />
                  <label className="absolute left-4 top-1.5 text-[10px] text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#0fb2ff] transition-all pointer-events-none">
                    Confirm Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPw2((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 bg-transparent border-none cursor-pointer"
                  >
                    {showPw2 ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <select
                required
                value={session}
                onChange={(e) => setSession(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 text-sm outline-none focus:border-[#0fb2ff] transition-colors"
              >
                <option value="">Select session</option>
                {sessions.map((s: any) => (
                  <option key={s.id} value={s.id}>
                    {s.session}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-[#003366] to-[#0b6aa8] hover:from-[#002244] hover:to-[#003366] transition-all disabled:opacity-60 cursor-pointer border-none"
              >
                {isLoading ? "Creating account..." : "Register"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#0fb2ff] hover:underline no-underline"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    </GuestRoute>
  );
}
