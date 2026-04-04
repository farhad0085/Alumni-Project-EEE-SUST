"use client";

import AlumniCard from "@/components/Alumni/AlumniCard";
import Breadcrumb from "@/components/Breadcrumb";
import PageNumberPagination from "@/components/common/PageNumberPagination";
import Layout from "@/components/layouts/Layout";
import Spinner from "@/components/loaders/Spinner";
import {
  useGetBatchAlumniQuery,
  useGetBatchListQuery,
} from "@/store/api/alumniApi";
import Link from "next/link";
import { useState } from "react";

export default function BatchAlumniClient({ session }: { session: string }) {
  const [page, setPage] = useState(1);
  const pageSize = 30;

  const { data: batchData } = useGetBatchListQuery(undefined);
  const batch =
    batchData?.results?.find((b: any) => b.session === session) || null;

  const { data: alumniData, isLoading } = useGetBatchAlumniQuery({
    session,
    page,
    page_size: pageSize,
  });

  const alumniList = alumniData?.results || [];
  const count = alumniData?.count || 0;
  const totalPages = Math.ceil(count / pageSize);
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, count);

  if (isLoading)
    return (
      <Layout>
        <Spinner />
      </Layout>
    );

  if (!batch)
    return (
      <Layout>
        <div className="text-center py-10">
          <h4 className="font-semibold mb-2">Batch not found</h4>
          <p className="text-gray-500">
            The batch you are looking for does not exist.
          </p>
          <Link
            href="/alumni"
            className="inline-block mt-3 bg-[#003366] text-white px-4 py-2 rounded-md text-sm no-underline"
          >
            Back to Batches
          </Link>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Batches", href: "/alumni" },
          { label: batch.session },
        ]}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-1">
            Batch {batch.session}
            {batch.batch_name && (
              <span className="text-gray-400 font-normal">
                {" "}
                — {batch.batch_name}
              </span>
            )}
          </h2>
          <p className="text-gray-500 mb-3">
            Explore alumni who graduated in this session.
          </p>
          <div className="flex gap-3">
            <span className="text-xs bg-[#003366] text-white px-3 py-1 rounded-full">
              {batch.total_students} Students
            </span>
            <span className="text-xs bg-green-600 text-white px-3 py-1 rounded-full">
              {batch.total_alumnies} Alumni
            </span>
          </div>
        </div>

        {batch.batch_pictures?.length > 0 && (
          <div className="md:w-1/3 shrink-0">
            <img
              src={batch.batch_pictures[0].picture}
              alt={batch.session}
              className="h-[150px] w-full rounded-lg object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold">Alumni Members</h4>
        {count > 0 && (
          <span className="text-sm text-gray-400">
            Showing {start} — {end} of {count}
          </span>
        )}
      </div>

      {alumniList.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
          <h5 className="font-semibold mb-1">No alumni found</h5>
          <p className="text-gray-500 text-sm">
            This batch has no registered alumni yet.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumniList.map((alumni: any) => (
              <AlumniCard key={alumni.id} alumni={alumni} />
            ))}
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
