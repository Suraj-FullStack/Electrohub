import { Routes, Route } from 'react-router'
import Layout from './components/layout'
import RouteProtection from './components/RouteProtection'
import Home from './pages/home'
import SingleProductView from './pages/singleProductView'
import Add from './pages/add'
import Login from './pages/login'
import Profile from './pages/profile'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* The reference app used /product/:cat and /product/:id for two
            different pages — identical path shapes, so only one route
            could ever match. Category browsing now lives under its own
            /category/:slug path instead. */}
        <Route path="/category/:slug" element={<Home />} />
        <Route path="/product/:id" element={<SingleProductView />} />
        <Route
          path="/add"
          element={
            <RouteProtection>
              <Add />
            </RouteProtection>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <RouteProtection>
              <Profile />
            </RouteProtection>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
