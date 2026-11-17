"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sparkles,
  BarChart3,
  BookOpen,
  Users,
  CreditCard,
  ShieldAlert,
  ArrowLeft,
  Lock,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      const email = user?.email || "";
      setUserEmail(email);

      // Check admin status
      const adminEmails = ["admin@missalpha.ai", "founder@missalpha.ai"];
      const isExplicitAdmin = adminEmails.includes(email.toLowerCase());

      if (isExplicitAdmin) {
        setIsAdmin(true);
      } else {
        // Check local demo
        const local = localStorage.getItem("missalpha_demo_user");
        if (local) {
          try {
            const parsed = JSON.parse(local);
            if (adminEmails.includes(parsed.email?.toLowerCase())) {
              setUserEmail(parsed.email);
              setIsAdmin(true);
              return;
            }
          } catch {
            // Ignore
          }
        }
        setIsAdmin(false);
      }
    });
  }, []);

  const navItems = [
    { label: "Overview & Analytics", href: "/admin", icon: BarChart3 },
    { label: "Course & Lesson Manager", href: "/admin/courses", icon: BookOpen },
    { label: "Student Management", href: "/admin/students", icon: Users },
    { label: "Payment Ledger", href: "/admin/payments", icon: CreditCard },
  ];

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="font-display font-extrabold text-2xl text-white">
          Access Restricted: Admin Authorization Required
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-md">
          This portal is protected by server-side authorization. Your email (<strong className="text-white">{userEmail || "unauthenticated"}</strong>) is not in the explicit administrator allow-list.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <Link
            href="/auth/login"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
          >
            Sign In with Admin Account (admin@missalpha.ai)
          </Link>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-gray-300 text-xs font-semibold"
          >
            Return to Student Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full lg:w-64 bg-[#060810] border-r border-purple-500/20 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-purple-600 p-0.5">
              <div className="w-full h-full bg-[#080B14] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-base text-white">
                MissAlpha <span className="gradient-text-gold">Admin</span>
              </div>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-mono">
                Executive Portal
              </span>
            </div>
          </Link>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span className="truncate">{userEmail || "admin@missalpha.ai"}</span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "text-gray-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-gray-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Student Dashboard</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
}
