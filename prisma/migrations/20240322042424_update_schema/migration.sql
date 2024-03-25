/*
  Warnings:

  - You are about to drop the column `from` on the `Effect` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `Effect` table. All the data in the column will be lost.
  - You are about to drop the column `clock` on the `GameState` table. All the data in the column will be lost.
  - You are about to drop the column `currentFlagSecret` on the `Terminal` table. All the data in the column will be lost.
  - You are about to drop the column `game` on the `Terminal` table. All the data in the column will be lost.
  - You are about to drop the column `lastPassengerUpdate` on the `Terminal` table. All the data in the column will be lost.
  - You are about to drop the column `unitTime` on the `Terminal` table. All the data in the column will be lost.
  - You are about to drop the column `lastSecretAttempt` on the `User` table. All the data in the column will be lost.
  - Added the required column `fromTick` to the `Effect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toTick` to the `Effect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentTick` to the `GameState` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Effect" DROP COLUMN "from",
DROP COLUMN "to",
ADD COLUMN     "fromTick" INTEGER NOT NULL,
ADD COLUMN     "toTick" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GameState" DROP COLUMN "clock",
ADD COLUMN     "currentTick" INTEGER NOT NULL,
ADD COLUMN     "lastTickUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Terminal" DROP COLUMN "currentFlagSecret",
DROP COLUMN "game",
DROP COLUMN "lastPassengerUpdate",
DROP COLUMN "unitTime",
ADD COLUMN     "lastUpdateTick" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "unitTick" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastSecretAttempt";

-- DropEnum
DROP TYPE "Game";
