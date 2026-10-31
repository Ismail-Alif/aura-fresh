"use client";

import React, { useState } from "react";
import { SITE_CONFIG, ProductPackage, OrderDetails } from "@/config/site";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ScienceExplainer } from "@/components/ScienceExplainer";
import { ProblemSolutions } from "@/components/ProblemSolutions";
import { RoomAdvisor } from "@/components/RoomAdvisor";
import { ProductCard } from "@/components/ProductCard";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Reviews } from "@/components/Reviews";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { OrderSuccessModal } from "@/components/OrderSuccessModal";
import { MobileBottomBar } from "@/components/MobileBottomBar";
import { ViewContentTracker } from "@/components/ViewContentTracker";
import { trackInitiateCheckout } from "@/lib/metaPixel";
import { Tag } from "lucide-react";

export default function Home() {
  // Default selected package: Pro Multi-Room (500g) - ৳999
  const [selectedPackage, setSelectedPackage] = useState<ProductPackage>(SITE_CONFIG.products[0]);
  const [placedOrder, setPlacedOrder] = useState<OrderDetails | null>(null);

  const scrollToCheckout = () => {
    // Dual fire InitiateCheckout on CTA click (Matching VocabJoy handleCtaClick)
    trackInitiateCheckout({ product: selectedPackage, source: "cta_button_click" });

    const el = document.getElementById("checkout");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToScience = () => {
    const el = document.getElementById("science");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectPackage = (pkg: ProductPackage) => {
    setSelectedPackage(pkg);
    scrollToCheckout();
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* ViewContent Meta Pixel & CAPI Dual Dispatch Tracker (Matching Ummah Wed & Vocab Joy) */}
      <ViewContentTracker product={selectedPackage} />

      {/* Navigation */}
      <Navbar onOrderClick={scrollToCheckout} />

      {/* Hero Section */}
      <Hero
        onOrderClick={scrollToCheckout}
        onExploreScience={scrollToScience}
      />

      {/* 4 Major Problems & Solutions */}
      <ProblemSolutions onOrderClick={scrollToCheckout} />

      {/* The Science & Chemistry Behind the Dual Media */}
      <ScienceExplainer />

      {/* Room Advisor / Calculator */}
      <RoomAdvisor onSelectPackage={handleSelectPackage} />

      {/* Packages & Pricing Section */}
      <section id="pricing" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
              <Tag className="w-4 h-4 text-emerald-600" />
              <span>সীমিত সময়ের বিশেষ অফার</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              আপনার পছন্দের প্যাকেজটি বেছে নিন
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              যেকোনো প্যাকেজ সিলেক্ট করে নিচে সরাসরি ক্যাশ অন ডেলিভারিতে অর্ডার কনফার্ম করুন:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {SITE_CONFIG.products.map((pkg) => (
              <ProductCard
                key={pkg.id}
                pkg={pkg}
                isSelected={selectedPackage.id === pkg.id}
                onSelect={handleSelectPackage}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Checkout Form Section */}
      <CheckoutForm
        selectedPackage={selectedPackage}
        onOrderSuccess={(details) => setPlacedOrder(details)}
      />

      {/* Customer Reviews */}
      <Reviews />

      {/* FAQ Accordion */}
      <FAQ />

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile Bottom Bar */}
      <MobileBottomBar onOrderClick={scrollToCheckout} />

      {/* Order Success Confirmation Modal */}
      {placedOrder && (
        <OrderSuccessModal
          orderDetails={placedOrder}
          onClose={() => setPlacedOrder(null)}
        />
      )}
    </main>
  );
}
