"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Layout from "@/components/layouts/Layout";
import Spinner from "@/components/loaders/Spinner";
import { setPageTitle } from "@/lib/helpers";
import { useGetBatchListQuery } from "@/store/api/alumniApi";
import Link from "next/link";

export default function AlumniPage() {
  setPageTitle("Batches");
  const { data, isLoading } = useGetBatchListQuery(undefined);
  const batches = data?.results || [];

  return (
    <Layout>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Batches" }]}
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Our Batches</h1>
        <p className="text-gray-500">Browse alumni by graduating batch</p>
      </div>

      {isLoading ? (
        <Spinner />
      ) : batches.length === 0 ? (
        <p className="text-gray-500 text-center">No batches available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch: any) => {
            const pictures =
              batch.batch_pictures?.map((p: any) => p.picture) || [];
            return (
              <div
                key={batch.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col"
              >
                {pictures.length > 0 ? (
                  <img
                    src={pictures[0]}
                    alt={`${batch.session} thumbnail`}
                    className="h-[225px] w-full object-cover"
                  />
                ) : (
                  <div className="h-[225px] w-full bg-gray-50 flex items-center justify-center text-gray-400 text-sm italic">
                    No Image
                  </div>
                )}

                <div className="p-4 flex flex-col flex-1">
                  <h5 className="font-semibold text-base mb-1">
                    {batch.session}
                    {batch.batch_name && (
                      <span className="text-gray-400 font-normal">
                        {" "}
                        ({batch.batch_name})
                      </span>
                    )}
                  </h5>

                  <div className="flex gap-4 text-sm text-gray-500 mb-3">
                    <div>
                      <strong>{batch.total_students}</strong> Students
                    </div>
                    <div>
                      <strong>{batch.total_alumnies}</strong> Alumni
                    </div>
                  </div>

                  <Link
                    href={`/batches/${batch.session}`}
                    className="mt-auto inline-block text-center bg-[#003366] text-white text-sm py-2 rounded-md no-underline hover:bg-[#002244] transition-colors"
                  >
                    View Alumni →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
