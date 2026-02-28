import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";
import type {
  LoginCredentials,
  PasswordResetRequest,
  PasswordResetConfirmation,
  ChangePasswordPayload,
} from "@/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
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

    confirmPasswordReset: builder.mutation<
      any,
      {
        email: string;
        code: string;
        new_password: string;
        confirm_password: string;
      }
    >({
      query: (data) => ({
        url: "/managers/password-reset/confirm/",
        method: "POST",
        body: data,
      }),
    }),

    changePassword: builder.mutation<
      any,
      { old_password: string; new_password: string; password_confirm: string }
    >({
      query: (data) => ({
        url: "/managers/change-password/",
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
  useConfirmPasswordResetMutation,
  useChangePasswordMutation,
  useLogoutMutation,
} = authApi;

// Re-export types for backward compatibility
export type {
  LoginCredentials,
  PasswordResetRequest,
  PasswordResetConfirmation,
  ChangePasswordPayload,
} from "@/types";
