import { apiSlice } from "./apiSlice";

export const alumniApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedAlumni: builder.query({
      query: () => ({
        url: "/api/alumni/alumni/",
        params: { is_featured: true, page_size: 9 },
      }),
      providesTags: ["Alumni"],
    }),
    getBatchList: builder.query({
      query: () => ({
        url: "/api/alumni/batches/",
        params: { page_size: 100 },
      }),
      providesTags: ["Batch"],
    }),
    getBatchAlumni: builder.query({
      query: ({
        session,
        page = 1,
        page_size = 30,
      }: {
        session: string;
        page?: number;
        page_size?: number;
      }) => ({
        url: "/api/alumni/alumni/",
        params: { batch__session: session, page, page_size },
      }),
      providesTags: ["Alumni"],
    }),
    getAlumniById: builder.query({
      query: (id: string | number) => `/api/alumni/alumni/${id}`,
      providesTags: ["Alumni"],
    }),
  }),
});

export const {
  useGetFeaturedAlumniQuery,
  useGetBatchListQuery,
  useGetBatchAlumniQuery,
  useGetAlumniByIdQuery,
} = alumniApi;
