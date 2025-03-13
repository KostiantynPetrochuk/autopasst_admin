import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

import { useSession } from "next-auth/react";
import { BACKEND_URL } from "@/lib/Constants";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useFetchWithAuth = () => {
  const { data: session, update } = useSession();
  const fetchWithAuth = async (
    url: string,
    options: RequestInit
  ): Promise<{ data: any; error: any }> => {
    let currentToken = session?.tokens.accessToken;
    const nowTimestamp = new Date().getTime();
    const expiresTimestamp = session?.tokens?.expiresIn;
    const isTokenValid = expiresTimestamp
      ? nowTimestamp < expiresTimestamp
      : true;
    if (!isTokenValid) {
      const updatedSession = await update();
      currentToken = updatedSession?.tokens.accessToken;
    }
    try {
      const response = await fetch(`${BACKEND_URL}${url}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${currentToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return { data, error: null };
      }
      if (!response.ok && response.status === 401) {
        const newSession = await update();
        const newAccessToken = newSession?.tokens.accessToken;
        const response = await fetch(`${BACKEND_URL}${url}`, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          return { data, error: null };
        }
        return { data: null, error: response.statusText };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { data: null, error: error.message };
      }
    }
    return { data: null, error: "Unknown error" };
  };
  return { fetchWithAuth };
};
