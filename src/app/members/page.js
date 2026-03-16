"use client";

import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { KeyRound, RefreshCw, Ban, Plus, Search, Check, ChevronRight, DoorOpen } from "lucide-react";
import { 
  setMemberSearch, setSelectedMemberId, disableMember, regeneratePin
} from "@/store";
import { filterMembers } from "@/utils";

export default function MembersPage() {
  const dispatch = useDispatch();
  const { 
    members, doors, memberSearch, selectedMemberId 
  } = useSelector((state) => state.app);

  const selectedMember = useMemo(() => 
    members.find(m => m.id === selectedMemberId) || members[0], 
  [members, selectedMemberId]);

  const filteredMembers = useMemo(() => 
    filterMembers(members, memberSearch), 
  [members, memberSearch]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="space-y-10 pb-20 mt-2"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl lg:text-4xl font-[950] tracking-tight text-slate-900 leading-none">メンバー</h2>
          <p className="text-base font-[800] text-slate-400 uppercase italic tracking-widest pl-0.5">
            登録メンバーの管理・権限設定
          </p>
        </div>
        <button className="group flex items-center justify-center gap-4 rounded-[28px] bg-slate-950 px-10 py-6 text-xl font-[950] text-white shadow-2xl shadow-slate-200 transition-all hover:scale-[1.02] active:scale-95">
          <Plus size={24} strokeWidth={4} />
          <span>メンバーを追加</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Member List Panel */}
        <div className="xl:col-span-4 rounded-[32px] bg-white border border-slate-200/60 shadow-sm transition-all p-10 flex flex-col h-[800px]">
          <h3 className="text-xl font-black tracking-tight uppercase text-slate-800 mb-8">メンバー一覧</h3>
          
          <div className="relative mb-8 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={22} strokeWidth={3} />
            <input 
              type="text"
              placeholder="名前・メールで検索" 
              className="h-16 w-full rounded-[24px] border-2 border-slate-100 bg-slate-50/50 pl-16 pr-6 font-bold text-slate-800 outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm"
              value={memberSearch}
              onChange={(e) => dispatch(setMemberSearch(e.target.value))}
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-3 custom-scrollbar">
            {filteredMembers.map((member) => (
              <div 
                key={member.id}
                onClick={() => dispatch(setSelectedMemberId(member.id))}
                className={`group cursor-pointer rounded-[30px] border-2 p-6 transition-all duration-300 ${
                  selectedMemberId === member.id 
                  ? 'border-blue-600 bg-blue-50/40 shadow-xl shadow-blue-100/50' 
                  : 'border-transparent bg-slate-50/50 hover:bg-white hover:border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black shadow-inner transition-all ${selectedMemberId === member.id ? 'bg-blue-600 text-white shadow-blue-400' : 'bg-slate-900 text-white'}`}>
                      {member.name[0]}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className={`text-lg font-black tracking-tight leading-none mb-1.5 transition-colors ${selectedMemberId === member.id ? 'text-blue-700' : 'text-slate-800'}`}>
                        {member.name}
                      </span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate italic">{member.email}</span>
                    </div>
                  </div>
                  <div className={`h-2.5 w-2.5 rounded-full ${member.active ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]' : 'bg-slate-300'}`} />
                </div>
              </div>
            ))}
            {filteredMembers.length === 0 && (
              <div className="py-20 text-center text-slate-300 font-black uppercase tracking-[0.3em] italic">No Members Found</div>
            )}
          </div>
        </div>
        
        {/* Member Details Panel */}
        <div className="xl:col-span-8 rounded-[32px] bg-white border border-slate-200/60 shadow-sm transition-all p-12 overflow-hidden relative">
          {/* Aesthetic background glow */}
          <div className="absolute -top-24 -right-24 h-96 w-96 bg-blue-50/30 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="flex items-center justify-between mb-12 relative z-10">
             <h3 className="text-xl font-black tracking-tight uppercase text-slate-800">メンバー詳細設定</h3>
             <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Member ID: #{selectedMember.id.toString().padStart(4, '0')}</span>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-blue-700 font-[950] italic scale-110">{selectedMember.role}</span>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14 relative z-10">
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">氏名</label>
              <input readOnly value={selectedMember.name} className="h-16 w-full rounded-[22px] bg-slate-50/80 border-2 border-slate-100 px-7 font-black text-slate-900 text-xl outline-none" />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">メールアドレス</label>
              <input readOnly value={selectedMember.email} className="h-16 w-full rounded-[22px] bg-slate-50/80 border-2 border-slate-100 px-7 font-black text-slate-900 text-lg outline-none truncate" />
            </div>
          </div>
          
          <div className="mb-14 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
              <div className="flex flex-col gap-1.5">
                <h4 className="text-xl font-black text-slate-900 tracking-tight uppercase">権限ドア設定</h4>
                <p className="text-sm font-bold text-slate-400 uppercase italic tracking-wider">アクセス許可を個別に割り当てます</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {doors.map(door => (
                <div 
                  key={door.id}
                  className={`group relative flex flex-col items-center justify-center rounded-[32px] border-2 p-10 transition-all cursor-pointer ${
                    selectedMember.doors.includes(door.id) 
                    ? 'border-blue-600 bg-[#020617] text-white shadow-2xl shadow-blue-200/50' 
                    : 'border-slate-50 bg-slate-50/50 text-slate-400 grayscale hover:grayscale-0 hover:bg-white hover:border-slate-200'
                  }`}
                >
                  {selectedMember.doors.includes(door.id) && (
                    <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                       <Check size={18} strokeWidth={4} className="text-white" />
                    </div>
                  )}
                  <DoorOpen size={32} className={`mb-4 transition-transform group-hover:scale-110 ${selectedMember.doors.includes(door.id) ? 'text-blue-400' : 'text-slate-300'}`} />
                  <span className={`text-base font-black uppercase tracking-[0.2em] ${selectedMember.doors.includes(door.id) ? 'text-white' : 'text-slate-400'}`}>
                    {door.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-slate-100 mb-14" />

          <div className="mb-16 relative z-10">
            <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 ml-1">認証用PINコード</label>
            <div className="mt-5 flex flex-col sm:flex-row gap-6">
              <div className="flex flex-1 h-24 items-center justify-center gap-12 rounded-[34px] border-[4px] border-slate-100 bg-white px-10 shadow-inner">
                <KeyRound className="h-10 w-10 text-blue-600 stroke-[2.5]" />
                <span className="text-5xl font-black tracking-[0.6em] text-slate-900 font-mono pl-4">{selectedMember.pin}</span>
              </div>
              <button 
                onClick={() => dispatch(regeneratePin(selectedMember.id))}
                className="h-24 px-12 rounded-[34px] border-2 border-slate-900 font-black text-xl text-slate-900 bg-white hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-100 flex items-center justify-center gap-4 group flex-shrink-0 whitespace-nowrap"
              >
                <RefreshCw size={24} strokeWidth={3} className="group-active:rotate-180 transition-transform duration-500" />
                <span>再発行</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-6 pt-10 border-t border-slate-50 mt-auto relative z-10">
            <button className="h-20 px-16 rounded-[28px] bg-slate-950 font-black text-xl text-white shadow-2xl shadow-slate-300 hover:scale-[1.02] active:scale-95 transition-all">
              変更を保存
            </button>
            <button 
              onClick={() => dispatch(disableMember(selectedMember.id))}
              className={`h-20 px-16 rounded-[28px] border-2 font-black text-xl flex items-center justify-center gap-4 transition-all shadow-xl active:scale-95 ${
                selectedMember.active 
                ? 'border-rose-100 bg-rose-50/50 text-rose-600 hover:bg-rose-600 hover:text-white hover:shadow-rose-100' 
                : 'border-emerald-100 bg-emerald-50/50 text-emerald-600 cursor-not-allowed opacity-50'
              }`}
            >
              <Ban size={24} strokeWidth={3} />
              <span>{selectedMember.active ? 'メンバー無効化' : '無効化済み'}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
