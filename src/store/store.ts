import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { childrenApi } from "./api/childrenApi";
import { caretakersApi } from "./api/caretakersApi";
import { healthRecordsApi } from "./api/healthRecordsApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [childrenApi.reducerPath]: childrenApi.reducer,
    [caretakersApi.reducerPath]: caretakersApi.reducer,
    [healthRecordsApi.reducerPath]: healthRecordsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      childrenApi.middleware,
      caretakersApi.middleware,
      healthRecordsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
