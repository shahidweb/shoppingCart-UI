import { Route, Routes } from "react-router-dom";
import AdminRoute from "../auth/AdminAuth";
import PublicRoutes from "../auth/PublicAuth";
import AuthRoutes from "../auth/UserAuth";
import ProductsPage from "../pages/admin/ProductsPage";
import Cart from "../pages/Cart";
import Home from "../pages/home";
import Login from "../pages/login";
import NotFound from "../pages/NotFound";
import OrderHistory from "../pages/OrderHistory";
import ProductDetails from "../pages/ProductDetails";
import Register from "../pages/register";
import WishlistPage from "../pages/WishlistPage";
import { URLEndPoint } from "../shared/auth-modal";

function Navigation() {
  return (
    <>
      <Routes>
        <Route index path={URLEndPoint.home} element={<Home />} />
        <Route
          path={URLEndPoint.login}
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path={URLEndPoint.register}
          element={
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          }
        />
        <Route
          path={URLEndPoint.adminProduct}
          element={
            <AdminRoute>
              <ProductsPage />
            </AdminRoute>
          }
        />

        <Route
          path={URLEndPoint.cart}
          element={
            <AuthRoutes>
              <Cart />
            </AuthRoutes>
          }
        />
        <Route
          path={URLEndPoint.wishlist}
          element={
            <AuthRoutes>
              <WishlistPage />
            </AuthRoutes>
          }
        />
        <Route
          path={URLEndPoint.product + "/:id"}
          element={
            <AuthRoutes>
              <ProductDetails />
            </AuthRoutes>
          }
        />
        <Route
          path={URLEndPoint.ordersHistory}
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
