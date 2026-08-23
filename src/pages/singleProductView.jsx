import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { useGetProductQuery } from '../services/productApi'
import { useDeleteProductMutation } from '../services/deleteApi'
import { addToCart } from '../features/cartSlice'
import { PLACEHOLDER_IMG, stars } from '../lib/format'

const SingleProductView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: product, isLoading, isError } = useGetProductQuery(id)

  // The reference app wired `onClick={useDeleteProductMutation}` directly —
  // that passes the hook itself as a click handler instead of calling the
  // trigger function it returns, so nothing ever actually got deleted.
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()

  const [added, setAdded] = useState(false)
  const [buyMessage, setBuyMessage] = useState('')

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    setAdded(true)
    setTimeout(() => setAdded(false), 900)
  }

  // No real checkout/payment flow exists in this demo, so "Buy Now" adds
  // the item to the cart and says so honestly rather than faking an order.
  const handleBuyNow = () => {
    dispatch(addToCart(product))
    setBuyMessage('Added to cart — checkout isn\u2019t implemented in this demo.')
    setTimeout(() => setBuyMessage(''), 2500)
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${product.title}"? This can't be undone.`)) return
    try {
      await deleteProduct(product.id).unwrap()
      navigate('/')
    } catch (err) {
      console.error('Delete failed:', err)
      alert('Failed to delete product. Please try again.')
    }
  }

  if (isLoading) {
    return <div className="mx-auto max-w-4xl px-4 py-10 font-mono text-sm text-muted">Loading...</div>
  }

  if (isError || !product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-signal-dark">Couldn't load this product.</p>
        <Link to="/" className="mt-2 inline-block font-mono text-sm text-signal-dark hover:underline">
          Back to shop
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <nav className="mb-8 font-mono text-xs text-muted">
        <Link to="/" className="hover:text-ink">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.title}</span>
      </nav>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="md:w-1/2">
          <img
            src={product.images?.[0] || PLACEHOLDER_IMG}
            alt={product.title}
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = PLACEHOLDER_IMG
            }}
            className="w-full rounded-lg border border-line bg-paper object-contain p-8"
          />
        </div>

        <div className="flex flex-col justify-center md:w-1/2">
          <h1 className="font-display text-3xl font-semibold text-ink">{product.title}</h1>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-signal-dark">{stars(product.rating)}</span>
            <span className="font-mono text-sm text-muted">{product.rating?.toFixed(1)}</span>
          </div>

          <p className="mt-4 leading-relaxed text-ink/70">{product.description}</p>

          <p className="tnum mt-6 font-mono text-3xl font-semibold text-ink">${product.price}</p>

          {buyMessage && (
            <p className="mt-4 rounded border border-signal/30 bg-signal/10 px-4 py-2 text-sm text-signal-dark">
              {buyMessage}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 rounded bg-ink px-6 py-3 font-mono text-sm text-paper transition hover:bg-ink-soft"
            >
              Buy Now
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 rounded border border-ink px-6 py-3 font-mono text-sm text-ink transition hover:bg-ink hover:text-paper"
            >
              {added ? 'Added ✓' : 'Add to Cart'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 rounded border border-line px-6 py-3 font-mono text-sm text-muted transition hover:border-ink hover:text-ink disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProductView
