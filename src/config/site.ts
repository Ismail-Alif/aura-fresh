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
  supportPhone: "01700-000000",
  whatsappNumber: "+8801700000000",
  bkashNumber: "01700000000",
  bkashType: "Personal",
  shipping: {
    insideDhaka: 70,
    outsideDhaka: 120,
    freeDeliveryThresholdQty: 2, // ২ বা ততোধিক প্রোডাক্ট নিলে ডেলিভারি ফ্রি
  },
  products: [
    {
      id: "shoe-closet-pack-200g",
      name: "AuraFresh Shoe & Wardrobe Duo (200g)",
      bnTitle: "শু & ড্রয়ার ডুও প্যাক (১০০g × ২ = ২০০ গ্রাম)",
      weight: "200g (100g x 2)",
      subtitle: "জুতা, মোজা, জিম ব্যাগ ও আলমারির গন্ধের জন্য বিশেষ প্যাক",
      price: 390,
      originalPrice: 550,
      badge: "👟 জুতা ও ড্রয়ার স্পেশাল",
      isPopular: false,
      freeShipping: false,
      giftText: "✅ ১০০ গ্রাম করে ২টি পৃথক ব্রিদেবল পাউচ",
      features: [
        "প্রতিটি জুতার ভেতরে সহজেই রাখার মতো পারফেক্ট সাইজ",
        "ঘামের গন্ধ ও আইসোভ্যালেরিক অ্যাসিড মাত্র ২০ মিনিটে নিউট্রালাইজ করে",
        "ড্রয়ার ও আলমারির আর্দ্রতা ও ভ্যাপসা গন্ধ রোধ করে",
        "টানা ৩ থেকে ৪ মাস পর্যন্ত সর্বোচ্চ কার্যকর",
        "ক্যাশ অন ডেলিভারিতে চেক করে মূল্য পরিশোধ"
      ]
    },
    {
      id: "pro-multi-room-500g",
      name: "AuraFresh Pro Multi-Room (500g)",
      bnTitle: "প্রো মাল্টি-রুম বক্স (৫০০ গ্রাম)",
      weight: "500g",
      subtitle: "বেডরুম, বাথরুম, রান্নাঘর ও ফ্রিজের গন্ধ পুরোপুরি দূর করতে",
      price: 890,
      originalPrice: 1190,
      badge: "🔥 সবচেয়ে জনপ্রিয় চয়েস",
      isPopular: true,
      freeShipping: false,
      giftText: "🎁 সাথে পাচ্ছেন ১টি প্রিমিয়াম মশা নিরোধক ন্যাচারাল আতর উপহার!",
      features: [
        "🎁 ১টি (৬ মিলি) লং-লাস্টিং মশা নিরোধক ন্যাচারাল আতর ফ্রি",
        "পেঁয়াজ, রসুন ও রান্নার তীব্র ঝাঁঝালো গন্ধ সাথে সাথে শোষণ করে",
        "ফ্রিজের মাছ-মাংস ও বাথরুমের অস্বস্তিকর গন্ধ দূর করে",
        "কালো কার্বন + বেগুনী অ্যালুমিনা পিলেটের ডুয়াল অ্যাকশন",
        "টানা ৪ থেকে ৬ মাস একটানা নিরবচ্ছিন্ন সুরক্ষা",
        "২টি নিলে সারাদেশে হোম ডেলিভারি সম্পূর্ণ ফ্রি!"
      ]
    },
    {
      id: "mega-family-bundle-1000g",
      name: "AuraFresh Mega Family Bundle (1000g)",
      bnTitle: "মেগা ফ্যামিলি কম্বো (১ কেজি / ২টি বক্স)",
      weight: "1000g (500g x 2)",
      subtitle: "পুরো বাড়ির ফ্রেশ বাতাসের জন্য সম্পূর্ণ প্যাকেজ | ফ্রি ডেলিভারি",
      price: 1590,
      originalPrice: 2150,
      badge: "⭐ সেরা সাশ্রয়ী প্যাকেজ",
      isPopular: false,
      freeShipping: true,
      giftText: "🎁 সাথে ২টি মশা নিরোধক আতর + সারাদেশে ফ্রি ডেলিভারি!",
      features: [
        "🎁 ২টি (৬ মিলি) প্রিমিয়াম মশা নিরোধক লাক্সারি আতর ফ্রি",
        "🚚 সারাদেশে হোম ডেলিভারি চার্জ সম্পূর্ণ ফ্রি (৳০)",
        "মাস্টার বেডরুম + লিভিং রুম + কিচেন সম্পূর্ণ কাভার করে",
        "টানা ৬ মাস পর্যন্ত পুরো বাড়ির বাতাস রাখে নিরাপদ ও গন্ধমুক্ত",
        "ক্যাশ অন ডেলিভারিতে পণ্য হাতে পেয়ে মূল্য পরিশোধ"
      ]
    }
  ] as ProductPackage[]
};
