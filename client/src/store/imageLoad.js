import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: 'https://digit-recognition-api.onrender.com' });

export const imageLoadApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    imageLoad: builder.mutation({
      query: (formData) => ({
        url: '/classify',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useImageLoadMutation } = imageLoadApi;