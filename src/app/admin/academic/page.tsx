import React from 'react';
import { prisma } from '@/lib/prisma';
import { BookOpen, Award, FileText, Plus, ExternalLink, Trash2 } from 'lucide-react';

async function getAcademicData() {
  const majors = await prisma.major.findMany({
    include: {
      curriculums: true,
      projects: true,
    }
  });
  return majors;
}

export default async function AcademicPage() {
  const majors = await getAcademicData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black text-slate-900 mb-2">Kurikulum & Proyek</h1>
        <p className="text-slate-500">Kelola dokumen kurikulum dan portofolio proyek industri siswa</p>
      </div>

      <div className="grid gap-12">
        {majors.map((major) => (
          <div key={major.id} className="space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <BookOpen size={20} />
              </div>
              <h2 className="text-2xl font-black text-slate-800">{major.name}</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Curriculums */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FileText size={18} className="text-blue-600" />
                    Dokumen Kurikulum
                  </h3>
                  <button className="text-xs font-black text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all uppercase tracking-widest">
                    Upload Baru
                  </button>
                </div>
                <div className="space-y-3">
                  {major.curriculums.length === 0 ? (
                    <p className="text-sm text-slate-400 italic py-4">Belum ada kurikulum yang diunggah.</p>
                  ) : (
                    major.curriculums.map(curr => (
                      <div key={curr.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-blue-50 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-100">
                            v{curr.version}
                          </div>
                          <span className="font-bold text-slate-700 text-sm">{curr.title}</span>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><ExternalLink size={16} /></button>
                          <button className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Projects */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <Award size={18} className="text-emerald-600" />
                    Proyek Unggulan
                  </h3>
                  <button className="text-xs font-black text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-all uppercase tracking-widest">
                    Tambah Proyek
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {major.projects.length === 0 ? (
                    <p className="text-sm text-slate-400 italic py-4">Belum ada proyek yang ditampilkan.</p>
                  ) : (
                    major.projects.map(project => (
                      <div key={project.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl group hover:bg-emerald-50 transition-all">
                        <div className="w-16 h-16 bg-white rounded-xl flex-shrink-0 flex items-center justify-center text-slate-300 overflow-hidden border border-slate-100">
                          {project.imageUrl ? (
                            <img src={project.imageUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Award size={24} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-800 text-sm mb-1">{project.title}</h4>
                          <p className="text-xs text-slate-500 line-clamp-1">{project.description}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"><ExternalLink size={16} /></button>
                          <button className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
