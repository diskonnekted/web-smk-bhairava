import React from 'react';
import { prisma } from '@/lib/prisma';
import EventClient from '@/components/admin/EventClient';

async function getEvents() {
  return await prisma.event.findMany({
    orderBy: { startDate: 'asc' }
  });
}

export default async function AdminCalendarPage() {
  const events = await getEvents();

  return <EventClient events={events} />;
}
