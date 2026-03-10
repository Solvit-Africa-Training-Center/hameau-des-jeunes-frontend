import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";

// ── Types ──────────────────────────────────────────────────────────────────

export interface GalleryCategory {
  id: string;
  name: string;
  description: string;
  created_on: string;
  updated_on: string;
  media_count: number;
}

export interface GalleryMedia {
  id: string;
  category: string;
  category_name: string;
  title: string;
  description: string;
  media_url: string;
  is_public: boolean;
  uploaded_by: string;
  uploaded_by_name: string;
  created_on: string;
  updated_on: string;
}

interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface CreateGalleryCategoryPayload {
  name: string;
  description: string;
}

export interface UpdateGalleryCategoryPayload extends CreateGalleryCategoryPayload {
  id: string;
}

export interface CreateGalleryMediaPayload {
  category: string;
  title: string;
  description?: string;
  media_url: File;
  is_public: boolean;
}

export interface UpdateGalleryMediaPayload {
  id: string;
  category: string;
  title: string;
  description?: string;
  media_url?: File;
  is_public: boolean;
}

// ── Helper ─────────────────────────────────────────────────────────────────

function unwrap<T>(res: Paginated<T> | T[] | T): T[] {
  if (Array.isArray(res)) return res;
  if (res !== null && typeof res === "object" && "results" in res)
    return (res as Paginated<T>).results;
  return [res as T];
}

const multipartFetch = async <T>(
  url: string,
  method: string,
  body: FormData,
): Promise<T> => {
  const token = localStorage.getItem("accessToken");
  const headers: HeadersInit = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
    method,
    headers,
    body,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    throw error;
  }

  return res.json();
};

// ── API Slice ──────────────────────────────────────────────────────────────

export const galleryApi = createApi({
  reducerPath: "galleryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
  }),
  tagTypes: ["GalleryCategories", "GalleryMedia"],
  endpoints: (builder) => ({
    // ── Categories ──────────────────────────────────────────────────────────

    getGalleryCategories: builder.query<GalleryCategory[], void>({
      query: () => "/gallery-categories/",
      transformResponse: (
        res: Paginated<GalleryCategory> | GalleryCategory[] | GalleryCategory,
      ) => unwrap(res),
      providesTags: ["GalleryCategories"],
    }),

    createGalleryCategory: builder.mutation<
      GalleryCategory,
      CreateGalleryCategoryPayload
    >({
      query: (body) => ({ url: "/gallery-categories/", method: "POST", body }),
      invalidatesTags: ["GalleryCategories"],
    }),

    updateGalleryCategory: builder.mutation<
      GalleryCategory,
      UpdateGalleryCategoryPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/gallery-categories/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["GalleryCategories"],
    }),

    deleteGalleryCategory: builder.mutation<void, string>({
      query: (id) => ({ url: `/gallery-categories/${id}/`, method: "DELETE" }),
      invalidatesTags: ["GalleryCategories", "GalleryMedia"],
    }),

    // ── Media ───────────────────────────────────────────────────────────────

    getGalleryMedia: builder.query<GalleryMedia[], void>({
      query: () => "/gallery-media/",
      transformResponse: (
        res: Paginated<GalleryMedia> | GalleryMedia[] | GalleryMedia,
      ) => unwrap(res),
      providesTags: ["GalleryMedia"],
    }),

    createGalleryMedia: builder.mutation<
      GalleryMedia,
      CreateGalleryMediaPayload
    >({
      async queryFn(payload) {
        try {
          const body = new FormData();
          body.append("category", payload.category);
          body.append("title", payload.title);
          if (payload.description)
            body.append("description", payload.description);
          body.append("media_url", payload.media_url);
          body.append("is_public", String(payload.is_public));
          const data = await multipartFetch<GalleryMedia>(
            "/gallery-media/",
            "POST",
            body,
          );
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      invalidatesTags: ["GalleryMedia", "GalleryCategories"],
    }),

    updateGalleryMedia: builder.mutation<
      GalleryMedia,
      UpdateGalleryMediaPayload
    >({
      async queryFn({ id, media_url, ...rest }) {
        try {
          const body = new FormData();
          Object.entries(rest).forEach(([key, val]) =>
            body.append(key, String(val)),
          );
          if (media_url instanceof File) body.append("media_url", media_url);
          const data = await multipartFetch<GalleryMedia>(
            `/gallery-media/${id}/`,
            "PATCH",
            body,
          );
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      invalidatesTags: ["GalleryMedia", "GalleryCategories"],
    }),

    deleteGalleryMedia: builder.mutation<void, string>({
      query: (id) => ({ url: `/gallery-media/${id}/`, method: "DELETE" }),
      invalidatesTags: ["GalleryMedia", "GalleryCategories"],
    }),
  }),
});

export const {
  useGetGalleryCategoriesQuery,
  useCreateGalleryCategoryMutation,
  useUpdateGalleryCategoryMutation,
  useDeleteGalleryCategoryMutation,
  useGetGalleryMediaQuery,
  useCreateGalleryMediaMutation,
  useUpdateGalleryMediaMutation,
  useDeleteGalleryMediaMutation,
} = galleryApi;
