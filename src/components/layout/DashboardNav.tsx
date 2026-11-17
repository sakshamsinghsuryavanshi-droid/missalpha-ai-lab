"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  BookOpen,
  Award,
  CreditCard,
  User,
  LogOut,
  ShieldAlert,
  Zap,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface DashboardNavProps {
  userEmail: string;
  isPremium: boolean;
  isAdmin?: boolean;
}

export default function DashboardNav({
  userEmail,
  isPremium,
  isAdmin = false,
}: DashboardNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Courses", href: "/dashboard/courses", icon: BookOpen },
    { label: "Certificates", href: "/dashboard/certificates", icon: Award },
    { label: "Payment History", href: "/dashboard/payments", icon: CreditCard },
    { label: "Profile Settings", href: "/dashboard/profile", icon: User },
  ];

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    localStorage.removeItem("missalpha_demo_user");
    router.push("/auth/login");
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 glass-nav border-b border-purple-500/20 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-cyan-400 p-0.5">
            <div className="w-full h-full bg-[#080B14] rounded-[6px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <span className="font-display font-bold text-sm text-white">
            MissAlpha <span className="gradient-text-purple">AI Lab</span>
          </span>
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-slate-800 text-gray-300"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar for Desktop & Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#070A14] border-r border-purple-500/20 p-5 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyan-400 p-0.5 shadow-md shadow-purple-500/20">
              <div className="w-full h-full bg-[#080B14] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-base text-white">
                MissAlpha <span className="gradient-text-purple">AI Lab</span>
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                Student Portal
              </p>
            </div>
          </Link>

          {/* Membership Badge Card */}
          <div className="p-3.5 rounded-2xl glass-panel border border-purple-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Status</span>
              {isPremium ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-slate-950" /> LIFETIME PRO
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-gray-300">
                  FREE LEARNER
                </span>
              )}
            </div>
            <div className="text-[11px] text-gray-400 truncate">
              {userEmail || "Learner"}
            </div>
            {!isPremium && (
              <a
                href="/checkout"
                className="w-full mt-1 py-1.5 px-2 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-400 text-slate-950 text-xs font-bold text-center block shadow-md hover:opacity-90 transition-opacity"
              >
                Upgrade to Pro (₹99)
              </a>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-purple-600/20 text-cyan-300 border border-purple-500/30"
                      : "text-gray-400 hover:text-white hover:bg-slate-900/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-gray-400"}`} />
                  <span>{item.label}</span>
                </a>
              );
            })}

            {isAdmin && (
              <a
                href="/admin"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-amber-300 hover:bg-amber-500/10 transition-colors mt-4 border border-amber-500/20"
              >
                <span className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  Admin Console
                </span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <a
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Public Website</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
