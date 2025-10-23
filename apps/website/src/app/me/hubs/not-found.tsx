"use client";

import { Button } from "@ascnd-gg/ui/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@ascnd-gg/ui/components/ui/empty";
import { Share2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HubsNotFound() {
  const router = useRouter();

  return (
    <>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant={"icon"}>
            <Share2 />
          </EmptyMedia>
          <EmptyTitle>You are a member of no hubs</EmptyTitle>
          <EmptyDescription>
            Join or create a hub to view the hubs you&apos;re a member of.
          </EmptyDescription>
          <EmptyContent>
            <div className="flex gap-2">
              <Button onClick={() => router.back()}>Go Back</Button>
              <Button asChild>
                <Link href={"/create/hub"}>Create a hub</Link>
              </Button>
            </div>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    </>
  );
}
