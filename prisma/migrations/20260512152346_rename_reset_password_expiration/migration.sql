/*
  Warnings:

  - You are about to drop the column `resetPasswordExpires` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetPasswordExpires",
ADD COLUMN     "resetPasswordExpiresAt" TIMESTAMP(3);
