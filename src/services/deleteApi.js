import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const deleteApi = createApi({
  reducerPath: 'deleteApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useDeleteProductMutation } = deleteApi
