"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Layout from "@/components/layouts/Layout";
import Spinner from "@/components/loaders/Spinner";
import { useGetAlumniByIdQuery } from "@/store/api/alumniApi";
import Link from "next/link";

const DEFAULT_MALE = "/images/default-male.jpg";
const DEFAULT_FEMALE = "/images/default-female.jpg";

export default function AlumniProfileClient({ id }: { id: string }) {
  const { data: alumni, isLoading } = useGetAlumniByIdQuery(id);

  if (isLoading)
    return (
      <Layout>
        <Spinner />
      </Layout>
    );

  if (!alumni)
    return (
      <Layout>
        <div className="text-center py-10">
          <p className="text-gray-500">Alumni not found.</p>
          <Link
            href="/alumni"
            className="inline-block mt-3 bg-[#003366] text-white px-4 py-2 rounded-md text-sm no-underline"
          >
            Back
          </Link>
        </div>
      </Layout>
    );

  const photo =
    alumni.profile_picture?.picture ||
    (alumni.gender === "female" ? DEFAULT_FEMALE : DEFAULT_MALE);

  return (
    <Layout>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Alumni", href: "/alumni" },
          { label: alumni.name },
        ]}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 text-center">
            <div className="mb-4">
              <img
                src={photo}
                alt={alumni.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null;
                  (e.target as HTMLImageElement).src =
                    alumni.gender === "female" ? DEFAULT_FEMALE : DEFAULT_MALE;
                }}
                className="w-full max-h-[300px] object-cover rounded-lg"
              />
            </div>
            <h3 className="font-semibold text-lg text-[#003366]">
              {alumni.name}
            </h3>
            <div className="text-sm text-gray-500 mb-3">
              {alumni.designation || "—"}{" "}
              {alumni.company && `@ ${alumni.company}`}
            </div>
            <div className="flex justify-center gap-2">
              {alumni.email && (
                <a
                  href={`mailto:${alumni.email}`}
                  className="bg-[#003366] text-white text-xs px-3 py-1.5 rounded-md no-underline"
                >
                  Email
                </a>
              )}
              {alumni.contact_number && (
                <a
                  href={`tel:${alumni.contact_number}`}
                  className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-md no-underline"
                >
                  Call
                </a>
              )}
            </div>
          </div>

          <div className="flex-1">
            <h4 className="font-semibold mb-4">Profile Details</h4>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-xs text-gray-400">Batch</span>
                <strong className="block text-sm">
                  {alumni.batch?.session} ({alumni.batch?.batch_name})
                </strong>
              </div>
              <div>
                <span className="text-xs text-gray-400">Graduation</span>
                <strong className="block text-sm">
                  {alumni.graduation_year || "—"}
                </strong>
              </div>
              <div>
                <span className="text-xs text-gray-400">Status</span>
                <span
                  className={`block text-xs font-medium mt-0.5 w-fit px-2 py-0.5 rounded-full text-white ${
                    alumni.is_employed ? "bg-green-600" : "bg-gray-500"
                  }`}
                >
                  {alumni.is_employed ? "Employed" : "Unemployed"}
                </span>
              </div>
              <div>
                <span className="text-xs text-gray-400">Registration</span>
                <strong className="block text-sm">
                  {alumni.registration_number || "—"}
                </strong>
              </div>
              <div>
                <span className="text-xs text-gray-400">DOB</span>
                <strong className="block text-sm">
                  {alumni.date_of_birth
                    ? new Date(alumni.date_of_birth).toLocaleDateString()
                    : "—"}
                </strong>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-xs text-gray-400 block mb-1">
                  Present Address
                </span>
                <p className="text-sm text-gray-600">
                  {alumni.present_address?.address},{" "}
                  {alumni.present_address?.city},{" "}
                  {alumni.present_address?.country}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-400 block mb-1">
                  Permanent Address
                </span>
                <p className="text-sm text-gray-600">
                  {alumni.permanent_address?.address},{" "}
                  {alumni.permanent_address?.city},{" "}
                  {alumni.permanent_address?.country}
                </p>
              </div>
            </div>
          </div>
        </div>

        {alumni.biography && (
          <div className="mt-6 border-t border-gray-100 pt-6">
            <h4 className="font-semibold mb-2">Biography</h4>
            <p className="text-sm text-gray-600">{alumni.biography}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
