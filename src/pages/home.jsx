import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import {
  useGetProductByCategoryQuery,
  useGetProductBySearchQuery,
  useGetProductsQuery,
} from "../services/productApi";
import { useGetCategoryQuery } from "../services/categoryApi";

const electronicCategories = [
  "smartphones",
  "laptops",
  "tablets",
  "mobile-accessories",
  "mens-watches",
  "womens-watches",
];

const Home = () => {
  const { search } = useLocation();
  const { cat } = useParams();
  const nav = useNavigate();
  const searchTerm = new URLSearchParams(search).get("q") || "";
  const paginationKey = `${cat || ""}:${searchTerm}`;
  const [pagination, setPagination] = useState({ key: "", page: 1 });
  const page = pagination.key === paginationKey ? pagination.page : 1;
  const updatePage = (nextPage) => {
    setPagination((currentPagination) => {
      const currentPage = currentPagination.key === paginationKey ? currentPagination.page : 1;
      const resolvedPage = typeof nextPage === "function" ? nextPage(currentPage) : nextPage;
      return { key: paginationKey, page: resolvedPage };
    });
  };
  const pageSize = 6;

  // Fetch all products once, filter client-side for consistent pagination
  const { data } = useGetProductsQuery({ limit: 100, skip: 0 });
  const { data: categories } = useGetCategoryQuery();
  const { data: categoryProduct, isLoading: isCategoryLoading } = useGetProductByCategoryQuery(
    cat ? { cat, limit: 100, skip: 0 } : skipToken
  );
  const { data: searchProduct, isLoading: isSearchLoading, isError: isSearchError } = useGetProductBySearchQuery(
    searchTerm ? { search: searchTerm, limit: 100, skip: 0 } : skipToken
  );

  const allProducts = data?.products || [];
  const electronicProducts = allProducts.filter((product) =>
    electronicCategories.includes(product.category)
  );

  // Filter search results to electronics only
  const searchResults = (searchProduct?.products || []).filter((product) =>
    electronicCategories.includes(product.category)
  );

  const categoryResults = (categoryProduct?.products || []).filter((product) =>
    electronicCategories.includes(product.category)
  );

  const productData = searchTerm
    ? searchResults.slice((page - 1) * pageSize, page * pageSize)
    : cat
      ? categoryResults.slice((page - 1) * pageSize, page * pageSize)
      : electronicProducts.slice((page - 1) * pageSize, page * pageSize);

  const totalProducts = searchTerm
    ? searchResults.length
    : cat
      ? categoryResults.length
      : electronicProducts.length;

  const totalPages = Math.min(5, Math.max(1, Math.ceil(totalProducts / pageSize)));
  const visibleCategories = (categories || []).filter((category) =>
    electronicCategories.includes(category.slug)
  );

  const isLoading = searchTerm ? isSearchLoading : cat ? isCategoryLoading : false;

  return (
    <div className="pb-20">
      <section className="electro-hero">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div>
            <p className="eyebrow">Thoughtfully picked tech</p>
            <h1 className="mt-5 max-w-2xl text-5xl font-black leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-6xl">
              The good stuff, plugged in.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              A small, carefully chosen collection of devices and accessories
              for work, weekends, and the space in between.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#catalog" className="primary-button">Explore the collection</a>
              <Link to="/category/smartphones" className="secondary-button">Shop smartphones</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-slate-500">
              <span>Free delivery over $50</span><span>30-day returns</span><span>Here when you need us</span>
            </div>
          </div>
          <div className="hero-editorial">
            <div className="hero-editorial-copy">
              <span>Electrohub / 2026</span>
              <strong>Small upgrades.<br />Noticeable difference.</strong>
              <span className="hero-editorial-note">A few things we would happily keep.</span>
            </div>
            {electronicProducts[0]?.images?.[0] && (
              <img src={electronicProducts[0].images[0]} alt="Featured electronic product" />
            )}
          </div>
        </div>
      </section>

      <section id="catalog" className="mx-auto max-w-7xl scroll-mt-28 px-6 pt-16 lg:px-8">
        <div className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">{cat ? "Category collection" : searchTerm ? "Search results" : "Just plugged in"}</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              {searchTerm ? `Results for “${searchTerm}”` : cat ? cat.replaceAll("-", " ") : "Tech worth bringing home"}
            </h2>
            {!isLoading && totalProducts > 0 && (
              <p className="mt-2 text-sm font-semibold text-slate-400">
                {totalProducts} {totalProducts === 1 ? "item" : "items"}
                {totalPages > 1 ? ` · page ${page} of ${totalPages}` : ""}
              </p>
            )}
          </div>
          <select
            value={cat || ""}
            onChange={(event) => nav(event.target.value ? `/category/${event.target.value}` : "/")}
            className="category-select"
            aria-label="Browse electronic categories"
          >
            <option value="">All electronics</option>
            {visibleCategories.map((category) => (
              <option key={category.slug} value={category.slug}>{category.name}</option>
            ))}
          </select>
        </div>

        {isLoading && <p className="py-16 text-center text-slate-500">Looking for that...</p>}
        {isSearchError && (
          <div className="my-8 rounded-xl border border-rose-200 bg-rose-50 px-5 py-6 text-center text-rose-700">
            <p className="font-bold">We couldn’t search right now.</p>
            <button type="button" className="mt-3 font-semibold underline" onClick={() => nav("/")}>Return to the collection</button>
          </div>
        )}
        {!isLoading && !isSearchError && <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {productData.map((product) => (
            <article key={product.id} className="product-card group">
              <Link to={`/product/${product.id}`} className="product-image-wrap">
                <img src={product.images?.[0]} alt={product.title} className="product-image" />
                <span className="product-arrow">↗</span>
              </Link>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-600">{product.category?.replaceAll("-", " ")}</p>
                <h3 className="mt-2 line-clamp-2 min-h-12 text-base font-bold leading-6 text-slate-900">{product.title}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-black text-slate-950">${product.price}</span>
                  <span className="text-sm font-semibold text-amber-500">★ {product.rating}</span>
                </div>
              </div>
            </article>
          ))}
        </div>}
        {!isLoading && !isSearchError && !productData.length && (
          <div className="py-16 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-3 text-lg font-bold text-slate-700">
              {searchTerm ? `Nothing found for “${searchTerm}”` : "No electronics here yet"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {searchTerm
                ? "Try a different keyword, or browse the full collection below."
                : "Check back soon — we’re always adding new gear."}
            </p>
            {searchTerm && (
              <Link to="/" className="primary-button mt-5">Browse all electronics</Link>
            )}
          </div>
        )}
        {!isLoading && !isSearchError && totalPages > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className="secondary-button disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => updatePage((currentPage) => Math.max(1, currentPage - 1))}
              disabled={page === 1}
            >
              ← Previous
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => updatePage(pageNumber)}
                  className={`page-button ${page === pageNumber ? "page-button-active" : ""}`}
                  aria-label={`Go to page ${pageNumber}`}
                  aria-current={page === pageNumber ? "page" : undefined}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="primary-button disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => updatePage((currentPage) => Math.min(totalPages, currentPage + 1))}
              disabled={page === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-20 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div><p className="eyebrow">Browse by setup</p><h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Find your next upgrade</h2></div>
          <span className="hidden text-sm font-semibold text-slate-400 sm:block">Built for work, play, and everything between.</span>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCategories.slice(0, 6).map((category, index) => (
            <Link key={category.slug} to={`/category/${category.slug}`} className={`category-tile category-tile-${index % 3}`}>
              <span className="category-number">0{index + 1}</span>
              <span><strong>{category.name}</strong><small>Shop the collection →</small></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;