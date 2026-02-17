import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { childrenApi } from "./api/childrenApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [childrenApi.reducerPath]: childrenApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, childrenApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
