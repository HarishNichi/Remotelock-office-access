"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { 
  Wifi, WifiOff, AlertTriangle, CheckCircle2, 
  QrCode, Plus, Search, ArrowRight,
  ChevronRight
} from "lucide-react";
import { setSelectedDoorId } from "@/store";
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { doors, logs } = useSelector((state) => state.app);

  const offlineCount = doors.filter((d) => d.status !== "online").length;
  const todayUnlockCount = logs.filter((l) => l.result === "成功").length;
  const failedCount = logs.filter((l) => l.result === "失敗").length;

  const stats = [
    { title: "オンラインドア", value: doors.length - offlineCount, icon: Wifi, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "オフライン", value: offlineCount, icon: WifiOff, color: "text-slate-400", bg: "bg-slate-50" },
    { title: "本日の解錠回数", value: todayUnlockCount, icon: CheckCircle2, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "失敗回数", value: failedCount, icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-10"
    >
      {/* Page Title Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl lg:text-4xl font-[950] tracking-tight text-slate-900 leading-none">ホーム</h2>
        <p className="text-base font-[800] text-slate-400 uppercase italic tracking-widest pl-0.5">
          ドア状態、クイック操作、直近ログを1画面に集約
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {stats.map((item, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -5 }}
            className="flex items-center justify-between rounded-[32px] bg-white border border-slate-200/60 shadow-sm transition-all p-8 hover:shadow-xl hover:shadow-slate-100 group"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2 truncate">{item.title}</span>
              <span className="text-4xl font-[950] tracking-tighter text-slate-900 leading-none">{item.value}</span>
            </div>
            <div className={`flex h-16 w-16 items-center justify-center rounded-[24px] ${item.bg} transition-transform group-hover:rotate-6`}>
              <item.icon className={`h-8 w-8 ${item.color} stroke-[2.5]`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content Grid: Doors & Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
        
        {/* Door Status Card */}
        <div className="xl:col-span-7 rounded-[32px] bg-white border border-slate-200/60 shadow-sm transition-all p-10">
          <div className="flex items-center justify-between mb-10">
             <h3 className="text-xl font-black tracking-tight uppercase text-slate-800">ドア状態</h3>
             <button className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] italic hover:underline">すべて表示</button>
          </div>
          <div className="space-y-5">
            {doors.map((door) => (
              <div 
                key={door.id} 
                className="flex items-center justify-between rounded-[28px] bg-slate-50/50 p-6 hover:bg-slate-50 border border-slate-100/50 group transition-all cursor-default"
              >
                <div className="flex items-center gap-6">
                  <div className={`h-4 w-4 rounded-full ${door.status === 'online' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]' : 'bg-slate-300'}`} />
                  <div className="flex flex-col">
                    <span className="text-lg lg:text-xl font-black text-slate-800 tracking-tight leading-none mb-1.5">{door.name}</span>
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em] italic">最終通信: {door.lastSeen}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:inline-flex px-4 py-2 bg-white rounded-2xl border border-slate-200 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
                    Online Status
                  </div>
                  <button 
                    onClick={() => { dispatch(setSelectedDoorId(door.id)); router.push('/doors'); }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border-2 border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm"
                  >
                    <ArrowRight size={20} strokeWidth={3} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="xl:col-span-5 rounded-[32px] bg-white border border-slate-200/60 shadow-sm transition-all p-10 flex flex-col">
          <h3 className="text-xl font-black tracking-tight uppercase text-slate-800 mb-10">クイック操作</h3>
          <div className="space-y-5 flex-1 flex flex-col">
            
            <button 
              onClick={() => router.push('/members')}
              className="group w-full h-20 flex items-center justify-between rounded-[28px] bg-[#020617] p-8 text-white shadow-2xl shadow-slate-200 transition-all hover:scale-[1.02] active:scale-95"
            >
              <div className="flex items-center gap-4">
                <Plus size={24} strokeWidth={4} />
                <span className="text-xl font-black tracking-tight">メンバー追加</span>
              </div>
              <ChevronRight className="opacity-40 group-hover:translate-x-1" />
            </button>
            
            <button 
              onClick={() => router.push('/visitors')}
              className="group w-full h-20 flex items-center justify-between rounded-[28px] border-2 border-slate-100 bg-white p-8 text-slate-900 transition-all hover:border-slate-800 active:scale-95"
            >
              <div className="flex items-center gap-4">
                <QrCode size={24} strokeWidth={3} className="text-blue-600" />
                <span className="text-xl font-black tracking-tight">来訪者QR発行</span>
              </div>
              <ChevronRight className="text-slate-200 group-hover:translate-x-1" />
            </button>

            <div className="mt-10 rounded-[32px] bg-slate-50/80 p-8 border border-slate-200/50 shadow-inner">
              <span className="mb-5 block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">
                メンバー無効化を検索
              </span>
              <div className="flex gap-3">
                <input 
                  type="text"
                  placeholder="氏名・メールアドレス" 
                  className="h-16 flex-1 rounded-[22px] border-2 border-slate-100 bg-white px-6 font-bold text-slate-800 outline-none focus:border-blue-600 transition-all shadow-sm" 
                />
                <button 
                  onClick={() => router.push('/members')}
                  className="h-16 w-16 flex-shrink-0 flex items-center justify-center rounded-[22px] bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-90"
                >
                  <Search size={24} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Logs Table */}
      <div className="rounded-[32px] bg-white border border-slate-200/60 shadow-sm transition-all p-10 overflow-hidden">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-xl font-black tracking-tight uppercase text-slate-800">直近ログ</h3>
          <button onClick={() => router.push('/logs')} className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] italic hover:underline">全履歴を見る</button>
        </div>
        
        <div className="overflow-x-auto -mx-10 px-10">
          <table className="w-full min-w-[800px] border-separate border-spacing-y-4">
            <thead>
              <tr className="text-left">
                <th className="pb-4 pl-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">日時</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">ユーザー</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">ドア</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">結果</th>
                <th className="pb-4 pr-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">方式</th>
              </tr>
            </thead>
            <tbody>
              {logs.slice(0, 5).map((log) => (
                <tr key={log.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="py-5 pl-6 bg-slate-50/50 rounded-l-[24px] group-hover:bg-transparent">
                    <span className="text-[11px] font-black text-slate-400 italic tracking-tight font-mono">{log.at}</span>
                  </td>
                  <td className="py-5 font-black text-slate-800 tracking-tight text-lg bg-slate-50/50 group-hover:bg-transparent">{log.user}</td>
                  <td className="py-5 font-bold text-slate-500 bg-slate-50/50 group-hover:bg-transparent">{log.door}</td>
                  <td className="py-5 bg-slate-50/50 group-hover:bg-transparent">
                    <div className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 border ${log.result === '成功' ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50' : 'bg-rose-50 text-rose-600 border-rose-100/50'}`}>
                       <div className={`h-2 w-2 rounded-full ${log.result === '成功' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`} />
                       <span className="text-[11px] font-[950] uppercase tracking-widest">{log.result}</span>
                    </div>
                  </td>
                  <td className="py-5 pr-6 bg-slate-50/50 rounded-r-[24px] group-hover:bg-transparent">
                    <span className="rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-[10px] font-black text-slate-500 tracking-widest uppercase italic">{log.method}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
