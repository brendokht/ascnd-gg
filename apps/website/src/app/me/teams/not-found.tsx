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
import { ShieldHalf } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TeamsNotFound() {
  const router = useRouter();

  return (
    <>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant={"icon"}>
            <ShieldHalf />
          </EmptyMedia>
          <EmptyTitle>You are a member of no teams</EmptyTitle>
          <EmptyDescription>
            Join or create a team to view the teams you&apos;re a member of.
          </EmptyDescription>
          <EmptyContent>
            <div className="flex gap-2">
              <Button onClick={() => router.back()}>Go Back</Button>
              <Button asChild>
                <Link href={"/create/team"}>Create a team</Link>
              </Button>
            </div>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    </>
  );
}
