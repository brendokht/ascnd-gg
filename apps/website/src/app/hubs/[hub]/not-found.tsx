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

export default function HubNotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const hubName = pathname.slice(pathname.lastIndexOf("/") + 1);

  return (
    <>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant={"icon"}>
            <ShieldHalf />
          </EmptyMedia>
          <EmptyTitle>Hub Not Found</EmptyTitle>
          <EmptyDescription>
            Hub &apos;{hubName}&apos; was not found. Try searching for a
            different name.
          </EmptyDescription>
          <EmptyContent>
            <div className="flex gap-2">
              <Button onClick={() => router.back()}>Go Back</Button>
              <Button asChild>
                <Link href={"/me/hubs"}>View Your Hubs</Link>
              </Button>
            </div>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    </>
  );
}
