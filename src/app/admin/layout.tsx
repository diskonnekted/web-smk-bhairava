import React from 'react';
import Sidebar from '@/components/admin/Sidebar';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Ini adalah pengaman tambahan di level layout
  if (!session?.userId) {
    console.log("ADMIN LAYOUT: No session found, redirecting to /login");
    redirect('/login');
  }

  console.log("ADMIN LAYOUT: Session data received:", JSON.stringify(session, null, 2));

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar user={session} />
      <main className="pl-72 min-h-screen">
        <div className="p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
