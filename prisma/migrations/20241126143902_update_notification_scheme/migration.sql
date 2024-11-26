/*
  Warnings:

  - Added the required column `schedule` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "repeat" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "schedule" TEXT NOT NULL;
