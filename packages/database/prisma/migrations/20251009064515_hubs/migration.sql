/*
  Warnings:

  - Changed the type of `status` on the `team_invite` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'DECLINED', 'CANCELLED', 'ACCEPTED');

-- AlterTable
ALTER TABLE "team_invite" DROP COLUMN "status",
ADD COLUMN     "status" "InviteStatus" NOT NULL;

-- DropEnum
DROP TYPE "public"."TeamInviteStatus";

-- CreateTable
CREATE TABLE "hub" (
    "id" TEXT NOT NULL,
    "hubOwnerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "logo" TEXT,
    "banner" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_hub" (
    "hubId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_hub_pkey" PRIMARY KEY ("hubId","userId")
);

-- CreateTable
CREATE TABLE "hub_invite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hubId" TEXT NOT NULL,
    "status" "InviteStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hub_invite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hub_name_key" ON "hub"("name");

-- AddForeignKey
ALTER TABLE "hub" ADD CONSTRAINT "hub_hubOwnerId_fkey" FOREIGN KEY ("hubOwnerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_hub" ADD CONSTRAINT "user_hub_hubId_fkey" FOREIGN KEY ("hubId") REFERENCES "hub"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_hub" ADD CONSTRAINT "user_hub_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub_invite" ADD CONSTRAINT "hub_invite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub_invite" ADD CONSTRAINT "hub_invite_hubId_fkey" FOREIGN KEY ("hubId") REFERENCES "hub"("id") ON DELETE CASCADE ON UPDATE CASCADE;
