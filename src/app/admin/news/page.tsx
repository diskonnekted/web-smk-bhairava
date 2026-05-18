import React from 'react';
import { prisma } from '@/lib/prisma';
import NewsClient from '@/components/admin/NewsClient';

async function getNews() {
  return await prisma.news.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export default async function AdminNewsPage() {
  const newsItems = await getNews();

  return <NewsClient newsItems={newsItems} />;
}
