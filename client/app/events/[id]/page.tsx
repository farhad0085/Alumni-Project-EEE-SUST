import type { Metadata } from "next";
import EventDetailClient from "./EventDetailClient";

export const metadata: Metadata = {
  title: "Event Details | SUST EEE Alumni",
  description:
    "View full details of a SUST EEE department event including date, time, location, and description.",
  openGraph: {
    title: "Event Details | SUST EEE Alumni",
    description: "Full details of a SUST EEE department event.",
  },
};

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EventDetailClient id={id} />;
}
