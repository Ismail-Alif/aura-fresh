"use client";

import React from "react";
import { Footprints, ChefHat, Refrigerator, Droplets, CheckCircle, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface ProblemSolutionsProps {
  onOrderClick: () => void;
}

export const ProblemSolutions: React.FC<ProblemSolutionsProps> = ({ onOrderClick }) => {
  const problems = [
    {
      icon: Footprints,
      color: "from-amber-500 to-orange-500",
      tag: "জুতা ও মোজার তীব্র গন্ধ",
      problem: "ঘাম ও ব্যাকটেরিয়ার বিক্রিয়ায় তৈরি আইসোভ্যালেরিক অ্যাসিড জুতা ও মোজায় অসহ্য দুর্গন্ধ ছড়ায়।",
      solution: "জুতার ভেতর ১০০ গ্রাম পাউচটি রেখে দিলেই মাত্র ২০ মিনিটে গন্ধ শুষে নিয়ে ভেতরে শুষ্ক ও ফ্রেশ পরিবেশ বজায় রাখে।",
      weight: "১০০ গ্রাম জুতা ডুও প্যাক"
    },
    {
      icon: ChefHat,
      color: "from-rose-500 to-red-600",
      tag: "পেঁয়াজ, রসুন ও রান্নাঘরের ঝাঁঝ",
      problem: "পেঁয়াজ-রসুনের উদ্বায়ী সালফার যৌগ রান্নার পর ঘণ্টার পর ঘণ্টা পুরো ঘরে ভ্যাপসা গন্ধ ছড়িয়ে রাখে।",
      solution: "পারম্যাঙ্গানেটের শক্তিশালী জারণ সালফার অণুর রাসায়নিক বন্ধন সাথে সাথে ভেঙে গুঁড়িয়ে দেয়।",
      weight: "৫০০ গ্রাম প্রো বক্স"
    },
    {
      icon: Refrigerator,
      color: "from-blue-500 to-cyan-600",
      tag: "ফ্রিজের মাছ-মাংস ও খাবারের গন্ধ",
      problem: "ফ্রিজে কাঁচা মাছ, মাংস বা মসলার কড়া গন্ধ জমে ফ্রিজের পানিতে এবং অন্যান্য মিষ্টি বা ফলমূলে মিশে যায়।",
      solution: "ফ্রিজের কোনো এক কোণায় রেখে দিলে কোনো বৈদ্যুতিক সংযোগ ছাড়াই সব গন্ধ ও আর্দ্রতা চুষে নেয়।",
      weight: "২০০ গ্রাম বা ৫০০ গ্রাম বক্স"
    },
    {
      icon: Droplets,
      color: "from-teal-500 to-emerald-600",
      tag: "বাথরুম ও স্যাঁতসেঁতে আর্দ্রতা",
      problem: "বর্ষাকালে বা বদ্ধ ফ্ল্যাটে আলমারিতে কাপড়ের ফাঙ্গাস গন্ধ ও বাথরুমের ভ্যাপসা গন্ধ অতিষ্ঠ করে তোলে।",
      solution: "কার্বনের মাইক্রোপোর অতিরিক্ত আর্দ্রতা টেনে নেয় এবং ফাঙ্গাস বা ছত্রাকের বংশবৃদ্ধি প্রতিরোধ করে।",
      weight: "৫০০ গ্রাম বক্স"
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            দৈনন্দিন জীবনের বড় ৪টি অস্বস্তি
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            কোন কোন দুর্গন্ধ নির্মূলে {SITE_CONFIG.brandNameBn} ১০০% কার্যকর?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            আপনার বাসার যেসব গন্ধ নিয়ে আপনি প্রতিনিয়ত বিরক্ত, তার নিখুঁত ও স্বাস্থ্যকর প্রাকৃতিক সমাধান:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {problems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                      {item.weight}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                    {item.tag}
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="text-xs text-rose-700 bg-rose-50 border border-rose-100 p-3 rounded-xl">
                      <span className="font-bold">❌ সমস্যা:</span> {item.problem}
                    </div>
                    <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-start gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><b className="text-emerald-900">✔ AeroCure সমাধান:</b> {item.solution}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOrderClick}
                  className="w-full text-center text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 py-2.5 rounded-xl border border-emerald-200 transition-colors flex items-center justify-center gap-1"
                >
                  <span>এই গন্ধের জন্য অর্ডার করুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
