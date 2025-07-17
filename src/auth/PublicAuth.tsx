import type { JSX } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";
import { URLEndPoint } from "../shared/auth-modal";

export function PublicRoutes({ children }: { children: JSX.Element }) {
  const { isLoggedIn, isAdmin } = useSelector((state: RootState) => state.auth);
  if (isLoggedIn) {
    if (isAdmin) {
      return <Navigate to={URLEndPoint.adminProduct} replace />;
    }
    return <Navigate to={URLEndPoint.home} replace />;
  }
  return children;
}

export default PublicRoutes;
