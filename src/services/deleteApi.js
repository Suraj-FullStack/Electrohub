import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const deleteApi = createApi({
  reducerPath: 'deleteApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    // The reference app queried `/${id}` (missing the `products/` prefix)
    // with no HTTP method, which defaults to GET — it never actually
    // deleted anything. Fixed to a real DELETE on the products resource.
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useDeleteProductMutation } = deleteApi
