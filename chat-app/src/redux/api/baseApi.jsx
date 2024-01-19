// baseApi.jsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const BaseURL = "http://localhost:9000"

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  endpoints: () => ({}),
  tagTypes: ["auth", "chat"],
});

export default baseApi; // Add this line to export as default

//"http://localhost:9000/api/v1"