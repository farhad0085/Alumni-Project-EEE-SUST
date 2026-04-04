import type { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Register | SUST EEE Alumni",
  description:
    "Create an account on the SUST EEE Alumni portal. Join the alumni network and stay connected with the department.",
  keywords: ["SUST EEE register", "alumni registration", "create account"],
  openGraph: {
    title: "Register | SUST EEE Alumni",
    description: "Create your account on the SUST EEE Alumni portal.",
  },
};

export default function RegisterPage() {
  return <RegisterClient />;
}
