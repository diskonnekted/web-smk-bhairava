import React from 'react';
import { prisma } from '@/lib/prisma';
import NavbarClient from './client/NavbarClient';

export default async function Navbar() {
  const majors = await prisma.major.findMany({
    select: {
      id: true,
      name: true,
      icon: true
    }
  });

  return <NavbarClient majors={majors} />;
}
