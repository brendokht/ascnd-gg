"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ascnd-gg/ui/components/ui/dialog";
import EditTeamForm from "../forms/edit-team-form";
import { useState, type ReactNode } from "react";
import { ScrollArea } from "@ascnd-gg/ui/components/ui/scroll-area";
import { type TeamSummary } from "@ascnd-gg/types";

export function EditTeamDialog({
  children,
  defaultValues,
}: {
  children: ReactNode;
  defaultValues: TeamSummary;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const callback = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {defaultValues.displayName}</DialogTitle>
          <DialogDescription>
            Edit {defaultValues.displayName} to give it a new look
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[75vh]">
          <EditTeamForm defaultValues={defaultValues} callback={callback} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
