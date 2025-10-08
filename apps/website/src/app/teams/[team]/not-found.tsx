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
import { usePathname, useRouter } from "next/navigation";

export default function TeamNotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const teamName = pathname.slice(pathname.lastIndexOf("/") + 1);

  return (
    <>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant={"icon"}>
            <ShieldHalf />
          </EmptyMedia>
          <EmptyTitle>Team Not Found</EmptyTitle>
          <EmptyDescription>
            Team &apos;{teamName}&apos; was not found. Try searching for a
            different name.
          </EmptyDescription>
          <EmptyContent>
            <div className="flex gap-2">
              <Button onClick={() => router.back()}>Go Back</Button>
              <Button asChild>
                <Link href={"/me/teams"}>View Your Teams</Link>
              </Button>
            </div>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    </>
  );
}
