'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createCurriculum(data: {
  title: string;
  majorId: string;
  fileUrl?: string;
  version?: string;
}) {
  const curriculum = await prisma.curriculum.create({
    data,
  });
  revalidatePath('/admin/academic');
  return curriculum;
}

export async function deleteCurriculum(id: string) {
  await prisma.curriculum.delete({
    where: { id },
  });
  revalidatePath('/admin/academic');
}

export async function createProject(data: {
  title: string;
  description: string;
  majorId: string;
  imageUrl?: string;
  link?: string;
}) {
  const project = await prisma.project.create({
    data,
  });
  revalidatePath('/admin/academic');
  return project;
}

export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: { id },
  });
  revalidatePath('/admin/academic');
}
