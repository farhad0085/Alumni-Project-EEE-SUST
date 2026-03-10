import { apiSlice } from "./apiSlice";

export const labsProjectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLabs: builder.query({
      query: ({
        page = 1,
        page_size = 30,
      }: {
        page?: number;
        page_size?: number;
      }) => ({
        url: "/api/faculty/labs/",
        params: { page, page_size },
      }),
      providesTags: ["Lab"],
    }),
    getLabById: builder.query({
      query: (id: string | number) => `/api/faculty/labs/${id}/`,
      providesTags: ["Lab"],
    }),
    getProjects: builder.query({
      query: ({
        page = 1,
        page_size = 30,
      }: {
        page?: number;
        page_size?: number;
      }) => ({
        url: "/api/faculty/projects/",
        params: { page, page_size },
      }),
      providesTags: ["Project"],
    }),
    getProjectById: builder.query({
      query: (id: string | number) => `/api/faculty/projects/${id}/`,
      providesTags: ["Project"],
    }),
  }),
});

export const {
  useGetLabsQuery,
  useGetLabByIdQuery,
  useGetProjectsQuery,
  useGetProjectByIdQuery,
} = labsProjectsApi;
