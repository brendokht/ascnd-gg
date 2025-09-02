"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ApiResponse, User } from "@ascnd-gg/types";
import z from "zod";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: z.infer<typeof User> | undefined | null;
  setUser: Dispatch<SetStateAction<z.infer<typeof User> | undefined | null>>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const [user, setUser] = useState<z.infer<typeof User> | undefined | null>(
    undefined,
  );

  useEffect(() => {
    refreshUserState();
  }, []);

  async function refreshUserState() {
    console.log("AuthContextProvider.refreshUserState: Starting");

    try {
      const response = await fetch("http://localhost:8080/v1/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const { data }: z.infer<typeof ApiResponse> = await response.json();

        console.log("AuthContextProvider.refreshUserState data", data);

        setUser({
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          profilePictureUrl: data.user.profilePictureUrl,
          createdAt: data.user.createdAt,
          metadata: data.user.metadata,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(
        "AuthContextProvider.refreshUserState: Failed to refresh user:",
        error,
      );
      setUser(null);
    }
  }

  async function login() {
    try {
      const res = await fetch("http://localhost:8080/v1/auth/login", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        console.error(`Error ${res.status} : ${res.statusText}`);
      }

      const json: z.infer<typeof ApiResponse> = await res.json();

      const result = ApiResponse.safeParse(json);

      if (result.error?.issues) {
        console.error(result.error.message);
        return;
      }

      if (json.redirected) {
        router.push(json.redirect!);
      }
    } catch (error) {
      console.error("AuthContext.login Error: ", error);
    }
  }

  async function logout() {
    const res = await fetch("http://localhost:8080/v1/auth/logout", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      console.error(`Error ${res.status} : ${res.statusText}`);
      return;
    }

    const json: z.infer<typeof ApiResponse> = await res.json();

    const result = ApiResponse.safeParse(json);

    if (result.error?.issues) {
      console.error(result.error.message);
      return;
    }

    if (json.redirected) {
      router.push(json.redirect!);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
}
