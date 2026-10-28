"use client";

import React from "react";
import { Wind, Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Wind className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">
                {SITE_CONFIG.brandName.slice(0, 4)}
                <span className="text-emerald-500">{SITE_CONFIG.brandName.slice(4)}</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              উন্নত অ্যাক্টিভেটেড কার্বন ও পটাশিয়াম পারম্যাঙ্গানেটের পেটেন্টেড ডুয়াল-অ্যাকশন প্রযুক্তির পরিবেশবান্ধব ও স্বাস্থ্যকর দুর্গন্ধ শোষক। ঘরের বাতাস রাখুন প্রাকৃতিকভাবে নিরাপদ ও ফ্রেশ।
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>১০০% রাসায়নিক মুক্ত ও প্রাকৃতিক</span>
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

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider">কাস্টমার সাপোর্ট</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>হটলাইন: {SITE_CONFIG.supportPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>WhatsApp: {SITE_CONFIG.whatsappNumber}</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-2">
                সকাল ১০:০০ টা থেকে রাত ১০:০০ টা পর্যন্ত যেকোনো তথ্য বা অর্ডারের জন্য যোগাযোগ করুন।
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
