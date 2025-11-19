/*
  Warnings:

  - You are about to drop the column `game_setting_template_id` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `game_setting_template_result` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `match_setting_template_id` on the `match` table. All the data in the column will be lost.
  - You are about to drop the column `match_setting_template_result` on the `match` table. All the data in the column will be lost.
  - You are about to drop the column `game_setting_template_id` on the `stage_setting` table. All the data in the column will be lost.
  - You are about to drop the column `match_setting_template_id` on the `stage_setting` table. All the data in the column will be lost.
  - You are about to drop the `game_setting_template` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `match_setting_template` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `character_veto` to the `game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_veto` to the `game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `map_veto` to the `game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `side_veto` to the `game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `character_veto` to the `match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_veto` to the `match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `map_veto` to the `match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `side_veto` to the `match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stage_setting_template_id` to the `stage_setting` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."game" DROP CONSTRAINT "game_game_setting_template_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."game_setting_template" DROP CONSTRAINT "game_setting_template_created_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."game_setting_template" DROP CONSTRAINT "game_setting_template_title_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."match" DROP CONSTRAINT "match_match_setting_template_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."match_setting_template" DROP CONSTRAINT "match_setting_template_created_by_fkey";

-- DropForeignKey
ALTER TABLE "public"."match_setting_template" DROP CONSTRAINT "match_setting_template_format_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."match_setting_template" DROP CONSTRAINT "match_setting_template_title_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."stage_setting" DROP CONSTRAINT "stage_setting_game_setting_template_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."stage_setting" DROP CONSTRAINT "stage_setting_match_setting_template_id_fkey";

-- AlterTable
ALTER TABLE "game" DROP COLUMN "game_setting_template_id",
DROP COLUMN "game_setting_template_result",
ADD COLUMN     "character_veto" BOOLEAN NOT NULL,
ADD COLUMN     "character_veto_order" JSONB,
ADD COLUMN     "item_veto" BOOLEAN NOT NULL,
ADD COLUMN     "item_veto_order" JSONB,
ADD COLUMN     "map_veto" BOOLEAN NOT NULL,
ADD COLUMN     "map_veto_order" JSONB,
ADD COLUMN     "side_veto" BOOLEAN NOT NULL,
ADD COLUMN     "side_veto_order" JSONB,
ADD COLUMN     "veto_results" JSONB;

-- AlterTable
ALTER TABLE "match" DROP COLUMN "match_setting_template_id",
DROP COLUMN "match_setting_template_result",
ADD COLUMN     "character_veto" BOOLEAN NOT NULL,
ADD COLUMN     "character_veto_order" JSONB,
ADD COLUMN     "item_veto" BOOLEAN NOT NULL,
ADD COLUMN     "item_veto_order" JSONB,
ADD COLUMN     "map_veto" BOOLEAN NOT NULL,
ADD COLUMN     "map_veto_order" JSONB,
ADD COLUMN     "side_veto" BOOLEAN NOT NULL,
ADD COLUMN     "side_veto_order" JSONB,
ADD COLUMN     "veto_results" JSONB;

-- AlterTable
ALTER TABLE "phase" ADD COLUMN     "character_veto_order" JSONB,
ADD COLUMN     "item_veto_order" JSONB,
ADD COLUMN     "map_veto_order" JSONB,
ADD COLUMN     "side_veto_order" JSONB;

-- AlterTable
ALTER TABLE "stage_setting" DROP COLUMN "game_setting_template_id",
DROP COLUMN "match_setting_template_id",
ADD COLUMN     "stage_setting_template_id" TEXT;

-- DropTable
DROP TABLE "public"."game_setting_template";

-- DropTable
DROP TABLE "public"."match_setting_template";

-- CreateTable
CREATE TABLE "stage_setting_template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "title_id" TEXT NOT NULL,
    "settings" JSONB NOT NULL,
    "custom" BOOLEAN NOT NULL DEFAULT false,
    "created_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stage_setting_template_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stage_setting_template_title_id_name_version_key" ON "stage_setting_template"("title_id", "name", "version");

-- AddForeignKey
ALTER TABLE "stage_setting" ADD CONSTRAINT "stage_setting_stage_setting_template_id_fkey" FOREIGN KEY ("stage_setting_template_id") REFERENCES "stage_setting_template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stage_setting_template" ADD CONSTRAINT "stage_setting_template_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stage_setting_template" ADD CONSTRAINT "stage_setting_template_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
