"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

interface MobileBottomBarProps {
  onOrderClick: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOrderClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 300;
          if (shouldShow !== isVisibleRef.current) {
            isVisibleRef.current = shouldShow;
            setIsVisible(shouldShow);
          }
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-2.5 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transform-gpu transition-all duration-300 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
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
