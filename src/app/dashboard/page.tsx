"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  Copy,
  Check,
  RefreshCw,
  Search,
  LogOut,
  Settings,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Truck,
  Sparkles,
  Archive,
  BarChart2,
  X,
  PhoneCall,
  Zap,
} from "lucide-react";

interface Order {
  id: string;
  _id: string;
  name: string;
  phone: string;
  address: string;
  productId: string;
  productName: string;
  deliveryArea: string;
  deliveryCharge: number;
  price: number;
  quantity: number;
  totalAmount: number;
  paymentMethod: string;
  consignmentId?: string | null;
  trackingCode?: string | null;
  status: string;
  orderType: string;
  isPhoneConfirmed: boolean;
  courierStatusMessage?: string | null;
  courierSuccessCount?: number | null;
  courierCancelCount?: number | null;
  volumeBand?: string | null;
  volumeRange?: string | null;
  trafficSource?: string | null;
  adId?: string | null;
  adsetId?: string | null;
  campaignId?: string | null;
  attribution?: Record<string, unknown> | null;
  capiEventId?: string | null;
  capiSentAt?: string | null;
  capiLastError?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string;
}

interface FraudStats {
  successCount: number;
  cancelCount: number;
  volumeBand?: string | null;
  volumeRange?: string | null;
}

interface AdStats {
  totalOrders?: number;
  adOrders?: number;
  campaigns?: Record<string, number>;
}

interface StatusCounts {
  all: number;
  pending: number;
  in_review: number;
  confirmed: number;
  processing: number;
  delivered: number;
  cancelled: number;
  hold: number;
  archived: number;
  suspected_fraud: number;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; badge: string; bg: string; dot: string }
> = {
  in_review: {
    label: "In Review",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/25",
    bg: "bg-blue-500",
    dot: "bg-blue-400",
  },
  confirmed: {
    label: "Confirmed",
    badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/25",
    bg: "bg-indigo-500",
    dot: "bg-indigo-400",
  },
  processing: {
    label: "Processing",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/25",
    bg: "bg-purple-500",
    dot: "bg-purple-400",
  },
  delivered: {
    label: "Delivered",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    bg: "bg-emerald-500",
    dot: "bg-emerald-400",
  },
  hold: {
    label: "Hold",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    bg: "bg-amber-500",
    dot: "bg-amber-400",
  },
  cancelled: {
    label: "Cancelled",
    badge: "bg-red-500/10 text-red-400 border-red-500/25",
    bg: "bg-red-500",
    dot: "bg-red-400",
  },
  pending: {
    label: "Pending",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/25",
    bg: "bg-orange-500",
    dot: "bg-orange-400",
  },
  archived: {
    label: "Archived",
    badge: "bg-gray-500/10 text-gray-400 border-gray-500/25",
    bg: "bg-gray-500",
    dot: "bg-gray-400",
  },
};

function formatBengaliDate(isoString?: string): string {
  if (!isoString) return "";
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString("bn-BD", {
      timeZone: "Asia/Dhaka",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return isoString;
  }
}

function formatRelativeTime(isoString: string): string {
  try {
    const d = new Date(isoString);
    const diffSec = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diffSec < 60) return "এইমাত্র";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} মিনিট আগে`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} দিন আগে`;
  } catch {
    return "";
  }
}

