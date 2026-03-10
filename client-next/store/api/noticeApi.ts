import { apiSlice } from "./apiSlice";

export const noticeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotices: builder.query({
      query: ({
        page = 1,
        page_size = 30,
      }: {
        page?: number;
        page_size?: number;
      }) => ({
        url: "/api/notice/notices/",
        params: { page, page_size },
      }),
      providesTags: ["Notice"],
    }),
  }),
});

export const { useGetNoticesQuery } = noticeApi;
