'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@ai-sdk/react';

export default function AIChatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/chat',
  } as any) as any;

  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-8 right-8 z-[10000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-6 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-10rem)] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 blur-2xl" />
               <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg">Bhairava AI</h3>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Now</span>
                    </div>
                  </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors relative z-10 text-slate-400 hover:text-white">
                  <X size={24} />
               </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              {messages.map((m: any, i: number) => (
                <motion.div
                  initial={{ opacity: 0, x: m.role === 'assistant' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'} items-end gap-3`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                       <Bot size={16} className="text-slate-500" />
                    </div>
                  )}
                  <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${
                    m.role === 'assistant' 
                      ? 'bg-white text-slate-700 rounded-bl-none border border-slate-100' 
                      : 'bg-blue-600 text-white rounded-br-none'
                  }`}>
                    {m.content}
                  </div>
                  {m.role === 'user' && (
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                       <User size={16} className="text-blue-600" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && messages[messages.length-1]?.role === 'user' && (
                <div className="flex justify-start items-center gap-3">
                   <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center">
                       <Bot size={16} className="text-slate-500" />
                   </div>
                   <div className="bg-white p-4 rounded-3xl rounded-bl-none border border-slate-100 shadow-sm">
                      <Loader2 size={16} className="animate-spin text-blue-600" />
                   </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-6 bg-white border-t border-slate-100">
              <div className="flex gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-400/10 transition-all">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Tanya tentang pendaftaran, jurusan, dll..."
                  className="flex-1 bg-transparent border-none outline-none px-4 py-2 font-bold text-slate-700 placeholder:text-slate-400"
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-slate-400 group relative overflow-hidden focus-visible:outline-4 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
      >
        <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
           {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
        </div>
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 border-4 border-white rounded-full animate-bounce" />
        )}
      </motion.button>
    </div>
  );
}
