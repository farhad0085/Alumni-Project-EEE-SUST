"use client";

import Breadcrumb from "@/components/Breadcrumb";
import PageNumberPagination from "@/components/common/PageNumberPagination";
import Layout from "@/components/layouts/Layout";
import Spinner from "@/components/loaders/Spinner";
import { setPageTitle } from "@/lib/helpers";
import { buildEventPageUrl } from "@/lib/urls";
import { useGetEventsQuery } from "@/store/api/eventApi";
import Link from "next/link";
import { useState } from "react";

export default function EventPage() {
  const [page, setPage] = useState(1);
  const pageSize = 12;

  setPageTitle("Events");

  const { data, isLoading } = useGetEventsQuery({ page, page_size: pageSize });
  const events = data?.results || [];
  const totalPages = Math.ceil((data?.count || 0) / pageSize);

  return (
    <Layout>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Events" }]} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Upcoming Events</h1>
        <p className="text-gray-500">
          Stay engaged with departmental seminars, workshops, and special
          events.
        </p>
      </div>

      {isLoading ? (
        <Spinner />
      ) : events.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No upcoming events available.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: any) => (
              <div
                key={event.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {event.banner ? (
                  <img
                    src={event.banner}
                    alt={event.title}
                    className="w-full h-[180px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[180px] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h4 className="font-semibold mb-2 text-base">
                    {event.title}
                  </h4>
                  <div className="flex gap-2 mb-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    {event.time && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {event.time}
                      </span>
                    )}
                  </div>
                  {event.location && (
                    <div className="text-xs text-gray-500 mb-2">
                      📍 {event.location}
                    </div>
                  )}
                  {event.summary && (
                    <p className="text-sm text-gray-500 mb-3">
                      {event.summary.length > 150
                        ? event.summary.substring(0, 150) + "..."
                        : event.summary}
                    </p>
                  )}
                  {event.description && (
                    <Link
                      href={buildEventPageUrl(event.id)}
                      className="block text-center bg-[#003366] text-white text-sm py-2 rounded-md no-underline hover:bg-[#002244] transition-colors"
                    >
                      Learn More
                    </Link>
                  )}
                </div>
              </div>
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
