/*
  Warnings:

  - The values [CPE,DE,ChE,CE,IE,ME,EE,BA] on the enum `AirlineClass` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AirlineClass_new" AS ENUM ('ICT', 'MSME', 'BCET', 'MT', 'CET', 'None');
ALTER TABLE "Airline" ALTER COLUMN "class" DROP DEFAULT;
ALTER TABLE "Airline" ALTER COLUMN "class" TYPE "AirlineClass_new" USING ("class"::text::"AirlineClass_new");
ALTER TABLE "Effect" ALTER COLUMN "type" TYPE "AirlineClass_new" USING ("type"::text::"AirlineClass_new");
ALTER TYPE "AirlineClass" RENAME TO "AirlineClass_old";
ALTER TYPE "AirlineClass_new" RENAME TO "AirlineClass";
DROP TYPE "AirlineClass_old";
ALTER TABLE "Airline" ALTER COLUMN "class" SET DEFAULT 'None';
COMMIT;
