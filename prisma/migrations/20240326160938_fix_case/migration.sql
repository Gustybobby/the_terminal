/*
  Warnings:

  - You are about to drop the column `EndAt` on the `CaptureRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CaptureRecord" DROP COLUMN "EndAt",
ADD COLUMN     "endAt" TIMESTAMP(3);
