// Styled like a keypad — square mono-digit buttons, amber glow on the
// current page — because a store built around phones, laptops, and
// remotes can afford one on-brand, un-generic control.
function pageWindow(current, total) {
  // Always show first, last, current, and one neighbour on each side.
  // Collapse the rest into a single ellipsis per gap.
  const pages = new Set([1, total, current, current - 1, current + 1])
  return [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b)
}

const Pagination = ({ skip, limit, total, onPrev, onNext, onGoTo }) => {
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const currentPage = Math.floor(skip / limit) + 1
  const pages = pageWindow(currentPage, totalPages)

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1.5">
      <button
        type="button"
        onClick={onPrev}
        disabled={skip === 0}
        aria-label="Previous page"
        className="flex h-10 w-10 items-center justify-center rounded border border-line bg-panel font-mono text-sm text-ink transition hover:border-ink disabled:cursor-not-allowed disabled:opacity-30"
      >
        ‹
      </button>

      {pages.map((page, i) => {
        const prev = pages[i - 1]
        const showGap = prev != null && page - prev > 1
        return (
          <span key={page} className="flex items-center gap-1.5">
            {showGap && <span className="px-1 font-mono text-sm text-muted">···</span>}
            <button
              type="button"
              onClick={() => onGoTo(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`tnum flex h-10 w-10 items-center justify-center rounded border font-mono text-sm transition ${
                page === currentPage
                  ? 'border-signal bg-ink text-signal shadow-[0_0_0_3px_rgba(240,169,59,0.25)]'
                  : 'border-line bg-panel text-ink hover:border-ink'
              }`}
            >
              {page}
            </button>
          </span>
        )
      })}

      <button
        type="button"
        onClick={onNext}
        disabled={skip + limit >= total}
        aria-label="Next page"
        className="flex h-10 w-10 items-center justify-center rounded border border-line bg-panel font-mono text-sm text-ink transition hover:border-ink disabled:cursor-not-allowed disabled:opacity-30"
      >
        ›
      </button>
    </nav>
  )
}

export default Pagination
