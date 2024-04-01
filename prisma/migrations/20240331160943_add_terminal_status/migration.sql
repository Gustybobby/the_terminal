-- CreateEnum
CREATE TYPE "TerminalStatus" AS ENUM ('Open', 'Playing', 'Cooldown');

-- AlterTable
ALTER TABLE "Terminal" ADD COLUMN     "status" "TerminalStatus" NOT NULL DEFAULT 'Open';
