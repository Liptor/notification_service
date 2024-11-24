/*
  Warnings:

  - The `id` column on the `Notification` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Notification_id_key";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("id");
