"use client";

import React, { useState } from "react";
import { ProductPackage, SITE_CONFIG, OrderDetails } from "@/config/site";
import { ShoppingCart, MessageCircle, AlertCircle, Sparkles } from "lucide-react";
import {
  trackInitiateCheckout,
  trackPurchase,
  trackContact,
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
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash">("cod");
  const [bkashTrxId, setBkashTrxId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Calculate pricing
  const subtotal = selectedPackage.price * quantity;
  
  // Shipping calculation
  const isFreeDelivery = selectedPackage.freeShipping || quantity >= SITE_CONFIG.shipping.freeDeliveryThresholdQty;
  const deliveryCharge = isFreeDelivery
    ? 0
    : deliveryArea === "insideDhaka"
    ? SITE_CONFIG.shipping.insideDhaka
    : SITE_CONFIG.shipping.outsideDhaka;

  const grandTotal = subtotal + deliveryCharge;

  // Dedicated CAPI Phone Enrichment (Matches Vocab Joy)
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

    if (paymentMethod === "bkash" && !bkashTrxId.trim()) {
      setErrorMsg("বিকাশ সিলেক্ট করলে ট্রানজেকশন আইডি (TrxID) বা যে নম্বর থেকে পাঠিয়েছেন তা লিখুন।");
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      product: selectedPackage.bnTitle,
      productId: selectedPackage.id,
      quantity,
      subtotal,
      deliveryCharge,
      grandTotal,
      customerName,
      customerPhone: phoneValidation.phone,
      customerAddress,
      deliveryArea: deliveryArea === "insideDhaka" ? "ঢাকার ভেতরে" : "ঢাকার বাইরে",
      paymentMethod: paymentMethod === "cod" ? "ক্যাশ অন ডেলিভারি" : "বিকাশ পেমেন্ট",
      bkashTrxId: paymentMethod === "bkash" ? bkashTrxId : null,
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
        customerName,
        customerPhone: phoneValidation.phone,
        customerAddress,
      });

      onOrderSuccess({ ...orderPayload, orderId });
    } catch (err) {
      console.error("Order submit error:", err);
      const fallbackOrderId = `AC-${Date.now()}`;

      // Fallback tracking
      await trackPurchase({
        orderId: fallbackOrderId,
        productId: selectedPackage.id,
        product: selectedPackage.bnTitle,
        grandTotal,
        quantity,
        customerName,
        customerPhone: phoneValidation.phone,
        customerAddress,
      });

      onOrderSuccess({ ...orderPayload, orderId: fallbackOrderId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppOrder = () => {
    trackContact("whatsapp");
    const text = encodeURIComponent(
      `আসসালামু আলাইকুম, আমি ${SITE_CONFIG.brandNameBn} অর্ডার করতে চাই:\n\nপ্যাকেজ: ${selectedPackage.bnTitle}\nপরিমাণ: ${quantity} টি\nমূল্য: ৳${grandTotal}\nনাম: ${customerName || "..."}\nমোবাইল: ${customerPhone || "..."}\nঠিকানা: ${customerAddress || "..."}`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <section id="checkout" className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-emerald-50/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>সহজ অর্ডারিং প্রক্রিয়া</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            ক্যাশ অন ডেলিভারিতে অর্ডার কনফার্ম করুন
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
            নিচের ফর্মে আপনার ডেলিভারি তথ্য দিন। কোনো অগ্রিম পেমেন্ট ছাড়াই সারা দেশে পণ্য দেখে মূল্য পরিশোধ করার সুবিধা।
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50">
          
          {/* Selected Package Badge / Summary */}
          <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                নির্বাচিত প্যাকেজ
              </div>
              <div className="text-lg sm:text-xl font-black text-slate-900">
                {selectedPackage.bnTitle}
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                {selectedPackage.weight} | {selectedPackage.subtitle}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-slate-500 line-through">
                  ৳{selectedPackage.originalPrice}
                </div>
                <div className="text-2xl font-black text-emerald-700">
                  ৳{selectedPackage.price}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Quantity Selector */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <div className="text-sm font-bold text-slate-900">প্যাকেজের সংখ্যা (Quantity)</div>
                <div className="text-xs text-slate-500">
                  {quantity >= 2 ? (
                    <span className="text-emerald-700 font-bold">🎉 আপনি ফ্রি হোম ডেলিভারি পাচ্ছেন!</span>
                  ) : (
                    <span>২ বা ততোধিক বক্স নিলে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center transition"
                >
                  -
                </button>
                <span className="text-base font-black w-6 text-center text-slate-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Customer Information Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  আপনার পূর্ণ নাম *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মোঃ কামরুল ইসলাম"
                  value={customerName}
                  onFocus={() => trackInitiateCheckout({ product: selectedPackage, source: "form_name_focus" })}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  মোবাইল নম্বর *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="017XXXXXXXX"
                  value={customerPhone}
                  onFocus={() => trackInitiateCheckout({ product: selectedPackage, source: "form_phone_focus" })}
                  onBlur={handlePhoneBlur}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Delivery Area Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                ডেলিভারি এলাকা নির্বাচন করুন *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    deliveryArea === "insideDhaka"
                      ? "bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/10"
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="deliveryArea"
                      checked={deliveryArea === "insideDhaka"}
                      onChange={() => setDeliveryArea("insideDhaka")}
                      className="accent-emerald-600"
                    />
                    <span className="text-xs sm:text-sm font-bold text-slate-800">ঢাকা সিটির ভেতরে</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">
                    {isFreeDelivery ? "ফ্রি" : `৳${SITE_CONFIG.shipping.insideDhaka}`}
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    deliveryArea === "outsideDhaka"
                      ? "bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/10"
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="deliveryArea"
                      checked={deliveryArea === "outsideDhaka"}
                      onChange={() => setDeliveryArea("outsideDhaka")}
                      className="accent-emerald-600"
                    />
                    <span className="text-xs sm:text-sm font-bold text-slate-800">ঢাকার বাইরে (সারাদেশে)</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">
                    {isFreeDelivery ? "ফ্রি" : `৳${SITE_CONFIG.shipping.outsideDhaka}`}
                  </span>
                </label>
              </div>
            </div>

            {/* Full Delivery Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                পূর্ণাঙ্গ ঠিকানা (বাসা/রোড নম্বর, এলাকা, থানা, জেলা) *
              </label>
              <textarea
                required
                rows={2}
                placeholder="যেমন: বাড়ি #১২, রোড #৪, ধানমন্ডি, ঢাকা"
                value={customerAddress}
                onFocus={() => trackInitiateCheckout({ product: selectedPackage, source: "form_address_focus" })}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
              ></textarea>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                পেমেন্ট মেথড *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/10"
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-emerald-600"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">ক্যাশ অন ডেলিভারি</div>
                    <div className="text-[11px] text-slate-500">পণ্য হাতে পেয়ে চেক করে টাকা দিন</div>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "bkash"
                      ? "bg-pink-50 border-pink-500 ring-2 ring-pink-500/10"
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "bkash"}
                    onChange={() => setPaymentMethod("bkash")}
                    className="accent-pink-600"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">বিকাশ পেমেন্ট</div>
                    <div className="text-[11px] text-slate-500">বিকাশ সেন্ড মানি করুন</div>
                  </div>
                </label>
              </div>

              {/* bKash instructions box if bkash is selected */}
              {paymentMethod === "bkash" && (
                <div className="mt-3 p-4 rounded-xl bg-pink-50/80 border border-pink-200 text-xs space-y-2">
                  <div className="font-bold text-pink-900">
                    এই নম্বরে সেন্ড মানি করুন: <span className="text-pink-700 font-mono text-sm">{SITE_CONFIG.bkashNumber}</span> ({SITE_CONFIG.bkashType})
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="বিকাশ TrxID বা প্রেরক নম্বর দিন..."
                    value={bkashTrxId}
                    onChange={(e) => setBkashTrxId(e.target.value)}
                    className="w-full bg-white border border-pink-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              )}
            </div>

            {/* Pricing Summary Box */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-600">
                <span>প্যাকেজ সাবটোটাল ({quantity} টি):</span>
                <span className="font-bold text-slate-900">৳{subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ডেলিভারি চার্জ:</span>
                <span className="font-bold text-slate-900">
                  {deliveryCharge === 0 ? (
                    <span className="text-emerald-700">ফ্রি (৳০)</span>
                  ) : (
                    `৳${deliveryCharge}`
                  )}
                </span>
              </div>
              {isFreeDelivery && (
                <div className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-md">
                  ✨ ডেলিভারি চার্জ সম্পূর্ণ ফ্রি হয়েছে!
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-base sm:text-lg font-black text-slate-900">
                <span>সর্বমোট প্রদেয়:</span>
                <span className="text-emerald-700">৳{grandTotal}</span>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-black text-base sm:text-lg py-4 rounded-2xl shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{isSubmitting ? "অর্ডার প্রসেস হচ্ছে..." : `অর্ডার কনফার্ম করুন • ৳${grandTotal}`}</span>
            </button>

            {/* Alternative WhatsApp Order Option */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>ফর্ম পূরণ করতে ঝামেলা মনে হলে সরাসরি হোয়াটসঅ্যাপে অর্ডার করুন</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
