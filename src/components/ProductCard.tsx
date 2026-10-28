"use client";

import React from "react";
import { Check, ShoppingBag, Sparkles, Truck } from "lucide-react";
import { ProductPackage } from "@/config/site";

interface ProductCardProps {
  pkg: ProductPackage;
  isSelected: boolean;
  onSelect: (pkg: ProductPackage) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ pkg, isSelected, onSelect }) => {
  return (
    <div
      className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
        isSelected
          ? "bg-white border-2 border-emerald-600 shadow-2xl scale-[1.02] ring-4 ring-emerald-500/10"
          : "bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-slate-300"
      }`}
    >
      {/* Popular Badge */}
      {pkg.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className={`text-[11px] sm:text-xs font-black uppercase tracking-wider py-1 px-3.5 rounded-full shadow-md ${
            pkg.isPopular
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
              : "bg-slate-900 text-white"
          }`}>
            {pkg.badge}
          </span>
        </div>
      )}

      <div>
        {/* Title & Weight */}
        <div className="text-center space-y-1 mb-4 pt-2">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
            ওজন: {pkg.weight}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            {pkg.bnTitle}
          </h3>
          <p className="text-xs text-slate-500">
            {pkg.subtitle}
          </p>
        </div>

        {/* Price Display */}
        <div className="text-center my-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl sm:text-4xl font-black text-slate-900">
              ৳{pkg.price}
            </span>
            <span className="text-sm font-semibold text-slate-400 line-through">
              ৳{pkg.originalPrice}
            </span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
            সাশ্রয় ৳{pkg.originalPrice - pkg.price}
          </span>
        </div>

        {/* Gift or Free Shipping Callout */}
        {pkg.giftText && (
          <div className="mb-6 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{pkg.giftText}</span>
          </div>
        )}

        {/* Feature List */}
        <ul className="space-y-3 mb-8 text-xs sm:text-sm text-slate-700">
          {pkg.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Select / Order Button */}
      <div>
        <button
          onClick={() => onSelect(pkg)}
          className={`w-full py-3.5 px-4 rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md ${
            isSelected
              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30"
              : "bg-slate-900 hover:bg-slate-800 text-white"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{isSelected ? "প্যাকেজটি সিলেক্ট করা আছে" : "এই প্যাকেজটি সিলেক্ট করুন"}</span>
        </button>

        {pkg.freeShipping && (
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-700 mt-2">
            <Truck className="w-3.5 h-3.5" />
            <span>সারাদেশে হোম ডেলিভারি ফ্রি</span>
          </div>
        )}
      </div>
    </div>
  );
};
