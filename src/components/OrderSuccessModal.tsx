"use client";

import React from "react";
import { CheckCircle2, Truck, X } from "lucide-react";
import { SITE_CONFIG, OrderDetails } from "@/config/site";

interface OrderSuccessModalProps {
  orderDetails: OrderDetails;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ orderDetails, onClose }) => {
  if (!orderDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-scale-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-600/10">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        {/* Heading */}
        <div className="text-center space-y-1.5 mb-6">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            অর্ডার সফলভাবে গৃহীত হয়েছে!
          </h3>
          <p className="text-xs text-slate-500">
            {SITE_CONFIG.brandNameBn} বেছে নেওয়ার জন্য ধন্যবাদ।
          </p>
          {orderDetails.orderId && (
            <div className="inline-block bg-slate-100 text-slate-700 text-xs font-mono font-bold px-3 py-1 rounded-lg mt-1">
              অর্ডার আইডি: {orderDetails.orderId}
            </div>
          )}
        </div>

        {/* Order Details Invoice Card */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100 space-y-2.5 text-xs text-slate-600 mb-6">
          <div className="flex justify-between">
            <span className="font-medium">প্যাকেজ:</span>
            <span className="font-bold text-slate-900 text-right">{orderDetails.product}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">পরিমাণ:</span>
            <span className="font-bold text-slate-900">{orderDetails.quantity} টি</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">গ্রাহকের নাম:</span>
            <span className="font-bold text-slate-900">{orderDetails.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">মোবাইল নম্বর:</span>
            <span className="font-bold text-slate-900">{orderDetails.customerPhone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">ঠিকানা:</span>
            <span className="font-bold text-slate-900 text-right max-w-[180px] truncate">{orderDetails.customerAddress}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">ডেলিভারি চার্জ:</span>
            <span className="font-bold text-slate-900">৳{orderDetails.deliveryCharge || 60}</span>
          </div>
          <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
            <span>মোট প্রদেয় বিল:</span>
            <span className="text-emerald-700">৳{orderDetails.grandTotal}</span>
          </div>
        </div>

        {/* Delivery Timeline Pill */}
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 text-xs flex items-center gap-2.5 mb-6">
          <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><b>ডেলিভারি সময়:</b> ঢাকা সিটিতে ২৪-৪৮ ঘণ্টা, ঢাকার বাইরে ২-৩ কার্যদিবস।</span>
        </div>

        {/* Confirm Button */}
        <div>
          <button
            onClick={onClose}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors text-sm cursor-pointer"
          >
            ঠিক আছে, ধন্যবাদ
          </button>
        </div>

      </div>
    </div>
  );
};
