import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { URLEndPoint } from "../shared/auth-modal";

function AdminRoute({ children }: { children: JSX.Element }) {
  const { isLoggedIn, isAdmin } = useSelector((state: RootState) => state.auth);

  if (!isLoggedIn || !isAdmin) {
    return <Navigate to={URLEndPoint.login} replace />;
  }
  return children;
}

export default AdminRoute;
