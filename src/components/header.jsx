import { useRef, useState } from 'react'
import { Link, NavLink, useNavigate, useSearchParams, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartCount } from '../features/cartSlice'
import { logout, selectUser } from '../features/authSlice'

const navLinkClass = ({ isActive }) =>
  `font-mono text-xs uppercase tracking-wide transition ${
    isActive ? 'text-signal-dark' : 'text-ink/70 hover:text-ink'
  }`

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const cartCount = useSelector(selectCartCount)
  const user = useSelector(selectUser)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const urlQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(urlQuery)
  const [syncedQuery, setSyncedQuery] = useState(urlQuery)
  const debounceRef = useRef(null)

  // Keep the input in sync if the URL's ?q= changes some other way
  // (e.g. browser back/forward). Adjusting state during render (rather
  // than in a useEffect) avoids an extra commit/cascading render.
  if (urlQuery !== syncedQuery) {
    setSyncedQuery(urlQuery)
    setQuery(urlQuery)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (value.trim()) {
        navigate(`/?q=${encodeURIComponent(value.trim())}`)
      } else if (location.pathname === '/' && searchParams.get('q')) {
        navigate('/')
      }
    }, 400)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    clearTimeout(debounceRef.current)
    if (query.trim()) navigate(`/?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-panel/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded bg-ink font-mono text-lg text-signal">
            E
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-ink">
            ElectroHub
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/" className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/add" className={navLinkClass}>
            Add Product
          </NavLink>
          {user ? (
            <>
              <NavLink to="/profile" className={navLinkClass}>
                {user.username}
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="font-mono text-xs uppercase tracking-wide text-ink/70 transition hover:text-ink"
              >
                Log out
              </button>
            </>
          ) : (
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSubmit} className="hidden md:block">
            <input
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="Search phones, laptops…"
              className="w-56 rounded border border-line bg-paper px-4 py-2 text-sm outline-none transition focus:border-ink"
            />
          </form>
          <span
            aria-label="Cart"
            className="relative flex items-center gap-1 rounded border border-line px-3 py-2 font-mono text-sm text-ink"
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
            <span>{cartCount}</span>
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
