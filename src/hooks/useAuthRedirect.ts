import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URLEndPoint } from "../shared/auth-modal";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export const useAuthRedirect = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(URLEndPoint.login);
    }
  }, []);
};
