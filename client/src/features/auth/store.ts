import { create } from "zustand";
import { refreshToken } from "./api/services";
import { User } from "../users/types";

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  user?: User;

  setAuthenticated: (auth: boolean) => void;
  setToken: (token: string | null) => void;
  setUser: (user?: User) => void;
  initAuth: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  user: undefined,

  initAuth: async () => {
    if (localStorage.getItem("token")) {
      const { setAuthenticated, setToken, setUser } = get();

      try {
        const res = await refreshToken();

        console.log(res);

        setAuthenticated(res.accessToken ? true : false);
        setToken(res.accessToken);
        setUser(res.user);
      } catch (_) {
        setAuthenticated(false);
        setToken(null);
        setUser(undefined);
      }
    }
  },

  setUser: (user) => set(() => ({ user })),

  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

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
