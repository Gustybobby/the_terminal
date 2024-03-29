/*
  Warnings:

  - A unique constraint covering the columns `[secret]` on the table `Terminal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `secret` to the `Terminal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Terminal" ADD COLUMN     "secret" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Terminal_secret_key" ON "Terminal"("secret");
