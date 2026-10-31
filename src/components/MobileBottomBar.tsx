"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface MobileBottomBarProps {
  onOrderClick: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOrderClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bottom bar after user scrolls down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)] animate-fade-in">
      <div className="flex items-center gap-2">
        <div className="flex-1 pl-1">
          <div className="text-[11px] text-slate-500 font-semibold leading-tight">অরাফ্রেশ এয়ার পিউরিফায়ার</div>
          <div className="text-xs font-black text-emerald-800">ধামাকা অফারে মাত্র ৳৯৯৯</div>
        </div>
        <button
          onClick={onOrderClick}
          className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 active:from-emerald-700 active:to-teal-700 text-white font-black text-xs py-2.5 px-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>অর্ডার করুন (COD)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
