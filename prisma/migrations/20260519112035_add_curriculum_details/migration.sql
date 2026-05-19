/*
  Warnings:

  - Added the required column `lastUpdatedAt` to the `Curriculum` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Curriculum" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "majorId" TEXT NOT NULL,
    "fileUrl" TEXT,
    "version" TEXT NOT NULL DEFAULT '1.0',
    "description" TEXT,
    "category" TEXT NOT NULL DEFAULT 'SILABUS',
    "contentLink" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" DATETIME NOT NULL,
    CONSTRAINT "Curriculum_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Curriculum" ("fileUrl", "id", "majorId", "title", "version") SELECT "fileUrl", "id", "majorId", "title", "version" FROM "Curriculum";
DROP TABLE "Curriculum";
ALTER TABLE "new_Curriculum" RENAME TO "Curriculum";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
