"use client";

import React from "react";
import { ShieldCheck, Truck, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center p-1.5 shadow-md shrink-0">
                <svg viewBox="0 0 84 84" className="w-full h-full">
                  <circle cx="42" cy="42" r="36" fill="none" stroke="#10b981" strokeWidth="5.5" strokeDasharray="180 35" strokeLinecap="round"/>
                  <path d="M 42 20 C 54 32, 56 48, 42 60 C 28 48, 30 32, 42 20 Z" fill="#10b981"/>
                  <path d="M 42 27 L 42 54" stroke="#022c22" strokeWidth="2.8" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-xl font-black text-white font-sans">
                Aura<span className="text-emerald-400">Fresh</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              উন্নত ডুয়াল অ্যাকশন প্রযুক্তির পরিবেশবান্ধব ও স্বাস্থ্যকর প্রাকৃতিক বায়ু সুরক্ষা সমাধান। আপনার পুরো বাড়ি ও পরিবারকে রাখুন সবসময় ফ্রেশ, নিরাপদ ও ক্ষতিকর গন্ধমুক্ত।
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>১০০% রাসায়নিক মুক্ত ও প্রাকৃতিক ফর্মুলা</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider">দ্রুত লিংক</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#features" className="hover:text-white transition-colors">কোন কোন গন্ধে কার্যকর</a>
              </li>
              <li>
                <a href="#science" className="hover:text-white transition-colors">পেছনের বিজ্ঞান ও ডুয়াল অ্যাকশন</a>
              </li>
              <li>
                <a href="#advisor" className="hover:text-white transition-colors">রুম সাইজ ক্যালকুলেটর</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">প্যাকেজ ও অফার মূল্য</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">সাধারণ জিজ্ঞাসা (FAQ)</a>
              </li>
            </ul>
          </div>

          {/* Delivery & Ordering Info (No phone number) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider">ডেলিভারি ও নিশ্চয়তা</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>সারাদেশে নির্ভরযোগ্য হোম ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>১০০% ক্যাশ অন ডেলিভারি সুবিধা</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>পণ্য হাতে পেয়ে চেক করে মূল্য পরিশোধ</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                অর্ডার কনফার্ম করার পর দ্রুততম সময়ে আপনার ঠিকানায় পার্সেল পৌঁছে দেওয়া হবে।
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.brandName}. All Rights Reserved.</p>
          <p className="text-[11px] text-slate-400">Pure Air for Healthier Homes in Bangladesh</p>
        </div>
      </div>
    </footer>
  );
};
