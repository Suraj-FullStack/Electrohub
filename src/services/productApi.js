import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

function buildParams({ limit, skip, sortBy, order }) {
  const params = new URLSearchParams()
  if (limit != null) params.set('limit', limit)
  if (skip != null) params.set('skip', skip)
  if (sortBy) {
    params.set('sortBy', sortBy)
    params.set('order', order || 'asc')
  }
  return params
}

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    // Get all products, paginated with limit & skip, optionally sorted.
    getProducts: builder.query({
      query: ({ limit = 12, skip = 0, sortBy, order } = {}) =>
        `products?${buildParams({ limit, skip, sortBy, order })}`,
      providesTags: ['Product'],
    }),

    // Get a single product by id.
    getProduct: builder.query({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    // Get products in one category, paginated with limit & skip.
    getProductsByCategory: builder.query({
      query: ({ category, limit = 12, skip = 0, sortBy, order }) =>
        `products/category/${category}?${buildParams({ limit, skip, sortBy, order })}`,
      providesTags: ['Product'],
    }),

    // Search products. The reference app called `products/search/${term}`,
    // which is not a real DummyJSON route — the correct endpoint takes the
    // term as a `q` query param: `products/search?q=term`.
    searchProducts: builder.query({
      query: ({ q, limit = 12, skip = 0 }) => {
        const params = buildParams({ limit, skip })
        params.set('q', q)
        return `products/search?${params}`
      },
      providesTags: ['Product'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
} = productApi
