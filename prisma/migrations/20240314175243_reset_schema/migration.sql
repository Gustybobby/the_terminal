-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STAFF', 'USER');

-- CreateEnum
CREATE TYPE "AirlineRole" AS ENUM ('Captain', 'Crew', 'Co_pilot');

-- CreateEnum
CREATE TYPE "AirlineClass" AS ENUM ('CPE', 'DE', 'ChE', 'CE', 'IE', 'ME', 'EE', 'BA', 'None');

-- CreateEnum
CREATE TYPE "Game" AS ENUM ('Chayen', 'Wordle', 'None');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "airlineRole" "AirlineRole" NOT NULL DEFAULT 'Crew',
    "terminalId" INTEGER,
    "airlineId" INTEGER,
    "lastSecretAttempt" TIMESTAMP(3),
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
    "unitTime" INTEGER NOT NULL DEFAULT 5,
    "game" "Game" NOT NULL DEFAULT 'None',
    "airlineId" INTEGER,
    "lastPassengerUpdate" TIMESTAMP(3) NOT NULL,
    "currentFlagSecret" TEXT NOT NULL,

    CONSTRAINT "Terminal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airline" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Untitled',
    "airlineSecret" TEXT NOT NULL,
    "passengers" INTEGER NOT NULL,
    "class" "AirlineClass" NOT NULL DEFAULT 'None',

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
CREATE TABLE "Effect" (
    "id" SERIAL NOT NULL,
    "type" "AirlineClass" NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "applyById" INTEGER NOT NULL,
    "applyToId" INTEGER NOT NULL,

    CONSTRAINT "Effect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Airline_airlineSecret_key" ON "Airline"("airlineSecret");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_terminalId_fkey" FOREIGN KEY ("terminalId") REFERENCES "Terminal"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "Airline"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Terminal" ADD CONSTRAINT "Terminal_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "Airline"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "CaptureRecord" ADD CONSTRAINT "CaptureRecord_terminalId_fkey" FOREIGN KEY ("terminalId") REFERENCES "Terminal"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "CaptureRecord" ADD CONSTRAINT "CaptureRecord_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "Airline"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Effect" ADD CONSTRAINT "Effect_applyById_fkey" FOREIGN KEY ("applyById") REFERENCES "Airline"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Effect" ADD CONSTRAINT "Effect_applyToId_fkey" FOREIGN KEY ("applyToId") REFERENCES "Airline"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
