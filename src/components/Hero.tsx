"use client";

import React from "react";
import { Sparkles, ShieldCheck, Zap, ArrowRight, Award, RefreshCw, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface HeroProps {
  onOrderClick: () => void;
  onExploreScience: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onExploreScience }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 bg-gradient-to-b from-slate-50 via-emerald-50/30 to-white">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-200/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-teal-200/30 rounded-full blur-2xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>কার্বন + পটাশিয়াম পারম্যাঙ্গানেটের দ্বৈত বৈজ্ঞানিক ফর্মুলা</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.18]">
              জুতার বাজে গন্ধ, পেঁয়াজের ঝাঁঝ ও ভ্যাপসা স্যাঁতসেঁতে আর্দ্রতা দূর করুন <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                ১০০% রাসায়নিক মুক্ত উপায়ে
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <b className="text-slate-900 font-semibold">{SITE_CONFIG.brandName}</b> কোনো কড়া সেন্ট বা কৃত্রিম সুগন্ধি দিয়ে গন্ধ ধামাচাপা দেয় না। এর ভেতরের <b>অ্যাক্টিভেটেড কার্বন</b> গন্ধ চুষে আটকে ফেলে এবং <b>পটাশিয়াম পারম্যাঙ্গানেট</b> দুর্গন্ধ সৃষ্টিকারী অর্গানোসালফার অণুগুলোকে স্থায়ীভাবে ভেঙে ধ্বংস করে।
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2 bg-white/80 border border-slate-200/80 p-2.5 rounded-xl shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">কোনো কৃত্রিম সেন্ট নেই</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 border border-slate-200/80 p-2.5 rounded-xl shadow-xs">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">১৫ মিনিটে গন্ধ দূর</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 border border-slate-200/80 p-2.5 rounded-xl shadow-xs col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">বাচ্চা ও রোগীর জন্য নিরাপদ</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-base sm:text-lg py-4 px-8 rounded-2xl shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>অর্ডার করুন (ক্যাশ অন ডেলিভারি)</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreScience}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 font-bold text-base py-4 px-6 rounded-2xl transition-all shadow-xs"
              >
                <span>কীভাবে কাজ করে দেখুন</span>
              </button>
            </div>

            {/* Trust Indicator */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-3 text-xs sm:text-sm text-slate-500">
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

          {/* Right Column: Interactive Visual Product Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Product Visual Mockup Card */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden border border-slate-700">
                {/* Visual Glow */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl"></div>

                {/* Badge */}
                <div className="flex justify-between items-center mb-6">
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
                    Dual Active Media Box
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Net 500g / 200g</span>
                </div>

                {/* Interactive Pellets Breakdown Graphic */}
                <div className="space-y-4 my-6">
                  {/* Pellet 1: Carbon */}
                  <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-600 flex items-center justify-center shrink-0 shadow-inner">
                      <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-400">
                        C
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">অ্যাক্টিভেটেড কার্বন পিলেট</h4>
                        <span className="text-[10px] bg-slate-700 text-slate-200 px-1.5 py-0.5 rounded font-mono">Micro-Pores</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        বাতাস থেকে আর্দ্রতা, VOCs ও সাধারণ ভ্যাপসা গন্ধ স্পঞ্জের মতো শোষণ করে।
                      </p>
                    </div>
                  </div>

                  {/* Pellet 2: Potassium Permanganate Alumina */}
                  <div className="bg-purple-950/40 border border-purple-800/60 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-900/80 border border-purple-500/60 flex items-center justify-center shrink-0 shadow-inner">
                      <div className="w-6 h-6 rounded-full bg-purple-600 border border-purple-300 flex items-center justify-center text-[10px] font-bold text-white">
                        K
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-purple-200">বেগুনী পারম্যাঙ্গানেট পিলেট</h4>
                        <span className="text-[10px] bg-purple-800/80 text-purple-200 px-1.5 py-0.5 rounded font-mono">KMnO4</span>
                      </div>
                      <p className="text-xs text-purple-200/80 mt-0.5">
                        পেঁয়াজ, রসুন, ঘাম ও সালফারের অণুর সাথে রাসায়নিক বিক্রিয়া করে ধ্বংস করে।
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Mini Banner */}
                <div className="bg-emerald-900/40 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between text-xs">
                  <span className="text-emerald-300 font-semibold">কার্যকাল: ৩ থেকে ৬ মাস</span>
                  <span className="text-slate-300">কালার চেঞ্জ ইন্ডিকেটরযুক্ত</span>
                </div>
              </div>

              {/* Floating Review Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white border border-slate-200 shadow-xl p-3 sm:p-4 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-black text-emerald-700 text-sm">
                  4.9★
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">৫০০+ গ্রাহক সন্তুষ্ট</div>
                  <div className="text-[11px] text-slate-500">জুতা ও ফ্রিজের গন্ধে সেরা ফলাফল</div>
                </div>
              </div>

              {/* Floating Free Gift Badge */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs py-1.5 px-3.5 rounded-full shadow-lg transform rotate-3">
                🎁 ফ্রি আতর হাদিয়া অফার!
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
