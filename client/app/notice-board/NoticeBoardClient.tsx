"use client";

import Breadcrumb from "@/components/Breadcrumb";
import PageNumberPagination from "@/components/common/PageNumberPagination";
import Layout from "@/components/layouts/Layout";
import Spinner from "@/components/loaders/Spinner";
import { useGetNoticesQuery } from "@/store/api/noticeApi";
import { FileText } from "lucide-react";
import { useState } from "react";

export default function NoticeBoardClient() {
  const [page, setPage] = useState(1);
  const pageSize = 30;

  const { data, isLoading } = useGetNoticesQuery({ page, page_size: pageSize });
  const notices = data?.results || [];
  const totalPages = Math.ceil((data?.count || 0) / pageSize);

  return (
    <Layout>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Notices" }]}
      />
      <h1 className="text-2xl font-bold mb-1">Notice Board</h1>
      <p className="text-gray-500 mb-6">
        Stay updated with the latest announcements and official notices.
      </p>

      {isLoading ? (
        <Spinner />
      ) : notices.length === 0 ? (
        <p className="text-gray-500">No notices available at the moment.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {notices.map((notice: any) => (
            <div
              key={notice.id}
              className="bg-white rounded-lg p-5 shadow-sm border border-gray-100"
            >
              <h3 className="font-semibold text-lg mb-1">{notice.title}</h3>
              <div className="text-xs text-gray-400 mb-2">
                Date: {notice.date}
              </div>
              <p className="text-gray-600 text-sm mb-3">{notice.description}</p>
              {notice.pdf && (
                <a
                  href={notice.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-red-600 font-medium hover:underline"
                >
                  <FileText className="w-4 h-4" />
                  View PDF
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <PageNumberPagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}
    </Layout>
  );
}
