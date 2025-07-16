import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { URLEndPoint } from "../shared/auth-modal";

export const useAuthRedirect = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(URLEndPoint.login);
    } else
      navigate(
        location.pathname === URLEndPoint.login
          ? URLEndPoint.home
          : location.pathname
      );
  }, [isLoggedIn]);
};
