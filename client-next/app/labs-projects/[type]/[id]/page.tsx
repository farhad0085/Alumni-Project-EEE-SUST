"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Layout from "@/components/layouts/Layout";
import Spinner from "@/components/loaders/Spinner";
import { setPageTitle } from "@/lib/helpers";
import {
  useGetLabByIdQuery,
  useGetProjectByIdQuery,
} from "@/store/api/labsProjectsApi";
import Link from "next/link";
import { use } from "react";

export default function LabsProjectsDetailPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  const { type, id } = use(params);
  const isLab = type === "lab";

  const { data: labData, isLoading: labLoading } = useGetLabByIdQuery(id, {
    skip: !isLab,
  });
  const { data: projectData, isLoading: projectLoading } =
    useGetProjectByIdQuery(id, { skip: isLab });

  const item = isLab ? labData : projectData;
  const loading = isLab ? labLoading : projectLoading;

  if (loading)
    return (
      <Layout>
        <Spinner />
      </Layout>
    );

  if (!item)
    return (
      <Layout>
        <div className="text-center py-10">
          <p className="text-gray-500">
            {isLab ? "Lab" : "Project"} not found.
          </p>
          <Link
            href="/labs-projects"
            className="inline-block mt-3 bg-[#003366] text-white px-4 py-2 rounded-md text-sm no-underline"
          >
            Back
          </Link>
        </div>
      </Layout>
    );

  setPageTitle(item.name || item.title);

  return (
    <Layout>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Labs & Projects", href: "/labs-projects" },
          { label: item.name || item.title },
        ]}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {item.thumbnail && (
            <div className="md:w-[40%] shrink-0">
              <img
                src={item.thumbnail}
                alt={item.name || item.title}
                className="w-full rounded-lg object-cover max-h-[340px]"
              />
            </div>
          )}

          <div className="flex-1">
            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded-full text-white mb-3 ${
                isLab ? "bg-[#003366]" : "bg-green-600"
              }`}
            >
              {isLab ? "Lab" : "Project"}
            </span>

            <h2 className="text-2xl font-bold mb-2">
              {item.name || item.title}
            </h2>

            {item.summary && <p className="text-gray-600">{item.summary}</p>}
          </div>
        </div>

        {item.description && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <hr className="border-gray-200 mb-4" />
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
