"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth";
import { toast } from "sonner";

interface AuthContextType {
  requiresUsername: boolean;
  setRequiresUsername: Dispatch<SetStateAction<boolean>>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const [requiresUsername, setRequiresUsername] = useState<boolean>(false);

  useEffect(() => {
    async function checkUserActive() {
      const { data, error } = await authClient.getSession();

      if (error) {
        router.replace("/sign-in");
        console.error("Error Checking State", {
          description: error.message,
        });
        return;
      }

      if (!data) {
        router.replace("/sign-in");
        return;
      }

      if (!data.user.active) setRequiresUsername(true);
    }

    checkUserActive();
  }, [router]);

  async function signIn() {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/protected/dashboard",
    });

    if (error || !data) {
      toast.error("Error Signing In...", {
        description: error.message,
      });
      return;
    }

    if (data.redirect) window.location.href = data.url!;
  }

  async function signOut() {
    const { data, error } = await authClient.signOut();

    if (error || !data) {
      toast.error("Error Signing Out...", {
        description: error.message,
      });
      return;
    }

    if (data.success) {
      router.push("/sign-out");
    }

    router.refresh();
  }

  return (
    <AuthContext.Provider
      value={{
        requiresUsername,
        setRequiresUsername,
        signIn,
        signOut,
      }}
    >
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
