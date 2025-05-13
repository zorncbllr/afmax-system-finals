import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  role?: "Admin" | "User";
  token: string | null;

  setAuthenticated: (auth: boolean) => void;
  setRole: (role: "Admin" | "User" | undefined) => void;
  setToken: (token: string | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  role: undefined,
  token: localStorage.getItem("token"),

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
