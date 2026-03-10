"use client";

import FullScreenLoading from "@/components/loaders/FullScreenLoading";
import { DASHBOARD_PAGE } from "@/lib/urls";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GuestRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
    if (isAuthenticated) {
      router.replace(DASHBOARD_PAGE);
    }
  }, [isAuthenticated, router]);

  if (!checked) return <FullScreenLoading />;
  if (isAuthenticated) return <FullScreenLoading />;

  return <>{children}</>;
}
