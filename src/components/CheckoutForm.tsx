"use client";

import React, { useState } from "react";
import { ProductPackage, OrderDetails } from "@/config/site";
import { AlertCircle, Sparkles, Truck, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import {
  trackInitiateCheckout,
  trackPurchase,
  validateBdPhone,
} from "@/lib/metaPixel";

interface CheckoutFormProps {
  selectedPackage: ProductPackage;
  onOrderSuccess: (orderDetails: OrderDetails) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ selectedPackage, onOrderSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [deliveryArea, setDeliveryArea] = useState<"insideDhaka" | "outsideDhaka">("insideDhaka");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Pricing: 100% Free Nationwide Delivery (৳0)
  const subtotal = selectedPackage.price * quantity;
  const grandTotal = subtotal;

  // Real-time Bangla to English digit normalization (Matching Ummah Wed & Vocab Joy)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d)));
    setCustomerPhone(val);
    if (errorMsg) setErrorMsg("");
  };

  // Dedicated CAPI Phone Enrichment on Blur (EMQ 9.5+)
  const handlePhoneBlur = () => {
    const val = validateBdPhone(customerPhone);
    if (val.ok) {
      trackInitiateCheckout({
        product: selectedPackage,
        source: "phone_blur_enrichment",
        extraUserData: {
          phone: val.phone,
          name: customerName.trim() || undefined,
        },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      setErrorMsg("অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা লিখুন।");
      return;
    }

    const phoneValidation = validateBdPhone(customerPhone);
    if (!phoneValidation.ok) {
      setErrorMsg(phoneValidation.message);
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      product: selectedPackage.bnTitle,
      productId: selectedPackage.id,
      quantity,
      subtotal,
      deliveryCharge: 0,
      grandTotal,
      customerName: customerName.trim(),
      customerPhone: phoneValidation.phone,
      customerAddress: customerAddress.trim(),
      deliveryArea: deliveryArea === "insideDhaka" ? "ঢাকা সিটির ভেতরে" : "ঢাকার বাইরে (সারাদেশে)",
      paymentMethod: "ক্যাশ অন ডেলিভারি (COD)",
      bkashTrxId: null,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const resData = await res.json().catch(() => ({}));
      const orderId = resData.orderId || `AC-${Date.now()}`;

      // Guaranteed deduplication: both browser Pixel & server CAPI use the exact same orderId
      await trackPurchase({
        orderId,
        productId: selectedPackage.id,
        product: selectedPackage.bnTitle,
        grandTotal,
        quantity,
        customerName: customerName.trim(),
        customerPhone: phoneValidation.phone,
        customerAddress: customerAddress.trim(),
      });

      onOrderSuccess({ ...orderPayload, orderId });
    } catch (err) {
      console.error("Order submit error:", err);
      const fallbackOrderId = `AC-${Date.now()}`;

      await trackPurchase({
        orderId: fallbackOrderId,
        productId: selectedPackage.id,
        product: selectedPackage.bnTitle,
        grandTotal,
        quantity,
        customerName: customerName.trim(),
        customerPhone: phoneValidation.phone,
        customerAddress: customerAddress.trim(),
      });

      onOrderSuccess({ ...orderPayload, orderId: fallbackOrderId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="checkout" className="py-8 sm:py-16 bg-gradient-to-b from-white via-slate-50 to-emerald-50/20">
      <div className="max-w-2xl mx-auto px-3 sm:px-6">
        
        {/* Compact Heading (Matching Ummah Wed) */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>১০০% ক্যাশ অন ডেলিভারি স্পেশাল অফার</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            অর্ডার ফর্ম পূরণ করুন
          </h2>
          <p className="text-slate-600 text-[11px] sm:text-xs mt-0.5">
            অগ্রিম কোনো টাকা দিতে হবে না, পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধ করুন।
          </p>
        </div>

        {/* Unified Compact Order Card (Fits on single mobile screen) */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-slate-200/90 shadow-xl shadow-slate-200/50">
          
          {/* Top Order & Pricing Strip (Ummah Wed Compact Style) */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-xl p-3 sm:p-4 mb-4 shadow-sm">
            
            {/* Row 1: Product, Quantity Counter & Total */}
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">প্যাকেজ</div>
                <div className="text-xs sm:text-sm font-black truncate">{selectedPackage.bnTitle}</div>
                <div className="text-[10px] text-slate-300 font-mono">৳{selectedPackage.price} / বক্স</div>
              </div>

              {/* Quantity Changer */}
              <div className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-lg border border-white/15 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 bg-white text-slate-900 rounded-md font-black text-sm flex items-center justify-center hover:bg-slate-100 transition active:scale-95"
                >
                  -
                </button>
                <span className="font-black text-sm w-5 text-center text-white">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 bg-white text-slate-900 rounded-md font-black text-sm flex items-center justify-center hover:bg-slate-100 transition active:scale-95"
                >
                  +
                </button>
              </div>

              {/* Total Price Callout */}
              <div className="text-right shrink-0 pl-1">
                <div className="text-[10px] text-slate-300">সর্বমোট প্রদেয়</div>
                <div className="text-base sm:text-xl font-black text-amber-400">৳{grandTotal}</div>
              </div>
            </div>

            {/* Row 2: Badges Bar */}
            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1 text-emerald-300 font-bold">
                <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>ডেলিভারি: সম্পূর্ণ ফ্রি (৳০)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold">ক্যাশ অন ডেলিভারি</span>
              </div>
            </div>

          </div>

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Compact Input Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            
            {/* Name Input */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                আপনার নাম *
              </label>
              <input
                type="text"
                required
                placeholder="যেমন: মোঃ কামরুল ইসলাম"
                value={customerName}
                onFocus={() => trackInitiateCheckout({ product: selectedPackage, source: "form_name_focus" })}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>

            {/* Phone Input with Real-time Bangla Normalization & CAPI Blur Enrichment */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                মোবাইল নম্বর (১১ ডিজিট) *
              </label>
              <input
                type="tel"
                required
                placeholder="017XXXXXXXX"
                value={customerPhone}
                onFocus={() => trackInitiateCheckout({ product: selectedPackage, source: "form_phone_focus" })}
                onBlur={handlePhoneBlur}
                onChange={handlePhoneChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
              />
            </div>

            {/* Delivery Area Pills (Compact 2-col) */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                ডেলিভারি এলাকা *
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setDeliveryArea("insideDhaka")}
                  className={`py-2 px-2.5 rounded-xl border text-center font-bold transition-all ${
                    deliveryArea === "insideDhaka"
                      ? "bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-500"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  ঢাকা সিটি (ফ্রি)
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryArea("outsideDhaka")}
                  className={`py-2 px-2.5 rounded-xl border text-center font-bold transition-all ${
                    deliveryArea === "outsideDhaka"
                      ? "bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-500"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  ঢাকার বাইরে (ফ্রি)
                </button>
              </div>
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                পূর্ণাঙ্গ ঠিকানা (বাসা/রোড নম্বর, এলাকা, থানা ও জেলা) *
              </label>
              <textarea
                required
                rows={2}
                placeholder="যেমন: বাড়ি #১২, রোড #৪, সেক্টর #৩, উত্তরা, ঢাকা"
                value={customerAddress}
                onFocus={() => trackInitiateCheckout({ product: selectedPackage, source: "form_address_focus" })}
                onChange={(e) => {
                  setCustomerAddress(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit Button (High-conversion, single line, no wrap) */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 disabled:bg-slate-400 text-white font-black text-sm sm:text-base py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap mt-2"
            >
              <span>{isSubmitting ? "অর্ডার প্রসেস হচ্ছে..." : `অর্ডার কনফার্ম করুন • ৳${grandTotal}`}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Trust Badges Bar (Matching Ummah Wed) */}
            <div className="grid grid-cols-3 gap-1 pt-3 border-t border-slate-100 text-center">
              <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-600">
                <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>ফ্রি হোম ডেলিভারি</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>ক্যাশ অন ডেলিভারি</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-600">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>পণ্য দেখে মূল্য পরিশোধ</span>
              </div>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
