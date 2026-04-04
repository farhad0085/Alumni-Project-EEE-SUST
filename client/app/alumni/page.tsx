import type { Metadata } from "next";
import AlumniPageClient from "./AlumniPageClient";

export const metadata: Metadata = {
  title: "Our Batches | SUST EEE Alumni",
  description:
    "Browse all graduating batches of the Department of Electrical and Electronic Engineering, SUST. View alumni by session and batch.",
  keywords: ["SUST EEE batches", "alumni batches", "graduating class", "EEE sessions"],
  openGraph: {
    title: "Our Batches | SUST EEE Alumni",
    description: "Browse all graduating batches and alumni of SUST EEE department.",
  },
};

export default function AlumniPage() {
  return <AlumniPageClient />;
}
