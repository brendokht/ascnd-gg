"use client";

import {
  type CreateTeamInvite,
  type TeamInviteForTeamViewModel,
  type TeamSummary,
  type UpdateTeamInvite,
  type UserSearchViewModel,
} from "@ascnd-gg/types";
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
  PaginationNext,
  PaginationPrevious,
} from "@ascnd-gg/ui/components/ui/pagination";
import { fetchApi, postApi, putApi } from "@ascnd-gg/website/lib/fetch-utils";
import { ChevronsLeft, ChevronsRight, LoaderCircle } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useDebouncedCallback } from "use-debounce";

const MAX_USERS_PER_PAGE = 5;

export function TeamInvitationDialog({
  team,
  children,
}: {
  team: TeamSummary;
  children: ReactNode;
}) {
  // TODO: Use React Query for data fetching and optimistic updates for invites

  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<UserSearchViewModel> | undefined>(
    undefined,
  );
  const [currentUsers, setCurrentUsers] = useState<
    Array<UserSearchViewModel> | undefined
  >(undefined);
  const [visitedPages, setVisitedPages] = useState<Set<number>>(new Set([1]));
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [input, setInput] = useState<string>();

  const resetSearchState = () => {
    setInput(undefined);
    setLoading(false);
    setCurrentUsers(undefined);
    setUsers(undefined);
    setTotalUsers(0);
    setCurrentPage(1);
    setVisitedPages(new Set([1]));
    setTotalPages(0);
  };

  const updateInviteState = async (
    invitedUser: UserSearchViewModel,
    invited: boolean,
  ) => {
    // Optimistically update invite state for both user array states
    const updatedCurrentUsers = currentUsers?.map((user) => {
      if (invitedUser.username === user.username) {
        return {
          ...user,
          isInvited: invited,
        };
      } else {
        return user;
      }
    });
    setCurrentUsers(updatedCurrentUsers);

    const updatedUsers = users?.map((user) => {
      if (invitedUser.username === user.username) {
        return {
          ...user,
          isInvited: invited,
        };
      } else {
        return user;
      }
    });
    setUsers(updatedUsers);

    if (invited) {
      const createTeamInviteBody: CreateTeamInvite = {
        userId: invitedUser.id,
      };

      const { data: inviteData, error } =
        await postApi<TeamInviteForTeamViewModel>(
          `/teams/${team.id}/invites`,
          JSON.stringify(createTeamInviteBody),
          "application/json",
        );

      if (error || !inviteData) {
        // Revert optimistically updated invite state
        const updatedCurrentUsers = currentUsers?.map((user) => {
          if (invitedUser.username === user.username) {
            return {
              ...user,
              inviteId: undefined,
              isInvited: !invited,
            };
          } else {
            return user;
          }
        });
        setCurrentUsers(updatedCurrentUsers);

        const updatedUsers = users?.map((user) => {
          if (invitedUser.username === user.username) {
            return {
              ...user,
              isInvited: !invited,
            };
          } else {
            return user;
          }
        });
        setUsers(updatedUsers);
        console.error(error ?? "missing invite data.");
        return;
      }

      const updatedCurrentUsers = currentUsers?.map((user) => {
        if (invitedUser.username === user.username) {
          return {
            ...user,
            isInvited: true,
            inviteId: inviteData.id,
          };
        } else {
          return user;
        }
      });
      setCurrentUsers(updatedCurrentUsers);

      const updatedUsers = users?.map((user) => {
        if (invitedUser.username === user.username) {
          return {
            ...user,
            isInvited: true,
            inviteId: inviteData.id,
          };
        } else {
          return user;
        }
      });
      setUsers(updatedUsers);
    } else {
      const updateTeamInviteBody: UpdateTeamInvite = {
        userId: invitedUser.id,
        status: "CANCELLED",
      };
      const { error } = await putApi<never>(
        `/teams/${team.id}/invites/${invitedUser.inviteId}`,
        JSON.stringify(updateTeamInviteBody),
        "application/json",
      );

      if (error) {
        // Revert optimistically updated invite state
        const updatedCurrentUsers = currentUsers?.map((user) => {
          if (invitedUser.username === user.username) {
            return {
              ...user,
              isInvited: !invited,
            };
          } else {
            return user;
          }
        });
        setCurrentUsers(updatedCurrentUsers);

        const updatedUsers = users?.map((user) => {
          if (invitedUser.username === user.username) {
            return {
              ...user,
              isInvited: !invited,
            };
          } else {
            return user;
          }
        });
        setUsers(updatedUsers);
        console.error(error ?? "missing invite data.");
        return;
      }
    }
  };

  const changePage = async (page: number) => {
    if (page === 0 || page > totalPages) {
      return;
    }

    setCurrentPage(page);

    if (visitedPages.has(page)) {
      const newStart = (page - 1) * MAX_USERS_PER_PAGE;
      const newEnd = Math.min(newStart + MAX_USERS_PER_PAGE, totalUsers);
      setCurrentUsers(users?.slice(newStart, newEnd));
      return;
    }

    setVisitedPages(new Set([...visitedPages, page]));

    setLoading(true);

    const { data: newUsers, error } = await fetchApi<{
      users: Array<UserSearchViewModel> | null;
      totalCount: number;
    }>(
      `/users?username=${input}&page=${page}&limit=${MAX_USERS_PER_PAGE}&teamId=${team.id}`,
    );

    setLoading(false);

    if (error) {
      resetSearchState();
      console.error(error);
      return;
    }

    if (!newUsers || !newUsers.users) {
      console.error("Something went wrong");
      setUsers(undefined);
      setCurrentUsers(undefined);
      return;
    }

    setUsers([...(users ?? []), ...newUsers.users]);
    setCurrentUsers(newUsers.users);
  };

  const handleDebouncedSearch = useDebouncedCallback(async (input: string) => {
    if (!input) {
      resetSearchState();
      return;
    }

    setLoading(true);

    setInput(input);

    const { data: searchResult, error } = await fetchApi<{
      users: Array<UserSearchViewModel> | null;
      totalCount: number;
    }>(
      `/users?username=${input}&page=1&limit=${MAX_USERS_PER_PAGE}&teamId=${team.id}`,
    );

    setLoading(false);
    setCurrentPage(1);
    setVisitedPages(new Set([1]));

    if (error) {
      resetSearchState();
      console.error(error);
      return;
    }

    if (!searchResult || !searchResult.users || searchResult.totalCount === 0) {
      resetSearchState();
      return;
    }

    const tempTotalPages = Math.ceil(
      searchResult.totalCount / MAX_USERS_PER_PAGE,
    );

    setTotalUsers(searchResult.totalCount);
    setTotalPages(tempTotalPages);

    setCurrentUsers(searchResult.users);
    setUsers(searchResult.users);
  }, 250);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite to {team.displayName}</DialogTitle>
          <DialogDescription>
            Invite your friends to {team.displayName}.
          </DialogDescription>
        </DialogHeader>
        <div className="text-gray- space-y-4">
          <Label htmlFor="search">Search Users</Label>
          <div>
            <Input
              id="search"
              className="bg-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zZWFyY2gtaWNvbiBsdWNpZGUtc2VhcmNoIj48cGF0aCBkPSJtMjEgMjEtNC4zNC00LjM0Ii8+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjwvc3ZnPg==)] bg-[0.5em] bg-no-repeat px-9"
              onChange={(e) => handleDebouncedSearch(e.target.value)}
              defaultValue={input}
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="h-112.5 space-y-2">
          {currentUsers && !loading ? (
            currentUsers.map((user) => (
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
                    {!user.isInvited ? (
                      <Button
                        size={"sm"}
                        onClick={async () => {
                          await updateInviteState(user, true);
                        }}
                      >
                        Invite
                      </Button>
                    ) : (
                      <Button
                        size={"sm"}
                        variant={"destructive"}
                        onClick={async () => {
                          await updateInviteState(user, false);
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : loading ? (
            <div className="flex h-full animate-spin items-center justify-center">
              <LoaderCircle />
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <p>No users found.</p>
              <p className="text-muted-foreground text-sm">
                Try searching a username or try again.
              </p>
            </div>
          )}
        </div>
        {totalUsers ? (
          <div className="text-center">
            Page {currentPage} out of {totalPages}
          </div>
        ) : null}
        {totalPages > 0 ? (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  onClick={() => {
                    changePage(1);
                  }}
                >
                  <ChevronsLeft />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    changePage(currentPage - 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    changePage(currentPage + 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() => {
                    changePage(totalPages);
                  }}
                >
                  <ChevronsRight />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
