"use client";

import { useRouter } from "next/navigation";

interface AlumniCardProps {
  alumni: {
    id: number;
    name: string;
    gender?: string;
    designation?: string;
    company?: string;
    session?: string;
    passing_year?: string;
    email?: string;
    contact_number?: string;
    present_address?: { address?: string };
    profile_picture?: { picture?: string };
  };
}

const DEFAULT_MALE = "/images/default-male.jpg";
const DEFAULT_FEMALE = "/images/default-female.jpg";

export default function AlumniCard({ alumni }: AlumniCardProps) {
  const router = useRouter();
  const profilePicture = alumni?.profile_picture?.picture;
  const fallbackImage =
    alumni.gender === "female" ? DEFAULT_FEMALE : DEFAULT_MALE;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md h-full flex flex-col">
      {/* Image */}
      <div className="h-[200px] overflow-hidden bg-gray-50">
        <img
          src={profilePicture || fallbackImage}
          alt={alumni.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = fallbackImage;
          }}
        />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h5 className="font-semibold text-[#003366] mb-1 text-base">
          {alumni.name}
        </h5>

        <div className="text-sm text-gray-500 mb-2">
          {alumni.designation || "—"} {alumni.company && `@ ${alumni.company}`}
        </div>

        <div className="flex gap-2 mb-3">
          <span className="text-xs bg-[#003366] text-white px-2.5 py-0.5 rounded-full">
            {alumni.session || "N/A"}
          </span>
          <span className="text-xs bg-gray-500 text-white px-2.5 py-0.5 rounded-full">
            {alumni.passing_year || "N/A"}
          </span>
        </div>

        <p className="text-xs text-gray-400 mb-3 flex-1">
          {alumni.present_address?.address || "No address provided"}
        </p>

        <div className="flex items-center gap-2 mt-auto">
          <button
            className="bg-[#003366] text-white text-xs px-3 py-1.5 rounded-md hover:bg-[#002244] transition-colors cursor-pointer border-none"
            onClick={() => router.push(`/alumni/${alumni.id}`)}
          >
            View Profile
          </button>
          <a
            href={`mailto:${alumni.email}`}
            className="text-xs border border-gray-300 text-gray-600 px-3 py-1.5 rounded-md no-underline hover:bg-gray-50 transition-colors"
          >
            Email
          </a>
          <a
            href={`tel:${alumni.contact_number}`}
            className="text-xs border border-gray-300 text-gray-600 px-3 py-1.5 rounded-md no-underline hover:bg-gray-50 transition-colors"
          >
            Call
          </a>
        </div>
      </div>
    </div>
  );
}
