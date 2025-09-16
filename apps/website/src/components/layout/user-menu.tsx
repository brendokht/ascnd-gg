"use client";

import { useAuth } from "@ascnd-gg/website/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@ascnd-gg/ui/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@ascnd-gg/ui/components/ui/avatar";
import {
  Cog,
  Gamepad,
  LogOut,
  Trophy,
  User as UserIcon,
  Users,
} from "lucide-react";
import { Button } from "@ascnd-gg/ui/components/ui/button";
import { ThemeToggle, ThemeToggleSub } from "../theme/theme-toggle";
import { useRouter } from "next/navigation";
import Link from "next/link";
import z from "zod";
import { User } from "@ascnd-gg/types";

export default function UserMenu({
  user,
}: {
  user: z.infer<typeof User> | undefined | null;
}) {
  const { signOut } = useAuth();

  const router = useRouter();

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <Avatar>
              <AvatarImage src={user.profilePictureUrl} />
              <AvatarFallback>{`${user.username?.charAt(0).toUpperCase()}`}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile <UserIcon />
              </DropdownMenuItem>
              <Link href={"/settings"}>
                <DropdownMenuItem>
                  Settings <Cog />
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Social</DropdownMenuLabel>
              <DropdownMenuItem>
                Friends <Users />
              </DropdownMenuItem>
              <DropdownMenuItem>
                Games <Gamepad />
              </DropdownMenuItem>
              <DropdownMenuItem>
                Events <Trophy />
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <ThemeToggleSub />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              Sign Out <LogOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <ThemeToggle />
          <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
        </>
      )}
    </>
  );
}
