'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getStudentCounseling(studentId: string) {
  return await prisma.counselingSession.findMany({
    where: { studentId },
    include: { teacher: true },
    orderBy: { date: 'desc' },
  });
}

export async function bookCounselingSession(data: {
  studentId: string;
  teacherId: string;
  date: string;
  topic: string;
}) {
  const session = await prisma.counselingSession.create({
    data: {
      ...data,
      date: new Date(data.date),
      status: 'BOOKED',
    },
  });
  revalidatePath('/portal/siswa');
  revalidatePath('/portal/wali');
  return session;
}

export async function updateCounselingStatus(id: string, status: string, notes?: string) {
  const session = await prisma.counselingSession.update({
    where: { id },
    data: { status, notes },
  });
  revalidatePath('/portal/siswa');
  revalidatePath('/portal/wali');
  return session;
}
