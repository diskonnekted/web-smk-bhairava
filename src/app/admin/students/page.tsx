import React from 'react';
import { prisma } from '@/lib/prisma';
import StudentsClient from '@/components/admin/StudentsClient';

async function getStudents() {
  return await prisma.student.findMany({
    include: {
      major: true,
      internships: true
    },
    orderBy: { name: 'asc' }
  });
}

export default async function StudentsPage() {
  const students = await getStudents();

  return <StudentsClient students={students} />;
}
