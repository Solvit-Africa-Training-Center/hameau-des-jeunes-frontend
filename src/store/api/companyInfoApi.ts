import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONFIG, preparaAuthHeaders } from "./apiEntry";

// ── Types ──────────────────────────────────────────────────────────────────

export interface CompanyInfo {
  id: string;
  company_name: string;
  company_description: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  company_website: string;
  company_logo: string;
}

export interface WorkingDay {
  id: string;
  day: string;
  start_hours: string;
  end_hours: string;
  close_days: boolean;
}

interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Payload types use File for upload — separate from the response type
export interface CreateCompanyInfoPayload {
  company_name: string;
  company_description: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  company_website: string;
  company_logo: File; // ✅ File on create
}

export interface UpdateCompanyInfoPayload {
  id: string;
  company_name: string;
  company_description: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  company_website: string;
  company_logo?: File;
}

export interface CreateWorkingDayPayload {
  day: string;
  start_hours: string;
  end_hours: string;
  close_days: boolean;
}

export interface UpdateWorkingDayPayload extends CreateWorkingDayPayload {
  id: string;
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

// ── API slice ──────────────────────────────────────────────────────────────

export const companyInfoApi = createApi({
  reducerPath: "companyInfoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => preparaAuthHeaders(headers),
  }),
  tagTypes: ["CompanyInfo", "WorkingDays"],
  endpoints: (builder) => ({
    // Company Info
    getCompanyInfo: builder.query<CompanyInfo[], void>({
      query: () => "/company-info/",
      transformResponse: (
        res: Paginated<CompanyInfo> | CompanyInfo[] | CompanyInfo,
      ) => unwrap(res),
      providesTags: ["CompanyInfo"],
    }),

    createCompanyInfo: builder.mutation<CompanyInfo, CreateCompanyInfoPayload>({
      async queryFn(payload) {
        try {
          const body = new FormData();
          body.append("company_name", payload.company_name);
          body.append("company_description", payload.company_description);
          body.append("company_address", payload.company_address);
          body.append("company_phone", payload.company_phone);
          body.append("company_email", payload.company_email);
          body.append("company_website", payload.company_website);
          body.append("company_logo", payload.company_logo);
          const data = await multipartFetch<CompanyInfo>(
            "/company-info/",
            "POST",
            body,
          );
          return { data };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error:
                typeof error === "object"
                  ? JSON.stringify(error)
                  : String(error),
              data: error,
            },
          };
        }
      },
      invalidatesTags: ["CompanyInfo"],
    }),

    updateCompanyInfo: builder.mutation<CompanyInfo, UpdateCompanyInfoPayload>({
      async queryFn({ id, company_logo, ...rest }) {
        try {
          const body = new FormData();
          Object.entries(rest).forEach(([key, val]) =>
            body.append(key, String(val)),
          );
          if (company_logo instanceof File)
            body.append("company_logo", company_logo);
          const data = await multipartFetch<CompanyInfo>(
            `/company-info/${id}/`,
            "PATCH",
            body,
          );
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      invalidatesTags: ["CompanyInfo"],
    }),

    deleteCompanyInfo: builder.mutation<void, string>({
      query: (id) => ({ url: `/company-info/${id}/`, method: "DELETE" }),
      invalidatesTags: ["CompanyInfo"],
    }),

    // Working Days
    getWorkingDays: builder.query<WorkingDay[], void>({
      query: () => "/working-days-hours/",
      transformResponse: (
        res: Paginated<WorkingDay> | WorkingDay[] | WorkingDay,
      ) => unwrap(res),
      providesTags: ["WorkingDays"],
    }),

    createWorkingDay: builder.mutation<WorkingDay, CreateWorkingDayPayload>({
      query: (body) => ({ url: "/working-days-hours/", method: "POST", body }),
      invalidatesTags: ["WorkingDays"],
    }),

    updateWorkingDay: builder.mutation<WorkingDay, UpdateWorkingDayPayload>({
      query: ({ id, ...body }) => ({
        url: `/working-days-hours/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["WorkingDays"],
    }),

    deleteWorkingDay: builder.mutation<void, string>({
      query: (id) => ({ url: `/working-days-hours/${id}/`, method: "DELETE" }),
      invalidatesTags: ["WorkingDays"],
    }),
  }),
});

export const {
  useGetCompanyInfoQuery,
  useCreateCompanyInfoMutation,
  useUpdateCompanyInfoMutation,
  useDeleteCompanyInfoMutation,
  useGetWorkingDaysQuery,
  useCreateWorkingDayMutation,
  useUpdateWorkingDayMutation,
  useDeleteWorkingDayMutation,
} = companyInfoApi;
