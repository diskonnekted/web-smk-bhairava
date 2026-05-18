'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createMajor(data: {
  name: string;
  description: string;
  icon: string;
  category: string;
}) {
  const major = await prisma.major.create({
    data,
  });
  revalidatePath('/admin/majors');
  revalidatePath('/');
  return major;
}

export async function updateMajor(id: string, data: {
  name?: string;
  description?: string;
  icon?: string;
  category?: string;
}) {
  const major = await prisma.major.update({
    where: { id },
    data,
  });
  revalidatePath('/admin/majors');
  revalidatePath('/');
  return major;
}

export async function deleteMajor(id: string) {
  // Check if there are students in this major
  const studentsCount = await prisma.student.count({
    where: { majorId: id },
  });

  if (studentsCount > 0) {
    throw new Error('Tidak bisa menghapus jurusan yang masih memiliki siswa.');
  }

  await prisma.major.delete({
    where: { id },
  });
  revalidatePath('/admin/majors');
  revalidatePath('/');
}
