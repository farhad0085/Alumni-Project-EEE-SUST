"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Layout from "@/components/layouts/Layout";
import Spinner from "@/components/loaders/Spinner";
import { useGetFacultyQuery } from "@/store/api/facultyApi";
import Link from "next/link";

const DEFAULT_MALE = "/images/default-male.jpg";
const DEFAULT_FEMALE = "/images/default-female.jpg";

export default function FacultyStaffClient() {
  const { data, isLoading } = useGetFacultyQuery(undefined);
  const faculty = data?.results || [];

  const head = faculty.find((m: any) => m.role === "head");
  const otherFaculty = faculty.filter((m: any) => m.role === "faculty");
  const staffs = faculty.filter((m: any) => m.role === "staff");

  const FacultyCard = ({ member }: { member: any }) => {
    const fallback =
      member?.gender === "female" ? DEFAULT_FEMALE : DEFAULT_MALE;
    return (
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <img
          src={member?.photo || fallback}
          alt={member?.name || "Profile"}
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = fallback;
          }}
          className="w-[120px] h-[120px] rounded-full object-cover mx-auto mb-3"
        />
        <h3 className="font-semibold text-base mb-0.5">{member?.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{member?.designation}</p>
        <Link
          href={`/faculty-profile/${member?.id}`}
          className="text-sm text-[#0b6aa8] hover:underline no-underline"
        >
          View Profile
        </Link>
      </div>
    );
  };

  return (
    <Layout>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Faculty" }]}
      />

      <h1 className="text-2xl font-bold mb-1">Our Faculty & Staff</h1>
      <p className="text-gray-500 mb-6">
        Our department is proud to have a team of dedicated and experienced
        professionals shaping the future of our students.
      </p>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {head && (
            <>
              <h2 className="text-xl font-semibold mb-4 text-[#003366]">
                Department Head
              </h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mb-8">
                <FacultyCard member={head} />
              </div>
            </>
          )}

          <h2 className="text-xl font-semibold mb-4 text-[#003366]">
            Faculty Members
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mb-8">
            {otherFaculty.map((m: any) => (
              <FacultyCard key={m.id} member={m} />
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-4 text-[#003366]">Staff</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
            {staffs.map((m: any) => (
              <FacultyCard key={m.id} member={m} />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}
