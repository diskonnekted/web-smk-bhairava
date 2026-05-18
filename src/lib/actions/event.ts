'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createEvent(data: {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  type: string;
}) {
  const event = await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      location: data.location,
      type: data.type,
    },
  });
  revalidatePath('/admin/calendar');
  revalidatePath('/');
  return event;
}

export async function updateEvent(id: string, data: {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  type?: string;
}) {
  const event = await prisma.event.update({
    where: { id },
    data: {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    },
  });
  revalidatePath('/admin/calendar');
  revalidatePath('/');
  return event;
}

export async function deleteEvent(id: string) {
  await prisma.event.delete({
    where: { id },
  });
  revalidatePath('/admin/calendar');
  revalidatePath('/');
}
