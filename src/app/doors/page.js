"use client";

import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { 
  ChevronRight, Settings, Battery, Info, DoorOpen, 
  Wifi, ShieldCheck, Activity, Smartphone,
  Ban
} from "lucide-react";
import { setSelectedDoorId } from "@/store";

export default function DoorsPage() {
  const dispatch = useDispatch();
  const { doors, members, selectedDoorId } = useSelector((state) => state.app);

  const selectedDoor = useMemo(() => 
    doors.find(d => d.id === selectedDoorId) || doors[0], 
  [doors, selectedDoorId]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="space-y-10 pb-20 mt-2"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl lg:text-4xl font-[950] tracking-tight text-slate-900 leading-none">ドア</h2>
          <p className="text-base font-[800] text-slate-400 uppercase italic tracking-widest pl-0.5">
            ロックデバイスの状態と許可設定
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Door List Panel */}
        <div className="xl:col-span-4 rounded-[32px] bg-white border border-slate-200/60 shadow-sm transition-all p-10 flex flex-col">
          <h3 className="text-xl font-black tracking-tight uppercase text-slate-800 mb-8">ドア一覧</h3>
          
          <div className="space-y-5">
            {doors.map((door) => (
              <div 
                key={door.id}
                onClick={() => dispatch(setSelectedDoorId(door.id))}
                className={`group cursor-pointer rounded-[32px] border-2 p-7 transition-all duration-300 ${
                  selectedDoorId === door.id 
                  ? 'border-blue-600 bg-[#020617] text-white shadow-2xl shadow-blue-900/40' 
                  : 'border-slate-50 bg-slate-50/50 hover:bg-white hover:border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-[22px] shadow-inner transition-all ${selectedDoorId === door.id ? 'bg-blue-600' : 'bg-white border border-slate-100 text-slate-300'}`}>
                      <DoorOpen size={28} strokeWidth={selectedDoorId === door.id ? 2.5 : 2} className={selectedDoorId === door.id ? 'text-white' : ''} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl font-black tracking-tight leading-none mb-1.5">{door.name}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest italic ${selectedDoorId === door.id ? 'text-slate-400' : 'text-slate-400'}`}>
                        {door.location}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={22} className={`transition-transform duration-300 ${selectedDoorId === door.id ? 'translate-x-2 text-blue-400' : 'text-slate-200'}`} strokeWidth={3} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Door Details Panel */}
        <div className="xl:col-span-8 rounded-[32px] bg-white border border-slate-200/60 shadow-sm transition-all p-12 overflow-hidden relative">
          {/* Aesthetic glow */}
          <div className="absolute -top-24 -left-24 h-96 w-96 bg-emerald-50/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="flex items-center justify-between mb-12 relative z-10">
             <div className="flex flex-col gap-1">
                <h3 className="text-xl font-black tracking-tight uppercase text-slate-800">{selectedDoor.name} の詳細管理</h3>
                <p className="text-sm font-bold text-slate-400 uppercase italic tracking-widest pl-0.5">Hardware & Permissions</p>
             </div>
             <button className="h-14 w-14 flex items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-300 hover:text-slate-900 hover:border-slate-900 transition-all">
                <Settings size={24} strokeWidth={2.5} />
             </button>
          </div>
          
          {/* Hardware Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 relative z-10">
            <div className="flex flex-col items-center justify-center rounded-[36px] bg-slate-50/50 p-10 border border-slate-100/50 shadow-inner group">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 group-hover:text-blue-600 transition-colors">通信状態</span>
              <div className={`inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 border-2 shadow-sm transition-all ${selectedDoor.status === 'online' ? 'border-emerald-100 text-emerald-600' : 'border-slate-100 text-slate-400'}`}>
                <Wifi size={18} strokeWidth={3} />
                <span className="text-xs font-black uppercase tracking-widest">{selectedDoor.status === 'online' ? '良好' : '停止中'}</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-[36px] bg-slate-50/50 p-10 border border-slate-100/50 shadow-inner group">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 group-hover:text-blue-600 transition-colors">許可ユーザー</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black tracking-tighter text-slate-900">{selectedDoor.members}</span>
                <span className="text-[12px] font-black text-slate-400 uppercase italic">Members</span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-[36px] bg-slate-50/50 p-10 border border-slate-100/50 shadow-inner group">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 group-hover:text-blue-600 transition-colors">バッテリー</span>
              <div className="flex items-center gap-3">
                <Battery size={28} strokeWidth={3} className="text-emerald-500 transition-transform group-hover:scale-110" />
                <span className="text-3xl font-[950] text-slate-900 tracking-tight">85%</span>
              </div>
            </div>
          </div>
          
          {/* Permitted Members List */}
          <div className="mb-14 relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                 <h4 className="text-xl font-black text-slate-900 tracking-tight uppercase">許可されているメンバー</h4>
                 <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-blue-700 px-4 py-1.5 opacity-80">{members.filter(m => m.doors.includes(selectedDoor.id) && m.active).length}名</span>
              </div>
              <button className="text-[12px] font-[950] text-blue-600 uppercase tracking-widest italic hover:underline">一括解除</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {members.filter(m => m.doors.includes(selectedDoor.id) && m.active).map(m => (
                <div key={m.id} className="group flex items-center justify-between rounded-[30px] border-2 border-slate-50 bg-slate-50/20 p-6 transition-all hover:bg-white hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100/50">
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 rounded-2xl bg-slate-950 flex items-center justify-center text-[13px] font-black text-white shadow-lg overflow-hidden relative">
                       {/* Subtle highlight */}
                       <div className="absolute inset-0 bg-blue-500/20 blur-[10px] rounded-full translate-x-3 translate-y-3" />
                       <span className="relative z-10">{m.name[0]}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-slate-800 tracking-tight leading-none mb-1.5">{m.name}</span>
                      <span className="text-[11px] font-bold text-slate-400 uppercase italic tracking-widest">{m.role}</span>
                    </div>
                  </div>
                  <button className="h-10 w-10 flex items-center justify-center rounded-xl text-rose-500 opacity-0 group-hover:opacity-100 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100">
                    <Ban size={20} strokeWidth={3} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hardware Meta Section */}
          <div className="mt-auto relative z-10 p-12 bg-slate-950 rounded-[44px] text-white shadow-2xl shadow-blue-900/30 overflow-hidden group">
             {/* Dynamic background elements */}
             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] group-hover:scale-110 transition-transform duration-1000" />
             <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px]" />
             
             <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 relative z-10">
               <div className="space-y-6 flex-1">
                 <div className="inline-flex items-center gap-3 rounded-xl bg-blue-500/10 px-4 py-2 border border-blue-500/20">
                    <Activity size={16} className="text-blue-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">System Monitoring</span>
                 </div>
                 <div className="space-y-2">
                    <h5 className="text-3xl font-[950] tracking-tight text-white leading-none">RemoteLOCK 9j-Q <span className="text-slate-600 ml-3 font-black italic">LTE PRO</span></h5>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">Next-Generation Enterprise Access Hardware</p>
                 </div>
                 <div className="flex flex-wrap gap-4">
                    <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black tracking-widest text-slate-400 font-mono">ID: RL-9JQ-2026-X883</div>
                    <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black tracking-widest text-slate-400 font-mono flex items-center gap-2">
                       <Smartphone size={14} className="text-slate-600" /> 
                       FIRMWARE: v4.2.0-STABLE
                    </div>
                 </div>
               </div>
               
               <button className="h-24 px-12 rounded-[32px] bg-white text-slate-950 font-black text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-4 group/btn">
                  <ShieldCheck size={28} strokeWidth={3} className="group-hover/btn:rotate-12 transition-transform" />
                  <span>診断ツールを起動</span>
               </button>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
