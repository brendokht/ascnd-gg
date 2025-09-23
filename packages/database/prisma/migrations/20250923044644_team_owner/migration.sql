/*
  Warnings:

  - Added the required column `teamOwnerId` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."team" ADD COLUMN     "teamOwnerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."team" ADD CONSTRAINT "team_teamOwnerId_fkey" FOREIGN KEY ("teamOwnerId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
