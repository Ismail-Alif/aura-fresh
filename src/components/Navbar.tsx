"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOrderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOrderClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all w-full">
      {/* ================= 1. TOP ANNOUNCEMENT BAR (Matching Vocab Joy) ================= */}
      <div className="bg-slate-950 text-white py-2 px-3 sm:px-4 text-[11px] sm:text-xs font-medium border-b border-slate-800 w-full shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            <span className="flex h-2 w-2 sm:h-2.5 sm:w-2.5 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-amber-400 shrink-0">🔥 স্পেশাল অফার:</span>
            <span className="text-slate-200 truncate">সীমিত সময়ের ধামাকা অফারে মাত্র ৳৯৯৯ + ক্যাশ অন ডেলিভারি!</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo (Bio-Safe tag removed as requested) */}
        <div 
          onClick={() => scrollTo("hero")} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          {/* Concept 01 Aura Shield Icon */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center p-1.5 shadow-md shadow-emerald-600/15 group-hover:scale-105 transition-transform shrink-0">
            <svg viewBox="0 0 84 84" className="w-full h-full">
              <circle cx="42" cy="42" r="36" fill="none" stroke="#10b981" strokeWidth="5.5" strokeDasharray="180 35" strokeLinecap="round"/>
              <circle cx="42" cy="42" r="26" fill="none" stroke="#34d399" strokeWidth="1.8" opacity="0.4" strokeDasharray="6 5"/>
              <path d="M 42 20 C 54 32, 56 48, 42 60 C 28 48, 30 32, 42 20 Z" fill="#10b981"/>
              <path d="M 42 27 L 42 54" stroke="#022c22" strokeWidth="2.8" strokeLinecap="round"/>
              <circle cx="66" cy="20" r="3" fill="#34d399"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-sans">
                Aura<span className="text-emerald-600">Fresh</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block -mt-0.5">
              প্রাকৃতিক সুরক্ষা ও সতেজতা
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button onClick={() => scrollTo("features")} className="hover:text-emerald-600 transition-colors">
            কেন অনন্য?
          </button>
          <button onClick={() => scrollTo("science")} className="hover:text-emerald-600 transition-colors">
            ডুয়াল প্রযুক্তি
          </button>
          <button onClick={() => scrollTo("advisor")} className="hover:text-emerald-600 transition-colors">
            রুম ক্যালকুলেটর
          </button>
          <button onClick={() => scrollTo("pricing")} className="hover:text-emerald-600 transition-colors">
            প্যাকেজ ও মূল্য
          </button>
          <button onClick={() => scrollTo("faq")} className="hover:text-emerald-600 transition-colors">
            প্রশ্ন-উত্তর
          </button>
        </nav>

        {/* Action Button (No bag icon, guaranteed single line, no phone number) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOrderClick}
            className="whitespace-nowrap shrink-0 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm sm:text-base py-2.5 px-5 sm:px-6 rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            অর্ডার করুন
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollTo("features")}
            className="block w-full text-left font-semibold text-slate-700 hover:text-emerald-600 py-2"
          >
            কেন অনন্য?
          </button>
          <button
            onClick={() => scrollTo("science")}
            className="block w-full text-left font-semibold text-slate-700 hover:text-emerald-600 py-2"
          >
            বিজ্ঞান ও ডুয়াল প্রযুক্তি
          </button>
          <button
            onClick={() => scrollTo("advisor")}
            className="block w-full text-left font-semibold text-slate-700 hover:text-emerald-600 py-2"
          >
            রুম সাইজ ক্যালকুলেটর
          </button>
          <button
            onClick={() => scrollTo("pricing")}
            className="block w-full text-left font-semibold text-slate-700 hover:text-emerald-600 py-2"
          >
            প্যাকেজ ও দাম
          </button>
          <button
            onClick={() => scrollTo("faq")}
            className="block w-full text-left font-semibold text-slate-700 hover:text-emerald-600 py-2"
          >
            সাধারণ প্রশ্ন-উত্তর
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOrderClick();
              }}
              className="w-full text-center bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-md whitespace-nowrap"
            >
              এখনই অর্ডার করুন (ক্যাশ অন ডেলিভারি)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
