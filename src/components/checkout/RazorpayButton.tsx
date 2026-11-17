"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, ShieldCheck, Lock, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { createClient } from "@/lib/supabase/client";

interface RazorpayButtonProps {
  buttonText?: string;
  className?: string;
  demoUserId?: string;
  demoUserEmail?: string;
  onSuccess?: () => void;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export default function RazorpayButton({
  buttonText = "Buy Lifetime Access (₹99)",
  className,
  demoUserId,
  demoUserEmail,
  onSuccess,
}: RazorpayButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Check user login or fallback to local demo user
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      const localUserStr = typeof window !== "undefined" ? localStorage.getItem("missalpha_demo_user") : null;
      const localUser = localUserStr ? JSON.parse(localUserStr) : null;

      const activeUserId = user?.id || demoUserId || localUser?.id || "guest_learner";
      const activeUserEmail = user?.email || demoUserEmail || localUser?.email || "student@missalpha.ai";
      const activeUserName = user?.user_metadata?.full_name || localUser?.full_name || "MissAlpha Student";

      // 2. Call backend order creation API (sets amount to exactly 9900 paise = ₹99)
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          demoUserId: activeUserId,
          demoUserEmail: activeUserEmail,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to initialize payment order");
      }

      const { orderId, amount, currency, keyId, isLiveConfigured } = orderData;

      // 3. Check if live Razorpay script is loaded and configured
      if (typeof window !== "undefined" && window.Razorpay && isLiveConfigured) {
        const options = {
          key: keyId,
          amount,
          currency,
          name: "MissAlpha AI Lab",
          description: "MissAlpha AI Lab Lifetime Premium",
          order_id: orderId,
          image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=200&q=80",
          prefill: {
            name: activeUserName,
            email: activeUserEmail,
            contact: "9876543210",
          },
          theme: {
            color: "#9333EA",
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handler: async function (response: any) {
            // 4. Verify payment on the server using HMAC-SHA256
            try {
              const verifyRes = await fetch("/api/payments/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  demoUserId: activeUserId,
                }),
              });

              const verifyData = await verifyRes.json();
              if (!verifyRes.ok) {
                throw new Error(verifyData.error || "Payment signature verification failed");
              }

              // Success!
              triggerConfetti();
              setVerifiedSuccess(true);
              if (onSuccess) onSuccess();

              setTimeout(() => {
                router.push("/dashboard?payment=verified");
              }, 2000);
            } catch (vErr: unknown) {
              const message = vErr instanceof Error ? vErr.message : "Payment verification failed";
              setError(message);
            }
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Fallback / Sandbox Interactive Simulation
        // Allows testing complete flow even before live production credentials are keyed in
        const confirmSimulation = window.confirm(
          "Test Mode: Complete payment simulation for ₹99 (9900 paise)?\n\nClick OK to simulate captured payment & verify signature via backend API."
        );

        if (confirmSimulation) {
          const simRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: orderId,
              razorpay_payment_id: `pay_test_${Date.now()}`,
              razorpay_signature: "simulated_valid_test_signature",
              demoUserId: activeUserId,
            }),
          });

          const simData = await simRes.json();
          if (simData.success) {
            triggerConfetti();
            setVerifiedSuccess(true);
            if (localUser) {
              localStorage.setItem(
                "missalpha_demo_user",
                JSON.stringify({ ...localUser, is_premium: true })
              );
            }
            if (onSuccess) onSuccess();

            setTimeout(() => {
              router.push("/dashboard?payment=verified");
            }, 1800);
          } else {
            throw new Error(simData.error || "Simulation verification failed");
          }
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Payment initialization error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#A855F7", "#00F5FF", "#EC4899", "#FDE047"],
      });
    } catch {
      // Ignore if confetti not supported
    }
  };

  if (verifiedSuccess) {
    return (
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-center space-y-2">
        <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400 animate-bounce" />
        <h4 className="font-bold text-sm text-white font-display">
          Congratulations! Your MissAlpha AI Lab Lifetime Premium Membership is Active.
        </h4>
        <p className="text-xs text-gray-300">
          Redirecting you to your unlocked dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className={
          className ||
          "w-full py-4 px-6 rounded-xl text-base font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 hover:shadow-cyan-500/30 shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 hover:scale-[1.01]"
        }
      >
        {loading ? (
          <div className="flex items-center gap-2 text-slate-950">
            <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            <span>Connecting Secure Gateway...</span>
          </div>
        ) : (
          <>
            <Zap className="w-5 h-5 fill-slate-950 text-slate-950" />
            <span>{buttonText}</span>
          </>
        )}
      </button>
    </div>
  );
}
