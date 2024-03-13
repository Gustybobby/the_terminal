-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STAFF', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "terminalId" INTEGER,
    "airlineId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Terminal" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "passengerRate" INTEGER NOT NULL,
    "airlineId" INTEGER,
    "lastPassengerUpdate" TIMESTAMP(3) NOT NULL,
    "currentFlagSecret" TEXT NOT NULL,

    CONSTRAINT "Terminal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airline" (
    "id" INTEGER NOT NULL,
    "airlineSecret" TEXT NOT NULL,
    "passengers" INTEGER NOT NULL,
    "lastSecretAttempt" TIMESTAMP(3) NOT NULL,
    "classId" INTEGER,

    CONSTRAINT "Airline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaptureRecord" (
    "id" SERIAL NOT NULL,
    "capturedAt" TIMESTAMP(3) NOT NULL,
    "terminalId" INTEGER NOT NULL,
    "airlineId" INTEGER NOT NULL,

    CONSTRAINT "CaptureRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AirlineClass" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "effect" JSONB,

    CONSTRAINT "AirlineClass_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_terminalId_fkey" FOREIGN KEY ("terminalId") REFERENCES "Terminal"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "Airline"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Terminal" ADD CONSTRAINT "Terminal_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "Airline"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Airline" ADD CONSTRAINT "Airline_classId_fkey" FOREIGN KEY ("classId") REFERENCES "AirlineClass"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "CaptureRecord" ADD CONSTRAINT "CaptureRecord_terminalId_fkey" FOREIGN KEY ("terminalId") REFERENCES "Terminal"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "CaptureRecord" ADD CONSTRAINT "CaptureRecord_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "Airline"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
