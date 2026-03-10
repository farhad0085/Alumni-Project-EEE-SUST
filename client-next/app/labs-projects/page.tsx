"use client";

import Breadcrumb from "@/components/Breadcrumb";
import PageNumberPagination from "@/components/common/PageNumberPagination";
import Layout from "@/components/layouts/Layout";
import Spinner from "@/components/loaders/Spinner";
import { setPageTitle } from "@/lib/helpers";
import {
  useGetLabsQuery,
  useGetProjectsQuery,
} from "@/store/api/labsProjectsApi";
import Link from "next/link";
import { useState } from "react";

export default function LabsProjectsPage() {
  const [activeTab, setActiveTab] = useState<"labs" | "projects">("labs");
  const [page, setPage] = useState(1);
  const pageSize = 30;

  setPageTitle("Labs and Projects");

  const { data: labsData, isLoading: labsLoading } = useGetLabsQuery(
    { page, page_size: pageSize },
    { skip: activeTab !== "labs" },
  );
  const { data: projectsData, isLoading: projectsLoading } =
    useGetProjectsQuery(
      { page, page_size: pageSize },
      { skip: activeTab !== "projects" },
    );

  const items =
    activeTab === "labs"
      ? labsData?.results || []
      : projectsData?.results || [];
  const count =
    activeTab === "labs" ? labsData?.count || 0 : projectsData?.count || 0;
  const totalPages = Math.ceil(count / pageSize);
  const loading = activeTab === "labs" ? labsLoading : projectsLoading;

  const handleTabChange = (tab: "labs" | "projects") => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <Layout>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Labs & Projects" }]}
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Labs & Projects</h1>
        <p className="text-gray-500">
          Explore our research labs and innovative student projects
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer border-none ${
            activeTab === "labs"
              ? "bg-[#003366] text-white"
              : "bg-white text-[#003366] border border-[#003366] shadow-sm"
          }`}
          onClick={() => handleTabChange("labs")}
        >
          🧪 Labs
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer border-none ${
            activeTab === "projects"
              ? "bg-green-600 text-white"
              : "bg-white text-green-600 border border-green-600 shadow-sm"
          }`}
          onClick={() => handleTabChange("projects")}
        >
          🚀 Projects
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item: any) => {
              const isLab = activeTab === "labs";
              const title = isLab ? item.name : item.title;
              return (
                <Link
                  key={item.id}
                  href={`/labs-projects/${isLab ? "lab" : "project"}/${item.id}`}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden no-underline text-inherit transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={title}
                      className="w-full h-[200px] object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h5
                      className={`font-semibold mb-1 ${
                        isLab ? "text-[#003366]" : "text-green-700"
                      }`}
                    >
                      {title}
                    </h5>
                    <p className="text-sm text-gray-500">
                      {item.summary?.length > 120
                        ? item.summary.slice(0, 120) + "..."
                        : item.summary}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {totalPages > 1 && (
            <PageNumberPagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
            />
          )}
        </>
      )}
    </Layout>
  );
}
