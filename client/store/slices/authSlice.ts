import { AUTH_TOKEN_KEY } from "@/lib/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: Record<string, unknown> | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{
        user?: Record<string, unknown>;
        token: string;
      }>,
    ) {
      state.isAuthenticated = true;
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_TOKEN_KEY, action.payload.token);
      }
    },
    setUser(state, action: PayloadAction<Record<string, unknown>>) {
      state.user = action.payload;
    },
    clearCredentials(state) {
      state.isAuthenticated = false;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem(AUTH_TOKEN_KEY);
      }
    },
    initializeAuth(state) {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        state.isAuthenticated = !!token;
      }
    },
  },
});

export const { setCredentials, setUser, clearCredentials, initializeAuth } =
  authSlice.actions;

export default authSlice.reducer;
