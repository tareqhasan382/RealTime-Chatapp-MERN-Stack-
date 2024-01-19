import { baseApi } from "./baseApi";
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signup: build.mutation({
      query: (data) => ({
        url: "/api/v1/signup",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["auth"],
    }),
    login: build.mutation({
      query: (data) => ({
        url: "/api/v1/login",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["auth"],
    }),
    userProfile: build.query({
      query: () => ({
        url: "/api/v1/profile",
        method: "GET",
      }),
      providesTags:["auth"]
    }),
    getUser: build.query({
        query: (user) => ({
          url: `/api/v1/user/${user?.userId}`,
          method: "GET",
        }),
        providesTags:["auth"]
      }),
  }),
});

export const { useSignupMutation, useLoginMutation, useUserProfileQuery,useGetUserQuery } =
  authApi;
