'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getStudentAttendance(studentId: string) {
  return await prisma.attendance.findMany({
    where: { studentId },
    orderBy: { date: 'desc' },
  });
}

export async function createAttendance(data: {
  studentId: string;
  date: string;
  status: string;
  note?: string;
}) {
  const attendance = await prisma.attendance.create({
    data: {
      ...data,
      date: new Date(data.date),
    },
  });
  revalidatePath(`/admin/students/${data.studentId}`);
  return attendance;
}
