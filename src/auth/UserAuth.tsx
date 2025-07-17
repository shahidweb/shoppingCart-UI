import type { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { RootState } from "../redux/store";
import { URLEndPoint } from "../shared/auth-modal";
import { toast } from "react-toastify";

function AuthRoutes({ children }: { children: JSX.Element }) {
  const {isLoggedIn, isAdmin} = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  if (!isLoggedIn) {
    return (
      <Navigate to={URLEndPoint.login} replace state={{ from: location }} />
    );
  } else if (isAdmin) {
    toast.error("You are not authorized to access this page.");
    return (
      <Navigate to={URLEndPoint.home} replace state={{ from: location }} />
    );
  }
  return children;
}
export default AuthRoutes;
