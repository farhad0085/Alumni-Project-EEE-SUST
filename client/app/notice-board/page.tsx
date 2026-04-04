import type { Metadata } from "next";
import NoticeBoardClient from "./NoticeBoardClient";

export const metadata: Metadata = {
  title: "Notice Board | SUST EEE Alumni",
  description:
    "Stay updated with the latest announcements, official notices, and circulars from the SUST EEE department.",
  keywords: ["SUST EEE notices", "announcements", "circulars", "department notices"],
  openGraph: {
    title: "Notice Board | SUST EEE Alumni",
    description: "Latest notices and announcements from the SUST EEE department.",
  },
};

export default function NoticeBoardPage() {
  return <NoticeBoardClient />;
}
