-- CreateEnum
CREATE TYPE "public"."TeamInviteStatus" AS ENUM ('PENDING', 'DECLINED', 'CANCELLED', 'ACCEPTED');

-- CreateTable
CREATE TABLE "public"."team_invite" (
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "status" "public"."TeamInviteStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "team_invite_pkey" PRIMARY KEY ("teamId","userId")
);

-- AddForeignKey
ALTER TABLE "public"."team_invite" ADD CONSTRAINT "team_invite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."team_invite" ADD CONSTRAINT "team_invite_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
