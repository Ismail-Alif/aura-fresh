"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, Sparkles, Building, Footprints, Refrigerator, Car, Flame } from "lucide-react";
import { SITE_CONFIG, ProductPackage } from "@/config/site";

interface RoomAdvisorProps {
  onSelectPackage: (pkg: ProductPackage) => void;
}

export const RoomAdvisor: React.FC<RoomAdvisorProps> = ({ onSelectPackage }) => {
  const [selectedSpace, setSelectedSpace] = useState<string>("bedroom");
  const [intensity, setIntensity] = useState<string>("medium");

  const spaces = [
    { id: "bedroom", label: "বেডরুম / ড্রয়িং রুম", icon: Building, size: "১০০ - ১৫০ বর্গফুট" },
    { id: "shoes", label: "জুতা / মোজা / আলমারি", icon: Footprints, size: "ছোট আবদ্ধ ক্যাবিনেট" },
    { id: "kitchen", label: "রান্নাঘর (পেঁয়াজ-রসুন)", icon: Flame, size: "মাঝারি কিচেন স্পেস" },
    { id: "fridge", label: "রেফ্রিজারেটর / ডিপ ফ্রিজ", icon: Refrigerator, size: "২০০-৫০০ লিটার ফ্রিজ" },
    { id: "car", label: "গাড়ির ভেতর (Car Interior)", icon: Car, size: "প্রাইভেট কার / সেডান" },
  ];

  // Logic to determine best package
  let recommendedId = "pro-multi-room-500g";
  let estimatedLife = "৪ থেকে ৫ মাস";
  let reason = "একটি ৫০০ গ্রাম বক্স রুমের চারপাশের গন্ধ ও আর্দ্রতা সম্পূর্ণ চুষে নেওয়ার জন্য আদর্শ।";

  if (selectedSpace === "shoes") {
    recommendedId = "shoe-closet-pack-200g";
    estimatedLife = "৩ থেকে ৪ মাস";
    reason = "জুতার জন্য ১০০ গ্রাম করে ২টি আলাদা পাউচ সরাসরি জুতার ভেতরে গুঁজে দেওয়ার জন্য সবচেয়ে সুবিধাজনক।";
  } else if (selectedSpace === "kitchen" && intensity === "high") {
    recommendedId = "mega-family-bundle-1000g";
    estimatedLife = "৫ থেকে ৬ মাস";
    reason = "রান্নাঘরের ভারী অর্গানোসালফার ও তেলের কড়া গন্ধ পুরোপুরি নিউট্রিলাইজ করতে ডুয়াল বক্স সেট সবচেয়ে কার্যকর।";
  } else if (selectedSpace === "fridge") {
    recommendedId = "shoe-closet-pack-200g";
    estimatedLife = "৪ থেকে ৬ মাস";
    reason = "ফ্রিজের সেলফে একটি ১০০ গ্রামের পাউচ রেখে দিলেই মাছ-মাংসের কাঁচা গন্ধ অন্য খাবারে ছড়াবে না।";
  }

  const recommendedPackage = SITE_CONFIG.products.find((p) => p.id === recommendedId) || SITE_CONFIG.products[1];

  return (
    <section id="advisor" className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>স্মার্ট রুম সাইজ ও কভারেজ ক্যালকুলেটর</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            আপনার ঘরের জন্য কোন সাইজটি সঠিক?
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            স্থান ও গন্ধের মাত্রা নির্বাচন করুন—সিস্টেম আপনাকে সঠিক প্যাকেজটি নির্ধারণ করে দেবে:
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  ১. ব্যবহারের স্থান নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {spaces.map((space) => {
                    const Icon = space.icon;
                    const isSelected = selectedSpace === space.id;
                    return (
                      <button
                        key={space.id}
                        type="button"
                        onClick={() => setSelectedSpace(space.id)}
                        className={`flex items-center gap-3 p-3 rounded-2xl text-left border transition-all ${
                          isSelected
                            ? "bg-emerald-600/30 border-emerald-500 text-white shadow-md shadow-emerald-500/10"
                            : "bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        <div className={`p-2 rounded-xl shrink-0 ${isSelected ? "bg-emerald-500 text-slate-950" : "bg-slate-700 text-slate-300"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold">{space.label}</div>
                          <div className="text-[10px] text-slate-400">{space.size}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  ২. গন্ধের তীব্রতা কেমন?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "mild", label: "মৃদু / সাধারণ" },
                    { id: "medium", label: "মাঝারি ভ্যাপসা" },
                    { id: "high", label: "তীব্র ঝাঁঝালো" },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setIntensity(lvl.id)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                        intensity === lvl.id
                          ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm"
                          : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendation Result Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-800 to-slate-900 border border-emerald-500/40 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>সুপারিশকৃত আদর্শ প্যাকেজ</span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">
                    {recommendedPackage.bnTitle}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {reason}
                  </p>
                </div>

                <div className="bg-slate-950/60 rounded-2xl p-3.5 border border-slate-700 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">নিট ওজন:</span>
                    <span className="font-bold text-white">{recommendedPackage.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">কার্যকাল:</span>
                    <span className="font-bold text-emerald-400">{estimatedLife}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-800">
                    <span className="text-slate-400">অফার মূল্য:</span>
                    <span className="font-black text-amber-400 text-sm">৳{recommendedPackage.price}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectPackage(recommendedPackage)}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <span>এই প্যাকেজটি নিয়ে অর্ডার করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
