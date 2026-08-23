import { Navigate, useLocation } from 'react-router'

// Guards a route: if no user is stored, bounce to /login and remember
// where the visitor was headed so login can send them back afterward.
// (localStorage only stores strings, so the user object has to be
// JSON-parsed on the way out — it was JSON.stringify'd going in.)
const RouteProtection = ({ children }) => {
  const location = useLocation()

  const user = (() => {
    try {
      const raw = localStorage.getItem('user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

export default RouteProtection
