import React from 'react';
import { prisma } from '@/lib/prisma';
import MajorClient from '@/components/admin/MajorClient';

async function getMajors() {
  return await prisma.major.findMany({
    include: { _count: { select: { students: true } } }
  });
}

export default async function AdminMajorsPage() {
  const majors = await getMajors();

  return <MajorClient majors={majors} />;
}
