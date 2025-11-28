/*
  Warnings:

  - You are about to drop the column `end_date` on the `stage_setting` table. All the data in the column will be lost.
  - You are about to drop the column `registration_end_date` on the `stage_setting` table. All the data in the column will be lost.
  - You are about to drop the column `registration_start_date` on the `stage_setting` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `stage_setting` table. All the data in the column will be lost.
  - Added the required column `registration_start_date` to the `stage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stage" ADD COLUMN     "registration_end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "registration_start_date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "scheduled_end_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "stage_setting" DROP COLUMN "end_date",
DROP COLUMN "registration_end_date",
DROP COLUMN "registration_start_date",
DROP COLUMN "start_date";
