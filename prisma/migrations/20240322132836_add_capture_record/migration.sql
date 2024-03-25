/*
  Warnings:

  - Added the required column `capturedTick` to the `CaptureRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CaptureRecord" ADD COLUMN     "capturedTick" INTEGER NOT NULL;
