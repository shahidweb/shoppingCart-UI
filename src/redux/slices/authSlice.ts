import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AuthKeys } from "../../shared/auth-modal";

interface User {
  id: number;
  username: string;
  email: string;
}
const AdminRole = {
  admin: "admin",
};

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn?: boolean;
  isAdmin?: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isAdmin: false,
};

const token = localStorage.getItem(AuthKeys.token) || "";
if (token) {
  const { exp, iat, ...user } = JSON.parse(atob(token.split(".")[1]));
  initialState.user = user;
  initialState.token = token;
  initialState.isLoggedIn = true;
  initialState.isAdmin = user.role === AdminRole.admin;
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      const token = action.payload.token;
      const { exp, iat, ...user } = JSON.parse(atob(token.split(".")[1]));
      state.token = token;
      state.user = user;
      state.isLoggedIn = token ? true : false;
      state.isAdmin = user.role === AdminRole.admin;
      localStorage.setItem(AuthKeys.token, token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
