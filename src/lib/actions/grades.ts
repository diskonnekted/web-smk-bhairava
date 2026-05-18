'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function upsertGrade(data: {
  studentId: string;
  teacherId: string;
  subject: string;
  score: number;
  semester: number;
  academicYear: string;
}) {
  // For simplicity, we find a grade by student, subject, and semester and update it, or create a new one.
  const existingGrade = await prisma.grade.findFirst({
    where: {
      studentId: data.studentId,
      subject: data.subject,
      semester: data.semester,
      academicYear: data.academicYear,
    },
  });

  if (existingGrade) {
    await prisma.grade.update({
      where: { id: existingGrade.id },
      data: { score: data.score, teacherId: data.teacherId },
    });
  } else {
    await prisma.grade.create({
      data,
    });
  }

  revalidatePath(`/admin/students/${data.studentId}`);
}
