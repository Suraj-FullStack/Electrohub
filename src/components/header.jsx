import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const cleanQuery = query.trim();
    navigate(cleanQuery ? `/?q=${encodeURIComponent(cleanQuery)}` : "/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#f7f9f7ee] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d9f85a] text-lg font-black text-slate-950">
            E
          </span>
          <span className="brand-name text-xl font-bold tracking-tight text-slate-950">Electrohub</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-bold text-slate-500 md:flex">
          <NavLink className="transition hover:text-cyan-600" to="/" end>Home</NavLink>
          <NavLink className="transition hover:text-cyan-600" to="/category/smartphones">Shop tech</NavLink>
          <NavLink className="transition hover:text-cyan-600" to="/add">Sell with us</NavLink>
          <NavLink className="transition hover:text-cyan-600" to="/login">Account</NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <form className="flex" onSubmit={handleSearch}>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search devices..."
              className="w-32 rounded-l-full border border-r-0 border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 sm:w-48 sm:px-4"
            />
            <button type="submit" aria-label="Search" className="rounded-r-full border border-slate-200 bg-white px-3 text-slate-500 transition hover:text-cyan-600">↗</button>
          </form>
          <button
            type="button"
            aria-label="Cart"
            className="relative rounded-full border border-slate-300 p-2 text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
