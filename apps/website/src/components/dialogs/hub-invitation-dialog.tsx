"use client";

import {
  type CreateHubInvite,
  type HubInviteForHubViewModel,
  type HubSummary,
  type UpdateHubInvite,
  type InviteUserSearchViewModel,
} from "@ascnd-gg/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ascnd-gg/ui/components/ui/avatar";
import { Button } from "@ascnd-gg/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ascnd-gg/ui/components/ui/dialog";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@ascnd-gg/ui/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@ascnd-gg/ui/components/ui/input-group";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@ascnd-gg/ui/components/ui/item";
import { Label } from "@ascnd-gg/ui/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@ascnd-gg/ui/components/ui/pagination";
import { Spinner } from "@ascnd-gg/ui/components/ui/spinner";
import { useIsMobile } from "@ascnd-gg/ui/hooks/use-mobile";
import { cn } from "@ascnd-gg/ui/lib/utils";
import { fetchApi, postApi, patchApi } from "@ascnd-gg/website/lib/fetch-utils";
import {
  ChevronsLeft,
  ChevronsRight,
  MailPlus,
  SearchIcon,
  User,
  X,
} from "lucide-react";
import { Fragment, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

const MAX_USERS_PER_PAGE = 5;

export function HubInvitationDialog({
  hub,
  children,
}: {
  hub: HubSummary;
  children: ReactNode;
}) {
  const isMobile = useIsMobile();

  // Add user index temporarily to ensure users are displayed in the order they are fetched.
  // Note the `.sort()` and `.map()` added to `setUsers`/`setCurrentUsers` calls
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<
    Array<InviteUserSearchViewModel & { index: number }> | undefined
  >(undefined);
  const [currentUsers, setCurrentUsers] = useState<
    Array<InviteUserSearchViewModel & { index: number }> | undefined
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
    invitedUser: InviteUserSearchViewModel,
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
      const createHubInviteBody: CreateHubInvite = {
        userId: invitedUser.id,
      };

      const { data: inviteData, error } =
        await postApi<HubInviteForHubViewModel>(
          `/hubs/${hub.id}/invites`,
          JSON.stringify(createHubInviteBody),
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
        toast.error("Error Sending Invite...", {
          description: error ? error.message : "Something went wrong.",
        });
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

      toast.success("Success", {
        description: "Invite successfully sent.",
      });
    } else {
      const updateHubInviteBody: UpdateHubInvite = {
        userId: invitedUser.id,
        status: "CANCELLED",
      };
      const { error } = await patchApi<never>(
        `/hubs/${hub.id}/invites/${invitedUser.inviteId}`,
        JSON.stringify(updateHubInviteBody),
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
        toast.error("Error Cancelling Invite...", {
          description: error.message,
        });
        return;
      }

      toast.success("Success", {
        description: "Invite successfully cancelled.",
      });
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
      users: Array<InviteUserSearchViewModel> | null;
      totalCount: number;
    }>(
      `/hubs/${hub.id}/invites/search?username=${input}&page=${page}&limit=${MAX_USERS_PER_PAGE}`,
    );

    setLoading(false);

    if (error) {
      resetSearchState();
      toast.error("Error Fetching Users...", {
        description: error.message,
      });
      return;
    }

    if (!newUsers || !newUsers.users) {
      toast.error("Error Fetching Users...", {
        description: "No data recieved.",
      });
      setUsers(undefined);
      setCurrentUsers(undefined);
      return;
    }

    setUsers(
      [
        ...(users ?? []),
        ...newUsers.users.map((user, idx) => {
          return {
            ...user,
            index: idx + (page - 1) * MAX_USERS_PER_PAGE,
          };
        }),
      ].sort((u1, u2) => {
        if (u1.index > u2.index) return 1;
        else return -1;
      }),
    );
    setCurrentUsers(
      newUsers.users
        .map((user, idx) => {
          return {
            ...user,
            index: idx,
          };
        })
        .sort((u1, u2) => {
          if (u1.index > u2.index) return 1;
          else return -1;
        }),
    );
  };

  const handleDebouncedSearch = useDebouncedCallback(async (input: string) => {
    if (!input) {
      resetSearchState();
      return;
    }

    setLoading(true);

    setInput(input);

    const { data: searchResult, error } = await fetchApi<{
      users: Array<InviteUserSearchViewModel> | null;
      totalCount: number;
    }>(
      `/hubs/${hub.id}/invites/search?username=${input}&page=${1}&limit=${MAX_USERS_PER_PAGE}`,
    );

    setLoading(false);
    setCurrentPage(1);
    setVisitedPages(new Set([1]));

    if (error) {
      resetSearchState();
      toast.error("Error Fetching Users...", {
        description: error.message,
      });
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

    setCurrentUsers(
      searchResult.users
        .map((user, idx) => {
          return {
            ...user,
            index: idx,
          };
        })
        .sort((u1, u2) => {
          if (u1.index > u2.index) return 1;
          else return -1;
        }),
    );
    setUsers(
      searchResult.users
        .map((user, idx) => {
          return {
            ...user,
            index: idx,
          };
        })
        .sort((u1, u2) => {
          if (u1.index > u2.index) return 1;
          else return -1;
        }),
    );
  }, 250);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite to {hub.displayName}</DialogTitle>
          <DialogDescription>
            Invite your friends to {hub.displayName}.
          </DialogDescription>
        </DialogHeader>
        <div className="text-gray- space-y-4">
          <Label htmlFor="search">Search Users</Label>
          <div>
            <InputGroup>
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search..."
                onChange={(e) => handleDebouncedSearch(e.target.value)}
                defaultValue={input}
              />
              {loading && (
                <InputGroupAddon align={"inline-end"}>
                  <Spinner />
                </InputGroupAddon>
              )}
            </InputGroup>
          </div>
        </div>
        <div className={cn("space-y-2", isMobile ? "h-96" : "h-90.5")}>
          {currentUsers && !loading
            ? currentUsers.map((user) => (
                <Fragment key={user.username}>
                  <Item variant={"muted"}>
                    <ItemMedia>
                      <Avatar className="size-8">
                        <AvatarImage
                          src={user.avatar ?? ""}
                          alt={`${user.displayUsername!}'s logo`}
                          className="object-fill"
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                          {user.displayUsername!.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{user.displayUsername}</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      {!user.isInvited ? (
                        <Button
                          size={isMobile ? "icon" : "sm"}
                          onClick={async () => {
                            await updateInviteState(user, true);
                          }}
                        >
                          <MailPlus />
                          {isMobile ? null : "Invite"}
                        </Button>
                      ) : (
                        <Button
                          size={isMobile ? "icon" : "sm"}
                          variant={"destructive"}
                          onClick={async () => {
                            await updateInviteState(user, false);
                          }}
                        >
                          <X />
                          {isMobile ? null : "Cancel"}
                        </Button>
                      )}
                    </ItemActions>
                  </Item>
                </Fragment>
              ))
            : !loading && (
                <div className="flex h-[calc(100%-1rem)] flex-col items-center justify-center">
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant={"icon"}>
                        <User />
                      </EmptyMedia>
                      <EmptyTitle>No users found</EmptyTitle>
                      <EmptyDescription>
                        Try searching a username or try again.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
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
                  size={"default"}
                  onClick={() => {
                    changePage(1);
                  }}
                >
                  <ChevronsLeft />
                  {isMobile ? null : "First"}
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
                  size={"default"}
                  onClick={() => {
                    changePage(totalPages);
                  }}
                >
                  {isMobile ? null : "Last"}
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
