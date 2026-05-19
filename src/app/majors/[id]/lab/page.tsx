import React from 'react';
import Navbar from '@/components/Navbar';
import AIChatbot from '@/components/client/AIChatbot';
import {
  Terminal, Cpu, Power, ShieldCheck, Database, Network, ArrowLeft, Monitor,
  Thermometer, Droplets, Activity, Wifi, ToggleLeft, ToggleRight, Settings,
  GitBranch, Briefcase, BarChart2, Code, Gauge, Beaker, Bot, Calculator, Megaphone
} from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function LabPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const major = await prisma.major.findFirst({
    where: { OR: [{ id: id }, { name: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') }] }
  });
  
  const majorName = major ? major.name : id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const renderLabContent = () => {
    const normalized = majorName.toLowerCase();
    
    if (normalized.includes('tjkt') || normalized.includes('jaringan')) {
      return (
        <div className="grid lg:grid-cols-4 gap-6">
            {/* Network Topology */}
            <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-8 border border-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="relative z-10">
                    <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-blue-400"><GitBranch size={24} /> Network Topology</h2>
                    <pre className="bg-black/50 p-6 rounded-2xl font-mono text-emerald-400 text-sm overflow-x-auto border border-emerald-900/50">
{`
         (Router_Edge)
             |
             | Internet
             |
          [Firewall]
             |
             +---[Switch_Core]---+
             |                   |
          [Server_Web]        [Server_DB]
             |                   |
             +---[Access_Point]--+
             |                   |
          [Client_PC1]       [Client_PC2]
`}
                    </pre>
                </div>
            </div>

            {/* Network Monitoring */}
            <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-8 border border-slate-800">
               <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-blue-400"><Monitor size={24} /> Network Monitoring</h2>
               <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-700">
                     <span>Router Status</span>
                     <span className="text-emerald-500 font-bold">ONLINE</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-700">
                     <span>Traffic (Mbps)</span>
                     <span className="text-yellow-500 font-bold">45.7</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-700">
                     <span>Latency (ms)</span>
                     <span className="text-blue-500 font-bold">12</span>
                  </div>
               </div>
               <button className="w-full mt-6 bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Settings size={18} /> Configure QoS
               </button>
            </div>

            {/* System Log */}
            <div className="lg:col-span-4 bg-black rounded-3xl p-8 border border-slate-800 font-mono text-xs text-emerald-500 h-64 overflow-y-auto">
                <p className="text-slate-500 mb-4 font-bold uppercase tracking-widest flex items-center gap-2 text-blue-400"><Terminal size={16} /> System Log</p>
                <div className="space-y-1">
                    <p className="text-blue-400">INFO: 2026-05-19 09:30:01 - Router_Edge: Link UP (Interface GE0/1)</p>
                    <p className="text-blue-400">INFO: 2026-05-19 09:30:05 - Switch_Core: Port F0/1 status UP</p>
                    <p className="text-yellow-400">WARN: 2026-05-19 09:30:10 - Server_Web: High CPU utilization (85%)</p>
                    <p className="text-emerald-400">SUCCESS: 2026-05-19 09:30:15 - Firewall: Policy updated successfully</p>
                    <p className="text-blue-400">INFO: 2026-05-19 09:30:20 - IoT_Gateway: 5 devices connected</p>
                    <p className="text-yellow-400">WARN: 2026-05-19 09:30:25 - Client_PC1: DNS resolution delay detected</p>
                    <p className="text-red-400">ERROR: 2026-05-19 09:30:30 - Server_DB: Disk I/O warning</p>
                    <p className="animate-pulse text-slate-400">&gt; waiting_for_new_events...</p>
                </div>
            </div>
        </div>
      );
    }
    if (normalized.includes('akuntansi')) {
        return (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Laporan Keuangan */}
            <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-8 border border-slate-800">
               <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-emerald-400"><Briefcase size={24} /> Financial Reports</h2>
               <div className="bg-black/50 p-6 rounded-2xl font-mono text-slate-200 text-sm overflow-x-auto h-64">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="border-b border-slate-700">
                       <th className="py-2">Deskripsi</th>
                       <th className="py-2 text-right">Debit</th>
                       <th className="py-2 text-right">Kredit</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr><td>Pendapatan Jasa</td><td className="text-right">Rp 50.000.000</td><td className="text-right">-</td></tr>
                     <tr><td>Beban Gaji</td><td className="text-right">-</td><td className="text-right">Rp 20.000.000</td></tr>
                     <tr><td>Beban Operasional</td><td className="text-right">-</td><td className="text-right">Rp 10.000.000</td></tr>
                     <tr><td>Kas</td><td className="text-right">Rp 20.000.000</td><td className="text-right">-</td></tr>
                   </tbody>
                 </table>
               </div>
            </div>

            {/* Tax Calculator */}
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
               <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-blue-400"><Calculator size={24} /> Tax Calculator</h2>
               <div className="space-y-4">
                  <div>
                     <label className="block text-sm font-bold text-slate-400 mb-2">Penghasilan Bruto</label>
                     <input type="number" className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl text-white" placeholder="Rp" />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-slate-400 mb-2">Pajak (%)</label>
                     <input type="number" className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl text-white" value="11" disabled />
                  </div>
                  <button className="w-full bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">Hitung Pajak</button>
               </div>
            </div>

            {/* Audit Trail */}
            <div className="lg:col-span-3 bg-black rounded-3xl p-8 border border-slate-800 font-mono text-xs text-yellow-400 h-48 overflow-y-auto">
                <p className="text-slate-500 mb-4 font-bold uppercase tracking-widest flex items-center gap-2 text-emerald-400"><Terminal size={16} /> Audit Trail Log</p>
                <div className="space-y-1">
                    <p className="text-white">AUDIT: 2026-05-19 10:05:12 - User 'Admin' updated 'Buku Besar'</p>
                    <p className="text-blue-400">INFO: 2026-05-19 10:05:30 - System: Automatic reconciliation initiated</p>
                    <p className="text-red-400">ALERT: 2026-05-19 10:06:01 - Fraud Detection: Anomaly in transaction ID #TXN789</p>
                    <p className="animate-pulse text-slate-400">&gt; awaiting_next_audit_event...</p>
                </div>
            </div>
          </div>
        );
    }
    if (normalized.includes('marketing')) {
        return (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Campaign Performance */}
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
               <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-pink-500"><BarChart2 size={24} /> Campaign Performance</h2>
               <div className="bg-black/50 h-48 rounded-2xl flex items-center justify-center text-slate-600 font-bold">Mockup Chart</div>
               <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div><p className="text-blue-400 text-xl font-bold">120K</p><p className="text-xs uppercase text-slate-500">Impressions</p></div>
                  <div><p className="text-emerald-400 text-xl font-bold">3.2%</p><p className="text-xs uppercase text-slate-500">CTR</p></div>
               </div>
            </div>

            {/* A/B Testing Sandbox */}
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
               <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-purple-500"><Megaphone size={24} /> A/B Test Sandbox</h2>
               <div className="space-y-4">
                  <div>
                     <label className="block text-sm font-bold text-slate-400 mb-2">Variant A</label>
                     <input type="text" className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl text-white" value="Headline: Future Ready" />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-slate-400 mb-2">Variant B</label>
                     <input type="text" className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl text-white" value="Headline: Innovate Today" />
                  </div>
                  <button className="w-full bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">Run A/B Test</button>
               </div>
            </div>

            {/* Social Media Dashboard */}
            <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-8 border border-slate-800">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-orange-500"><Network size={24} /> Social Media Dashboard</h2>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-700">
                        <p className="text-2xl font-black text-blue-400">1.2M</p>
                        <p className="text-xs uppercase text-slate-500">Reach</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-700">
                        <p className="text-2xl font-black text-emerald-400">25K</p>
                        <p className="text-xs uppercase text-slate-500">Engagements</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-700">
                        <p className="text-2xl font-black text-purple-400">5K</p>
                        <p className="text-xs uppercase text-slate-500">Conversions</p>
                    </div>
                </div>
            </div>
          </div>
        );
    }
    if (normalized.includes('ai') || normalized.includes('data') || normalized.includes('mesin')) {
        return (
            <div className="grid lg:grid-cols-4 gap-6">
               {/* Jupyter Notebook Embed */}
               <div className="lg:col-span-3 bg-white rounded-[3rem] p-10 border border-slate-200 shadow-xl overflow-hidden">
                  <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
                     <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-orange-500 rounded-full" />
                        <h2 className="text-2xl font-black text-slate-900">Research_Notebook_v1.ipynb</h2>
                     </div>
                     <div className="flex gap-2">
                        <button className="bg-slate-100 px-4 py-2 rounded-lg font-bold text-sm text-slate-700">Run All</button>
                        <button className="bg-blue-600 px-4 py-2 rounded-lg font-bold text-sm text-white">Save</button>
                     </div>
                  </div>

                  {/* Notebook Cell */}
                  <div className="space-y-6">
                     <div className="group">
                        <p className="text-xs font-bold text-slate-400 mb-2 font-mono">[1]: In</p>
                        <div className="bg-slate-900 p-6 rounded-2xl text-emerald-400 font-mono text-sm">
                          import pandas as pd <br/>
                          data = pd.read_csv('industri_data_v4.csv') <br/>
                          data.head()
                        </div>
                     </div>
                     <div className="group">
                        <p className="text-xs font-bold text-slate-400 mb-2 font-mono">[1]: Out</p>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-800 font-mono text-xs overflow-x-auto">
                          <table className="w-full text-left">
                            <thead><tr className="border-b border-slate-200"><th>ID</th><th>Suhu</th><th>Presisi</th></tr></thead>
                            <tbody>
                              <tr><td>0</td><td>28.4</td><td>0.98</td></tr>
                              <tr><td>1</td><td>27.9</td><td>0.99</td></tr>
                            </tbody>
                          </table>
                        </div>
                     </div>
                     <div className="group">
                        <p className="text-xs font-bold text-slate-400 mb-2 font-mono">[2]: In</p>
                        <div className="bg-slate-900 p-6 rounded-2xl text-emerald-400 font-mono text-sm">
                          # Visualisasi Prediksi <br/>
                          plot_predictions(data)
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right Sidebar - AI Tools */}
               <div className="space-y-6">
                  <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
                     <h3 className="font-black text-slate-400 uppercase tracking-widest text-xs mb-6 flex items-center gap-2"><Cpu size={16} className="text-blue-500" /> GPU Status</h3>
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold">NVIDIA RTX 4090</span>
                        <span className="text-blue-500 font-bold">85% Usage</span>
                     </div>
                     <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-[85%] h-full bg-blue-600" />
                     </div>
                     <p className="text-xs text-slate-500 mt-4">Dedicated to Model Training</p>
                  </div>

                  <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
                     <h3 className="font-black text-slate-400 uppercase tracking-widest text-xs mb-6 flex items-center gap-2"><Database size={16} className="text-emerald-500" /> Dataset Access</h3>
                     <button className="w-full bg-emerald-600 px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                        <Database size={18} /> Load New Dataset
                     </button>
                  </div>
                  <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
                     <h3 className="font-black text-slate-400 uppercase tracking-widest text-xs mb-6 flex items-center gap-2"><Bot size={16} className="text-purple-500" /> Model Deployment</h3>
                     <button className="w-full bg-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                        <Code size={18} /> Deploy to Cloud
                     </button>
                  </div>
               </div>
            </div>
        );
    }
    
    return (
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-center">
            <h2 className="text-2xl font-black text-blue-400 mb-4 flex items-center justify-center gap-3"><Gauge size={24} /> Modul Praktikum</h2>
            <p className="text-slate-400">Modul praktikum untuk {majorName} sedang dalam pengembangan atau belum tersedia. Silakan pilih jurusan lain.</p>
            <div className="mt-8">
              <Link href="/" className="bg-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">Kembali ke Beranda</Link>
            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <AIChatbot />
      {/* Header Lab */}
      <header className="flex items-center justify-between p-6 bg-slate-900 border-b border-slate-800">
        <Link href={`/majors/${id}`} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Kembali ke {majorName}
        </Link>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-white">Lab {majorName}</p>
            <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-black">Status: Online</p>
          </div>
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
            <Cpu size={24} className="text-white" />
          </div>
        </div>
      </header>

      {/* Main Lab Content */}
      <main className="p-6 max-w-7xl mx-auto">
        {renderLabContent()}
      </main>

      {/* Footer Info */}
      <footer className="mt-12 text-center text-slate-600 text-xs font-bold uppercase tracking-[0.2em] p-6">
         © 2026 SMK BHAIRAVA VIRTUAL LAB ENGINE
      </footer>
    </div>
  );
}
