-- CreateTable
CREATE TABLE "Grade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "academicYear" TEXT NOT NULL DEFAULT '2025/2026',
    "semester" INTEGER NOT NULL DEFAULT 1,
    "score" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Grade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Grade_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "nisn" TEXT,
    "gender" TEXT NOT NULL,
    "religion" TEXT,
    "placeOfBirth" TEXT,
    "dateOfBirth" DATETIME,
    "phone" TEXT,
    "address" TEXT,
    "majorId" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Student_majorId_fkey" FOREIGN KEY ("majorId") REFERENCES "Major" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("address", "dateOfBirth", "gender", "id", "majorId", "name", "nis", "nisn", "phone", "placeOfBirth", "religion") SELECT "address", "dateOfBirth", "gender", "id", "majorId", "name", "nis", "nisn", "phone", "placeOfBirth", "religion" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_nis_key" ON "Student"("nis");
CREATE UNIQUE INDEX "Student_nisn_key" ON "Student"("nisn");
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
