import Layout from "@/components/layouts/Layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Materials | SUST EEE Alumni",
  description:
    "Access lecture notes, tutorials, course materials, and reference resources from the SUST EEE department.",
  keywords: ["SUST EEE study materials", "lecture notes", "course materials", "tutorials"],
  openGraph: {
    title: "Study Materials | SUST EEE Alumni",
    description: "Study materials and resources from the SUST EEE department.",
  },
};

export default function StudyMaterialsPage() {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-2">Study Materials</h1>
        <p className="text-gray-500">
          This section is under construction. Soon you will find lecture notes,
          tutorials, and other reference materials here.
        </p>
      </div>
    </Layout>
  );
}
