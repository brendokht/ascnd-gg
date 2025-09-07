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
  CreditCard,
  Gamepad,
  LogOut,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { Button } from "@ascnd-gg/ui/components/ui/button";
import { ThemeToggle, ThemeToggleSub } from "../theme/theme-toggle";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const { user, signOut } = useAuth();

  const router = useRouter();

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <Avatar>
              <AvatarImage src={user.profilePictureUrl} />
              <AvatarFallback>{`${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile <User />
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings <Cog />
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing <CreditCard />
              </DropdownMenuItem>
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
