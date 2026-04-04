import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Login | SUST EEE Alumni",
  description:
    "Sign in to the SUST EEE Alumni portal to access your dashboard, manage your profile, and connect with fellow alumni.",
  openGraph: {
    title: "Login | SUST EEE Alumni",
    description: "Sign in to the SUST EEE Alumni portal.",
  },
};

export default function LoginPage() {
  return <LoginClient />;
}
