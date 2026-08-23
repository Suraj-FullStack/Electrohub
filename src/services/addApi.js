import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const addApi = createApi({
  reducerPath: 'addApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (formData) => ({
        url: 'products/add',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
})

export const { useAddProductMutation } = addApi
