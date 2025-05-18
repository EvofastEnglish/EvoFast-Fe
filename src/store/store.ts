import { rootReducer } from "@/features";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistConfig from "./persistConfig";

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export default store;
