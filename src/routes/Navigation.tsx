import { Route, Routes } from "react-router-dom";
import Cart from "../pages/Cart";
import Home from "../pages/home";
import Login from "../pages/login";
import NotFound from "../pages/NotFound";
import OrderHistory from "../pages/OrderHistory";
import ProductDetails from "../pages/ProductDetails";
import Register from "../pages/register";
import WishlistPage from "../pages/WishlistPage";
import AuthRoutes, { PublicRoutes } from "./AuthRoutes";

function Navigation() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />        
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          }
        />
        <Route
          path="/cart"
          element={
            <AuthRoutes>
              <Cart />
            </AuthRoutes>
          }
        />
        <Route
          path="/wishlist"
          element={
            <AuthRoutes>
              <WishlistPage />
            </AuthRoutes>
          }
        />
        <Route
          path="/product/:id"
          element={
            <AuthRoutes>
              <ProductDetails />
            </AuthRoutes>
          }
        />
        <Route
          path="/order-history"
          element={
            <AuthRoutes>
              <OrderHistory />
            </AuthRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Navigation;
