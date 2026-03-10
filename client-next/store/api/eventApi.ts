import { apiSlice } from "./apiSlice";

export const eventApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: ({
        page = 1,
        page_size = 12,
        upcoming = false,
      }: {
        page?: number;
        page_size?: number;
        upcoming?: boolean;
      }) => ({
        url: "/api/event/events/",
        params: { page, page_size, upcoming },
      }),
      providesTags: ["Event"],
    }),
    getEventById: builder.query({
      query: (id: string | number) => `/api/event/events/${id}`,
      providesTags: ["Event"],
    }),
  }),
});

export const { useGetEventsQuery, useGetEventByIdQuery } = eventApi;
