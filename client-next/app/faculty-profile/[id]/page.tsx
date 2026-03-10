"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Layout from "@/components/layouts/Layout";
import Spinner from "@/components/loaders/Spinner";
import { setPageTitle, toTitleCase } from "@/lib/helpers";
import { useGetFacultyByIdQuery } from "@/store/api/facultyApi";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { use } from "react";

const DEFAULT_MALE = "/images/default-male.jpg";
const DEFAULT_FEMALE = "/images/default-female.jpg";

export default function FacultyProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: faculty, isLoading } = useGetFacultyByIdQuery(id);

  if (isLoading)
    return (
      <Layout>
        <Spinner />
      </Layout>
    );

  if (!faculty)
    return (
      <Layout>
        <div className="text-center py-10">
          <p className="text-gray-500">Faculty not found.</p>
          <Link
            href="/faculty-staff"
            className="inline-block mt-3 bg-[#003366] text-white px-4 py-2 rounded-md text-sm no-underline"
          >
            Back to Faculty List
          </Link>
        </div>
      </Layout>
    );

  setPageTitle(faculty.name);
  const photo =
    faculty.photo ||
    (faculty.gender === "female" ? DEFAULT_FEMALE : DEFAULT_MALE);

  return (
    <Layout>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Faculty", href: "/faculty-staff" },
          { label: faculty.name },
        ]}
      />

      <div className="bg-[#1a1a2e] text-white rounded-xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">{faculty.name}</h2>
            <div className="flex flex-col gap-2 text-sm text-gray-300">
              <p>
                <strong className="text-white">Designation:</strong>{" "}
                {faculty.designation}
              </p>
              {faculty.email && (
                <p>
                  <strong className="text-white">Email:</strong>{" "}
                  <a
                    href={`mailto:${faculty.email}`}
                    className="text-blue-300 hover:underline"
                  >
                    {faculty.email}
                  </a>
                </p>
              )}
              {faculty.phone && (
                <p>
                  <strong className="text-white">Phone:</strong>{" "}
                  <a
                    href={`tel:${faculty.phone}`}
                    className="text-blue-300 hover:underline"
                  >
                    {faculty.phone}
                  </a>
                </p>
              )}
              {faculty.gender && (
                <p>
                  <strong className="text-white">Gender:</strong>{" "}
                  {toTitleCase(faculty.gender)}
                </p>
              )}
            </div>
          </div>

          {/* Right: Photo */}
          <div className="flex flex-col items-center gap-3">
            <img
              src={photo}
              alt={faculty.name}
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src =
                  faculty.gender === "female" ? DEFAULT_FEMALE : DEFAULT_MALE;
              }}
              className="w-[160px] h-[160px] rounded-full object-cover border-4 border-white/20"
            />
            <p className="font-medium">{faculty.name}</p>
            <div className="flex gap-2">
              {faculty.email && (
                <a
                  href={`mailto:${faculty.email}`}
                  className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-md no-underline hover:bg-blue-700"
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
              )}
              {faculty.phone && (
                <a
                  href={`tel:${faculty.phone}`}
                  className="inline-flex items-center gap-1.5 bg-green-600 text-white text-xs px-3 py-1.5 rounded-md no-underline hover:bg-green-700"
                >
                  <Phone className="w-3.5 h-3.5" /> Call
                </a>
              )}
            </div>
          </div>
        </div>

        {faculty.description && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Profile</h2>
            <hr className="border-white/20 mb-4" />
            <div
              className="prose prose-invert max-w-none text-gray-300"
              dangerouslySetInnerHTML={{ __html: faculty.description }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
