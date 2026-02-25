import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { childrenApi } from "./api/childrenApi";
import { caretakersApi } from "./api/caretakersApi";
import { healthRecordsApi } from "./api/healthRecordsApi";
import { educationApi } from "./api/educationApi";
import { enrollmentApi } from "./api/enrollmentApi";
import { ifasheFamiliesApi } from "./api/ifasheFamiliesApi";
import { ifasheChildrenApi } from "./api/ifasheChildrenApi";
import { ifasheSponsorshipsApi } from "./api/ifasheSponsorshipsApi";
import { ifasheDressingApi } from "./api/ifasheDressingApi";
import { ifasheParentsApi } from "./api/ifasheParentsApi";
import { ifasheSchoolSupportApi } from "./api/ifasheSchoolSupportApi";
import { ifasheReportsApi } from "./api/ifasheReportsApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [childrenApi.reducerPath]: childrenApi.reducer,
    [caretakersApi.reducerPath]: caretakersApi.reducer,
    [healthRecordsApi.reducerPath]: healthRecordsApi.reducer,
    [educationApi.reducerPath]: educationApi.reducer,
    [enrollmentApi.reducerPath]: enrollmentApi.reducer,
    [ifasheFamiliesApi.reducerPath]: ifasheFamiliesApi.reducer,
    [ifasheChildrenApi.reducerPath]: ifasheChildrenApi.reducer,
    [ifasheSponsorshipsApi.reducerPath]: ifasheSponsorshipsApi.reducer,
    [ifasheDressingApi.reducerPath]: ifasheDressingApi.reducer,
    [ifasheParentsApi.reducerPath]: ifasheParentsApi.reducer,
    [ifasheSchoolSupportApi.reducerPath]: ifasheSchoolSupportApi.reducer,
    [ifasheReportsApi.reducerPath]: ifasheReportsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      childrenApi.middleware,
      caretakersApi.middleware,
      healthRecordsApi.middleware,
      educationApi.middleware,
      enrollmentApi.middleware,
      ifasheFamiliesApi.middleware,
      ifasheChildrenApi.middleware,
      ifasheSponsorshipsApi.middleware,
      ifasheDressingApi.middleware,
      ifasheParentsApi.middleware,
      ifasheSchoolSupportApi.middleware,
      ifasheReportsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
