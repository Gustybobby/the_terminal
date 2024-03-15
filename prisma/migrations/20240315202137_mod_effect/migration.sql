-- AlterTable
ALTER TABLE "Effect" ADD COLUMN     "flatRate" INTEGER,
ADD COLUMN     "multiplier" DOUBLE PRECISION,
ADD COLUMN     "terminalId" INTEGER,
ADD COLUMN     "unitTime" INTEGER,
ALTER COLUMN "applyToId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Effect" ADD CONSTRAINT "Effect_terminalId_fkey" FOREIGN KEY ("terminalId") REFERENCES "Terminal"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
