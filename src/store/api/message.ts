import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";
import type { ReplyContactMessage } from "./replyMessage";


// Types

export interface ContactMessage {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  replies:ReplyContactMessage[];
  message: string;
  created_at?: string;
  is_read:boolean;
  updated_at?: string;
}

interface PaginatedCompanyImpactResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ContactMessage[];
}

export interface CreateMessagePayload {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  message: string;
}


export interface UpdateMessagePayload extends CreateMessagePayload {
  id: string;
}

// API slice

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
  }),
  tagTypes: ["ContactMessage"],
  endpoints: (builder) => ({
    // get all messages
    getMessage: builder.query<ContactMessage[], void>({
      query: () => "/contact-us/",
      transformResponse: (
        response: PaginatedCompanyImpactResponse | ContactMessage[],
      ) => {
        console.log("vjvjvjnvsf")
        console.log(response);
        if (Array.isArray(response)) return response;
        if ("results" in response) return response.results;
        return [response];
      },
      providesTags: ["ContactMessage"],
    }),

    // create message
    createMessage: builder.mutation<
      ContactMessage,
      CreateMessagePayload
    >({
      query: (body) => ({
        url: "/contact-us/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ContactMessage"],
    }),

    // update message
    updateMessage: builder.mutation<
      ContactMessage,
      UpdateMessagePayload
    >({
      query: ({ id, ...body }) => ({
        url: `/contact-us/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ContactMessage"],
    }),
    // read message
    readMessage: builder.mutation<
      ContactMessage,
      string
    >({
      query: (id) => ({
        url: `/contact-us/${id}/mark_as_read/`,
        method: "PATCH",
      }),
      invalidatesTags: ["ContactMessage"],
    }),

    deleteMessage: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contact-us/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ContactMessage"],
    }),
  }),
});

export const {
  useGetMessageQuery,
  useCreateMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  useReadMessageMutation,
} = messageApi;
