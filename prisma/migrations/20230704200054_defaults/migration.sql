/*
  Warnings:

  - Made the column `notifications` on table `Preferences` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bio` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Preferences" ALTER COLUMN "notifications" SET NOT NULL;
ALTER TABLE "Preferences" ALTER COLUMN "notifications" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "bio" SET NOT NULL;
ALTER TABLE "Profile" ALTER COLUMN "bio" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DEFAULT '';
