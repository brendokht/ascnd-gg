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
import { User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function UserNotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const username = pathname.slice(pathname.lastIndexOf("/") + 1);

  return (
    <>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant={"icon"}>
            <User />
          </EmptyMedia>
          <EmptyTitle>User Not Found</EmptyTitle>
          <EmptyDescription>
            User &apos;{username}&apos; was not found. Try searching for a
            different username.
          </EmptyDescription>
          <EmptyContent>
            <div className="flex gap-2">
              <Button onClick={() => router.back()}>Go Back</Button>
              <Button>View Your Friends</Button>
            </div>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    </>
  );
}
