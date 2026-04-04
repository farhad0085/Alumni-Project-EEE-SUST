import type { Metadata } from "next";
import FacultyProfileClient from "./FacultyProfileClient";

export const metadata: Metadata = {
  title: "Faculty Profile | SUST EEE Alumni",
  description:
    "View detailed faculty profile including designation, contact information, and academic background.",
  openGraph: {
    title: "Faculty Profile | SUST EEE Alumni",
    description: "Detailed profile of a SUST EEE department faculty member.",
  },
};

export default async function FacultyProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <FacultyProfileClient id={id} />;
}