export default function DashboardPage() {
  const router = useRouter();

  // Authentication State
  const [authLoading, setAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    all: 0,
    pending: 0,
    in_review: 0,
    confirmed: 0,
    processing: 0,
    delivered: 0,
    cancelled: 0,
    hold: 0,
    archived: 0,
    suspected_fraud: 0,
  });

  // Query Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // UI State
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});
  const [fraudLoadingPhones, setFraudLoadingPhones] = useState<Record<string, boolean>>({});
  const [fraudStatsMap, setFraudStatsMap] = useState<Record<string, FraudStats>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [actionLoadingMap, setActionLoadingMap] = useState<Record<string, boolean>>({});

  // Modals
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAdStatsModal, setShowAdStatsModal] = useState(false);
  const [systemSettings, setSystemSettings] = useState({ autoCourier: true, autoCapi: true });
  const [savingSettings, setSavingSettings] = useState(false);
  const [adStatsData, setAdStatsData] = useState<AdStats | null>(null);
  const [loadingAdStats, setLoadingAdStats] = useState(false);

  // Toast / Status Message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getAuthHeaders = (): Record<string, string> => {
    if (typeof window === "undefined") return {};
    const t = localStorage.getItem("aurafresh_admin_token");
    return t ? { Authorization: `Bearer ${t}` } : {};
  };

  // 1. Verify Authentication
  useEffect(() => {
    fetch("/api/auth/me", { headers: getAuthHeaders() })
      .then((res) => {
        if (!res.ok) {
          router.replace("/dashboard/login");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data?.authenticated) {
          setCurrentUser(data.user);
          setAuthLoading(false);
        } else {
          router.replace("/dashboard/login");
        }
      })
      .catch(() => {
        router.replace("/dashboard/login");
      });
  }, [router]);

  // 2. Fetch Orders
  const fetchOrders = useCallback(async () => {
    if (authLoading) return;
    setLoadingOrders(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter && statusFilter !== "all") {
        params.append("status", statusFilter);
      }
      if (searchTerm.trim()) {
        params.append("search", searchTerm.trim());
      }
      params.append("page", String(page));
      params.append("limit", String(limit));

      const res = await fetch(`/api/dashboard/orders?${params.toString()}`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
        setTotal(data.total || 0);
        if (data.statusCounts) setStatusCounts(data.statusCounts);
        if (typeof data.todayCount === "number") setTodayCount(data.todayCount);
        if (typeof data.todayRevenue === "number") setTodayRevenue(data.todayRevenue);
        if (typeof data.totalRevenue === "number") setTotalRevenue(data.totalRevenue);
      } else {
        showToast("অর্ডার ডাটা ফেচ করতে সমস্যা হয়েছে");
      }
    } catch (err) {
      console.error(err);
      showToast("নেটওয়ার্ক ত্রুটি, পুনরায় চেষ্টা করুন");
    } finally {
      setLoadingOrders(false);
    }
  }, [authLoading, statusFilter, searchTerm, page, limit]);

  useEffect(() => {
    if (!authLoading) {
      const timer = setTimeout(() => {
        fetchOrders();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [fetchOrders, authLoading]);

  // Fetch Settings on mount
  useEffect(() => {
    if (!authLoading) {
      fetch("/api/dashboard/settings", { headers: getAuthHeaders() })
        .then((res) => res.json())
        .then((data) => {
          if (data && typeof data.autoCourier === "boolean") {
            setSystemSettings(data);
          }
        })
        .catch(() => {});
    }
  }, [authLoading]);

  // 3. Actions
  const handleStatusChange = async (id: string, newStatus: string) => {
    setActionLoadingMap((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await fetch("/api/dashboard/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`স্ট্যাটাস পরিবর্তিত হয়েছে: ${newStatus}`);
        setOrders((prev) =>
          prev.map((o) => (o.id === id || o._id === id ? { ...o, status: newStatus } : o))
        );
        fetchOrders();
      } else {
        showToast(data.error || "স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে");
      }
    } catch {
      showToast("স্ট্যাটাস আপডেট ব্যর্থ হয়েছে");
    } finally {
      setActionLoadingMap((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handlePhoneConfirmToggle = async (id: string) => {
    setActionLoadingMap((prev) => ({ ...prev, [`phone_${id}`]: true }));
    try {
      const res = await fetch(`/api/dashboard/orders/${id}/confirm-phone`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const confirmed = data.order?.isPhoneConfirmed;
        showToast(confirmed ? "ফোন নম্বর নিশ্চিত করা হয়েছে ✅" : "ফোন নিশ্চিতকরণ বাতিল করা হয়েছে");
        setOrders((prev) =>
          prev.map((o) =>
            o.id === id || o._id === id ? { ...o, isPhoneConfirmed: confirmed } : o
          )
        );
      }
    } catch {
      showToast("ফোন আপডেট ব্যর্থ হয়েছে");
    } finally {
      setActionLoadingMap((prev) => ({ ...prev, [`phone_${id}`]: false }));
    }
  };

  const handleRetryCourier = async (id: string) => {
    setActionLoadingMap((prev) => ({ ...prev, [`courier_${id}`]: true }));
    try {
      const res = await fetch(`/api/dashboard/orders/${id}/retry-courier`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.ok && data.consignmentId) {
        showToast(`স্টেডফাস্টে পার্সেল বুকিং সফল: CN ${data.consignmentId}`);
        setOrders((prev) =>
          prev.map((o) =>
            o.id === id || o._id === id
              ? {
                  ...o,
                  consignmentId: String(data.consignmentId),
                  trackingCode: data.trackingCode,
                  status: data.status || o.status,
                }
              : o
          )
        );
      } else {
        showToast(data.error || "কুরিয়ার পার্সেল তৈরি ব্যর্থ হয়েছে");
      }
    } catch {
      showToast("কুরিয়ার রিকোয়েস্ট ব্যর্থ হয়েছে");
    } finally {
      setActionLoadingMap((prev) => ({ ...prev, [`courier_${id}`]: false }));
    }
  };

  const handleRetryCapi = async (id: string) => {
    setActionLoadingMap((prev) => ({ ...prev, [`capi_${id}`]: true }));
    try {
      const res = await fetch(`/api/dashboard/orders/${id}/retry-capi`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("মেটা সিএপিআই (Purchase) ইভেন্ট সফলভাবে পাঠানো হয়েছে 🚀");
        setOrders((prev) =>
          prev.map((o) =>
            o.id === id || o._id === id
              ? { ...o, capiEventId: data.order?.capiEventId, capiLastError: null }
              : o
          )
        );
      } else {
        showToast(data.error || "মেটা সিএপিআই ইভেন্ট পাঠানো যায়নি");
      }
    } catch {
      showToast("মেটা সিএপিআই রিকোয়েস্ট ব্যর্থ হয়েছে");
    } finally {
      setActionLoadingMap((prev) => ({ ...prev, [`capi_${id}`]: false }));
    }
  };

  const handleArchiveToggle = async (id: string) => {
    setActionLoadingMap((prev) => ({ ...prev, [`archive_${id}`]: true }));
    try {
      const res = await fetch(`/api/dashboard/orders/${id}/archive`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const isArchived = data.order?.status === "archived";
        showToast(isArchived ? "অর্ডারটি আর্কাইভ করা হয়েছে" : "আর্কাইভ বাতিল করা হয়েছে");
        setOrders((prev) =>
          prev.map((o) =>
            o.id === id || o._id === id ? { ...o, status: data.order?.status || o.status } : o
          )
        );
      }
    } catch {
      showToast("আর্কাইভ অপারেশন ব্যর্থ হয়েছে");
    } finally {
      setActionLoadingMap((prev) => ({ ...prev, [`archive_${id}`]: false }));
    }
  };

  const handleCheckFraud = async (phone: string) => {
    if (!phone) return;
    setFraudLoadingPhones((prev) => ({ ...prev, [phone]: true }));
    try {
      const res = await fetch(`/api/dashboard/fraud-check/${encodeURIComponent(phone)}`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFraudStatsMap((prev) => ({ ...prev, [phone]: data }));
        showToast(`ভেরিফিকেশন সম্পন্ন: ${data.successCount} ডেলিভারি / ${data.cancelCount} ক্যানসেল`);
      } else {
        showToast("স্টেডফাস্ট ডাটা পাওয়া যায়নি");
      }
    } catch {
      showToast("ফ্রড ভেরিফিকেশন ব্যর্থ হয়েছে");
    } finally {
      setFraudLoadingPhones((prev) => ({ ...prev, [phone]: false }));
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLogout = async () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("aurafresh_admin_token");
      }
      await fetch("/api/auth/logout", { method: "POST", headers: getAuthHeaders() });
    } finally {
      router.push("/dashboard/login");
    }
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      const res = await fetch("/api/dashboard/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(systemSettings),
      });
      if (res.ok) {
        showToast("সিস্টেম সেটিংস সফলভাবে সংরক্ষিত হয়েছে ✅");
        setShowSettingsModal(false);
      } else {
        showToast("সেটিংস সেভ করতে সমস্যা হয়েছে");
      }
    } catch {
      showToast("সেটিংস সেভ ব্যর্থ হয়েছে");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleOpenAdStats = async () => {
    setShowAdStatsModal(true);
    setLoadingAdStats(true);
    try {
      const res = await fetch("/api/dashboard/ad-stats", { headers: getAuthHeaders() });
      const data = await res.json();
      setAdStatsData(data);
    } catch {
      showToast("অ্যাড পরিসংখ্যান লোড করা যায়নি");
    } finally {
      setLoadingAdStats(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen w-full bg-[#0d111d] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
        <span className="text-xs text-gray-400 font-mono">লগইন ভেরিফাই হচ্ছে...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[#f3f4f6] selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#161d30] border border-emerald-500/30 text-emerald-300 px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 backdrop-blur-md animate-fade-in">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1700px] mx-auto p-3 sm:p-5 lg:p-6 transition-all duration-300">
        {/* ==================== 1. Unified Header, Stats & Filters Container ==================== */}
        <div className="bg-[#161d30] border border-white/5 rounded-2xl p-4 sm:p-5 mb-5 shadow-xl flex flex-col gap-4 relative overflow-hidden">
          {/* Top Decorative Gradient Accent Bar */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />

          {/* Top Bar: Title, Date, Live Counters & Action Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Left: Brand & Date */}
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <ShieldCheck className="w-4 h-4 text-[#0b0f19]" />
                </div>
                <div>
                  <h1 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                    <span>Aura Fresh Orders Dashboard</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Live
                    </span>
                  </h1>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-gray-400 font-medium">
                <span className="text-emerald-400 font-bold">
                  {formatBengaliDate(new Date().toISOString())}
                </span>
                <span className="text-gray-600">•</span>
                <span>
                  আজকের অর্ডার: <strong className="text-white">{todayCount}</strong> টি (৳{todayRevenue.toLocaleString()})
                </span>
                <span className="text-gray-600">•</span>
                <span>
                  সর্বমোট: <strong className="text-white">{statusCounts.all || total}</strong> টি (৳{totalRevenue.toLocaleString()})
                </span>
                {currentUser && (
                  <>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400 font-mono hidden sm:inline">
                      Admin: <strong className="text-emerald-300">{currentUser.email}</strong>
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Right: Actions (Refresh, Ad Stats, Settings, Logout) */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={fetchOrders}
                disabled={loadingOrders}
                title="রিফ্রেশ করুন"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 flex items-center justify-center transition shadow-sm cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loadingOrders ? "animate-spin text-emerald-400" : ""}`} />
              </button>

              <button
                onClick={handleOpenAdStats}
                title="মেটা অ্যাড পরিসংখ্যান"
                className="w-9 h-9 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 flex items-center justify-center transition shadow-sm cursor-pointer"
              >
                <BarChart2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowSettingsModal(true)}
                title="সিস্টেম কুরিয়ার ও সিএপিআই সেটিংস"
                className="w-9 h-9 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 flex items-center justify-center transition shadow-sm cursor-pointer"
              >
                <Settings className="w-4 h-4" />
              </button>

              <button
                onClick={handleLogout}
                title="লগআউট করুন"
                className="w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center justify-center transition shadow-sm cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick-Filter Metric Pills (Tabs) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 no-scrollbar text-xs font-semibold">
            {[
              { key: "all", label: "সব অর্ডার", count: statusCounts.all || total, color: "text-gray-300 border-white/10 bg-white/5" },
              { key: "in_review", label: "ইন-রিভিউ", count: statusCounts.in_review, color: "text-blue-400 border-blue-500/25 bg-blue-500/10" },
              { key: "confirmed", label: "কনফার্মড", count: statusCounts.confirmed, color: "text-indigo-400 border-indigo-500/25 bg-indigo-500/10" },
              { key: "delivered", label: "ডেলিভার্ড", count: statusCounts.delivered, color: "text-emerald-400 border-emerald-500/25 bg-emerald-500/10" },
              { key: "hold", label: "হোল্ড", count: statusCounts.hold, color: "text-amber-400 border-amber-500/25 bg-amber-500/10" },
              { key: "cancelled", label: "ক্যানসেল্ড", count: statusCounts.cancelled, color: "text-red-400 border-red-500/25 bg-red-500/10" },
              { key: "suspected_fraud", label: "সন্দেহজনক", count: statusCounts.suspected_fraud, color: "text-rose-400 border-rose-500/25 bg-rose-500/10" },
              { key: "archived", label: "আর্কাইভড", count: statusCounts.archived, color: "text-gray-400 border-gray-500/25 bg-gray-500/10" },
            ].map((tab) => {
              const active = statusFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setStatusFilter(tab.key);
                    setPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? "bg-emerald-500 text-[#0b0f19] border-emerald-400 font-bold shadow-md shadow-emerald-500/20"
                      : `${tab.color} hover:bg-white/10`
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-md font-mono ${
                      active ? "bg-black/20 text-black font-extrabold" : "bg-black/30 text-white"
                    }`}
                  >
                    {tab.count || 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Filters Row */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2 border-t border-white/5">
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                placeholder="নাম, ফোন নম্বর (01...), কনসাইনমেন্ট আইডি দিয়ে খুঁজুন..."
                className="w-full pl-9 pr-3.5 py-2 bg-[#0d111d] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-44">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full appearance-none px-3 py-2 bg-[#0d111d] border border-white/10 rounded-xl text-xs text-white outline-none focus:border-emerald-500 transition cursor-pointer pr-8"
                >
                  <option value="all">সব স্ট্যাটাস</option>
                  <option value="in_review">In Review (রিভিউ)</option>
                  <option value="confirmed">Confirmed (কনফার্মড)</option>
                  <option value="delivered">Delivered (ডেলিভার্ড)</option>
                  <option value="hold">Hold (হোল্ড)</option>
                  <option value="cancelled">Cancelled (ক্যানসেল্ড)</option>
                  <option value="suspected_fraud">Suspected Fraud (সন্দেহজনক)</option>
                  <option value="archived">Archived (আর্কাইভ)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {(searchTerm || statusFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setPage(1);
                  }}
                  className="px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-semibold rounded-xl border border-white/10 transition whitespace-nowrap cursor-pointer"
                >
                  রিসেট
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ==================== 2. Orders Content (Table / Empty) ==================== */}
        {loadingOrders ? (
          <div className="bg-[#161d30] border border-white/5 rounded-2xl p-16 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
            <span className="text-xs text-gray-400 font-mono">অর্ডার লোড হচ্ছে...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-[#161d30] border border-white/5 rounded-2xl p-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-gray-500 mb-3">
              <Truck className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">কোনো অর্ডার পাওয়া যায়নি</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              {searchTerm || statusFilter !== "all"
                ? "বর্তমান ফিল্টার বা সার্চ দিয়ে কোনো অর্ডার পাওয়া যায়নি। ফিল্টার রিসেট করে দেখুন।"
                : "Aura Fresh ল্যান্ডিং পেজ থেকে নতুন কোনো অর্ডার আসলে তা স্বয়ংক্রিয়ভাবে এখানে চলে আসবে।"}
            </p>
          </div>
        ) : (
          <div className="bg-[#161d30] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-black/20 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    <th className="py-3.5 px-4">অর্ডার আইডি ও তারিখ</th>
                    <th className="py-3.5 px-4">গ্রাহকের তথ্য ও ফ্রড চেক</th>
                    <th className="py-3.5 px-4">পণ্য ও মূল্য</th>
                    <th className="py-3.5 px-4">স্টেডফাস্ট কুরিয়ার</th>
                    <th className="py-3.5 px-4">স্ট্যাটাস</th>
                    <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs text-gray-300">
                  {orders.map((order) => {
                    const id = order.id || order._id;
                    const isExpanded = !!expandedOrders[id];
                    const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.in_review;
                    const isActionLoading = !!actionLoadingMap[id];
                    const phoneLoading = !!fraudLoadingPhones[order.phone];
                    const fraudData =
                      fraudStatsMap[order.phone] ||
                      (typeof order.courierSuccessCount === "number"
                        ? {
                            successCount: order.courierSuccessCount,
                            cancelCount: order.courierCancelCount,
                            volumeBand: order.volumeBand,
                            volumeRange: order.volumeRange,
                          }
                        : null);

                    return (
                      <React.Fragment key={id}>
                        <tr
                          className={`hover:bg-white/[0.02] transition ${
                            isExpanded ? "bg-white/[0.02]" : ""
                          }`}
                        >
                          {/* Col 1: Order ID & Date */}
                          <td className="py-3.5 px-4 align-top">
                            <div className="flex flex-col gap-1">
                              <span className="font-mono text-emerald-400 font-bold text-[11px]">
                                #{id.slice(-8)}
                              </span>
                              <span className="text-[11px] text-gray-400 flex items-center gap-1 font-mono">
                                <Clock className="w-3 h-3 text-gray-500 shrink-0" />
                                {formatRelativeTime(order.createdAt)}
                              </span>
                              <span className="text-[10px] text-gray-500 font-mono">
                                {new Date(order.createdAt).toLocaleTimeString("en-GB", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </span>
                            </div>
                          </td>

                          {/* Col 2: Customer Info & Fraud Shield */}
                          <td className="py-3.5 px-4 align-top">
                            <div className="flex flex-col gap-1.5 max-w-xs">
                              <div className="flex items-center gap-2">
                                <strong className="text-white font-bold text-sm">
                                  {order.name || "গ্রাহক"}
                                </strong>
                                {order.isPhoneConfirmed && (
                                  <span
                                    title="ফোন নম্বর কনফার্মড"
                                    className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0"
                                  >
                                    <Check className="w-2.5 h-2.5" />
                                  </span>
                                )}
                              </div>

                              <a
                                href={`tel:${order.phone}`}
                                className="inline-flex items-center gap-1.5 font-mono text-xs text-indigo-300 hover:text-indigo-200 hover:underline w-fit"
                              >
                                <Phone className="w-3 h-3 text-indigo-400 shrink-0" />
                                <span>{order.phone}</span>
                              </a>

                              <span className="text-[11px] text-gray-400 leading-relaxed flex items-start gap-1">
                                <MapPin className="w-3 h-3 text-gray-500 shrink-0 mt-0.5" />
                                <span className="line-clamp-2">{order.address || "ঠিকানা নেই"}</span>
                              </span>

                              {/* Steadfast Anti-Fraud Badge */}
                              <div className="mt-1">
                                {phoneLoading ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] text-indigo-400 font-mono">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    <span>ভেরিফাই হচ্ছে...</span>
                                  </span>
                                ) : fraudData ? (
                                  <div className="inline-flex flex-wrap items-center gap-1.5">
                                    <button
                                      onClick={() => handleCheckFraud(order.phone)}
                                      title="পুনরায় ফ্রড ডাটা রিফ্রেশ করুন"
                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-black/40 border border-white/10 hover:border-emerald-500/40 transition cursor-pointer"
                                    >
                                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                      <span className="text-emerald-400 font-extrabold">
                                        {fraudData.successCount}
                                      </span>
                                      <span className="text-gray-600">|</span>
                                      <span className="text-red-400 font-extrabold">
                                        {fraudData.cancelCount}
                                      </span>
                                    </button>
                                    {fraudData.volumeBand && (
                                      <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                        {fraudData.volumeBand.replace("_", " ")}
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => handleCheckFraud(order.phone)}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition cursor-pointer"
                                  >
                                    <ShieldAlert className="w-3 h-3" />
                                    <span>Verify Steadfast</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Col 3: Product & Price */}
                          <td className="py-3.5 px-4 align-top">
                            <div className="flex flex-col gap-1 max-w-[200px]">
                              <span className="font-semibold text-white text-xs line-clamp-2">
                                {order.productName || order.productId}
                              </span>
                              <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                                <span className="px-1.5 py-0.2 rounded bg-white/5 border border-white/10 font-mono">
                                  {order.quantity}x
                                </span>
                                <span className="text-gray-400">
                                  {order.deliveryArea === "inside_dhaka"
                                    ? "ঢাকা (৬০৳)"
                                    : "ঢাকার বাইরে (৮০৳)"}
                                </span>
                              </div>
                              <span className="text-sm font-black text-emerald-400 font-mono mt-0.5">
                                ৳{(order.totalAmount || 0).toLocaleString()}
                              </span>
                            </div>
                          </td>

                          {/* Col 4: Steadfast Courier */}
                          <td className="py-3.5 px-4 align-top">
                            <div className="flex flex-col gap-1.5 max-w-[220px]">
                              {order.consignmentId ? (
                                <>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                                      CN:
                                    </span>
                                    <span className="font-mono text-xs text-white font-bold">
                                      {order.consignmentId}
                                    </span>
                                    <button
                                      onClick={() => handleCopy(order.consignmentId!, `cn_${id}`)}
                                      title="কপি করুন"
                                      className="text-gray-500 hover:text-white"
                                    >
                                      {copiedId === `cn_${id}` ? (
                                        <Check className="w-3 h-3 text-emerald-400" />
                                      ) : (
                                        <Copy className="w-3 h-3" />
                                      )}
                                    </button>
                                  </div>

                                  {order.trackingCode && (
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                                        TRK:
                                      </span>
                                      <a
                                        href={`https://steadfast.com.bd/t/${order.trackingCode}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-mono text-xs text-emerald-400 hover:underline flex items-center gap-1"
                                      >
                                        <span>{order.trackingCode}</span>
                                        <ExternalLink className="w-2.5 h-2.5" />
                                      </a>
                                    </div>
                                  )}

                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                    <span className="text-[10px] text-gray-400 font-mono capitalize">
                                      {order.courierStatusMessage || "in_review"}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <div className="flex flex-col gap-1">
                                  <span className="text-[11px] text-amber-400 font-medium">
                                    কুরিয়ারে পার্সেল তৈরি হয়নি
                                  </span>
                                  <button
                                    onClick={() => handleRetryCourier(id)}
                                    disabled={actionLoadingMap[`courier_${id}`]}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold transition w-fit cursor-pointer disabled:opacity-50"
                                  >
                                    {actionLoadingMap[`courier_${id}`] ? (
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                      <Truck className="w-3 h-3" />
                                    )}
                                    <span>Dispatch to Steadfast</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Col 5: Status Dropdown */}
                          <td className="py-3.5 px-4 align-top">
                            <div className="flex flex-col gap-1">
                              <div className="relative">
                                <select
                                  value={order.status}
                                  disabled={isActionLoading}
                                  onChange={(e) => handleStatusChange(id, e.target.value)}
                                  className={`appearance-none px-2.5 py-1.5 pr-7 rounded-xl text-xs font-bold border outline-none transition cursor-pointer ${cfg.badge}`}
                                >
                                  <option value="in_review" className="bg-[#161d30] text-blue-400">
                                    In Review
                                  </option>
                                  <option value="confirmed" className="bg-[#161d30] text-indigo-400">
                                    Confirmed
                                  </option>
                                  <option value="processing" className="bg-[#161d30] text-purple-400">
                                    Processing
                                  </option>
                                  <option value="delivered" className="bg-[#161d30] text-emerald-400">
                                    Delivered
                                  </option>
                                  <option value="hold" className="bg-[#161d30] text-amber-400">
                                    Hold
                                  </option>
                                  <option value="cancelled" className="bg-[#161d30] text-red-400">
                                    Cancelled
                                  </option>
                                  <option value="archived" className="bg-[#161d30] text-gray-400">
                                    Archived
                                  </option>
                                </select>
                                <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-70" />
                              </div>

                              {isActionLoading && (
                                <span className="text-[10px] text-gray-400 flex items-center gap-1 font-mono">
                                  <Loader2 className="w-2.5 h-2.5 animate-spin" /> সেভ হচ্ছে...
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Col 6: Actions */}
                          <td className="py-3.5 px-4 align-top text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Confirm Phone Button */}
                              <button
                                onClick={() => handlePhoneConfirmToggle(id)}
                                disabled={actionLoadingMap[`phone_${id}`]}
                                title={order.isPhoneConfirmed ? "ফোন আন-কনফার্ম করুন" : "ফোন কনফার্ম করুন"}
                                className={`w-7 h-7 rounded-lg border flex items-center justify-center transition cursor-pointer ${
                                  order.isPhoneConfirmed
                                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                    : "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border-white/10"
                                }`}
                              >
                                {actionLoadingMap[`phone_${id}`] ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <PhoneCall className="w-3 h-3" />
                                )}
                              </button>

                              {/* Retry Courier */}
                              <button
                                onClick={() => handleRetryCourier(id)}
                                disabled={actionLoadingMap[`courier_${id}`]}
                                title="স্টেডফাস্টে পাঠান / রি-ট্রাই"
                                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-emerald-300 border border-white/10 flex items-center justify-center transition cursor-pointer disabled:opacity-50"
                              >
                                {actionLoadingMap[`courier_${id}`] ? (
                                  <Loader2 className="w-3 h-3 animate-spin text-emerald-400" />
                                ) : (
                                  <Truck className="w-3 h-3" />
                                )}
                              </button>

                              {/* Retry CAPI */}
                              <button
                                onClick={() => handleRetryCapi(id)}
                                disabled={actionLoadingMap[`capi_${id}`]}
                                title="মেটা সিএপিআই ইভেন্ট রি-সেন্ড"
                                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-indigo-300 border border-white/10 flex items-center justify-center transition cursor-pointer disabled:opacity-50"
                              >
                                {actionLoadingMap[`capi_${id}`] ? (
                                  <Loader2 className="w-3 h-3 animate-spin text-indigo-400" />
                                ) : (
                                  <Zap className="w-3 h-3" />
                                )}
                              </button>

                              {/* Archive */}
                              <button
                                onClick={() => handleArchiveToggle(id)}
                                disabled={actionLoadingMap[`archive_${id}`]}
                                title="আর্কাইভ / রিস্টোর"
                                className={`w-7 h-7 rounded-lg border flex items-center justify-center transition cursor-pointer ${
                                  order.status === "archived"
                                    ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                    : "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border-white/10"
                                }`}
                              >
                                <Archive className="w-3 h-3" />
                              </button>

                              {/* Expand Details Toggle */}
                              <button
                                onClick={() =>
                                  setExpandedOrders((prev) => ({ ...prev, [id]: !prev[id] }))
                                }
                                title="অ্যাট্রিবিউশন ও ট্র্যাকিং বিস্তারিত"
                                className={`w-7 h-7 rounded-lg border flex items-center justify-center transition cursor-pointer ${
                                  isExpanded
                                    ? "bg-emerald-500 text-[#0b0f19] border-emerald-400 font-bold"
                                    : "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border-white/10"
                                }`}
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Collapsible Attribution & Security Details Panel */}
                        {isExpanded && (
                          <tr className="bg-black/30 border-b border-white/5">
                            <td colSpan={6} className="p-4">
                              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 text-[11px] bg-[#0d111d] p-4 rounded-xl border border-white/5">
                                <div>
                                  <span className="block text-[10px] uppercase font-bold text-gray-500">
                                    Traffic Source
                                  </span>
                                  <span className="font-mono text-emerald-400 font-bold">
                                    {order.trafficSource || "direct"}
                                  </span>
                                </div>

                                <div>
                                  <span className="block text-[10px] uppercase font-bold text-gray-500">
                                    Ad ID
                                  </span>
                                  <span className="font-mono text-gray-200">
                                    {order.adId || "—"}
                                  </span>
                                </div>

                                <div>
                                  <span className="block text-[10px] uppercase font-bold text-gray-500">
                                    Campaign ID
                                  </span>
                                  <span className="font-mono text-gray-200">
                                    {order.campaignId || "—"}
                                  </span>
                                </div>

                                <div>
                                  <span className="block text-[10px] uppercase font-bold text-gray-500">
                                    Meta CAPI Event
                                  </span>
                                  <span
                                    className={`font-mono ${
                                      order.capiEventId
                                        ? "text-emerald-400 font-bold"
                                        : order.capiLastError
                                        ? "text-red-400"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    {order.capiEventId
                                      ? `Sent (#${order.capiEventId.slice(-6)})`
                                      : order.capiLastError || "Not sent"}
                                  </span>
                                </div>

                                <div>
                                  <span className="block text-[10px] uppercase font-bold text-gray-500">
                                    IP Address
                                  </span>
                                  <span className="font-mono text-gray-300">
                                    {order.ipAddress || "—"}
                                  </span>
                                </div>

                                <div>
                                  <span className="block text-[10px] uppercase font-bold text-gray-500">
                                    Order ID
                                  </span>
                                  <span className="font-mono text-gray-400 break-all">{id}</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="block lg:hidden divide-y divide-white/5">
              {orders.map((order) => {
                const id = order.id || order._id;
                const isExpanded = !!expandedOrders[id];
                const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.in_review;
                const fraudData =
                  fraudStatsMap[order.phone] ||
                  (typeof order.courierSuccessCount === "number"
                    ? {
                        successCount: order.courierSuccessCount,
                        cancelCount: order.courierCancelCount,
                        volumeBand: order.volumeBand,
                      }
                    : null);

                return (
                  <div key={id} className="p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-emerald-400 font-bold text-xs">
                            #{id.slice(-8)}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            • {formatRelativeTime(order.createdAt)}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1">
                          {order.name || "গ্রাহক"}
                        </h4>
                      </div>

                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(id, e.target.value)}
                        className={`text-xs font-bold px-2 py-1 rounded-lg border outline-none ${cfg.badge}`}
                      >
                        <option value="in_review">In Review</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="delivered">Delivered</option>
                        <option value="hold">Hold</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1 text-xs text-gray-300">
                      <div className="flex items-center justify-between gap-2">
                        <a
                          href={`tel:${order.phone}`}
                          className="inline-flex items-center gap-1.5 font-mono text-indigo-300"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{order.phone}</span>
                        </a>

                        {fraudData ? (
                          <div className="inline-flex items-center gap-1 font-mono text-[10px] bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">{fraudData.successCount}</span>
                            <span className="text-gray-600">|</span>
                            <span className="text-red-400 font-bold">{fraudData.cancelCount}</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleCheckFraud(order.phone)}
                            className="text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20"
                          >
                            Verify
                          </button>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 leading-snug">{order.address}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                      <div>
                        <span className="text-gray-400">{order.productName || order.productId}</span>
                        <div className="font-bold text-emerald-400 font-mono text-sm mt-0.5">
                          ৳{(order.totalAmount || 0).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {order.consignmentId ? (
                          <div className="text-right font-mono text-[11px]">
                            <span className="text-gray-400">CN: {order.consignmentId}</span>
                            {order.trackingCode && (
                              <a
                                href={`https://steadfast.com.bd/t/${order.trackingCode}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-emerald-400 block hover:underline"
                              >
                                Track #{order.trackingCode}
                              </a>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => handleRetryCourier(id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold"
                          >
                            Dispatch
                          </button>
                        )}

                        <button
                          onClick={() => setExpandedOrders((prev) => ({ ...prev, [id]: !prev[id] }))}
                          className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400"
                        >
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-3 bg-[#0d111d] rounded-xl border border-white/5 text-[11px] grid grid-cols-2 gap-2 mt-1">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-gray-500 block">Traffic</span>
                          <span className="text-emerald-400 font-mono">{order.trafficSource || "direct"}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-gray-500 block">Ad ID</span>
                          <span className="text-gray-300 font-mono">{order.adId || "—"}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-gray-500 block">CAPI</span>
                          <span className="text-gray-300 font-mono">{order.capiEventId ? "Sent" : "Not sent"}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-bold text-gray-500 block">IP</span>
                          <span className="text-gray-300 font-mono">{order.ipAddress || "—"}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ==================== 3. System Settings Modal ==================== */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#161d30] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl text-gray-200 animate-scale-up">
            <div className="flex justify-between items-center mb-5 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base">সিস্টেম ইঞ্জিন সেটিংস</h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#0d111d] border border-white/5 cursor-pointer">
                <div>
                  <strong className="block text-xs font-bold text-white">
                    অটো স্টেডফাস্ট কুরিয়ার ডিসপ্যাচ
                  </strong>
                  <span className="text-[11px] text-gray-400">
                    অর্ডার কনফার্ম হওয়ামাত্রই স্টেডফাস্টে পার্সেল বুকিং হবে
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={systemSettings.autoCourier}
                  onChange={(e) =>
                    setSystemSettings((prev) => ({ ...prev, autoCourier: e.target.checked }))
                  }
                  className="w-4 h-4 accent-emerald-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#0d111d] border border-white/5 cursor-pointer">
                <div>
                  <strong className="block text-xs font-bold text-white">
                    অটো মেটা সিএপিআই (Purchase)
                  </strong>
                  <span className="text-[11px] text-gray-400">
                    সার্ভার থেকে মেটা পিক্সেলে পারচেজ ইভেন্ট সেন্ড হবে
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={systemSettings.autoCapi}
                  onChange={(e) =>
                    setSystemSettings((prev) => ({ ...prev, autoCapi: e.target.checked }))
                  }
                  className="w-4 h-4 accent-emerald-500 cursor-pointer"
                />
              </label>
            </div>

            <div className="flex justify-end gap-2.5 mt-6 pt-4 border-t border-white/5">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition"
              >
                বাতিল
              </button>
              <button
                onClick={handleSaveSettings}
                disabled={savingSettings}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1.5 shadow-md shadow-emerald-600/30 cursor-pointer"
              >
                {savingSettings && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>সেটিংস সেভ করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 4. Ad Stats Modal ==================== */}
      {showAdStatsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#161d30] border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl text-gray-200 animate-scale-up">
            <div className="flex justify-between items-center mb-5 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white text-base">মেটা অ্যাড পরিসংখ্যান (Ad Stats)</h3>
              </div>
              <button
                onClick={() => setShowAdStatsModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {loadingAdStats ? (
              <div className="py-12 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                <span className="text-xs text-gray-400 font-mono">ডাটা লোড হচ্ছে...</span>
              </div>
            ) : adStatsData ? (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#0d111d] border border-white/5">
                    <span className="text-[10px] text-gray-500 font-bold uppercase">
                      Total Orders
                    </span>
                    <strong className="block text-lg font-bold text-white mt-0.5">
                      {adStatsData.totalOrders || 0}
                    </strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0d111d] border border-white/5">
                    <span className="text-[10px] text-gray-500 font-bold uppercase">
                      Ad Attributed Orders
                    </span>
                    <strong className="block text-lg font-bold text-emerald-400 mt-0.5">
                      {adStatsData.adOrders || 0}
                    </strong>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-2 text-xs">Campaigns Breakdown:</h4>
                  {adStatsData.campaigns && Object.keys(adStatsData.campaigns).length > 0 ? (
                    <div className="space-y-1.5 max-h-48 overflow-y-auto">
                      {Object.entries(adStatsData.campaigns).map(([cId, count]) => (
                        <div
                          key={cId}
                          className="flex justify-between p-2 rounded-lg bg-[#0d111d] border border-white/5 font-mono text-[11px]"
                        >
                          <span className="text-gray-300">Campaign #{cId}</span>
                          <span className="font-bold text-white">{count} orders</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-[11px]">
                      এখনো মেটা ক্যাম্পেইন আইডি ট্র্যাকিং তথ্য আসেনি।
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-center text-xs text-gray-400 py-6">কোনো অ্যাড ডাটা পাওয়া যায়নি।</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
