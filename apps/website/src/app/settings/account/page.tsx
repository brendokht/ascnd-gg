"use client";

import { Button } from "@ascnd-gg/ui/components/ui/button";
import { Input } from "@ascnd-gg/ui/components/ui/input";
import { useAuth } from "@ascnd-gg/website/context/auth-context";

export default function AccountSettings() {
  const { user } = useAuth();

  return (
    <>
      <h1 className="text-2xl font-semibold">Account Settings</h1>
      <div className="flex w-full flex-col gap-3 rounded-md border p-4">
        <div>
          <h2 className="text-lg font-semibold">Username</h2>
          <p className="text-muted-foreground text-sm">
            Your public username. It is not case sensitive
          </p>
        </div>
        {/* TODO: Add Username form here */}
        <div className="flex items-center justify-between gap-8">
          <Input defaultValue={user?.username ?? ""} />
          <Button>Edit</Button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 rounded-md border p-4">
        <div>
          <h2 className="text-lg font-semibold">Email</h2>

          <p className="text-muted-foreground text-sm">
            Your email connected to your account. This is not public
          </p>
        </div>
        {/* TODO: Add Email form here */}
        <div className="flex items-center justify-between gap-8">
          <Input defaultValue={user?.email ?? ""} />
          <Button>Edit</Button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 rounded-md border p-4">
        <div>
          <h2 className="text-lg font-semibold">First Name</h2>
          <p className="text-muted-foreground text-sm">
            Your first name. This is not public
          </p>
        </div>
        {/* TODO: Add first name form here */}
        <div className="flex items-center justify-between gap-8">
          <Input defaultValue={user?.firstName ?? ""} />
          <Button>Edit</Button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 rounded-md border p-4">
        <div>
          <h2 className="text-lg font-semibold">Last Name</h2>
          <p className="text-muted-foreground text-sm">
            Your last name. This is not public
          </p>
        </div>
        {/* TODO: Add last name form here */}
        <div className="flex items-center justify-between gap-8">
          <Input defaultValue={user?.lastName ?? ""} />
          <Button>Edit</Button>
        </div>
      </div>
    </>
  );
}
