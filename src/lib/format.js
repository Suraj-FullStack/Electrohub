export const PLACEHOLDER_IMG =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E" +
  "%3Crect width='100%25' height='100%25' fill='%23e2e8f0'/%3E" +
  "%3Ctext x='50%25' y='50%25' fill='%2394a3b8' font-family='Arial' font-size='16' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E"

export function toTitleCase(str = '') {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function stars(rating = 0) {
  const full = Math.round(rating)
  return '★'.repeat(full) + '☆'.repeat(Math.max(0, 5 - full))
}
