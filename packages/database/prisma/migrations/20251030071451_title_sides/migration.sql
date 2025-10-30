/*
  Warnings:

  - You are about to drop the column `needs_gamemode_veto` on the `stage_setting` table. All the data in the column will be lost.
  - Added the required column `per_game_gamemode_veto` to the `stage_setting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `per_match_gamemode_veto` to the `stage_setting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stage_setting" DROP COLUMN "needs_gamemode_veto",
ADD COLUMN     "per_game_gamemode_veto" BOOLEAN NOT NULL,
ADD COLUMN     "per_match_gamemode_veto" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "title_side" (
    "id" TEXT NOT NULL,
    "title_id" TEXT NOT NULL,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "payload" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "title_side_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "title_side_title_id_name_key" ON "title_side"("title_id", "name");

-- AddForeignKey
ALTER TABLE "title_side" ADD CONSTRAINT "title_side_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
