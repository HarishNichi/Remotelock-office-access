"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { 
  QrCode, Mail, Printer, Ban, Plus, 
  Calendar, User, DoorOpen, ChevronRight, Check
} from "lucide-react";

export default function VisitorsPage() {
  const { doors, visitors } = useSelector((state) => state.app);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="space-y-10 pb-20 mt-2"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl lg:text-4xl font-[950] tracking-tight text-slate-900 leading-none">来訪者発行</h2>
          <p className="text-base font-[800] text-slate-400 uppercase italic tracking-widest pl-0.5">
            QRチケットの発行と有効期限管理
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Visitor Issuance Form */}
        <div className="xl:col-span-7 rounded-[32px] bg-white border border-slate-200/60 shadow-sm transition-all p-12 flex flex-col relative overflow-hidden">
          {/* Aesthetic glow */}
          <div className="absolute top-0 right-0 h-64 w-64 bg-blue-50/30 blur-[100px] pointer-events-none" />
          
          <div className="flex items-center gap-6 mb-14 relative z-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-blue-600 text-white shadow-xl shadow-blue-200">
              <Plus size={28} strokeWidth={4} />
            </div>
            <h3 className="text-xl font-black tracking-tight uppercase text-slate-800">新規QRチケット発行</h3>
          </div>
          
          <form className="space-y-10 relative z-10 flex-1">
            <div className="flex flex-col gap-3.5">
              <label className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-400 ml-1.5 flex items-center gap-2">
                 <User size={14} strokeWidth={4} className="text-blue-500" />
                 来訪者名 / 会社名
              </label>
              <input 
                type="text"
                placeholder="例：株式会社ABC 井上様" 
                className="h-20 w-full rounded-[28px] border-2 border-slate-100 bg-slate-50/50 px-8 font-black text-slate-800 text-xl outline-none focus:border-blue-600 focus:bg-white focus:shadow-2xl focus:shadow-blue-50 transition-all placeholder:text-slate-300"
              />
            </div>
            
            <div className="flex flex-col gap-3.5">
              <label className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-400 ml-1.5 flex items-center gap-2">
                 <Calendar size={14} strokeWidth={4} className="text-blue-500" />
                 アクセス有効期間
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="relative group">
                    <input type="datetime-local" className="h-20 w-full rounded-[28px] border-2 border-slate-100 bg-slate-50/50 px-8 font-black text-slate-800 text-lg outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm" />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-blue-200 font-black text-[10px] uppercase tracking-widest italic">Start</div>
                 </div>
                 <div className="relative group">
                    <input type="datetime-local" className="h-20 w-full rounded-[28px] border-2 border-slate-100 bg-slate-50/50 px-8 font-black text-slate-800 text-lg outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm" />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-blue-200 font-black text-[10px] uppercase tracking-widest italic">End</div>
                 </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3.5">
              <label className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-400 ml-1.5 flex items-center gap-2">
                 <DoorOpen size={14} strokeWidth={4} className="text-blue-500" />
                 アクセス許可ドア
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-7 bg-slate-50/50 rounded-[34px] border border-slate-100/50">
                {doors.map(d => (
                  <label 
                    key={d.id} 
                    className="group relative flex items-center gap-4 bg-white p-5 rounded-[22px] border-2 border-transparent shadow-sm hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer select-none"
                  >
                    <div className="relative flex items-center justify-center h-7 w-7 rounded-lg border-2 border-slate-200 transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600">
                      <input type="checkbox" className="peer opacity-0 absolute inset-0 cursor-pointer z-10" />
                      <Check size={16} strokeWidth={4} className="text-white opacity-0 peer-checked:opacity-100" />
                    </div>
                    <span className="text-sm font-black text-slate-700 tracking-tight">{d.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="p-8 bg-blue-50 rounded-[32px] border border-blue-100/50 flex gap-6 items-start">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[12px] font-black shrink-0 shadow-lg shadow-blue-200 italic">i</div>
              <p className="text-[14px] font-bold text-blue-700/80 leading-relaxed italic uppercase tracking-wide">
                発行ボタンを選択すると、指定された来訪者の連絡先にチケットURLと解錠手順が即時に送信されます。
              </p>
            </div>
            
            <button className="h-24 w-full rounded-[34px] bg-slate-950 text-white font-[950] text-2xl shadow-2xl transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-5 group">
              <QrCode size={32} strokeWidth={3} className="text-blue-500 group-hover:rotate-6 transition-transform" />
              <span>QRチケットを発行 / 通知</span>
            </button>
          </form>
        </div>

        {/* Issued Tickets List Panel */}
        <div className="xl:col-span-5 rounded-[32px] bg-white border border-slate-200/60 shadow-sm transition-all p-10 flex flex-col h-full bg-slate-50/30">
          <h3 className="text-xl font-black tracking-tight uppercase text-slate-800 mb-10">発行済みログ</h3>
          
          <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {visitors.map(v => (
              <motion.div 
                key={v.id}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-[36px] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all"
              >
                 <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                         <div className={`h-3 w-3 rounded-full ${v.status === 'issued' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]' : 'bg-slate-300'} border-2 border-white`} />
                         <div className="flex flex-col">
                            <h4 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1.5">{v.name}</h4>
                            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">
                               <DoorOpen size={12} strokeWidth={3} />
                               {doors.find(d => d.id === v.door)?.name}
                            </div>
                         </div>
                      </div>
                      <span className={`inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-widest ${v.status === 'issued' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'} font-[950] italic`}>
                        {v.status === 'issued' ? '有効' : '終了'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between gap-4 rounded-[26px] bg-slate-50 p-6 shadow-inner border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-all">
                       <span className="font-mono text-xl font-[950] tracking-[0.4em] text-slate-800 pl-2">{v.code}</span>
                       <div className="flex gap-2">
                          <button className="h-11 w-11 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm"><Mail size={18} strokeWidth={3} /></button>
                          <button className="h-11 w-11 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all shadow-sm"><Printer size={18} strokeWidth={3} /></button>
                       </div>
                    </div>
                    
                    <div className="mt-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center italic border-t border-slate-50 pt-4">
                       有効期限: {v.valid}
                    </div>
                 </div>
              </motion.div>
            ))}
            {visitors.length === 0 && (
              <div className="py-24 text-center text-slate-200 font-black uppercase tracking-[0.3em] opacity-40 italic">No Tickets Issued</div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
