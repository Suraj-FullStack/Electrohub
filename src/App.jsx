import "./App.css";
import { Routes, Route } from "react-router";
import Layout from "./components/layout";
import Home from "./pages/home";
import SingleProductView from "./pages/singleProductView";
import Add from "./pages/add";
import Login from "./pages/login";
import RouteProtection from './components/Routeprotection'
import Profile from './pages/profile'
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/category/:cat" element={<Home />} />
        <Route path="/product/:id" element={<SingleProductView />} />
        <Route path="/add" element={<Add />} />
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
  );
}

export default App;
