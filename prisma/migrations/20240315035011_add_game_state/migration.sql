-- CreateTable
CREATE TABLE "GameState" (
    "id" TEXT NOT NULL,
    "pause" BOOLEAN NOT NULL,
    "clock" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastPause" TIMESTAMP(3),
    "lastResume" TIMESTAMP(3),

    CONSTRAINT "GameState_pkey" PRIMARY KEY ("id")
);
