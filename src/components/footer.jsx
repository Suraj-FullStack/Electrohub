import { Link } from 'react-router'

const Footer = () => {
  return (
    <footer className="border-t border-line bg-ink text-white/70">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-white/10 font-mono text-sm text-signal">
                E
              </span>
              <span className="font-display text-lg font-semibold text-white">ElectroHub</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              Four categories, kept deliberately small: phones, laptops,
              tablets, and the accessories that go with them. 
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-white/40">
              Shop
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/category/smartphones" className="transition hover:text-signal">
                  Phones
                </Link>
              </li>
              <li>
                <Link to="/category/laptops" className="transition hover:text-signal">
                  Laptops
                </Link>
              </li>
              <li>
                <Link to="/category/tablets" className="transition hover:text-signal">
                  Tablets
                </Link>
              </li>
              <li>
                <Link to="/category/mobile-accessories" className="transition hover:text-signal">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-white/40">
              Account
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/login" className="transition hover:text-signal">
                  Sign in
                </Link>
              </li>
              <li>
                <Link to="/add" className="transition hover:text-signal">
                  List a product
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>Product data from DummyJSON — a demo catalog, not a live store.</p>
          <p>© 2026 ElectroHub</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
