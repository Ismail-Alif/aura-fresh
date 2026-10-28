"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: `${SITE_CONFIG.brandNameBn} কীভাবে কাজ করে? এতে কোনো ক্ষতিকর কেমিক্যাল আছে কি?`,
      a: "না, এটি শতভাগ প্রাকৃতিক ও বিষাক্ত কেমিক্যালমুক্ত। এর মূল উপাদান উচ্চ-গ্রেড অ্যাক্টিভেটেড কার্বন ও পটাশিয়াম পারম্যাঙ্গানেট পিলেট। কার্বন বাতাস থেকে আর্দ্রতা ও গন্ধ শোষণ করে আটকে ফেলে, এবং পারম্যাঙ্গানেট গন্ধের রাসায়নিক অণুকে স্থায়ীভাবে ভেঙে ফেলে। এটি কোনো গ্যাস বা ধোঁয়া ছড়ায় না, তাই ঘরে ছোট বাচ্চা বা অ্যালার্জি রোগী থাকলেও সম্পূর্ণ নিরাপদ।"
    },
    {
      q: "একটি প্যাকেট কতদিন পর্যন্ত গন্ধ শোষণ করতে পারে?",
      a: "১০০ গ্রামের ছোট শু/ফ্রিজ প্যাক টানা ৩ থেকে ৪ মাস এবং ৫০০ গ্রামের বড় মাল্টি-রুম বক্স ৪ থেকে ৬ মাস একটানা নিরবচ্ছিন্নভাবে কাজ করে। উপাদানটির বেগুনি রঙ যখন রাসায়নিক বিক্রিয়া শেষে কালচে-বাদামী হয়ে যায়, তখন বুঝতে পারবেন এটি পরিবর্তন করার সময় হয়েছে।"
    },
    {
      q: "এটি পেঁয়াজ ও রসুনের তীব্র ঝাঁঝালো গন্ধ কীভাবে দূর করে?",
      a: "পেঁয়াজ ও রসুনের তীব্র গন্ধের মূল কারণ হলো উদ্বায়ী অর্গানোসালফার গ্যাস। সাধারণ রুম স্প্রে বা সাধারণ চারকোল এই সালফার অণু নষ্ট করতে পারে না। কিন্তু পটাশিয়াম পারম্যাঙ্গানেট সালফারের সাথে অত্যন্ত দ্রুত রাসায়নিক বিক্রিয়া (জারণ) করে একে গন্ধহীন লবণে রূপান্তরিত করে।"
    },
    {
      q: "রোদে শুকালে কি এটি রিচার্জ হয়?",
      a: "অ্যাক্টিভেটেড কার্বনের আর্দ্রতা রোদে দিলে কিছুটা শুকায় ঠিকই, তবে এতে থাকা পারম্যাঙ্গানেট যে গন্ধ স্থায়ীভাবে ধ্বংস করে ফেলে তা আর রিচার্জ হয় না। মেয়াদ শেষে এটি বদলে নতুন প্যাক নেওয়াই স্বাস্থ্যকর ও বিজ্ঞানসম্মত।"
    },
    {
      q: "ডেলিভারি কতদিনে পাব এবং ডেলিভারি চার্জ কত?",
      a: "ঢাকা সিটির ভেতরে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ২ থেকে ৩ কার্যদিবসের মধ্যে আপনার ঠিকানায় ডেলিভারি পৌঁছে দেওয়া হবে। একক প্যাকেজে ঢাকাতে ৳৭০ এবং বাইরে ৳১২০ ডেলিভারি চার্জ প্রযোজ্য। তবে যেকোনো ২টি বা ততোধিক প্যাক অর্ডার করলে সারাদেশে হোম ডেলিভারি সম্পূর্ণ ফ্রি!"
    },
    {
      q: "পণ্য হাতে পেয়ে চেক করে টাকা পরিশোধ করা যাবে কি?",
      a: "হ্যাঁ, সম্পূর্ণ ক্যাশ অন ডেলিভারি (Cash on Delivery) সুবিধা রয়েছে। ডেলিভারি ম্যানের কাছ থেকে পার্সেলটি হাতে পেয়ে দেখে তারপর নিশ্চিত হয়ে মূল্য পরিশোধ করতে পারবেন।"
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>সচরাচর জিজ্ঞাসিত প্রশ্ন ও উত্তর</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            আপনার মনের সাধারণ প্রশ্নগুলোর উত্তর
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            {SITE_CONFIG.brandNameBn} ব্যবহারের আগে যে বিষয়গুলো জেনে নেওয়া দরকার:
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 font-bold text-slate-900 flex items-center justify-between gap-4 text-sm sm:text-base hover:text-emerald-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
