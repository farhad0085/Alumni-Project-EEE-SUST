import HeroSection from "@/components/home/HeroSection";
import Layout from "@/components/layouts/Layout";
import { EVENT_LISTING_PAGE } from "@/lib/urls";
import {
  BookOpen,
  Briefcase,
  Calendar,
  ClipboardList,
  Cpu,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home | SUST EEE Alumni",
  description:
    "Official portal of the Department of Electrical and Electronic Engineering, Shahjalal University of Science and Technology. Connect with alumni, explore events, faculty, labs, and more.",
  keywords: [
    "SUST",
    "EEE",
    "alumni",
    "electrical engineering",
    "electronic engineering",
    "Shahjalal University",
  ],
  openGraph: {
    title: "SUST EEE Alumni Portal",
    description:
      "Official portal of the Department of Electrical and Electronic Engineering, SUST.",
    type: "website",
  },
};

const cardData = [
  {
    title: "Alumni Profiles",
    text: "Connect with our talented alumni network.",
    link: "/alumni",
    icon: <Users className="w-8 h-8" />,
  },
  {
    title: "Notice Board",
    text: "Stay updated with the latest announcements.",
    link: "/notice-board",
    icon: <ClipboardList className="w-8 h-8" />,
  },
  {
    title: "Study Materials",
    text: "Access course materials and lecture notes.",
    link: "/study-materials",
    icon: <BookOpen className="w-8 h-8" />,
  },
  {
    title: "Labs & Projects",
    text: "Explore our state-of-the-art labs and projects.",
    link: "/labs-projects",
    icon: <Cpu className="w-8 h-8" />,
  },
  {
    title: "Events",
    text: "Join our workshops, seminars, and events.",
    link: EVENT_LISTING_PAGE,
    icon: <Calendar className="w-8 h-8" />,
  },
  {
    title: "Faculty & Staff",
    text: "Meet our experienced faculty and staff.",
    link: "/faculty-staff",
    icon: <Briefcase className="w-8 h-8" />,
  },
];

export default function Home() {
  return (
    <Layout>
      <HeroSection />

      {/* Explore Section */}
      <div id="explore" className="py-8">
        <div className="max-w-275 mx-auto px-5">
          <h2 className="font-bold text-2xl mb-6">Explore Our Department</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
            {cardData.map((card, index) => (
              <Link
                href={card.link}
                key={index}
                className="bg-white rounded-xl p-8 text-left shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-200 no-underline text-inherit flex flex-col hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="text-[32px] text-[#0b6aa8] mb-4">
                  {card.icon}
                </div>
                <h3 className="text-[#003366] mb-2 text-[1.17em] font-bold">
                  {card.title}
                </h3>
                <p className="grow mb-4 text-gray-500">{card.text}</p>
                <span className="text-[#0b6aa8] font-semibold self-start">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights */}
      <section
        className="py-8 bg-linear-to-b from-[rgba(244,245,246,0.6)] to-[rgba(255,255,255,0.6)] rounded-xl mt-8"
        aria-labelledby="highlights-title"
      >
        <div className="max-w-275 mx-auto px-5">
          <h2 id="highlights-title" className="font-bold text-2xl mb-6">
            Department Highlights
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 mt-4">
            {[
              {
                title: "Research Excellence",
                text: "Active research in power systems, embedded systems, and machine learning for engineering.",
              },
              {
                title: "Industry Collaboration",
                text: "Strong partnerships with leading tech companies and local industry for internships and projects.",
              },
              {
                title: "Student Achievements",
                text: "Award-winning student projects, competition wins, and a vibrant alumni network.",
              },
            ].map((highlight) => (
              <div
                key={highlight.title}
                className="bg-white rounded-[10px] p-4 shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]"
              >
                <h3 className="m-0 mb-2 text-[#003366] font-bold text-[1.17em]">
                  {highlight.title}
                </h3>
                <p className="m-0 text-gray-500 text-sm">{highlight.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
