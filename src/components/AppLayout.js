"use client";

import React, { useState } from "react";
import { 
  Bell, Menu as MenuIcon, X 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex relative overflow-hidden">
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-[270px] h-screen bg-slate-950 border-r border-white/5 flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Main Container */}
      <div className="flex-1 h-screen overflow-y-auto custom-scrollbar flex flex-col">
        <main className="p-4 lg:p-8 w-full max-w-[1500px] mx-auto flex flex-col flex-1">
          
          {/* Floating Header Card */}
          <header className="mb-8 flex items-center justify-between gap-6 rounded-[34px] border border-slate-200 bg-white px-7 py-6 shadow-sm transition-all flex-shrink-0">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setMobileOpen(true)} 
                className="lg:hidden flex items-center justify-center h-12 w-12 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-600 border border-slate-200"
              >
                <MenuIcon size={26} strokeWidth={2.5} />
              </button>
              
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1.5">
                  オフィス入退室管理システム
                </span>
                <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight leading-none">
                  軽量モック / ドア3・管理者4名
                </h1>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <div className="inline-flex items-center rounded-full bg-blue-50 px-5 py-2 text-[11px] font-black uppercase tracking-widest text-blue-700 border border-blue-100/50">
                 Owner 1 / Admin 3
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Last Update</span>
                <span className="text-xs font-black text-slate-600">2026/03/07 10:30</span>
              </div>
            </div>
          </header>

          <section className="flex-1 w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
            {children}
          </section>
        </main>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[200] lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-slate-950 z-[201] lg:hidden shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setMobileOpen(false)}
                className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-[202]"
                aria-label="Close sidebar"
              >
                <X size={24} strokeWidth={3} />
              </button>
              <Sidebar setMobileOpen={setMobileOpen} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
