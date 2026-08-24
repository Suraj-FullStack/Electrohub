import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router'
import {
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
} from '../services/productApi'
import { useGetCategoriesQuery, ELECTRONICS_SLUGS } from '../services/categoryApi'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

// Fixed on purpose: two full-size listings per page instead of a dense
// grid. With real inventory this small (a handful of items per
// category), a bigger page size would mean 1-2 pages of "pagination"
// that isn't really doing anything — this keeps flipping through pages
// a real, visible part of browsing.
const PAGE_SIZE = 2

const Home = () => {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''

  const [skip, setSkip] = useState(0)
  const [sort, setSort] = useState('')

  const filterKey = `${q}|${slug}|${sort}`
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey)
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey)
    setSkip(0)
  }

  const { apiSortBy, apiOrder } = mapSort(sort)
  const { data: categories } = useGetCategoriesQuery()

  // ElectroHub doesn't carry everything DummyJSON has — only these four
  // categories are real electronics, so a category page here always
  // matches one of them.
  const activeSlug = slug && ELECTRONICS_SLUGS.includes(slug) ? slug : ELECTRONICS_SLUGS[0]

  const { data: categoryData, isFetching: fetchingCategory } = useGetProductsByCategoryQuery(
    { category: activeSlug, limit: PAGE_SIZE, skip, sortBy: apiSortBy, order: apiOrder },
    { skip: Boolean(q) }
  )
  const { data: searchData, isFetching: fetchingSearch } = useSearchProductsQuery(
    { q, limit: 0 },
    { skip: !q }
  )

  let products, total, isFetching
  if (q) {
    // Search hits every DummyJSON category, so results get filtered down
    // to electronics before anything else — a search for "case" shouldn't
    // surface a perfume just because the word matched.
    const matches = (searchData?.products || []).filter((p) =>
      ELECTRONICS_SLUGS.includes(p.category)
    )
    sortLocally(matches, sort)
    total = matches.length
    products = matches.slice(skip, skip + PAGE_SIZE)
    isFetching = fetchingSearch
  } else {
    products = categoryData?.products || []
    total = categoryData?.total || 0
    isFetching = fetchingCategory
  }

  const heading = q ? `Results for "${q}"` : categories?.find((c) => c.slug === activeSlug)?.name

  return (
    <div>
      <section className="border-b border-line bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            {categories?.length || 4} categories · electronics only
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-paper sm:text-4xl">
            Phones, laptops, tablets, and the accessories you actually need.
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/60">
            ElectroHub is a curated selection of electronics, kept deliberately focused on what matters.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {!q && (
          <div className="flex flex-wrap gap-2 border-b border-line pb-6">
            {categories?.map((c) => (
              <Link
                key={c.slug}
                to={`/category/${c.slug}`}
                className={`rounded-full border px-4 py-1.5 font-mono text-xs transition ${
                  c.slug === activeSlug
                    ? 'border-ink bg-ink text-paper'
                    : 'border-line text-ink hover:border-ink'
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">{heading}</h2>
            <p className="mt-1 font-mono text-xs text-muted">
              {isFetching
                ? 'Loading…'
                : total === 0
                  ? 'Nothing here.'
                  : `${total} listing${total === 1 ? '' : 's'} · page ${Math.floor(skip / PAGE_SIZE) + 1} of ${Math.max(1, Math.ceil(total / PAGE_SIZE))}`}
            </p>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded border border-line bg-panel px-3 py-2 font-mono text-xs text-ink"
          >
            <option value="">Sort: default</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating-desc">Rating: high to low</option>
          </select>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {isFetching
            ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-lg border border-line bg-panel" />
              ))
            : products.length === 0
              ? (
                <p className="col-span-full py-16 text-center font-mono text-sm text-muted">
                  No electronics match that search.
                </p>
              )
              : products.map((product) => <ProductCard key={product.id} product={product} />)}
        </section>

        {!isFetching && total > 0 && (
          <Pagination
            skip={skip}
            limit={PAGE_SIZE}
            total={total}
            onPrev={() => setSkip((s) => Math.max(0, s - PAGE_SIZE))}
            onNext={() => setSkip((s) => (s + PAGE_SIZE < total ? s + PAGE_SIZE : s))}
            onGoTo={(page) => setSkip((page - 1) * PAGE_SIZE)}
          />
        )}
      </div>
    </div>
  )
}

function mapSort(sort) {
  switch (sort) {
    case 'price-asc':
      return { apiSortBy: 'price', apiOrder: 'asc' }
    case 'price-desc':
      return { apiSortBy: 'price', apiOrder: 'desc' }
    case 'rating-desc':
      return { apiSortBy: 'rating', apiOrder: 'desc' }
    default:
      return { apiSortBy: '', apiOrder: '' }
  }
}

function sortLocally(products, sortBy) {
  if (sortBy === 'price-asc') products.sort((a, b) => a.price - b.price)
  else if (sortBy === 'price-desc') products.sort((a, b) => b.price - a.price)
  else if (sortBy === 'rating-desc') products.sort((a, b) => b.rating - a.rating)
}

export default Home
