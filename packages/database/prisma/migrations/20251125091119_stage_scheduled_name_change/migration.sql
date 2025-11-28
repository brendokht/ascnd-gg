/*
  Warnings:

  - You are about to drop the column `scheduled_at` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `scheduled_end_at` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `scheduled_at` on the `stage` table. All the data in the column will be lost.
  - You are about to drop the column `scheduled_end_at` on the `stage` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `stage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event" DROP COLUMN "scheduled_at",
DROP COLUMN "scheduled_end_at",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "stage" DROP COLUMN "scheduled_at",
DROP COLUMN "scheduled_end_at",
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "account_user_id_idx" ON "account"("user_id");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");
