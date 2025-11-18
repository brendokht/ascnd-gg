/*
  Warnings:

  - You are about to drop the column `banner` on the `stage` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `stage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "stage" DROP COLUMN "banner",
DROP COLUMN "logo";
