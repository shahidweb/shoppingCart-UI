import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";

import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import ProductsPage from "../pages/admin/ProductsPage";
import Cart from "../pages/Cart";
import WishlistPage from "../pages/WishlistPage";
import ProductDetails from "../pages/ProductDetails";
import OrderHistory from "../pages/OrderHistory";
import NotFound from "../pages/NotFound";
import { URLEndPoint } from "../shared/auth-modal";

function Navigation() {
  return (
    <Routes>
      <Route index path={URLEndPoint.home} element={<Home />} />
      <Route path={URLEndPoint.login} element={<Login />} />
      <Route path={URLEndPoint.register} element={<Register />} />

      <Route
        path={URLEndPoint.adminProduct}
        element={
          <ProtectedRoute role="admin">
            <ProductsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={URLEndPoint.cart}
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path={URLEndPoint.wishlist}
        element={
          <ProtectedRoute>
            <WishlistPage />
          </ProtectedRoute>
        }
      />

      <Route
        path={URLEndPoint.product + "/:id"}
        element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path={URLEndPoint.ordersHistory}
        element={
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Navigation;
