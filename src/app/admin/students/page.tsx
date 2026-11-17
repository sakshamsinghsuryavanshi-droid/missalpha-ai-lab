"use client";

import React, { useState } from "react";
import { Users, Search, CheckCircle2, ShieldAlert, Zap, Lock, Mail } from "lucide-react";

interface StudentItem {
  id: string;
  email: string;
  full_name: string;
  is_premium: boolean;
  membership_plan: string;
  created_at: string;
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentItem[]>([
    {
      id: "s1",
      email: "aarav.sharma@example.com",
      full_name: "Aarav Sharma",
      is_premium: true,
      membership_plan: "lifetime_premium",
      created_at: "2025-02-14T09:30:00Z",
    },
    {
      id: "s2",
      email: "priya.kapoor@example.com",
      full_name: "Priya Kapoor",
      is_premium: true,
      membership_plan: "lifetime_premium",
      created_at: "2025-02-15T11:45:00Z",
    },
    {
      id: "s3",
      email: "rohan.nair@example.com",
      full_name: "Rohan Nair",
      is_premium: false,
      membership_plan: "free",
      created_at: "2025-02-16T14:20:00Z",
    },
    {
      id: "s4",
      email: "ananya.sen@example.com",
      full_name: "Ananya Sen",
      is_premium: true,
      membership_plan: "lifetime_premium",
      created_at: "2025-02-16T16:10:00Z",
    },
    {
      id: "s5",
      email: "vikram.mehta@example.com",
      full_name: "Vikram Mehta",
      is_premium: false,
      membership_plan: "free",
      created_at: "2025-02-17T08:00:00Z",
    },
  ]);

  const [search, setSearch] = useState("");

  const handleTogglePremium = (id: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              is_premium: !s.is_premium,
              membership_plan: !s.is_premium ? "lifetime_premium" : "free",
            }
          : s
      )
    );
  };

  const filtered = students.filter(
    (s) =>
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <Users className="w-7 h-7 text-cyan-400" />
            Registered Student Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Search registered learners, review account statuses, and manually grant or revoke lifetime access.
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by student name or email..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
        />
      </div>

      <div className="glass-panel rounded-2xl border border-purple-500/20 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-slate-900/90 text-gray-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Membership Plan</th>
                <th className="py-3.5 px-4">Joined Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    {s.full_name}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-400">
                    {s.email}
                  </td>
                  <td className="py-3.5 px-4">
                    {s.is_premium ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40">
                        <Zap className="w-3 h-3 fill-amber-300" /> LIFETIME PRO (₹99)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-slate-800 text-gray-400 border border-slate-700">
                        FREE LEARNER
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-gray-400">
                    {new Date(s.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleTogglePremium(s.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        s.is_premium
                          ? "bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                          : "bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                      }`}
                    >
                      {s.is_premium ? "Revoke Pro" : "Grant Lifetime Pro"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
