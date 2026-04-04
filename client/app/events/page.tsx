import type { Metadata } from "next";
import EventsPageClient from "./EventsPageClient";

export const metadata: Metadata = {
  title: "Events | SUST EEE Alumni",
  description:
    "Stay engaged with departmental seminars, workshops, reunions, and special events organized by the SUST EEE department.",
  keywords: ["SUST EEE events", "seminars", "workshops", "alumni events", "reunions"],
  openGraph: {
    title: "Events | SUST EEE Alumni",
    description: "Upcoming events from the SUST EEE department.",
  },
};

export default function EventPage() {
  return <EventsPageClient />;
}
