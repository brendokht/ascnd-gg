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
  PlusCircle,
  Trophy,
  User as UserIcon,
  Users,
} from "lucide-react";
import { Button } from "@ascnd-gg/ui/components/ui/button";
import { ThemeToggle, ThemeToggleSub } from "../theme/theme-toggle";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserType } from "@ascnd-gg/types";

export default function UserMenu({
  user,
}: {
  user: UserType | undefined | null;
}) {
  const { signOut } = useAuth();

  const router = useRouter();

  return (
    <>
      {user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <PlusCircle size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Create</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => router.push("/create/team")}>
                Team <Users />
              </DropdownMenuItem>
              <DropdownMenuItem>
                Event <Gamepad />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
              <Avatar>
                <AvatarImage src={user.profilePictureUrl} />
                <AvatarFallback>{`${user.username?.charAt(0).toUpperCase()}`}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <Link href={`/user/${user.username}`}>
                  <DropdownMenuItem>
                    Profile <UserIcon />
                  </DropdownMenuItem>
                </Link>
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
        </>
      ) : (
        <>
          <ThemeToggle />
          <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
        </>
      )}
    </>
  );
}
