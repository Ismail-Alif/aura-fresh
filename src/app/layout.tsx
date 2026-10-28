import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";
import { MetaPixelTracker } from "@/components/MetaPixelTracker";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.brandName} (${SITE_CONFIG.brandNameBn}) | ১০০% প্রাকৃতিক দুর্গন্ধ শোষক ও এয়ার পিউরিফায়ার`,
  description: "অ্যাক্টিভেটেড কার্বন ও পটাশিয়াম পারম্যাঙ্গানেট প্রযুক্তিতে তৈরি শক্তিশালী দুর্গন্ধ শোষক। ঘরের স্যাঁতসেঁতে আর্দ্রতা, জুতা, রান্নাঘর ও বাথরুমের দুর্গন্ধ দূর করুন স্থায়ীভাবে।",
  keywords: [
    "AuraFresh",
    "odor control",
    "activated carbon",
    "potassium permanganate",
    "shoe odor remover",
    "air purifier bangladesh",
    "ঘরের দুর্গন্ধ দূর করার উপায়",
    "জুতার গন্ধ দূর"
  ],
  openGraph: {
    title: `${SITE_CONFIG.brandName} - প্রাকৃতিক দুর্গন্ধ শোষক`,
    description: "পেঁয়াজের ঝাঁঝালো গন্ধ, জুতার তীব্র গন্ধ ও ভ্যাপসা আর্দ্রতা দূর করুন প্রাকৃতিকভাবে।",
    locale: "bn_BD",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/brand-assets/aurafresh-facebook-avatar.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className="antialiased bg-slate-50 text-slate-900 font-sans">
        <MetaPixelTracker />
        {children}
      </body>
    </html>
  );
}
