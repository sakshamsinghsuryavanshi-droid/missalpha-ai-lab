"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Shield, CheckCircle2, Lock, Save, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("Aarav Sharma");
  const [email, setEmail] = useState("student@missalpha.ai");
  const [bio, setBio] = useState("Aspiring AI engineer exploring multi-agent architectures and LLM reasoning.");
  const [isPremium, setIsPremium] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setEmail(user.email || "");
        setFullName(user.user_metadata?.full_name || user.email?.split("@")[0] || "");

        supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              if (data.full_name) setFullName(data.full_name);
              if (data.bio) setBio(data.bio);
              if (data.is_premium) setIsPremium(true);
            }
          });
      } else {
        const local = localStorage.getItem("missalpha_demo_user");
        if (local) {
          try {
            const parsed = JSON.parse(local);
            setEmail(parsed.email || "student@missalpha.ai");
            setFullName(parsed.full_name || "Aarav Sharma");
            if (parsed.is_premium) setIsPremium(true);
          } catch {
            // Ignore
          }
        }
      }
    });
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        await supabase
          .from("profiles")
          .update({
            full_name: fullName,
            bio,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);

        if (newPassword) {
          await supabase.auth.updateUser({ password: newPassword });
        }
      } else {
        const local = localStorage.getItem("missalpha_demo_user");
        if (local) {
          const parsed = JSON.parse(local);
          localStorage.setItem(
            "missalpha_demo_user",
            JSON.stringify({ ...parsed, full_name: fullName, bio })
          );
        }
      }

      setMessage("Profile changes saved successfully!");
      setNewPassword("");
    } catch {
      setMessage("Saved locally for your current session.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
          <User className="w-7 h-7 text-purple-400" />
          Student Profile & Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Manage your personal details, credentials, and MissAlpha AI Lab membership.
        </p>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{message}</span>
        </div>
      )}

      {/* Membership Card */}
      <div className="p-5 rounded-2xl glass-panel border border-purple-500/30 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Membership Plan
          </span>
          <h3 className="font-display font-bold text-lg text-white">
            {isPremium ? "MissAlpha AI Lab Lifetime Premium" : "Free Student Learner"}
          </h3>
          <p className="text-xs text-gray-400">
            {isPremium
              ? "Active lifetime access to all 10 courses, tool guides and certificates."
              : "Upgrade for ₹99 to unlock all courses."}
          </p>
        </div>

        <div>
          {isPremium ? (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
              LIFETIME ACTIVE
            </span>
          ) : (
            <a
              href="/checkout"
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-400"
            >
              Upgrade ₹99
            </a>
          )}
        </div>
      </div>

      {/* Edit Profile Form */}
      <form onSubmit={handleSaveProfile} className="glass-panel p-6 rounded-2xl border border-purple-500/20 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Full Name (Displayed on Certificates)
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Registered Email Address
          </label>
          <input
            type="email"
            disabled
            value={email}
            className="w-full px-4 py-2.5 bg-slate-900/40 border border-slate-800 rounded-xl text-sm text-gray-400 cursor-not-allowed"
          />
          <span className="text-[11px] text-gray-500 mt-1 block">
            Email cannot be changed directly for security reasons.
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Student Bio & Learning Goals
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Change Password (Optional)
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password (minimum 6 characters)"
            className="w-full px-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-400"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save Profile Details"}</span>
        </button>
      </form>
    </div>
  );
}
