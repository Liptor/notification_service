/*
  Warnings:

  - You are about to drop the column `interval` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `repeat` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `schedule` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `startAt` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "interval",
DROP COLUMN "repeat",
DROP COLUMN "schedule",
ADD COLUMN     "nextRunAt" TIMESTAMP(3),
ADD COLUMN     "repeatAt" TEXT,
ADD COLUMN     "repeatInterval" TEXT,
ADD COLUMN     "startAt" TEXT NOT NULL;
