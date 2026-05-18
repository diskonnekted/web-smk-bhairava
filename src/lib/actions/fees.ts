'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getStudentFees(studentId: string) {
  return await prisma.feePayment.findMany({
    where: { studentId },
    orderBy: { dueDate: 'asc' },
  });
}

export async function createFeePayment(data: {
  studentId: string;
  amount: number;
  dueDate: string;
  status: string;
}) {
  const fee = await prisma.feePayment.create({
    data: {
      ...data,
      dueDate: new Date(data.dueDate),
    },
  });
  revalidatePath(`/admin/students/${data.studentId}`);
  return fee;
}

export async function updateFeeStatus(id: string, status: string, paidDate?: string) {
  const fee = await prisma.feePayment.update({
    where: { id },
    data: {
      status,
      paidDate: paidDate ? new Date(paidDate) : null,
    },
  });
  revalidatePath(`/admin/students/${fee.studentId}`);
  return fee;
}
