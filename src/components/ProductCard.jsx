import { useState } from 'react'
import { Link } from 'react-router'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cartSlice'
import { PLACEHOLDER_IMG, stars } from '../lib/format'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const [added, setAdded] = useState(false)
  const img = product?.thumbnail || product?.images?.[0] || PLACEHOLDER_IMG
  const inStock = (product?.stock ?? 1) > 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addToCart(product))
    setAdded(true)
    setTimeout(() => setAdded(false), 900)
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-line bg-panel">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-4/3 bg-paper">
          <img
            src={img}
            alt={product?.title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = PLACEHOLDER_IMG
            }}
            className="h-full w-full object-contain p-6"
          />
          <span
            className={`absolute left-3 top-3 flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[11px] ${
              inStock
                ? 'border-circuit/30 bg-white/90 text-circuit'
                : 'border-line bg-white/90 text-muted'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${inStock ? 'bg-circuit' : 'bg-muted'}`}
            />
            {inStock ? 'In stock' : 'Out of stock'}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 border-t border-line p-4">
        <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
          {product?.brand || 'ElectroHub'}
        </p>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-base font-semibold leading-snug text-ink">
            {product?.title}
          </h3>
        </Link>

        <p className="text-sm text-signal-dark" aria-label={`Rated ${product?.rating ?? 0} out of 5`}>
          {stars(product?.rating)}{' '}
          <span className="font-mono text-xs text-muted">{(product?.rating ?? 0).toFixed(1)}</span>
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="tnum font-mono text-lg font-semibold text-ink">
            ${product?.price}
          </span>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={added}
            className="rounded border border-ink bg-ink px-3 py-1.5 font-mono text-xs text-paper transition hover:bg-ink-soft disabled:border-circuit disabled:bg-circuit"
          >
            {added ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
