import { apiSlice } from "./apiSlice";

export const facultyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFaculty: builder.query({
      query: () => "/api/faculty/faculty/",
      providesTags: ["Faculty"],
    }),
    getFacultyById: builder.query({
      query: (id: string | number) => `/api/faculty/faculty/${id}/`,
      providesTags: ["Faculty"],
    }),
  }),
});

export const { useGetFacultyQuery, useGetFacultyByIdQuery } = facultyApi;
