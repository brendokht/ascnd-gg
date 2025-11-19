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
import { Gamepad } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function EventNotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const EventName = decodeURIComponent(
    pathname.slice(pathname.lastIndexOf("/") + 1),
  );

  return (
    <>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant={"icon"}>
            <Gamepad />
          </EmptyMedia>
          <EmptyTitle>Event Not Found</EmptyTitle>
          <EmptyDescription>
            Event &apos;{EventName}&apos; was not found. Try searching for a
            different name.
          </EmptyDescription>
          <EmptyContent>
            <div className="flex gap-2">
              <Button onClick={() => router.back()}>Go Back</Button>
              <Button asChild>
                {/* TODO:L Add /me/events page */}
                <Link href={"/me/hubs"}>View Your Events</Link>
              </Button>
            </div>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    </>
  );
}
