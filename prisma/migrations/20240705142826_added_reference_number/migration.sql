/*
  Warnings:

  - A unique constraint covering the columns `[referenceNumber]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referenceNumber` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "referenceNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_referenceNumber_key" ON "Product"("referenceNumber");
