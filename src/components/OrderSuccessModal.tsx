"use client";

import React from "react";
import { CheckCircle2, Truck, PhoneCall, X } from "lucide-react";
import { SITE_CONFIG, OrderDetails } from "@/config/site";
import { trackContact } from "@/lib/metaPixel";

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
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Title */}
        <div className="text-center space-y-1 mb-6">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            অর্ডার সফলভাবে গ্রহণ করা হয়েছে!
          </h3>
          <p className="text-xs text-slate-500">
            ধন্যবাদ <b>{orderDetails.customerName}</b>, আমাদের কাস্টমার কেয়ার টিম দ্রুত আপনার সাথে যোগাযোগ করবে।
          </p>
        </div>

        {/* Order Details Receipt Box */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2 mb-6">
          <div className="flex justify-between text-slate-600">
            <span>পণ্য:</span>
            <span className="font-bold text-slate-900">{orderDetails.product}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>পরিমাণ:</span>
            <span className="font-bold text-slate-900">{orderDetails.quantity} টি</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>ডেলিভারি এলাকা:</span>
            <span className="font-bold text-slate-900">{orderDetails.deliveryArea}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>পেমেন্ট:</span>
            <span className="font-bold text-emerald-700">{orderDetails.paymentMethod}</span>
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

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={onClose}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors text-sm"
          >
            ঠিক আছে, ধন্যবাদ
          </button>
          
          <a
            href={`tel:${SITE_CONFIG.supportPhone}`}
            onClick={() => trackContact("hotline")}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl transition-colors text-xs flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
            <span>জরুরি প্রয়োজনে কল করুন: {SITE_CONFIG.supportPhone}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
