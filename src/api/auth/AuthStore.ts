"use client";
import { User } from "@/types/types";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { logoutAPI } from "./AuthApi";

export type SetUser = Omit<User, "password">;

export interface AuthState {
  user: SetUser | null;
  setAuth: (user: SetUser) => void;
  clearAuth: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      setAuth: (user) => set({ user }),
      clearAuth: async () => {
        try {
          await logoutAPI();
          set({ user: null });
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");

          document.cookie = "accessToken=; path=/; max-age=0";
        } catch (error) {
          console.error("로그아웃 API 호출 실패:", error);
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export const useHydrated = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
};
