/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `TripAnalysis` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `TripAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TripAnalysis" ADD COLUMN     "sentimentScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TripAnalysis_userId_key" ON "TripAnalysis"("userId");

-- CreateIndex
CREATE INDEX "TripAnalysis_userId_idx" ON "TripAnalysis"("userId");

-- AddForeignKey
ALTER TABLE "TripAnalysis" ADD CONSTRAINT "TripAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
