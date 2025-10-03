"use client";

import { UserViewModel } from "@ascnd-gg/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ascnd-gg/ui/components/ui/avatar";
import { Button } from "@ascnd-gg/ui/components/ui/button";
import { Card, CardContent } from "@ascnd-gg/ui/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ascnd-gg/ui/components/ui/dialog";
import { Input } from "@ascnd-gg/ui/components/ui/input";
import { Label } from "@ascnd-gg/ui/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@ascnd-gg/ui/components/ui/pagination";
import { useState, type ReactNode } from "react";
import { useDebouncedCallback } from "use-debounce";

const MAX_USERS_PER_PAGE = 5;

export function TeamInvitationDialog({
  teamName,
  children,
}: {
  teamName: string;
  children: ReactNode;
}) {
  // Mock data - replace with actual API call
  const mockUsers: Array<
    Omit<UserViewModel, "teams" | "createdAt" | "emailVerified">
  > = [
    {
      username: "sarahchen",
      displayUsername: "SarahChen",
    },
    {
      username: "marcusjohnson",
      displayUsername: "marcusjohnson",
    },
    {
      username: "cooldude",
      displayUsername: "CoolDude",
    },
    {
      username: "brendo",
      displayUsername: "Brendo",
    },
    {
      username: "purzaa",
      displayUsername: "purzaa",
    },
    {
      username: "theo",
      displayUsername: "Theo",
    },
    {
      username: "xxskaterguyxx",
      displayUsername: "XxSkaterGuyxX",
    },
    {
      username: "bestr6player",
      displayUsername: "BestR6Player",
    },
    {
      username: "simpleton",
      displayUsername: "Simpleton",
    },
    {
      username: "xyz",
      displayUsername: "xyz",
    },
    {
      username: "hypr",
      displayUsername: "Hypr",
    },
    {
      username: "drpepper",
      displayUsername: "DrPepper",
    },
    {
      username: "ninja",
      displayUsername: "Ninja",
    },
    {
      username: "shroud",
      displayUsername: "Shroud",
    },
    {
      username: "pokimane",
      displayUsername: "Pokimane",
    },
    {
      username: "valkyrae",
      displayUsername: "Valkyrae",
    },
    {
      username: "tfue",
      displayUsername: "Tfue",
    },
    {
      username: "summit1g",
      displayUsername: "Summit1g",
    },
    {
      username: "timthetatman",
      displayUsername: "TimTheTatman",
    },
    {
      username: "nickmercs",
      displayUsername: "NICKMERCS",
    },
    {
      username: "drlupo",
      displayUsername: "DrLupo",
    },
    {
      username: "courage",
      displayUsername: "CouRage",
    },
    {
      username: "sykkuno",
      displayUsername: "Sykkuno",
    },
    {
      username: "ludwig",
      displayUsername: "Ludwig",
    },
    {
      username: "moistcr1tikal",
      displayUsername: "MoistCr1tikal",
    },
    {
      username: "xqc",
      displayUsername: "xQc",
    },
    {
      username: "asmongold",
      displayUsername: "Asmongold",
    },
    {
      username: "sodapoppin",
      displayUsername: "Sodapoppin",
    },
    {
      username: "lirik",
      displayUsername: "LIRIK",
    },
    {
      username: "forsen",
      displayUsername: "forsen",
    },
  ];

  // TODO: Use React Query for data fetching and optimistic updates for invites

  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<
    | Array<Omit<UserViewModel, "teams" | "createdAt" | "emailVerified">>
    | undefined
  >(undefined);
  const [totalUsers, setTotalUsers] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [input, setInput] = useState<string>();

  const changePage = (page: number) => {
    console.log("page", page);

    const newStart = (page - 1) * MAX_USERS_PER_PAGE;
    const newEnd = newStart + MAX_USERS_PER_PAGE;

    console.log("newStart", newStart);
    console.log("newEnd", newEnd);

    console.log("thing 1", (page - 1) * MAX_USERS_PER_PAGE);
    console.log(
      "thing 2",
      newEnd <= (mockUsers?.length ?? 0) ? newEnd : undefined,
    );

    const newUsers = mockUsers
      .filter((user) => {
        return user.username?.includes(input?.toLowerCase() ?? "");
      })
      .slice(
        (page - 1) * MAX_USERS_PER_PAGE,
        newEnd <= mockUsers.length ? newEnd : undefined,
      );

    console.log("newUsers", newUsers);

    setUsers(newUsers);
    setCurrentPage(page);
  };

  const handleDebouncedSearch = useDebouncedCallback((input: string) => {
    if (!input) {
      setInput(undefined);
      setLoading(false);
      setUsers(undefined);
      setTotalUsers(0);
      setCurrentPage(1);
      setTotalPages(0);
      return;
    }

    setLoading(true);

    setInput(input);

    const searchResult = mockUsers.filter((user) => {
      return user.username?.includes(input.toLowerCase());
    });

    console.log(searchResult);

    setTotalUsers(searchResult.length);
    setTotalPages(Math.ceil(searchResult.length / MAX_USERS_PER_PAGE));
    const startIndex = (currentPage - 1) * MAX_USERS_PER_PAGE;
    setUsers(searchResult.slice(startIndex, startIndex + MAX_USERS_PER_PAGE));

    setLoading(false);
  }, 250);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite to {teamName}</DialogTitle>
          <DialogDescription>
            Invite your friends to {teamName}.
          </DialogDescription>
        </DialogHeader>
        <div className="text-gray- space-y-4">
          <Label htmlFor="search">Search Users</Label>
          <div>
            <Input
              id="search"
              className="bg-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zZWFyY2gtaWNvbiBsdWNpZGUtc2VhcmNoIj48cGF0aCBkPSJtMjEgMjEtNC4zNC00LjM0Ii8+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjwvc3ZnPg==)] bg-[0.5em] bg-no-repeat px-9"
              onChange={(e) => handleDebouncedSearch(e.target.value)}
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="space-y-2">
          {users ? (
            users.map((user) => (
              <Card key={user.username}>
                <CardContent className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8">
                      <AvatarImage
                        src={user.profilePictureUrl ?? ""}
                        alt={`${user.displayUsername!}'s logo`}
                        className="object-fill"
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {user.displayUsername!.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {user.displayUsername}
                  </div>
                  <div className="space-x-2">
                    <Button
                      size={"sm"}
                      onClick={() =>
                        console.log("Invited user '%s'", user.username)
                      }
                    >
                      Invite
                    </Button>
                    <Button
                      size={"sm"}
                      variant={"destructive"}
                      onClick={() =>
                        console.log(
                          "Cancelled invite for user '%s'",
                          user.username,
                        )
                      }
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : loading ? (
            <>Loading...</>
          ) : (
            <div className="text-center">No users found</div>
          )}
        </div>
        {totalUsers ? (
          <div className="text-center">
            Showing {(currentPage - 1) * MAX_USERS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * MAX_USERS_PER_PAGE, totalUsers ?? 0)} of{" "}
            {totalUsers} users
          </div>
        ) : null}
        <Pagination>
          <PaginationContent>
            {totalUsers
              ? [...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => changePage(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))
              : null}
          </PaginationContent>
        </Pagination>
      </DialogContent>
    </Dialog>
  );
}
