"use client";

import { Button } from "@ascnd-gg/ui/components/ui/button";
import { useAuth } from "@ascnd-gg/website/context/auth-context";
import { SiGoogle } from "@icons-pack/react-simple-icons";

export default function Page() {
  const { signIn } = useAuth();
  return (
    <>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Welcome to Ascnd GG</h1>
        <p>To continue using Asncd GG, please sign in below</p>
      </div>
      <div className="flex justify-center">
        <Button className="w-fit" variant={"outline"} onClick={signIn}>
          <SiGoogle color={"default"} />
          Continue with Google
        </Button>
      </div>
    </>
  );
}
