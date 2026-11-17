"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, Shield, ArrowRight, BookOpen, Layers, Zap } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string; id?: string } | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Check user auth state
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        // Check profile
        supabase
          .from("profiles")
          .select("is_premium")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            if (data?.is_premium) setIsPremium(true);
          });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-3 shadow-2xl" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all">
              <div className="w-full h-full bg-[#080B14] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                MissAlpha <span className="gradient-text-purple">AI Lab</span>
              </div>
              <p className="hidden sm:block text-[10px] text-gray-400 tracking-wider uppercase font-medium">
                Learn AI. Build Skills. Create the Future.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/courses"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-brand-400" />
              Courses
            </Link>
            <Link
              href="/#ai-tools"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              AI Tools
            </Link>
            <Link
              href="/#why-us"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Why Us
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              Pricing (₹99)
            </Link>
            <Link
              href="/#faq"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              FAQ
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-slate-800/80 border border-purple-500/30 hover:border-purple-500/60 transition-all flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-cyan-400" />
                  Dashboard
                  {isPremium && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950">
                      PRO
                    </span>
                  )}
                </Link>
                {!isPremium && (
                  <Link
                    href="/checkout"
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 hover:opacity-95 shadow-lg shadow-purple-500/25 transition-all flex items-center gap-1.5 animate-pulse-slow"
                  >
                    Upgrade ₹99
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-gray-300 hover:text-white px-3 py-2 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/checkout"
                  className="relative group px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 hover:shadow-cyan-500/30 shadow-lg transition-all duration-300 flex items-center gap-1.5"
                >
                  <span>Lifetime Access ₹99</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/checkout"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-400"
            >
              ₹99 Pass
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 rounded-2xl glass-panel p-5 border border-purple-500/20 space-y-4">
            <Link
              href="/courses"
              onClick={() => setIsOpen(false)}
              className="block text-gray-200 font-medium py-2 hover:text-purple-400"
            >
              All AI Courses
            </Link>
            <Link
              href="/#ai-tools"
              onClick={() => setIsOpen(false)}
              className="block text-gray-200 font-medium py-2 hover:text-purple-400"
            >
              Popular AI Tools
            </Link>
            <Link
              href="/#why-us"
              onClick={() => setIsOpen(false)}
              className="block text-gray-200 font-medium py-2 hover:text-purple-400"
            >
              Why MissAlpha AI Lab
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setIsOpen(false)}
              className="block text-gray-200 font-medium py-2 hover:text-purple-400"
            >
              Pricing (₹99 Lifetime)
            </Link>
            <Link
              href="/#faq"
              onClick={() => setIsOpen(false)}
              className="block text-gray-200 font-medium py-2 hover:text-purple-400"
            >
              FAQ
            </Link>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="w-full block text-center py-2.5 rounded-xl bg-slate-800 text-white font-medium text-sm"
                  >
                    Student Dashboard
                  </Link>
                  {!isPremium && (
                    <Link
                      href="/checkout"
                      onClick={() => setIsOpen(false)}
                      className="w-full block text-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-bold text-sm"
                    >
                      Get Lifetime Access (₹99)
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full block text-center py-2.5 rounded-xl bg-slate-800 text-white font-medium text-sm"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="w-full block text-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-bold text-sm"
                  >
                    Get Lifetime Access (₹99)
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
