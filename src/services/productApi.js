import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    // get al products 
    getProducts: builder.query({
      query: ({ limit = 30, skip = 0 } = {}) => `products?limit=${limit}&skip=${skip}`,
    }),

    // get single product 
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),

    // get product by category
     getProductByCategory: builder.query({
      query: ({ cat, limit = 12, skip = 0 }) => `products/category/${cat}?limit=${limit}&skip=${skip}`,
    }), 

    // search product 
      getProductBySearch: builder.query({
      query: ({ search, limit = 12, skip = 0 }) => `products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`,
    }),


  }),
})

export const { useGetProductsQuery, useGetProductQuery, useGetProductByCategoryQuery, useGetProductBySearchQuery } = productApi
