"use client";

import { Button } from "@ascnd-gg/ui/components/ui/button";
import { useAuth } from "@ascnd-gg/website/context/auth-context";

export default function Page() {
  const { signIn } = useAuth();
  return (
    <>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Welcome to Ascnd GG</h1>
        <p>To be able to compete, please sign in below</p>
      </div>
      <Button onClick={signIn}>Continue with Google</Button>
    </>
  );
}
