"use client";

import React from "react";
import { ShieldCheck, ArrowRight, Check, X, Sparkles, Beaker } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const ScienceExplainer: React.FC = () => {
  return (
    <section id="science" className="py-16 sm:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-800 text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
            <Beaker className="w-4 h-4 text-purple-600" />
            <span>পেছনের বিজ্ঞান ও ডুয়াল অ্যাকশন মেকানিজম</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            কেন সাধারণ এয়ার ফ্রেশনার বা সাধারণ কাঠকয়লা কাজ করে না?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            বেশিরভাগ রুম স্প্রে তীব্র সুবাস ছড়িয়ে গন্ধকে সাময়িক ঢেকে রাখে, আর সাধারণ কাঠকয়লা পেঁয়াজ বা ঘামের মতো তীব্র সালফার গ্যাস আটকে রাখতে পারে না। {SITE_CONFIG.brandNameBn}-এর প্রযুক্তি একেবারেই আলাদা।
          </p>
        </div>

        {/* 3-Way Comparison Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Ordinary Spray */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold mb-4">
                <X className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">সাধারণ রুম স্প্রে / সেন্ট</h3>
              <p className="text-xs text-slate-500 mb-4">
                ক্ষতিকর অ্যারোসল ও কেমিক্যাল সুবাস ছড়ায়।
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>গন্ধকে ধ্বংস করে না, কেবল সেন্ট দিয়ে সাময়িক ঢেকে রাখে</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>অ্যাজমা, শ্বাসকষ্ট ও এলার্জি রোগীদের জন্য ক্ষতিকর</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>১৫-২০ মিনিট পর সেন্ট উবে গিয়ে দুর্গন্ধ আবার ফিরে আসে</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] font-semibold text-red-600">
              ফলাফল: ক্ষতিকর ও ক্ষণস্থায়ী
            </div>
          </div>

          {/* Card 2: Plain Charcoal */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-4">
                ⚠
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">সাধারণ ব্যাম্বু চারকোল</h3>
              <p className="text-xs text-slate-500 mb-4">
                শুধুমাত্র সাধারণ ফিজিক্যাল অ্যাবজর্বশন করে।
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>আর্দ্রতা ও হালকা গন্ধ কিছুটা চুষে নিতে পারে</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>পেঁয়াজ, রসুন বা ঘামের ক্ষুদ্র সালফার গ্যাস ধ্বংস করতে পারে না</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>ছিদ্র ভরে গেলে আবার বাতাসে দুর্গন্ধ ছেড়ে দেয় (Desorption)</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] font-semibold text-amber-700">
              ফলাফল: তীব্র গন্ধে ব্যর্থ
            </div>
          </div>

          {/* Card 3: AuraFresh Bio-Chem Formula */}
          <div className="bg-gradient-to-b from-emerald-900 to-slate-900 border-2 border-emerald-500 rounded-3xl p-6 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider">
              গোল্ড স্ট্যান্ডার্ড
            </div>
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold mb-4 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{SITE_CONFIG.brandName} ডুয়াল ফর্মুলা</h3>
              <p className="text-xs text-emerald-200 mb-4">
                অ্যাক্টিভেটেড কার্বন + পটাশিয়াম পারম্যাঙ্গানেট
              </p>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><b>অ্যাক্টিভেটেড কার্বন:</b> বাতাস থেকে জটিল VOCs ও আর্দ্রতা আটকে ফেলে</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><b>পটাশিয়াম পারম্যাঙ্গানেট:</b> সালফার, পেঁয়াজ ও ঘামের গন্ধ রাসায়নিক জারণে ভেঙে ফেলে</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>গন্ধ স্থায়ীভাবে ধ্বংস হয়, কোনো অবস্থাতেই আবার বাতাসে ফিরে আসে না</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700 text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ফলাফল: স্থায়ী সমাধান ও শতভাগ নিরাপদ</span>
            </div>
          </div>
        </div>

        {/* Color Changing Spent Media Indicator Feature */}
        <div className="bg-gradient-to-r from-purple-50 via-slate-50 to-emerald-50 border border-purple-200/60 rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-200/60 px-2.5 py-1 rounded-md">
                স্মার্ট ভিজ্যুয়াল ইন্ডিকেটর
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                পণ্য শেষ হয়ে গেছে কিনা বুঝবেন কীভাবে?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                পটাশিয়াম পারম্যাঙ্গানেট পিলেটের একটি অনন্য প্রাকৃতিক বৈশিষ্ট্য হলো এর বেগুনি রঙ। যখন এটি দুর্গন্ধের সালফার অণুগুলোকে সম্পূর্ণ ধ্বংস করে ফেলে, তখন এটি ধীরে ধীরে <b>বেগুনী থেকে কালচে-বাদামী (Manganese Dioxide)</b> রঙে পরিবর্তিত হয়। ফলে আপনি নিজেই দেখে বুঝতে পারবেন আপনার ফিল্টারটি কার্যকরভাবে সব গন্ধ শেষ করেছে এবং নতুন রিফিল নেয়ার সময় হয়েছে।
              </p>
            </div>

            <div className="lg:col-span-4 flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-purple-600 border-4 border-white shadow-lg mx-auto flex items-center justify-center text-white font-bold text-xs">
                  নতুন
                </div>
                <div className="text-xs font-bold text-purple-900 mt-2">উজ্জ্বল বেগুনী</div>
                <div className="text-[10px] text-slate-500">পূর্ণ কার্যকর</div>
              </div>

              <ArrowRight className="w-6 h-6 text-slate-400 shrink-0" />

              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-950 border-4 border-white shadow-lg mx-auto flex items-center justify-center text-white font-bold text-xs">
                  মেয়াদ শেষ
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2">কালচে বাদামী</div>
                <div className="text-[10px] text-slate-500">পরিবর্তনযোগ্য</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
