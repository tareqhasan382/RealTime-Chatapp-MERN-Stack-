import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from "./rootReducer"; // Make sure to import rootReducer correctly
import baseApi from "./api/baseApi"; // Import baseApi as default

export const store = configureStore({
  reducer: {
    ...rootReducer, // Spread the rootReducer correctly
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(baseApi.middleware),
});