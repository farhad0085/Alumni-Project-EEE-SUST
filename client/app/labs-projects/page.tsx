import type { Metadata } from "next";
import LabsProjectsClient from "./LabsProjectsClient";

export const metadata: Metadata = {
  title: "Labs & Projects | SUST EEE Alumni",
  description:
    "Explore research laboratories and innovative student projects at the Department of Electrical and Electronic Engineering, SUST.",
  keywords: ["SUST EEE labs", "research projects", "EEE laboratories", "student projects"],
  openGraph: {
    title: "Labs & Projects | SUST EEE Alumni",
    description: "Research labs and projects of the SUST EEE department.",
  },
};

export default function LabsProjectsPage() {
  return <LabsProjectsClient />;
}
