"use client";

import React from "react";
import { Star, CheckCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const Reviews: React.FC = () => {
  const reviews = [
    {
      name: "তানভীর আহমেদ",
      location: "উত্তরা, ঢাকা",
      useCase: "জুতা ও মোজার তীব্র গন্ধে ব্যবহৃত",
      rating: 5,
      date: "৩ দিন আগে",
      review: "আমার রানিং শুতে ঘামের এমন উৎকট গন্ধ হতো যে রুমে রাখা যেত না। এই শু প্যাকটি সারারাত জুতায় রেখে সকালে দেখি কোনো গন্ধই নেই! সবচেয়ে ভালো লেগেছে কোনো সস্তা সেন্ট নেই, পুরো গন্ধটাই শেষ করে দেয়।"
    },
    {
      name: "নাসরিন সুলতানা",
      location: "ধানমন্ডি, ঢাকা",
      useCase: "রান্নাঘর ও ড্রয়িং রুমে ব্যবহৃত",
      rating: 5,
      date: "১ সপ্তাহ আগে",
      review: "রান্নাঘরে পেঁয়াজ বা মাছ কাটার পর যে তীব্র ঝাঁঝালো গন্ধ ছড়িয়ে পড়ত, ৫০০ গ্রামের বক্সটা রাখার পর ২০-৩০ মিনিটের মধ্যেই পরিবেশ একদম ফ্রেশ হয়ে যায়। সাথে পাওয়া আতরটাও খুব সুন্দর সুবাস ছড়ায়।"
    },
    {
      name: "মাহফুজুর রহমান",
      location: "জিইসি মোড়, চট্টগ্রাম",
      useCase: "রেফ্রিজারেটরে ব্যবহৃত",
      rating: 5,
      date: "২ সপ্তাহ আগে",
      review: "ফ্রিজে কাঁচা মাছ-মাংস ও মশলার গন্ধে অন্য খাবারের স্বাভাবিক স্বাদ নষ্ট হয়ে যেত। একটি ১০০ গ্রামের পাউচ ফ্রিজের দরজার র‍্যাকে রেখে দিয়েছি, এখন ফ্রিজ খুললেই কোনো দুর্গন্ধ আসে না।"
    },
    {
      name: "রাশেদুল হাসান",
      location: "উপশহর, সিলেট",
      useCase: "আলমারি ও বেডরুমে ব্যবহৃত",
      rating: 5,
      date: "৩ সপ্তাহ আগে",
      review: "আমাদের বাসার বদ্ধ আলমারিতে কাপড়ে স্যাঁতসেঁতে আর্দ্রতা আর ফাঙ্গাসের গন্ধ হতো। অ্যারোকিউর দেওয়ার পর কাপড় একদম শুকনো আর ফ্রেশ থাকে। কোনো কেমিক্যাল স্প্রে না থাকায় বাচ্চার জন্যও নিরাপদ।"
    }
  ];

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            প্রকৃত ব্যবহারকারীদের মতামত
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            গ্রাহকরা কেন {SITE_CONFIG.brandNameBn}-কে ভালোবাসেন?
          </h2>
          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-slate-800">৪.৯/৫ (৫০০+ সন্তুষ্ট পরিবার)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-6 sm:p-7 relative flex flex-col justify-between hover:bg-slate-50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-[11px] text-slate-500">{rev.location}</div>
                </div>

                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-1 rounded-md">
                  {rev.useCase}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
