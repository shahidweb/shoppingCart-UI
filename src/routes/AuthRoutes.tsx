import type { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { RootState } from "../redux/store";
import { URLEndPoint } from "../shared/auth-modal";

function AuthRoutes({ children }: { children: JSX.Element }) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const location = useLocation();
  if (!isLoggedIn) {
    return (
      <Navigate to={URLEndPoint.login} replace state={{ from: location }} />
    );
  }
  return children;
}
export default AuthRoutes;

export function PublicRoutes({ children }: { children: JSX.Element }) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return isLoggedIn ? <Navigate to={URLEndPoint.home} replace /> : children;
}
