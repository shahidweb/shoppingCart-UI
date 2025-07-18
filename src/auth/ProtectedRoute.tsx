import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { URLEndPoint } from "../shared/auth-modal";

const ProtectedRoute = ({
  children,
  role = "user",
}: {
  children: React.ReactNode;
  role?: "user" | "admin";
}) => {
  const auth = useSelector((state: RootState) => state.auth);

  if (!auth.isLoggedIn) {
    return <Navigate to={URLEndPoint.login} />;
  }

  // role-based restriction
  if (role === "admin" && auth.user?.role !== "admin") {
    return <Navigate to={URLEndPoint.home} />;
  }

  if (role === "user" && auth.user?.role === "admin") {
    return <Navigate to={URLEndPoint.home} />;
  }

  return children;
};

export default ProtectedRoute;
