"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Layout from "@/components/layouts/Layout";
import Spinner from "@/components/loaders/Spinner";
import { useGetEventByIdQuery } from "@/store/api/eventApi";
import Link from "next/link";

export default function EventDetailClient({ id }: { id: string }) {
  const { data: item, isLoading } = useGetEventByIdQuery(id);

  if (isLoading)
    return (
      <Layout>
        <Spinner />
      </Layout>
    );

  if (!item)
    return (
      <Layout>
        <div className="text-center py-10">
          <p className="text-gray-500">Event not found.</p>
          <Link
            href="/events"
            className="inline-block mt-3 bg-[#003366] text-white px-4 py-2 rounded-md text-sm no-underline"
          >
            Back to Events
          </Link>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: item.title },
        ]}
      />

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-6">
          {item.banner && (
            <div className="md:w-[40%] shrink-0">
              <img
                src={item.banner}
                alt={item.title}
                className="w-full rounded-lg object-cover max-h-[300px]"
              />
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
            {item.summary && (
              <p className="text-gray-600 mb-4">{item.summary}</p>
            )}

            <ul className="list-none p-0 m-0 flex flex-col gap-2 text-sm text-gray-600">
              {item.date && (
                <li>{new Date(item.date).toLocaleDateString()}</li>
              )}
              {item.time && <li>{item.time.substring(0, 5)}</li>}
              {item.location && <li>{item.location}</li>}
            </ul>

            {item.tags?.length > 0 && (
              <div className="flex gap-2 mt-3">
                {item.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {item.description && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <hr className="border-gray-200 mb-4" />
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        )}

        {item.created_at && (
          <div className="mt-6 text-xs text-gray-400">
            Published on {new Date(item.created_at).toLocaleDateString()}
          </div>
        )}
      </div>
    </Layout>
  );
}
