/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Major` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN "image" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Major_name_key" ON "Major"("name");
