"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@ascnd-gg/ui/components/ui/dialog";
import { useState, type ReactNode } from "react";
import { Button } from "@ascnd-gg/ui/components/ui/button";
import { deleteApi } from "@ascnd-gg/website/lib/fetch-utils";
import { useRouter } from "next/navigation";
import { TeamSummary } from "@ascnd-gg/types";

export function LeaveTeamDialog({
  children,
  team,
  userId,
}: {
  children: ReactNode;
  team: TeamSummary;
  userId: string;
}) {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const leaveTeam = async () => {
    const { error } = await deleteApi<void>(
      `/teams/${team.id}/members/${userId}`,
    );

    if (error) {
      console.error(error);
      return;
    }

    router.refresh();
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>
          Are you sure you would like to leave {team.displayName}?
        </DialogTitle>
        <div className="space-x-2">
          <Button onClick={leaveTeam} variant={"destructive"}>
            Yes
          </Button>
          <DialogClose asChild>
            <Button variant={"outline"}>No</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
