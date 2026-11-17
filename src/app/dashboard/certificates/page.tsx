"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Award, Download, CheckCircle2, ShieldCheck, Printer, ExternalLink, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Certificate } from "@/types";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: "cert_1",
      certificate_number: "MAL-CERT-8849F2A1",
      user_id: "usr_1",
      course_id: "c1111111-1111-1111-1111-111111111111",
      student_name: "Aarav Sharma",
      course_title: "AI Fundamentals",
      issue_date: "2025-02-15T00:00:00Z",
    },
  ]);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase
          .from("certificates")
          .select("*")
          .eq("user_id", user.id)
          .then(({ data }) => {
            if (data && data.length > 0) {
              setCertificates(data);
            }
          });
      }
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
          <Award className="w-7 h-7 text-amber-400" />
          Verified Certificates of Completion
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Official credentials awarded upon completing course lessons and passing certification quizzes.
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="glass-panel p-10 rounded-3xl border border-purple-500/20 text-center space-y-4">
          <Award className="w-12 h-12 text-gray-500 mx-auto" />
          <h3 className="font-display font-bold text-lg text-white">
            No Certificates Earned Yet
          </h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Complete all lessons in a course and score 80% or higher on the module checkpoint quiz to generate your verified certificate.
          </p>
          <Link
            href="/dashboard/courses"
            className="inline-block px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
          >
            Start Learning Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="glass-panel p-6 rounded-3xl border border-purple-500/30 glass-panel-hover space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> VERIFIED CREDENTIAL
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  {cert.course_title}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Awarded to: <strong className="text-gray-200">{cert.student_name}</strong>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Certificate ID:</span>
                  <code className="text-cyan-300 font-mono">{cert.certificate_number}</code>
                </div>
                <div className="flex justify-between">
                  <span>Issued Date:</span>
                  <span>{new Date(cert.issue_date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="flex-1 py-2 rounded-xl bg-purple-600/40 hover:bg-purple-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-purple-500/30"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  View Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0B0F19] border-2 border-purple-500/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> MissAlpha AI Lab Official Credential
              </span>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-gray-400 hover:text-white text-sm"
              >
                ✕ Close
              </button>
            </div>

            {/* Printable Certificate Frame */}
            <div
              id="printable-certificate"
              className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#0D1224] to-[#070913] border-4 border-amber-500/40 text-center space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />

              <div className="space-y-1">
                <div className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-wider">
                  MISSALPHA AI LAB
                </div>
                <div className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold">
                  Certificate of Professional Achievement
                </div>
              </div>

              <div className="py-2">
                <p className="text-xs text-gray-400 italic">This is proudly presented to</p>
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-amber-300 mt-1">
                  {selectedCert.student_name}
                </div>
              </div>

              <div className="space-y-1 max-w-md mx-auto">
                <p className="text-xs text-gray-300 leading-relaxed">
                  for successfully mastering the curriculum, hands-on lab exercises, practical assignments and certification quiz for
                </p>
                <h4 className="font-display font-bold text-lg text-white">
                  {selectedCert.course_title}
                </h4>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-gray-400">
                <div className="text-left">
                  <span className="block text-gray-500">Certificate ID:</span>
                  <code className="text-cyan-400 font-mono">{selectedCert.certificate_number}</code>
                </div>
                <div className="text-right">
                  <span className="block text-gray-500">Verified By:</span>
                  <strong className="text-white">Director, MissAlpha AI Lab</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save as PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
