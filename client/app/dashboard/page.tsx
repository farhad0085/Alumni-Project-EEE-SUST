import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard | SUST EEE Alumni",
  description:
    "Manage your profile, view reports, and configure settings on the SUST EEE Alumni dashboard.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
