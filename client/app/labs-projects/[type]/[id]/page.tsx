import type { Metadata } from "next";
import LabProjectDetailClient from "./LabProjectDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const label = type === "lab" ? "Lab" : "Project";
  return {
    title: `${label} Details | SUST EEE Alumni`,
    description: `View detailed information about this ${label.toLowerCase()} at the SUST EEE department.`,
    openGraph: {
      title: `${label} Details | SUST EEE Alumni`,
      description: `Details of a SUST EEE department ${label.toLowerCase()}.`,
    },
  };
}

export default async function LabsProjectsDetailPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  const { type, id } = await params;
  return <LabProjectDetailClient type={type} id={id} />;
}
