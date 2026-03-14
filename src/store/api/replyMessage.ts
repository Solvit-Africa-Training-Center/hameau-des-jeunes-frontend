import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";
import type { ContactMessage } from "./message";


// Types
export interface ReplyContactMessage {
  id: string;
  contact_message:string | null;
  message_details:ContactMessage;
  reply_message: string;
  created_at?: string;
  updated_at?: string;
}

interface PaginatedCompanyImpactResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ReplyContactMessage[];
}

export interface CreateMessagePayload {
  contact_message: string;
  reply: string;
}

export interface UpdateMessagePayload extends CreateMessagePayload {
  id: string;
}

// API slice

export const replyMessageApi = createApi({
  reducerPath: "replyMessageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
  }),
  tagTypes: ["ReplyContactMessage"],
  endpoints: (builder) => ({
    // get all messages
    getReplyMessage: builder.query<ReplyContactMessage[], void>({
      query: () => "/reply-contact-message/",
      transformResponse: (
        response: PaginatedCompanyImpactResponse | ReplyContactMessage[],
      ) => {
     
        if (Array.isArray(response)) return response;
        if ("results" in response) return response.results;
        return [response];
      },
      providesTags: ["ReplyContactMessage"],
    }),

    // create message
    createReplyMessage: builder.mutation<
      ReplyContactMessage,
      CreateMessagePayload
    >({
      query: (body) => ({
        url: "/reply-contact-message/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ReplyContactMessage"],
    }),

    // update message
    updateReplyMessage: builder.mutation<
      ReplyContactMessage,
      UpdateMessagePayload
    >({
      query: ({ id, ...body }) => ({
        url: `/reply-contact-message/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ReplyContactMessage"],
    }),

    deleteReplyMessage: builder.mutation<void, string>({
      query: (id) => ({
        url: `/reply-contact-message/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ReplyContactMessage"],
    }),
  }),
});

export const {
  useGetReplyMessageQuery,
  useCreateReplyMessageMutation,
  useUpdateReplyMessageMutation,
  useDeleteReplyMessageMutation,
} = replyMessageApi;
