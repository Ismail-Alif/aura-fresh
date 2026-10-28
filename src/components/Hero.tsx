"use client";

import React from "react";
import { Sparkles, ShieldCheck, Zap, ArrowRight, Award, RefreshCw, CheckCircle2, Shield } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface HeroProps {
  onOrderClick: () => void;
  onExploreScience: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onExploreScience }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-12 sm:pt-14 sm:pb-20 bg-gradient-to-b from-emerald-50/40 via-slate-50/60 to-white">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] sm:w-[600px] h-[300px] sm:h-[400px] bg-emerald-300/20 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute top-32 right-2 w-[200px] sm:w-[320px] h-[200px] sm:h-[320px] bg-purple-300/15 rounded-full blur-2xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines, Trust & CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-spin" />
              <span>কার্বন + পটাশিয়াম পারম্যাঙ্গানেট ডুয়াল বৈজ্ঞানিক ফর্মুলা</span>
            </div>

            {/* Main Title (Mobile Optimized) */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.25] sm:leading-[1.18]">
              জুতার বাজে গন্ধ, পেঁয়াজের ঝাঁঝ ও ভ্যাপসা স্যাঁতসেঁতে আর্দ্রতা দূর করুন <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 bg-clip-text text-transparent">
                ১০০% প্রাকৃতিক ও স্থায়ী উপায়ে
              </span>
            </h1>

            {/* Subtext Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <b className="text-slate-900 font-semibold">{SITE_CONFIG.brandNameBn}</b> কোনো ক্ষতিকর সেন্ট বা কেমিক্যাল দিয়ে গন্ধকে সাময়িক ঢেকে রাখে না। এর <b>অ্যাক্টিভেটেড কার্বন</b> বাতাস থেকে আর্দ্রতা ও ভ্যাপসা গন্ধ আটকে ফেলে এবং <b>পটাশিয়াম পারম্যাঙ্গানেট</b> পেঁয়াজ, রসুন ও ঘামের দুর্গন্ধ সৃষ্টিকারী অর্গানোসালফার অণুকে স্থায়ীভাবে ভেঙে ধ্বংস করে।
            </p>

            {/* Key Quick USPs Grid (Mobile 2-col) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 text-left">
              <div className="flex items-center gap-2 bg-white/90 border border-slate-200 p-2.5 rounded-xl shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-800">কোনো কৃত্রিম সেন্ট নেই</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 border border-slate-200 p-2.5 rounded-xl shadow-xs">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-800">১৫ মিনিটে গন্ধ শুষে নেয়</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 border border-slate-200 p-2.5 rounded-xl shadow-xs col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-800">বাচ্চা ও রোগীর জন্য নিরাপদ</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
              <button
                onClick={onOrderClick}
                className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm sm:text-base py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-xl shadow-emerald-600/25 hover:shadow-emerald-600/35 transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>অর্ডার করুন (ক্যাশ অন ডেলিভারি)</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={onExploreScience}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all shadow-xs"
              >
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>কীভাবে কাজ করে দেখুন</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>প্রমাণিত গ্যাস-ফেজ ফিল্ট্রেশন</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-emerald-600" />
                <span>টানা ৪-৬ মাস কার্যকর</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Product Media Showcase */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Main Visual Box Card */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-5 sm:p-7 rounded-3xl shadow-2xl text-white relative overflow-hidden border border-slate-700">
                {/* Visual Ambient Glow */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"></div>

                {/* Header Tag */}
                <div className="flex justify-between items-center mb-4 sm:mb-5">
                  <span className="bg-emerald-500/20 text-emerald-300 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
                    Dual Active Media Box
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Net 500g / 200g</span>
                </div>

                {/* Pellets Showcase */}
                <div className="space-y-3 sm:space-y-4 my-4">
                  {/* Pellet 1: Carbon */}
                  <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-600 flex items-center justify-center shrink-0 shadow-inner">
                      <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-300">
                        C
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white">অ্যাক্টিভেটেড কার্বন পিলেট</h4>
                        <span className="text-[10px] bg-slate-700 text-slate-200 px-1.5 py-0.5 rounded font-mono">Porous</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                        বাতাস থেকে আর্দ্রতা, VOCs ও সাধারণ ভ্যাপসা গন্ধ স্পঞ্জের মতো শোষণ করে।
                      </p>
                    </div>
                  </div>

                  {/* Pellet 2: Potassium Permanganate Alumina */}
                  <div className="bg-purple-950/40 border border-purple-800/60 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-purple-900/80 border border-purple-500/60 flex items-center justify-center shrink-0 shadow-inner">
                      <div className="w-6 h-6 rounded-full bg-purple-600 border border-purple-300 flex items-center justify-center text-[10px] font-bold text-white">
                        K
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-purple-200">বেগুনী পারম্যাঙ্গানেট পিলেট</h4>
                        <span className="text-[10px] bg-purple-800/80 text-purple-200 px-1.5 py-0.5 rounded font-mono">KMnO4</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-purple-200/80 mt-0.5">
                        পেঁয়াজ, রসুন, ঘাম ও সালফারের অণুর সাথে রাসায়নিক বিক্রিয়া করে ধ্বংস করে।
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Strip */}
                <div className="bg-emerald-900/40 border border-emerald-500/30 rounded-xl p-2.5 sm:p-3 flex items-center justify-between text-xs">
                  <span className="text-emerald-300 font-semibold">কার্যকাল: ৩ থেকে ৬ মাস</span>
                  <span className="text-slate-300">কালার ইন্ডিকেটরযুক্ত</span>
                </div>
              </div>

              {/* Floating Customer Rating Badge */}
              <div className="absolute -bottom-5 -left-3 sm:-left-5 bg-white border border-slate-200 shadow-xl p-2.5 sm:p-3.5 rounded-2xl flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center font-black text-emerald-800 text-xs sm:text-sm">
                  4.9★
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">৫০০+ গ্রাহক সন্তুষ্ট</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500">জুতা ও ফ্রিজের গন্ধে সেরা ফলাফল</div>
                </div>
              </div>

              {/* Quality Guarantee Pill */}
              <div className="absolute -top-3 -right-2 sm:-right-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-[11px] sm:text-xs py-1 px-3 rounded-full shadow-lg">
                🛡️ ১০০% ফলাফল নিশ্চয়তা
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
