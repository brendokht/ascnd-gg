"use client";

import { useState, type ReactNode } from "react";
import { deleteApi } from "@ascnd-gg/website/lib/fetch-utils";
import { useRouter } from "next/navigation";
import { HubSummary } from "@ascnd-gg/types";
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

export function LeaveHubDialog({
  children,
  hub,
  userId,
}: {
  children: ReactNode;
  hub: HubSummary;
  userId: string;
}) {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const leaveHub = async () => {
    const loadingToast = toast.loading("Leaving hub...");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { error } = await deleteApi<void>(
      `/hubs/${hub.id}/members/${userId}`,
    );

    toast.dismiss(loadingToast);

    if (error) {
      toast.error("Error Leaving Hub...", { description: error.message });
      return;
    }

    toast.success("Success", {
      description: `You have successfully left ${hub.displayName}.`,
    });

    router.refresh();
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you would like to leave {hub.displayName}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You will have to be re-invited to the hub if you would like to join
            back and compete with this hub.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={leaveHub}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
