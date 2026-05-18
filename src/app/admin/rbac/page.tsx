import React from 'react';
import { prisma } from '@/lib/prisma';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  User as UserIcon, 
  ShieldCheck, 
  Filter, 
  Download, 
  Upload 
} from 'lucide-react';

async function getUsers() {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export default async function RBACPage() {
  const users = await getUsers();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Keamanan & RBAC</h1>
          <p className="text-slate-500">Manajemen Peran dan Hak Akses Pengguna Sistem</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-slate-900 border-2 border-slate-100 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
            <Download size={18} />
            Export Audit Log
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
            <Plus size={20} />
            Tambah User Baru
          </button>
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Cari berdasarkan nama, username, atau email..." 
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all outline-none font-medium"
          />
        </div>
        <div className="flex gap-3">
          <select className="px-6 py-4 bg-slate-50 border-transparent rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold text-slate-600">
            <option>Semua Peran</option>
            <option>ADMIN</option>
            <option>TEACHER</option>
            <option>STUDENT</option>
            <option>INDUSTRY</option>
          </select>
          <button className="p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identitas User</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Username</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Akses Peran</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Bergabung</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/30 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200 flex items-center justify-center text-slate-500 font-black text-lg group-hover:from-blue-600 group-hover:to-blue-400 group-hover:text-white transition-all shadow-sm">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-400 font-bold">{user.email || 'No email set'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-slate-600 font-bold font-mono text-sm">@{user.username}</td>
                <td className="px-8 py-5">
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest border flex items-center gap-2 w-fit
                    ${user.role === 'ADMIN' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                      user.role === 'TEACHER' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      'bg-slate-50 text-slate-600 border-slate-100'}`}>
                    <ShieldCheck size={12} />
                    {user.role}
                  </span>
                </td>
                <td className="px-8 py-5 text-slate-400 text-sm font-bold">
                  {new Date(user.createdAt).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2.5 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-300 hover:text-slate-900 border border-transparent hover:border-slate-100">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
