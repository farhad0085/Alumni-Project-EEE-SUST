import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { username: string; password: string }) => ({
        url: "/api/auth/login/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (formData: FormData) => ({
        url: "/api/auth/register/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/auth/logout/",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    getUserInfo: builder.query({
      query: () => "/api/auth/user/me/",
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (data: FormData) => ({
        url: "/api/auth/user/me/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getDashboardData: builder.query({
      query: () => "/api/auth/dashboard/",
    }),
    listCountries: builder.query({
      query: () => "/api/auth/list-countries/",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserInfoQuery,
  useUpdateProfileMutation,
  useGetDashboardDataQuery,
  useListCountriesQuery,
} = authApi;
