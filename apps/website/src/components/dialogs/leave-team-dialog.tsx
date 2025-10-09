"use client";

import { useState, type ReactNode } from "react";
import { deleteApi } from "@ascnd-gg/website/lib/fetch-utils";
import { useRouter } from "next/navigation";
import { TeamSummary } from "@ascnd-gg/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ascnd-gg/ui/components/ui/alert-dialog";
import { toast } from "sonner";

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
    const loadingToast = toast.loading("Leaving team...");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { error } = await deleteApi<void>(
      `/teams/${team.id}/members/${userId}`,
    );

    toast.dismiss(loadingToast);

    if (error) {
      toast.error("Error Leaving Team...", { description: error.message });
      return;
    }

    toast.success("Success", {
      description: `You have successfully left ${team.displayName}.`,
    });

    router.refresh();
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you would like to leave {team.displayName}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You will have to be re-invited to the team if you would like to join
            back and compete with this team.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={leaveTeam}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
