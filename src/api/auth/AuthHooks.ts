import { useMutation } from "@tanstack/react-query";
import { loginAPI, signupAPI, googleLoginAPI, logoutAPI } from "./AuthApi";
import { useAuthStore } from "@/api/auth/AuthStore";
import { useRouter } from "next/navigation";
import { AuthResponse, LoginParams, SignupParams } from "@/types/types";

export const useLogin = (onError?: () => void) => {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  return useMutation<AuthResponse, Error, LoginParams>({
    mutationFn: loginAPI,
    onSuccess: ({ accessToken, user }) => {
      localStorage.setItem("accessToken", accessToken);
      setAuth(user);

      if (window.history.length > 2) {
        router.back();
      } else {
        router.replace("/");
      }
    },
    onError: () => {
      onError?.();
    },
  });
};

export const useSignup = (onError?: () => void) => {
  const router = useRouter();

  return useMutation<AuthResponse, Error, SignupParams>({
    mutationFn: signupAPI,
    onSuccess: () => {
      router.replace("/login");
    },
    onError: () => {
      onError?.();
    },
  });
};

export const useGoogleToLogin = (onSuccess: (user: AuthResponse) => void) => {
  return useMutation<AuthResponse, Error, string>({
    mutationFn: googleLoginAPI,
    onSuccess,
  });
};

export const useLogout = (onSuccess?: () => void) => {
  const router = useRouter();

  return useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      onSuccess?.();
      router.replace("/login");
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
    },
  });
};
