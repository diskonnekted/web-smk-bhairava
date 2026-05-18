'use client';

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Bell,
  Edit3,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
import Modal from './Modal';
import EventForm from './EventForm';
import { deleteEvent } from '@/lib/actions/event';

interface EventClientProps {
  events: any[];
}

export default function EventClient({ events }: EventClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleEdit = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    setActiveMenu(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus agenda ini?')) {
      await deleteEvent(id);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Academic Calendar</h1>
          <p className="text-slate-500">Manage schedules, events, and industry deadlines</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-slate-900 border-2 border-slate-100 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
            <Bell size={18} />
            Emergency Alert
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
          >
            <Plus size={20} />
            Add Event
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calendar View Placeholder */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black text-slate-900">Mei 2026</h3>
            <div className="flex gap-2">
              <button className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"><ChevronLeft size={20} /></button>
              <button className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all"><ChevronRight size={20} /></button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-4 text-center mb-4">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
              <span key={day} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</span>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: 31 }).map((_, i) => (
              <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center font-bold transition-all cursor-pointer border-2
                ${i + 1 === 17 ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-400 border-transparent hover:border-blue-200'}`}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming List */}
        <div className="space-y-6">
          <h3 className="text-xl font-black text-slate-900 px-2">Agenda Terdekat</h3>
          <div className="space-y-4">
            {events.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-3xl text-slate-400 font-bold border-2 border-dashed border-slate-200">
                Belum ada agenda.
              </div>
            ) : (
              events.map(event => (
                <div key={event.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                  <div className={`absolute left-0 top-0 w-1.5 h-full ${event.type === 'PKL' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                  
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">{event.type}</span>
                    <div className="relative">
                      <button 
                        onClick={() => setActiveMenu(activeMenu === event.id ? null : event.id)}
                        className="text-slate-300 hover:text-slate-600 p-1"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                      
                      {activeMenu === event.id && (
                        <div className="absolute right-0 top-8 w-40 bg-white rounded-xl shadow-2xl border border-slate-100 z-20 overflow-hidden">
                          <button 
                            onClick={() => handleEdit(event)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                          >
                            <Edit3 size={14} className="text-blue-600" />
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(event.id)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={14} />
                            Hapus
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <h4 className="font-black text-slate-800 mb-4">{event.title}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                      <Clock size={14} className="text-blue-500" />
                      {new Date(event.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} - {new Date(event.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                        <MapPin size={14} className="text-emerald-500" />
                        {event.location}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedEvent ? 'Edit Agenda Sekolah' : 'Tambah Agenda Baru'}
      >
        <EventForm initialData={selectedEvent} onSuccess={closeModal} />
      </Modal>
    </div>
  );
}
