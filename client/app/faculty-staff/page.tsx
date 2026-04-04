import type { Metadata } from "next";
import FacultyStaffClient from "./FacultyStaffClient";

export const metadata: Metadata = {
  title: "Faculty & Staff | SUST EEE Alumni",
  description:
    "Meet the experienced faculty members and staff of the Department of Electrical and Electronic Engineering at SUST.",
  keywords: ["SUST EEE faculty", "EEE staff", "professors", "department head", "teaching staff"],
  openGraph: {
    title: "Faculty & Staff | SUST EEE Alumni",
    description: "Faculty and staff directory of the SUST EEE department.",
  },
};

export default function FacultyStaffPage() {
  return <FacultyStaffClient />;
}
