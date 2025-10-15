/*
  Warnings:

  - You are about to drop the column `accessToken` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `accessTokenExpiresAt` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `idToken` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `refreshTokenExpiresAt` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `hub` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `hub` table. All the data in the column will be lost.
  - You are about to drop the column `hubOwnerId` on the `hub` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `hub` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `hub_invite` table. All the data in the column will be lost.
  - You are about to drop the column `hubId` on the `hub_invite` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `hub_invite` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `hub_invite` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddress` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `teamOwnerId` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `team_invite` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `team_invite` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `team_invite` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `team_invite` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `displayUsername` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - The primary key for the `user_hub` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `user_hub` table. All the data in the column will be lost.
  - You are about to drop the column `hubId` on the `user_hub` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user_hub` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_hub` table. All the data in the column will be lost.
  - The primary key for the `user_team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `user_team` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `user_team` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user_team` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_team` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `verification` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `verification` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `verification` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_id` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `display_name` to the `hub` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hub_owner_id` to the `hub` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hub_id` to the `hub_invite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `hub_invite` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `hub_invite` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `expires_at` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `display_name` to the `team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_owner_id` to the `team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_id` to the `team_invite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `team_invite` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `team_invite` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `hub_id` to the `user_hub` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_hub` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_id` to the `user_team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `verification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "stage_seeding_type" AS ENUM ('RANDOM', 'MANUAL');

-- CreateEnum
CREATE TYPE "stage_join_type" AS ENUM ('OPEN', 'REQUEST', 'INVITE');

-- CreateEnum
CREATE TYPE "stage_status" AS ENUM ('REGISTRATION_OPEN', 'REGISTRATION_CLOSED', 'PENDING', 'ONGOING', 'CANCELLED', 'FINISHED');

-- CreateEnum
CREATE TYPE "event_status" AS ENUM ('REGISTRATION_OPEN', 'REGISTRATION_CLOSED', 'PENDING', 'ONGOING', 'CANCELLED', 'FINISHED');

-- CreateEnum
CREATE TYPE "invite_status" AS ENUM ('PENDING', 'DECLINED', 'CANCELLED', 'ACCEPTED');

-- CreateEnum
CREATE TYPE "result" AS ENUM ('SCHEDULED', 'PREREQUISITE', 'ONGOING', 'CANCELLED', 'ABORTED', 'DISPUTED', 'TEAM_1_WIN', 'TEAM_2_WIN', 'DRAW');

-- CreateEnum
CREATE TYPE "draw_resolution_policy" AS ENUM ('ALLOW_DRAW', 'TIEBREAKER', 'ADMIN_DECISION', 'FALLBACK');

-- DropForeignKey
ALTER TABLE "public"."account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."hub" DROP CONSTRAINT "hub_hubOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."hub_invite" DROP CONSTRAINT "hub_invite_hubId_fkey";

-- DropForeignKey
ALTER TABLE "public"."hub_invite" DROP CONSTRAINT "hub_invite_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."session" DROP CONSTRAINT "session_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."team" DROP CONSTRAINT "team_teamOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."team_invite" DROP CONSTRAINT "team_invite_teamId_fkey";

-- DropForeignKey
ALTER TABLE "public"."team_invite" DROP CONSTRAINT "team_invite_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_hub" DROP CONSTRAINT "user_hub_hubId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_hub" DROP CONSTRAINT "user_hub_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_team" DROP CONSTRAINT "user_team_teamId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_team" DROP CONSTRAINT "user_team_userId_fkey";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "accessToken",
DROP COLUMN "accessTokenExpiresAt",
DROP COLUMN "accountId",
DROP COLUMN "createdAt",
DROP COLUMN "idToken",
DROP COLUMN "providerId",
DROP COLUMN "refreshToken",
DROP COLUMN "refreshTokenExpiresAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "access_token_expires_at" TIMESTAMP(3),
ADD COLUMN     "account_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id_token" TEXT,
ADD COLUMN     "provider_id" TEXT NOT NULL,
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "refresh_token_expires_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "hub" DROP COLUMN "createdAt",
DROP COLUMN "displayName",
DROP COLUMN "hubOwnerId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "display_name" TEXT NOT NULL,
ADD COLUMN     "hub_owner_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "hub_invite" DROP COLUMN "createdAt",
DROP COLUMN "hubId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hub_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "invite_status" NOT NULL;

-- AlterTable
ALTER TABLE "session" DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "ipAddress",
DROP COLUMN "updatedAt",
DROP COLUMN "userAgent",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ip_address" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_agent" TEXT,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "team" DROP COLUMN "createdAt",
DROP COLUMN "displayName",
DROP COLUMN "teamOwnerId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "display_name" TEXT NOT NULL,
ADD COLUMN     "team_owner_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "team_invite" DROP COLUMN "createdAt",
DROP COLUMN "teamId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "team_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "invite_status" NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "createdAt",
DROP COLUMN "displayUsername",
DROP COLUMN "emailVerified",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "display_username" TEXT,
ADD COLUMN     "email_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user_hub" DROP CONSTRAINT "user_hub_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "hubId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hub_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "user_hub_pkey" PRIMARY KEY ("hub_id", "user_id");

-- AlterTable
ALTER TABLE "user_team" DROP CONSTRAINT "user_team_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "teamId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "team_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "user_team_pkey" PRIMARY KEY ("team_id", "user_id");

-- AlterTable
ALTER TABLE "verification" DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropEnum
DROP TYPE "public"."InviteStatus";

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "hub_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "banner" TEXT,
    "title_id" TEXT NOT NULL,
    "status" "event_status" NOT NULL,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "scheduled_end_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stage" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "banner" TEXT,
    "stage_type_id" TEXT NOT NULL,
    "status" "stage_status" NOT NULL,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "scheduled_end_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stage_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stage_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stage_setting" (
    "stage_id" TEXT NOT NULL,
    "min_teams" INTEGER NOT NULL DEFAULT 2,
    "max_teams" INTEGER NOT NULL DEFAULT 128,
    "team_size" INTEGER NOT NULL,
    "number_of_substitutes" INTEGER NOT NULL DEFAULT 1,
    "number_of_coaches" INTEGER NOT NULL DEFAULT 1,
    "allow_draws" BOOLEAN NOT NULL DEFAULT false,
    "draw_policy" "draw_resolution_policy" NOT NULL,
    "game_mode_pool_ids" TEXT[],
    "needs_gamemode_veto" BOOLEAN NOT NULL,
    "map_pool_ids" TEXT[],
    "per_game_map_veto" BOOLEAN NOT NULL,
    "per_match_map_veto" BOOLEAN NOT NULL,
    "character_pool_ids" TEXT[],
    "per_game_character_veto" BOOLEAN NOT NULL,
    "per_match_character_veto" BOOLEAN NOT NULL,
    "item_pool_ids" TEXT[],
    "per_game_item_veto" BOOLEAN NOT NULL,
    "per_match_item_veto" BOOLEAN NOT NULL,
    "per_game_side_veto" BOOLEAN NOT NULL,
    "per_match_side_veto" BOOLEAN NOT NULL,
    "title_settings" JSONB,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "registration_start_date" TIMESTAMP(3),
    "registration_end_date" TIMESTAMP(3),
    "seeding_type" "stage_seeding_type" NOT NULL,
    "join_type" "stage_join_type" NOT NULL,
    "is_locked" BOOLEAN NOT NULL,
    "match_setting_template_id" TEXT,
    "game_setting_template_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stage_setting_pkey" PRIMARY KEY ("stage_id")
);

-- CreateTable
CREATE TABLE "phase" (
    "id" TEXT NOT NULL,
    "stage_id" TEXT NOT NULL,
    "match_format_id" TEXT NOT NULL,
    "match_index_start" INTEGER,
    "match_index_end" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "phase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stage_invite" (
    "id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "stage_id" TEXT NOT NULL,
    "status" "invite_status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stage_invite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match" (
    "id" TEXT NOT NULL,
    "phase_id" TEXT NOT NULL,
    "match_index" INTEGER NOT NULL,
    "team_1_id" TEXT NOT NULL,
    "team_2_id" TEXT,
    "team_1_score" INTEGER NOT NULL,
    "team_2_score" INTEGER NOT NULL,
    "game_wins_needed" INTEGER NOT NULL,
    "result" "result" NOT NULL DEFAULT 'SCHEDULED',
    "scheduled_at" TIMESTAMP(3),
    "player_statistics" JSONB,
    "draw_policy_used" "draw_resolution_policy",
    "match_setting_template_id" TEXT,
    "match_setting_template_result" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match_format" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "short_name" TEXT NOT NULL,
    "target_score" INTEGER NOT NULL,
    "games_per_match" INTEGER,
    "game_setting_template_required" BOOLEAN DEFAULT false,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "match_format_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match_setting_template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "title_id" TEXT NOT NULL,
    "format_id" TEXT NOT NULL,
    "settings" JSONB NOT NULL,
    "custom" BOOLEAN NOT NULL DEFAULT false,
    "created_by" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "match_setting_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game" (
    "id" TEXT NOT NULL,
    "match_id" TEXT NOT NULL,
    "team_1_score" INTEGER NOT NULL DEFAULT 0,
    "team_2_score" INTEGER NOT NULL DEFAULT 0,
    "result" "result" NOT NULL DEFAULT 'SCHEDULED',
    "game_setting_template_id" TEXT,
    "game_setting_template_result" JSONB,
    "player_statistics" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_setting_template" (
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

    CONSTRAINT "game_setting_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stage_team" (
    "stage_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stage_team_pkey" PRIMARY KEY ("stage_id","team_id")
);

-- CreateTable
CREATE TABLE "title" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "genre_id" TEXT NOT NULL,
    "allows_draws" BOOLEAN NOT NULL DEFAULT false,
    "default_draw_policy" "draw_resolution_policy",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "title_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "title_genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "title_genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "title_map" (
    "id" TEXT NOT NULL,
    "title_id" TEXT NOT NULL,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "metadata" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "titleGameModeId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "title_map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "title_character" (
    "id" TEXT NOT NULL,
    "title_id" TEXT NOT NULL,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "metadata" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "title_character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "title_character_role" (
    "character_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "title_character_role_pkey" PRIMARY KEY ("character_id","role_id")
);

-- CreateTable
CREATE TABLE "title_role" (
    "id" TEXT NOT NULL,
    "title_id" TEXT NOT NULL,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "payload" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "title_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "title_gamemode" (
    "id" TEXT NOT NULL,
    "title_id" TEXT NOT NULL,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "metadata" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "title_gamemode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "title_setting" (
    "id" TEXT NOT NULL,
    "title_id" TEXT NOT NULL,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "payload" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "title_setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "title_item" (
    "id" TEXT NOT NULL,
    "title_id" TEXT NOT NULL,
    "image" TEXT,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "payload" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "title_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_name_key" ON "event"("name");

-- CreateIndex
CREATE UNIQUE INDEX "stage_type_name_key" ON "stage_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "match_phase_id_match_index_key" ON "match"("phase_id", "match_index");

-- CreateIndex
CREATE UNIQUE INDEX "match_format_name_key" ON "match_format"("name");

-- CreateIndex
CREATE UNIQUE INDEX "match_setting_template_title_id_format_id_version_key" ON "match_setting_template"("title_id", "format_id", "version");

-- CreateIndex
CREATE UNIQUE INDEX "match_setting_template_title_id_format_id_name_key" ON "match_setting_template"("title_id", "format_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "game_setting_template_title_id_version_name_key" ON "game_setting_template"("title_id", "version", "name");

-- CreateIndex
CREATE UNIQUE INDEX "title_name_key" ON "title"("name");

-- CreateIndex
CREATE UNIQUE INDEX "title_genre_name_key" ON "title_genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "title_map_title_id_name_key" ON "title_map"("title_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "title_character_title_id_name_key" ON "title_character"("title_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "title_role_title_id_name_key" ON "title_role"("title_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "title_gamemode_title_id_name_key" ON "title_gamemode"("title_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "title_setting_title_id_name_key" ON "title_setting"("title_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "title_item_title_id_name_key" ON "title_item"("title_id", "name");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_hub_id_fkey" FOREIGN KEY ("hub_id") REFERENCES "hub"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stage" ADD CONSTRAINT "stage_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stage" ADD CONSTRAINT "stage_stage_type_id_fkey" FOREIGN KEY ("stage_type_id") REFERENCES "stage_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stage_setting" ADD CONSTRAINT "stage_setting_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stage_setting" ADD CONSTRAINT "stage_setting_match_setting_template_id_fkey" FOREIGN KEY ("match_setting_template_id") REFERENCES "match_setting_template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stage_setting" ADD CONSTRAINT "stage_setting_game_setting_template_id_fkey" FOREIGN KEY ("game_setting_template_id") REFERENCES "game_setting_template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phase" ADD CONSTRAINT "phase_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phase" ADD CONSTRAINT "phase_match_format_id_fkey" FOREIGN KEY ("match_format_id") REFERENCES "match_format"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub" ADD CONSTRAINT "hub_hub_owner_id_fkey" FOREIGN KEY ("hub_owner_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_hub" ADD CONSTRAINT "user_hub_hub_id_fkey" FOREIGN KEY ("hub_id") REFERENCES "hub"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_hub" ADD CONSTRAINT "user_hub_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_invite" ADD CONSTRAINT "team_invite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_invite" ADD CONSTRAINT "team_invite_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub_invite" ADD CONSTRAINT "hub_invite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub_invite" ADD CONSTRAINT "hub_invite_hub_id_fkey" FOREIGN KEY ("hub_id") REFERENCES "hub"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stage_invite" ADD CONSTRAINT "stage_invite_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stage_invite" ADD CONSTRAINT "stage_invite_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match" ADD CONSTRAINT "match_phase_id_fkey" FOREIGN KEY ("phase_id") REFERENCES "phase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match" ADD CONSTRAINT "match_team_1_id_fkey" FOREIGN KEY ("team_1_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match" ADD CONSTRAINT "match_team_2_id_fkey" FOREIGN KEY ("team_2_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match" ADD CONSTRAINT "match_match_setting_template_id_fkey" FOREIGN KEY ("match_setting_template_id") REFERENCES "match_setting_template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_setting_template" ADD CONSTRAINT "match_setting_template_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_setting_template" ADD CONSTRAINT "match_setting_template_format_id_fkey" FOREIGN KEY ("format_id") REFERENCES "match_format"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_setting_template" ADD CONSTRAINT "match_setting_template_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_game_setting_template_id_fkey" FOREIGN KEY ("game_setting_template_id") REFERENCES "game_setting_template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_setting_template" ADD CONSTRAINT "game_setting_template_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "title"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_setting_template" ADD CONSTRAINT "game_setting_template_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_team_owner_id_fkey" FOREIGN KEY ("team_owner_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_team" ADD CONSTRAINT "user_team_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_team" ADD CONSTRAINT "user_team_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stage_team" ADD CONSTRAINT "stage_team_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "stage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stage_team" ADD CONSTRAINT "stage_team_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "title" ADD CONSTRAINT "title_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "title_genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "title_map" ADD CONSTRAINT "title_map_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "title_map" ADD CONSTRAINT "title_map_titleGameModeId_fkey" FOREIGN KEY ("titleGameModeId") REFERENCES "title_gamemode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "title_character" ADD CONSTRAINT "title_character_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "title_character_role" ADD CONSTRAINT "title_character_role_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "title_character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "title_character_role" ADD CONSTRAINT "title_character_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "title_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "title_role" ADD CONSTRAINT "title_role_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "title_gamemode" ADD CONSTRAINT "title_gamemode_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "title_setting" ADD CONSTRAINT "title_setting_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "title_item" ADD CONSTRAINT "title_item_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
