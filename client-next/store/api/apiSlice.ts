import { API_BASE, AUTH_TOKEN_KEY } from "@/lib/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (token) {
          headers.set("Authorization", `Token ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Alumni",
    "Batch",
    "Event",
    "Faculty",
    "Notice",
    "Lab",
    "Project",
  ],
  endpoints: () => ({}),
});
