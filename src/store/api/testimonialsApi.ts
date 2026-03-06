import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";

export interface Testimonial {
  id: string;
  name: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedTestimonialsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Testimonial[];
}

export interface CreateTestimonialPayload {
  name: string;
  image: File;
  description: string;
}

export interface UpdateTestimonialPayload {
  id: string;
  name: string;
  description: string;
  image?: File;
}

export const testimonialsApi = createApi({
  reducerPath: "testimonialsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
  }),
  tagTypes: ["Testimonials"],
  endpoints: (builder) => ({
    getTestimonials: builder.query<Testimonial[], void>({
      query: () => "/testimonial/",
      transformResponse: (
        response: PaginatedTestimonialsResponse | Testimonial[],
      ) => {
        if (Array.isArray(response)) return response;
        return response.results;
      },
      providesTags: ["Testimonials"],
    }),

    createTestimonial: builder.mutation<Testimonial, CreateTestimonialPayload>({
      query: (payload) => {
        const formData = new FormData();

        formData.append("name", payload.name);
        formData.append("description", payload.description);
        formData.append("image", payload.image);

        return {
          url: "/testimonial/",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Testimonials"],
    }),

    updateTestimonial: builder.mutation<Testimonial, UpdateTestimonialPayload>({
      query: (payload) => {
        const formData = new FormData();
        formData.append("name", payload.name);
        formData.append("description", payload.description);
        if (payload.image) formData.append("image", payload.image);
        return {
          url: `/testimonial/${payload.id}/`,
          method: "PATCH",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Testimonials"],
    }),

    deleteTestimonial: builder.mutation<void, string>({
      query: (id) => ({ url: `/testimonial/${id}/`, method: "DELETE" }),
      invalidatesTags: ["Testimonials"],
    }),
  }),
});

export const {
  useCreateTestimonialMutation,
  useGetTestimonialsQuery,
  useDeleteTestimonialMutation,
  useUpdateTestimonialMutation,
} = testimonialsApi;
