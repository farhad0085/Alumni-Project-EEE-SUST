import type { Metadata } from "next";
import AlumniProfileClient from "./AlumniProfileClient";

export const metadata: Metadata = {
  title: "Alumni Profile | SUST EEE Alumni",
  description:
    "View detailed alumni profile including batch, graduation year, employment status, and contact information.",
  openGraph: {
    title: "Alumni Profile | SUST EEE Alumni",
    description: "Detailed profile of a SUST EEE department alumni.",
  },
};

export default async function AlumniProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AlumniProfileClient id={id} />;
}
