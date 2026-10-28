"use client";

import React, { useState } from "react";
import { Wind, ShoppingBag, ShieldCheck, PhoneCall, Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white text-xs sm:text-sm py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>আজকের অফার: যেকোনো ২টি প্যাকেজ অর্ডার করলেই <b>সারাদেশে ফ্রি হোম ডেলিভারি!</b></span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => scrollTo("hero")} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform relative">
            <Wind className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-purple-600 border-2 border-white"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Aura<span className="text-emerald-600">Fresh</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                BIO-CHEM
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block -mt-0.5">
              ন্যাচারাল দুর্গন্ধ শোষক ও পিউরিফায়ার
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button onClick={() => scrollTo("features")} className="hover:text-emerald-600 transition-colors">
            কেন অনন্য?
          </button>
          <button onClick={() => scrollTo("science")} className="hover:text-emerald-600 transition-colors flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            বিজ্ঞান ও প্রযুক্তি
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

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${SITE_CONFIG.supportPhone}`}
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 py-2.5 px-3.5 rounded-xl transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
            <span>{SITE_CONFIG.supportPhone}</span>
          </a>

          <button
            onClick={onOrderClick}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm sm:text-base py-2.5 px-4 sm:px-6 rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>অর্ডার করুন</span>
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
              className="w-full text-center bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-md"
            >
              এখনই অর্ডার করুন (ক্যাশ অন ডেলিভারি)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
