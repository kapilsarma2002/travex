/*
  Warnings:

  - You are about to drop the column `noveltyFactor` on the `TripAnalysis` table. All the data in the column will be lost.
  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ActivityAnalysis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `color` to the `TripAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `TripAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `worth` to the `TripAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_tripId_fkey";

-- DropForeignKey
ALTER TABLE "ActivityAnalysis" DROP CONSTRAINT "ActivityAnalysis_activityId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_activityId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_tripId_fkey";

-- AlterTable
ALTER TABLE "TripAnalysis" DROP COLUMN "noveltyFactor",
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL,
ADD COLUMN     "worth" INTEGER NOT NULL,
ALTER COLUMN "overallMood" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Activity";

-- DropTable
DROP TABLE "ActivityAnalysis";

-- DropTable
DROP TABLE "Expense";

-- DropEnum
DROP TYPE "ActivityType";

-- DropEnum
DROP TYPE "ExpenseCategory";
