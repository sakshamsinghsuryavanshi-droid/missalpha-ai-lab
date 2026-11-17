"use client";

import React, { useState, useEffect } from "react";
import DashboardNav from "@/components/layout/DashboardNav";
import { createClient } from "@/lib/supabase/client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userEmail, setUserEmail] = useState("student@missalpha.ai");
  const [isPremium, setIsPremium] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    // Check Supabase session
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email || "student@missalpha.ai");
        if (user.email === "admin@missalpha.ai") {
          setIsAdmin(true);
        }

        // Fetch profile
        supabase
          .from("profiles")
          .select("is_premium, is_admin")
          .eq("id", user.id)
          .single()
          .then(({ data }) => {
            if (data?.is_premium) setIsPremium(true);
            if (data?.is_admin) setIsAdmin(true);
          });
      } else {
        // Local test user check
        const local = localStorage.getItem("missalpha_demo_user");
        if (local) {
          try {
            const parsed = JSON.parse(local);
            setUserEmail(parsed.email || "student@missalpha.ai");
            if (parsed.is_premium) setIsPremium(true);
            if (parsed.email === "admin@missalpha.ai") setIsAdmin(true);
          } catch {
            // Ignore parse error
          }
        }
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
      <DashboardNav
        userEmail={userEmail}
        isPremium={isPremium}
        isAdmin={isAdmin}
      />

      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
