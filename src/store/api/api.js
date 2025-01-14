import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",

    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("accessToken");
      // console.log("hello "+accessToken)
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default api;