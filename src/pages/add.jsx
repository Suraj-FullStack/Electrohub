import { useForm } from 'react-hook-form'
import { useAddProductMutation } from '../services/addApi'

const Add = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [addProduct, { isLoading, isSuccess, isError }] = useAddProductMutation()

  const onSubmit = async (formData) => {
    try {
      await addProduct({ ...formData, price: Number(formData.price) }).unwrap()
      reset()
    } catch (err) {
      console.error('Add product failed:', err)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">New listing</p>
      <h1 className="mt-1 font-display text-2xl font-semibold text-ink">List a product</h1>

      {isSuccess && (
        <p className="mt-4 rounded border border-circuit/30 bg-circuit/10 px-3 py-2 font-mono text-xs text-circuit">
          Product added — DummyJSON doesn't persist writes, so this won't show up in the catalog, but the request went through fine.
        </p>
      )}
      {isError && (
        <p className="mt-4 rounded border border-signal/30 bg-signal/10 px-3 py-2 font-mono text-xs text-signal-dark">
          Something went wrong. Please try again.
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label htmlFor="title" className="mb-1 block font-mono text-xs uppercase tracking-wide text-muted">
            Title
          </label>
          <input
            {...register('title', { required: 'Title is required' })}
            type="text"
            id="title"
            className="w-full rounded border border-line bg-panel p-2.5 text-sm text-ink outline-none transition focus:border-ink"
            placeholder="e.g. Galaxy S24 case, clear"
          />
          {errors.title && <p className="mt-1 font-mono text-xs text-signal-dark">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block font-mono text-xs uppercase tracking-wide text-muted">
            Description
          </label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            id="description"
            rows={3}
            className="w-full rounded border border-line bg-panel p-2.5 text-sm text-ink outline-none transition focus:border-ink"
            placeholder="What it is, what it's for"
          />
          {errors.description && (
            <p className="mt-1 font-mono text-xs text-signal-dark">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="mb-1 block font-mono text-xs uppercase tracking-wide text-muted">
            Price
          </label>
          <input
            {...register('price', {
              required: 'Price is required',
              min: { value: 0, message: 'Price must be positive' },
            })}
            type="number"
            id="price"
            step="0.01"
            className="tnum w-full rounded border border-line bg-panel p-2.5 text-sm text-ink outline-none transition focus:border-ink"
            placeholder="0.00"
          />
          {errors.price && <p className="mt-1 font-mono text-xs text-signal-dark">{errors.price.message}</p>}
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block font-mono text-xs uppercase tracking-wide text-muted">
            Category
          </label>
          <input
            {...register('category', { required: 'Category is required' })}
            type="text"
            id="category"
            className="w-full rounded border border-line bg-panel p-2.5 text-sm text-ink outline-none transition focus:border-ink"
            placeholder="smartphones, laptops, tablets, or mobile-accessories"
          />
          {errors.category && (
            <p className="mt-1 font-mono text-xs text-signal-dark">{errors.category.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded bg-ink px-5 py-2.5 font-mono text-sm text-paper transition hover:bg-ink-soft disabled:opacity-50"
        >
          {isLoading ? 'Adding…' : 'Add product'}
        </button>
      </form>
    </div>
  )
}

export default Add
