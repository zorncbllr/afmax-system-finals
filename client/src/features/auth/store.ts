import { create } from "zustand";
import { refreshToken } from "./api/services";

type AuthState = {
  isAuthenticated: boolean;
  role?: "Admin" | "User";
  token: string | null;

  setAuthenticated: (auth: boolean) => void;
  setRole: (role: "Admin" | "User" | undefined) => void;
  setToken: (token: string | null) => void;
  initAuth: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  role: undefined,
  token: localStorage.getItem("token"),

  initAuth: async () => {
    if (localStorage.getItem("token")) {
      const { setAuthenticated, setToken, setRole } = get();

      try {
        const res = await refreshToken();

        console.log(res);

        setAuthenticated(res.accessToken ? true : false);
        setToken(res.accessToken);
        setRole(res.role);
      } catch (_) {
        setAuthenticated(false);
        setToken(null);
        setRole(undefined);
      }
    }
  },

  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  setRole: (role) => set({ role }),

  setToken: (token) =>
    set(() => {
      if (!token) {
        localStorage.removeItem("token");
      } else {
        localStorage.setItem("token", token);
      }

      return { token };
    }),
}));
