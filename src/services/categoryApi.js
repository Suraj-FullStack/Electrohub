import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ElectroHub only sells electronics. DummyJSON's category list is a
// general store's (beauty, fragrances, womenswear, groceries...), so we
// filter it down to the categories that are actually electronics rather
// than showing everything the API happens to have.
const ELECTRONICS_SLUGS = ['smartphones', 'laptops', 'tablets', 'mobile-accessories']

const DISPLAY_NAMES = {
  smartphones: 'Phones',
  laptops: 'Laptops',
  tablets: 'Tablets',
  'mobile-accessories': 'Accessories',
}

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => 'products/categories',
      transformResponse: (response) => {
        const slugOf = (c) => (typeof c === 'string' ? c : c.slug)
        return response
          .filter((c) => ELECTRONICS_SLUGS.includes(slugOf(c)))
          .map((c) => {
            const slug = slugOf(c)
            return { slug, name: DISPLAY_NAMES[slug] || slug }
          })
          .sort((a, b) => ELECTRONICS_SLUGS.indexOf(a.slug) - ELECTRONICS_SLUGS.indexOf(b.slug))
      },
    }),
  }),
})

export const { useGetCategoriesQuery } = categoryApi
export { ELECTRONICS_SLUGS }
