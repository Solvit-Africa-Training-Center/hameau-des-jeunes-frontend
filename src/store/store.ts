import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { childrenApi } from "./api/childrenApi";
import { caretakersApi } from "./api/caretakersApi";
import { healthRecordsApi } from "./api/healthRecordsApi";
import { educationApi } from "./api/educationApi";
import { enrollmentApi } from "./api/enrollmentApi";
import { testimonialsApi } from "./api/testimonialsApi";
import { whoWeAreApi } from "./api/whoWeAreApi";
import { companyImpactApi } from "./api/companyImpact";
import { teamApi } from "./api/teamApi";
import { companyInfoApi } from "./api/companyInfoApi";
import { galleryApi } from "./api/galleryApi";
import { messageApi } from "./api/message";
import { replyMessageApi } from "./api/replyMessage";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [childrenApi.reducerPath]: childrenApi.reducer,
    [caretakersApi.reducerPath]: caretakersApi.reducer,
    [healthRecordsApi.reducerPath]: healthRecordsApi.reducer,
    [educationApi.reducerPath]: educationApi.reducer,
    [enrollmentApi.reducerPath]: enrollmentApi.reducer,
    [testimonialsApi.reducerPath]: testimonialsApi.reducer,
    [whoWeAreApi.reducerPath]: whoWeAreApi.reducer,
    [companyImpactApi.reducerPath]: companyImpactApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [companyInfoApi.reducerPath]: companyInfoApi.reducer,
    [galleryApi.reducerPath]: galleryApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [replyMessageApi.reducerPath]: replyMessageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      childrenApi.middleware,
      caretakersApi.middleware,
      healthRecordsApi.middleware,
      educationApi.middleware,
      enrollmentApi.middleware,
      testimonialsApi.middleware,
      whoWeAreApi.middleware,
      companyImpactApi.middleware,
      teamApi.middleware,
      companyInfoApi.middleware,
      galleryApi.middleware,
      messageApi.middleware,
      replyMessageApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
