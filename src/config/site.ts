export interface ProductPackage {
  id: string;
  name: string;
  bnTitle: string;
  weight: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  badge?: string;
  isPopular?: boolean;
  freeShipping?: boolean;
  giftText?: string;
  features: string[];
}

export interface OrderDetails {
  orderId?: string;
  product: string;
  productId: string;
  quantity: number;
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  deliveryArea: string;
  paymentMethod: string;
  bkashTrxId?: string | null;
  createdAt?: string;
}

export const SITE_CONFIG = {
  brandName: "AuraFresh",
  brandNameBn: "অরাফ্রেশ",
  tagline: "অ্যাক্টিভেটেড কার্বন ও পটাশিয়াম পারম্যাঙ্গানেট প্রযুক্তির বৈজ্ঞানিক এয়ার পিউরিফায়ার",
  bkashNumber: "01700000000",
  bkashType: "Personal",
  shipping: {
    insideDhaka: 60,
    outsideDhaka: 80,
    freeDeliveryThresholdQty: 99,
  },
  products: [
    {
      id: "pro-multi-room-500g",
      name: "AuraFresh Pro Multi-Room (500g)",
      bnTitle: "প্রো মাল্টি-রুম বক্স (৫০০ গ্রাম)",
      weight: "500g (হাফ কেজি)",
      subtitle: "বেডরুম, বাথরুম, রান্নাঘর, ফ্রিজ ও জুতার দুর্গন্ধ পুরোপুরি দূর করতে",
      price: 999,
      originalPrice: 1450,
      badge: "🔥 ধামাকা অফার",
      isPopular: true,
      freeShipping: false,
      giftText: "🚚 দ্রুততম হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি",
      features: [
        "পেঁয়াজ, রসুন ও রান্নার তীব্র ঝাঁঝালো গন্ধ সাথে সাথে শোষণ করে",
        "ফ্রিজের মাছ-মাংস ও বাথরুমের অস্বস্তিকর গন্ধ স্থায়ীভাবে দূর করে",
        "কালো অ্যাক্টিভেটেড কার্বন + বেগুনী পারম্যাঙ্গানেটের শক্তিশালী ডুয়াল অ্যাকশন",
        "কোনো ক্ষতিকর রাসায়নিক বা কৃত্রিম সেন্ট ছাড়াই ১০০% প্রাকৃতিক",
        "টানা ৪ থেকে ৬ মাস একটানা নিরবচ্ছিন্ন সুরক্ষা",
        "ক্যাশ অন ডেলিভারিতে পণ্য হাতে পেয়ে চেক করে মূল্য পরিশোধ",
        "দ্রুততম হোম ডেলিভারি (ঢাকা ৬০৳, ঢাকার বাইরে ৮০৳)"
      ]
    },
    {
      id: "mega-family-bundle-1000g",
      name: "AuraFresh Mega Family Bundle (1000g)",
      bnTitle: "মেগা ফ্যামিলি কম্বো (১ কেজি / ২টি বক্স)",
      weight: "1000g (500g x 2)",
      subtitle: "পুরো বাড়ির ফ্রেশ বাতাসের জন্য সম্পূর্ণ প্যাকেজ",
      price: 1850,
      originalPrice: 2900,
      badge: "⭐ সেরা সাশ্রয়ী কম্বো",
      isPopular: false,
      freeShipping: false,
      giftText: "🚚 দ্রুততম হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি",
      features: [
        "মাস্টার বেডরুম + লিভিং রুম + কিচেন সম্পূর্ণ কাভার করে",
        "পুরো বাড়ির জন্য ৫০০ গ্রাম করে ২টি সম্পূর্ণ প্রিমিয়াম বক্স",
        "টানা ৬ মাস পর্যন্ত পুরো বাড়ির বাতাস রাখে নিরাপদ ও গন্ধমুক্ত",
        "ক্যাশ অন ডেলিভারিতে পণ্য হাতে পেয়ে মূল্য পরিশোধ",
        "দ্রুততম হোম ডেলিভারি (ঢাকা ৬০৳, ঢাকার বাইরে ৮০৳)"
      ]
    },
    {
      id: "shoe-closet-pack-200g",
      name: "AuraFresh Shoe & Wardrobe Duo (200g)",
      bnTitle: "শু & ড্রয়ার ডুও প্যাক (১০০g × ২ = ২০০ গ্রাম)",
      weight: "200g (100g x 2)",
      subtitle: "জুতা, মোজা, জিম ব্যাগ ও আলমারির গন্ধের জন্য বিশেষ প্যাক",
      price: 550,
      originalPrice: 750,
      badge: "👟 জুতা ও ড্রয়ার স্পেশাল",
      isPopular: false,
      freeShipping: false,
      giftText: "🚚 দ্রুততম হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি",
      features: [
        "প্রতিটি জুতার ভেতরে সহজেই রাখার মতো পারফেক্ট সাইজ",
        "ঘামের গন্ধ ও আইসোভ্যালেরিক অ্যাসিড মাত্র ২০ মিনিটে নিউট্রালাইজ করে",
        "ড্রয়ার ও আলমারির আর্দ্রতা ও ভ্যাপসা গন্ধ রোধ করে",
        "টানা ৩ থেকে ৪ মাস পর্যন্ত সর্বোচ্চ কার্যকর",
        "ক্যাশ অন ডেলিভারিতে চেক করে মূল্য পরিশোধ"
      ]
    }
  ] as ProductPackage[]
};
