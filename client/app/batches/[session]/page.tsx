import type { Metadata } from "next";
import BatchAlumniClient from "./BatchAlumniClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ session: string }>;
}): Promise<Metadata> {
  const { session } = await params;
  return {
    title: `Batch ${session} | SUST EEE Alumni`,
    description: `View all alumni from batch ${session} of the Department of Electrical and Electronic Engineering, SUST.`,
    openGraph: {
      title: `Batch ${session} | SUST EEE Alumni`,
      description: `Alumni directory for batch ${session}, SUST EEE department.`,
    },
  };
}

export default async function BatchAlumniPage({
  params,
}: {
  params: Promise<{ session: string }>;
}) {
  const { session } = await params;
  return <BatchAlumniClient session={session} />;
}
