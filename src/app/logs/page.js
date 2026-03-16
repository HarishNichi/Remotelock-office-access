"use client";

import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Download, Search, Filter, Calendar as CalendarIcon, ChevronDown, DoorOpen } from "lucide-react";
import { setLogSearch } from "@/store";
import { filterLogs } from "@/utils";

export default function LogsPage() {
  const dispatch = useDispatch();
  const { logs, logSearch, doors } = useSelector((state) => state.app);

  const filteredLogs = useMemo(() => 
    filterLogs(logs, logSearch), 
  [logs, logSearch]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-10 pb-20 mt-2"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl lg:text-4xl font-[950] tracking-tight text-slate-900 leading-none">ログ表示</h2>
          <p className="text-base font-[800] text-slate-400 uppercase italic tracking-widest pl-0.5">
            全アクセスの監査・CSVエクスポート
          </p>
        </div>
        <button className="group flex items-center justify-center gap-4 rounded-[28px] border-2 border-slate-950 bg-white px-10 py-6 text-xl font-[950] text-slate-950 shadow-2xl shadow-slate-200 transition-all hover:bg-slate-950 hover:text-white active:scale-95">
          <Download size={24} strokeWidth={4} />
          <span>CSV出力</span>
        </button>
      </div>

      <div className="rounded-[32px] bg-white border border-slate-200/60 shadow-sm transition-all overflow-hidden border-2 border-slate-100 flex flex-col">
        {/* Filtering Header Panel */}
        <div className="p-10 bg-slate-50/60 border-b-2 border-slate-100 relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 h-40 w-40 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end relative z-10">
            <div className="md:col-span-6 flex flex-col gap-3.5">
               <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-1.5 flex items-center gap-2">
                  <Search size={14} strokeWidth={4} className="text-blue-500" />
                  キーワード検索
               </label>
               <input 
                 type="text"
                 placeholder="ユーザー名、ドア、認証方式..." 
                 className="h-16 w-full rounded-[24px] border-2 border-slate-200 bg-white px-8 font-[800] text-slate-800 text-lg outline-none focus:border-blue-600 focus:shadow-xl focus:shadow-blue-50 transition-all"
                 value={logSearch}
                 onChange={(e) => dispatch(setLogSearch(e.target.value))}
               />
            </div>
            
            <div className="md:col-span-3 flex flex-col gap-3.5">
               <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-1.5 flex items-center gap-2">
                  <CalendarIcon size={14} strokeWidth={4} className="text-blue-500" />
                  対象期間
               </label>
               <div className="relative group">
                  <select className="h-16 w-full rounded-[24px] border-2 border-slate-200 bg-white px-7 font-black text-slate-900 text-lg appearance-none cursor-pointer focus:border-blue-600 outline-none pr-12 transition-all">
                    <option value="today">今日のみ</option>
                    <option value="7days" selected>直近7日間</option>
                    <option value="30days">直近30日間</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-blue-600 transition-colors" size={20} strokeWidth={3} />
               </div>
            </div>

            <div className="md:col-span-3 flex flex-col gap-3.5">
               <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-1.5 flex items-center gap-2">
                  <Filter size={14} strokeWidth={4} className="text-blue-500" />
                  ドア指定
               </label>
               <div className="relative group">
                  <select className="h-16 w-full rounded-[24px] border-2 border-slate-200 bg-white px-7 font-black text-slate-900 text-lg appearance-none cursor-pointer focus:border-blue-600 outline-none pr-12 transition-all">
                    <option value="all">すべてのドア</option>
                    {doors.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-blue-600 transition-colors" size={20} strokeWidth={3} />
               </div>
            </div>
          </div>
        </div>
        
        {/* Logs Audit Table Container */}
        <div className="overflow-x-auto min-h-[600px] flex flex-col">
          <table className="w-full min-w-[1000px] border-collapse bg-white">
            <thead>
              <tr className="bg-slate-50/30 text-left border-b-2 border-slate-50">
                <th className="px-10 py-8 text-[11px] font-[950] uppercase tracking-[0.3em] text-slate-400 italic">日時</th>
                <th className="px-10 py-8 text-[11px] font-[950] uppercase tracking-[0.3em] text-slate-400 italic">アクセスユーザー</th>
                <th className="px-10 py-8 text-[11px] font-[950] uppercase tracking-[0.3em] text-slate-400 italic">アクセス先</th>
                <th className="px-10 py-8 text-[11px] font-[950] uppercase tracking-[0.3em] text-slate-400 italic text-center">結果</th>
                <th className="px-10 py-8 text-[11px] font-[950] uppercase tracking-[0.3em] text-slate-400 italic text-right">認証方式</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="group hover:bg-slate-50/50 transition-all cursor-default">
                  <td className="px-10 py-8 truncate">
                    <span className="text-xs font-black text-slate-400 font-mono tracking-tight uppercase">{log.at}</span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                       <div className="h-11 w-11 rounded-2xl bg-[#020617] text-white flex items-center justify-center text-sm font-black shadow-lg relative overflow-hidden">
                          <div className="absolute inset-0 bg-blue-500/20 blur-[6px] translate-x-3 translate-y-3" />
                          <span className="relative z-10">{log.user[0]}</span>
                       </div>
                       <span className="text-lg font-[950] text-slate-800 tracking-tight leading-none group-hover:text-blue-700 transition-colors">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="font-black text-slate-600 tracking-tight flex items-center gap-3">
                       <DoorOpen size={16} className="text-slate-300" />
                       {log.door}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <div className={`inline-flex items-center gap-3 rounded-2xl px-5 py-2.5 border-2 ${log.result === '成功' ? 'bg-emerald-50 text-emerald-700 border-emerald-100/30' : 'bg-rose-50 text-rose-700 border-rose-100/30'} shadow-sm`}>
                       <div className={`h-2 w-2 rounded-full ${log.result === '成功' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]' : 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)]'}`} />
                       <span className="text-[11px] font-[950] uppercase tracking-[0.2em]">{log.result}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <span className="inline-block rounded-xl bg-slate-100/50 border border-slate-100 px-4 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{log.method}</span>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                   <td colSpan="5" className="py-24 text-center text-slate-200 font-black uppercase tracking-[0.4em] italic text-lg opacity-50">No activity logs found</td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Pagination Mock Footer */}
          <div className="mt-auto p-10 border-t border-slate-50 flex items-center justify-between">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Showing {filteredLogs.length} of {logs.length} records</span>
             <div className="flex gap-4">
                <button className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 cursor-not-allowed border border-slate-100"><ChevronDown className="rotate-90" /></button>
                <div className="h-12 w-12 rounded-xl bg-[#020617] flex items-center justify-center text-white font-black shadow-lg">1</div>
                <button className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 border border-slate-100 transition-all font-bold opacity-30 cursor-not-allowed italic">2</button>
                <button className="h-12 w-12 rounded-xl bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 border border-slate-100 transition-all"><ChevronDown className="-rotate-90" /></button>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
