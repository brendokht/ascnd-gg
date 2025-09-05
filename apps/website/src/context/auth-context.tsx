"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@ascnd-gg/types";
import z from "zod";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth";

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
    const { data, error } = await authClient.getSession();

    if (error) {
      setUser(null);
      console.error("refresh user state error: ", error);
      return;
    }

    if (!data) {
      setUser(null);
      return;
    }

    setUser({
      email: data.user.email!,
      username: data.user.username ?? undefined,
      createdAt: data.user.createdAt.toISOString(),
      firstName: data.user.name.split(" ")[0],
      lastName: data.user.name.split(" ")[1],
      profilePictureUrl: data.user.image ?? undefined,
    });
  }

  async function login() {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/protected/dashboard",
    });

    if (error || !data) {
      console.error("sign in error: ", error);
      return;
    }

    if (data.redirect) window.location.href = data.url!;
  }

  async function logout() {
    const { data, error } = await authClient.signOut();

    if (error || !data) {
      console.error("sign out error: ", error);
      return;
    }

    if (data.success) {
      setUser(null);

      router.push("/logout");
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
