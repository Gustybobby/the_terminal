/*
  Warnings:

  - You are about to drop the column `unitTime` on the `Effect` table. All the data in the column will be lost.
  - Added the required column `color` to the `Airline` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Color" AS ENUM ('RED', 'PINK', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE', 'BROWN', 'AQUA', 'BEIGE');

-- AlterTable
ALTER TABLE "Airline" ADD COLUMN     "color" "Color" NOT NULL;

-- AlterTable
ALTER TABLE "Effect" DROP COLUMN "unitTime",
ADD COLUMN     "unitTick" INTEGER;
