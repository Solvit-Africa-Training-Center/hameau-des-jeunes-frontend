import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const childrenApi = createApi({
  reducerPath: "childrenApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tricky-cyb-matabar-576778bf.koyeb.app/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    registerChild: builder.mutation<
      any,
      {
        first_name: string;
        last_name: string;
        date_of_birth: string;
        gender: "MALE" | "FEMALE";
        profile_image: string;
        start_date: string;
        special_needs: string;
        vigilant_contact_name: string;
        vigilant_contact_phone: string;
        story: string;
      }
    >({
      query: (data) => ({
        url: "/children",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterChildMutation } = childrenApi;
