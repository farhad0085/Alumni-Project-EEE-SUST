"use client";

import { useGetUserInfoQuery } from "@/store/api/authApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { initializeAuth, setUser } from "@/store/slices/authSlice";
import { useEffect } from "react";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  // Initialize auth from localStorage
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Load user info when authenticated
  const { data: userInfo } = useGetUserInfoQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (userInfo) {
      dispatch(setUser(userInfo));
    }
  }, [userInfo, dispatch]);

  return <>{children}</>;
}
