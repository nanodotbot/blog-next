/*
  Warnings:

  - You are about to alter the column `id` on the `Profile` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `userId` on the `Profile` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `User` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `Preferences` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `userId` on the `Preferences` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `authorId` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `dislikedById` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id` on the `Post` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `likedById` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_Profile" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "bio" STRING,
    "userId" INT4 NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
DROP INDEX "Profile_userId_key";
INSERT INTO "_prisma_new_Profile" ("bio","id","userId") SELECT "bio","id","userId" FROM "Profile";
DROP TABLE "Profile" CASCADE;
ALTER TABLE "_prisma_new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE TABLE "_prisma_new_User" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "email" STRING,
    "isAdmin" BOOL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
DROP INDEX "User_email_key";
DROP INDEX "User_name_key";
INSERT INTO "_prisma_new_User" ("email","id","isAdmin","name") SELECT "email","id","isAdmin","name" FROM "User";
DROP TABLE "User" CASCADE;
ALTER TABLE "_prisma_new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "_prisma_new_Preferences" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "notifications" BOOL,
    "userId" INT4 NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);
DROP INDEX "Preferences_userId_key";
INSERT INTO "_prisma_new_Preferences" ("id","notifications","userId") SELECT "id","notifications","userId" FROM "Preferences";
DROP TABLE "Preferences" CASCADE;
ALTER TABLE "_prisma_new_Preferences" RENAME TO "Preferences";
CREATE UNIQUE INDEX "Preferences_userId_key" ON "Preferences"("userId");
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE TABLE "_prisma_new_Post" (
    "id" INT4 NOT NULL DEFAULT unique_rowid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pictures" STRING[],
    "message" STRING,
    "authorId" INT4 NOT NULL,
    "likedById" INT4,
    "dislikedById" INT4,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Post" ("authorId","createdAt","dislikedById","id","likedById","message","pictures","updatedAt") SELECT "authorId","createdAt","dislikedById","id","likedById","message","pictures","updatedAt" FROM "Post";
DROP TABLE "Post" CASCADE;
ALTER TABLE "_prisma_new_Post" RENAME TO "Post";
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Post" ADD CONSTRAINT "Post_likedById_fkey" FOREIGN KEY ("likedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Post" ADD CONSTRAINT "Post_dislikedById_fkey" FOREIGN KEY ("dislikedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
