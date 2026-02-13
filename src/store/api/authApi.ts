import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tricky-cyb-matabar-576778bf.koyeb.app/api",
    // baseUrl: "http://192.168.1.129:8000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/managers/login/",
        method: "POST",
        body: credentials,
      }),
    }),

    signup: builder.mutation({
      query: (data: {
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
        role: string;
      }) => ({
        url: "/managers/",
        method: "POST",
        body: data,
      }),
    }),

    requestPasswordReset: builder.mutation<any, { email: string }>({
      query: (data) => ({
        url: "/managers/password-reset/request/",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => {
        const refreshToken = localStorage.getItem("refreshToken");
        return {
          url: "/managers/logout/",
          method: "POST",
          body: { refresh: refreshToken },
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useRequestPasswordResetMutation,
  useLogoutMutation,
} = authApi;
