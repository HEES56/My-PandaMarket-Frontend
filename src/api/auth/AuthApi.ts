import { LoginParams, SignupParams, AuthResponse } from "@/types/types";
import { customFetch } from "../url";

export const loginAPI = async (data: LoginParams): Promise<AuthResponse> => {
  const res = await customFetch("/auth/login", {
    method: "POST",
    body: data as unknown as Record<string, unknown>,
  });
  return await res.json();
};

export const signupAPI = async (data: SignupParams): Promise<AuthResponse> => {
  const res = await customFetch("/auth/signup", {
    method: "POST",
    body: data as unknown as Record<string, unknown>,
  });
  return await res.json();
};

export const googleLoginAPI = async (code: string): Promise<AuthResponse> => {
  const res = await customFetch("/auth/google", {
    method: "POST",
    body: { code },
  });
  return await res.json();
};

export const logoutAPI = async (): Promise<void> => {
  await customFetch("/auth/logout", {
    method: "POST",
  });
};
