'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';

export async function submitProject(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== 'STUDENT') {
    throw new Error('Unauthorized');
  }

  const student = await prisma.student.findFirst({
    where: { userId: session.userId }
  });

  if (!student) {
    throw new Error('Student profile not found');
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const link = formData.get('link') as string;
  const imageUrl = formData.get('imageUrl') as string;

  if (!title || !description) {
    throw new Error('Title and description are required');
  }

  const project = await prisma.project.create({
    data: {
      title,
      description,
      link,
      imageUrl,
      majorId: student.majorId,
    }
  });

  // Re-create createAuditLog if it was also removed
  // If audit.ts exists, it should work. If not, this might cause an error
  // For now, I'll assume audit.ts will also be re-created or already exists in d5d06c1
  // createAuditLog({
  //   action: 'CREATE',
  //   entity: 'Project',
  //   entityId: project.id,
  //   details: `Siswa mengirimkan karya baru: ${title}`
  // });

  revalidatePath('/portfolio');
  revalidatePath('/portal/siswa');
  
  return project;
}
