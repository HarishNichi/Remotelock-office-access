"use client";

import React from "react";
import { 
  Shield, Bell, ChevronRight 
} from "lucide-react";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/constants";

export default function Sidebar({ setMobileOpen }) {
  const pathname = usePathname();
  
  const activeKey = NAV_ITEMS.find(item => {
    if (item.key === 'home') return pathname === '/';
    return pathname.startsWith(`/${item.key}`);
  })?.key || 'home';

  return (
    <div className="flex flex-col h-full bg-slate-950 px-5 py-9 text-white select-none overflow-y-auto custom-scrollbar">
      {/* Brand Logo */}
      <div className="mb-12 flex items-center gap-4 px-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-xl shadow-blue-900/40 border border-blue-500/20">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black leading-none tracking-tight">Access Admin</span>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">RemoteLOCK 9j-Q</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2 flex-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = activeKey === item.key;
          return (
            <Link
              key={item.key}
              href={item.key === 'home' ? '/' : `/${item.key}`}
              onClick={() => setMobileOpen?.(false)}
              className={`group flex w-full items-center gap-4 rounded-[22px] px-5 py-4 text-sm transition-all duration-300 ${
                active 
                ? "bg-white text-slate-900 shadow-2xl shadow-white/5 font-black scale-[1.02]" 
                : "text-slate-400 hover:bg-slate-900/50 hover:text-white"
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${active ? 'bg-slate-100 text-slate-950' : 'group-hover:text-white'}`}>
                <Icon size={18} className="stroke-[2.5]" />
              </div>
              <span className="tracking-tight">{item.label}</span>
              {active && <ChevronRight size={16} className="ml-auto text-blue-600 stroke-[3]" />}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer Component */}
      <div className="mt-10 rounded-[30px] border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">
          <Bell size={14} className="stroke-[3]" />
          本日の注意
        </div>
        <p className="text-[12px] leading-relaxed text-slate-400 font-bold">
          子会社の失敗アクセスが 1 件あります。管理者はログをご確認ください。
        </p>
      </div>
    </div>
  );
}
