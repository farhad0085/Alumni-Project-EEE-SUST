import type { Metadata } from "next";
import LogoutClient from "./LogoutClient";

export const metadata: Metadata = {
  title: "Logout | SUST EEE Alumni",
  description: "Sign out of the SUST EEE Alumni portal.",
  robots: { index: false, follow: false },
};

export default function LogoutPage() {
  return <LogoutClient />;
}
