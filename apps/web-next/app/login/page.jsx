"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { API_URL } from "@/lib/api/client";
import { toast } from "sonner";
import {
  AlertTriangle,
  RefreshCw,
  Loader2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, resendVerification, unverifiedEmail, isLoading: storeLoading } = useAuthStore();

  // Tab: "password" or "magic"
  const [authTab, setAuthTab] = useState("password");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Loading & Progress simulation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [progressText, setProgressText] = useState("Authenticating keyring...");
  const [isResending, setIsResending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (authTab === "magic") {
      setIsSubmitting(true);
      try {
        const res = await resendVerification(email.trim());
        toast.success(res?.message || "Magic verification link sent! Please check your inbox.");
      } catch (err) {
        toast.error(err.message || "Failed to send verification link.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Password authentication
    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    setIsSubmitting(true);
    setShowProgress(true);
    setProgressPct(35);
    setProgressText("Authenticating keyring...");

    try {
      const timer1 = setTimeout(() => {
        setProgressPct(75);
        setProgressText("Verifying token credentials...");
      }, 250);

      await login(email.trim(), password);
      clearTimeout(timer1);

      setProgressPct(100);
      setProgressText("100% OK — Session Initialized");

      setTimeout(() => {
        setShowProgress(false);
        setIsSubmitting(false);
        toast.success("Welcome back!");
        router.push("/");
      }, 400);
    } catch (err) {
      setShowProgress(false);
      setIsSubmitting(false);
      toast.error(err.message || "Failed to sign in.");
    }
  };

  const handleResend = async (targetEmail) => {
    const emailToSend = targetEmail || unverifiedEmail || email;
    if (!emailToSend) {
      toast.error("Please provide your email address.");
      return;
    }

    setIsResending(true);
    try {
      const res = await resendVerification(emailToSend.trim());
      toast.success(res?.message || `Fresh verification link sent to ${emailToSend}`);
    } catch (err) {
      toast.error(err.message || "Failed to resend verification link.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      {/* Scoped Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        rel="stylesheet"
      />

      <div className="bg-[#090A0F] text-[#e3e1e9] min-h-screen relative selection:bg-[#ffb4a3] selection:text-[#630f00] font-['JetBrains_Mono',monospace] text-[14px] leading-[22px]">
        {/* Ambient glow */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,90,54,0.12),rgba(9,10,15,0))]"></div>

        {/* HEADER */}
        <header className="fixed top-0 left-0 w-full z-50 bg-[#090A0F]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.4)] border-b border-[#272935]">
          <div className="h-16 w-full px-6 flex items-center justify-between max-w-[1520px] mx-auto">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <img
                  alt="Mimir Nest Logo"
                  className="h-8 w-auto object-contain"
                  src="/logo/logo.png"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://lh3.googleusercontent.com/aida/AEtjO1XmLPfiwXd8YIJUS6V173deXh9cj_ENKugbCeoyOjA8pUG-KjrPzd_APXcQI4lpTHlhUM_U9M54alH9ASsojudKfTuB1pblNM8Bi6mRhNhm9C4tUx1zt8RchgB3Pl05pCxgpKBAEbS05jKTl9OSf3WChHNCYAP3I6gddZE3eRsDzdbUHbDgD4uzhvVD7yObrhO9Jnx-d9bxUjmZnJjLg9QjRN-kl3nLkMBOZSt3eJUpAgAzriEJWJ65Qg";
                  }}
                />
                <span className="font-['Space_Grotesk',sans-serif] text-[20px] leading-[28px] text-[#F4F4F6] tracking-tight font-bold">
                  MIMIR NEST
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link
                className="inline-flex items-center gap-1.5 text-[12px] text-[#9B9992] hover:text-[#F4F4F6] transition-colors"
                href="/"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Back to website
              </Link>
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main className="relative z-10 w-full min-h-[calc(100vh-4rem)] flex items-center justify-center pt-20 pb-8">
          <div className="w-full max-w-[1520px] mx-auto px-4 md:px-6">
            {/* Split Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* LEFT COLUMN: Auth Form (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="flex flex-col h-full justify-between p-6 sm:p-8 lg:p-10 rounded-2xl md:rounded-3xl bg-[rgba(18,19,26,0.65)] backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)] relative overflow-hidden">
                  {/* Subtle ambient corner glow */}
                  <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#ff5a36]/10 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="relative z-10 flex flex-col">
                    {/* Top metadata badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a36] animate-pulse"></span>
                        <span className="text-[11px] tracking-widest text-[#ffb4a3] uppercase font-medium">
                          AUTH GATE
                        </span>
                      </div>
                      <span className="text-[11px] text-[#9B9992]/70 tracking-wider">NODE 0x948A</span>
                    </div>

                    {/* Header Title & Subtitle */}
                    <div className="mb-6">
                      <h1 className="font-['Space_Grotesk',sans-serif] text-[32px] sm:text-[36px] lg:text-[40px] leading-[1.15] text-[#F4F4F6] tracking-tight font-bold">
                        Start tracking.
                      </h1>
                      <p className="text-[14px] leading-[22px] text-[#9B9992] mt-2 font-normal tracking-wide">
                        Free to start. Open source. No credit card needed.
                      </p>
                    </div>

                    {/* Unverified Email Warning Banner */}
                    {unverifiedEmail && (
                      <div className="mb-5 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3.5 space-y-2 text-amber-200">
                        <div className="flex items-start gap-2.5">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div className="text-xs leading-relaxed">
                            <p className="font-semibold text-amber-300">Email Verification Required</p>
                            <p className="text-amber-200/80 mt-0.5">
                              Please verify <span className="font-medium text-amber-100">{unverifiedEmail}</span> before logging in.
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleResend(unverifiedEmail)}
                          disabled={isResending}
                          className="w-full text-xs h-8 bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 text-amber-200 font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                        >
                          {isResending ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              Sending Link...
                            </>
                          ) : (
                            <>
                              <RefreshCw className="w-3 h-3" />
                              Resend Verification Email
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Glassmorphic Auth Tab Switcher */}
                    <div className="w-full p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md flex gap-1 mb-6">
                      <button
                        id="tab-magic"
                        type="button"
                        onClick={() => setAuthTab("magic")}
                        className={`flex-1 py-2.5 rounded-lg text-xs uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
                          authTab === "magic"
                            ? "text-[#630f00] bg-[#ff5a36] font-bold shadow-sm"
                            : "text-[#9B9992] hover:text-[#F4F4F6] hover:bg-white/[0.03]"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">link</span>
                        MAGIC LINK
                      </button>
                      <button
                        id="tab-pass"
                        type="button"
                        onClick={() => setAuthTab("password")}
                        className={`flex-1 py-2.5 rounded-lg text-xs uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
                          authTab === "password"
                            ? "text-[#630f00] bg-[#ff5a36] font-bold shadow-sm"
                            : "text-[#9B9992] hover:text-[#F4F4F6] hover:bg-white/[0.03]"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">key</span>
                        PASSWORD
                      </button>
                    </div>

                    {/* Auth Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      {/* Email Input */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <label
                            htmlFor="auth-email"
                            className="text-[#F4F4F6]/90 font-medium tracking-wide uppercase text-[11px]"
                          >
                            Email Address
                          </label>
                          <span className="text-[#ffb4a3]/80 text-[11px]">Required</span>
                        </div>
                        <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.03] focus-within:border-[#ff5a36]/60 focus-within:bg-white/[0.06] focus-within:shadow-[0_0_15px_rgba(255,90,54,0.15)] transition-all duration-200 backdrop-blur-md">
                          <input
                            id="auth-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@mimirnest.dev"
                            className="w-full bg-transparent px-4 py-3 text-[14px] text-[#F4F4F6] placeholder:text-[#9B9992]/40 focus:outline-none"
                          />
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#9B9992]/60">
                            <span className="material-symbols-outlined text-[18px]">alternate_email</span>
                          </div>
                        </div>
                      </div>

                      {/* Password Input Container */}
                      {authTab === "password" && (
                        <div id="password-field-group" className="space-y-1.5 transition-all duration-200">
                          <div className="flex justify-between items-center text-xs">
                            <label
                              htmlFor="auth-pass"
                              className="text-[#F4F4F6]/90 font-medium tracking-wide uppercase text-[11px]"
                            >
                              Password
                            </label>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setAuthTab("magic");
                                toast.info("Enter your email and click 'Send Verified Magic Link' to regain access.");
                              }}
                              className="text-[#ffb4a3] hover:text-[#F4F4F6] transition-colors text-[11px]"
                            >
                              Forgot password?
                            </a>
                          </div>
                          <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.03] focus-within:border-[#ff5a36]/60 focus-within:bg-white/[0.06] focus-within:shadow-[0_0_15px_rgba(255,90,54,0.15)] transition-all duration-200 backdrop-blur-md flex items-center">
                            <input
                              id="auth-pass"
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              placeholder="••••••••••••••••"
                              className="w-full bg-transparent px-4 py-3 text-[14px] text-[#F4F4F6] placeholder:text-[#9B9992]/40 focus:outline-none tracking-widest"
                            />
                            <button
                              id="pass-toggle-btn"
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="px-3 py-1 mr-1 text-[#9B9992] hover:text-[#ffb4a3] transition-colors uppercase tracking-wider text-[11px]"
                            >
                              {showPassword ? "HIDE" : "SHOW"}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        id="submit-auth-btn"
                        type="submit"
                        disabled={isSubmitting || storeLoading}
                        className="w-full mt-3 py-3.5 px-4 rounded-xl bg-[#F4F4F6] text-[#090A0F] text-[14px] font-bold uppercase tracking-wider hover:bg-[#ffb4a3] hover:text-[#630f00] transition-all duration-200 flex items-center justify-center gap-2 group shadow-md shadow-black/30 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                      >
                        <span id="btn-text">
                          {authTab === "magic" ? "SEND VERIFIED MAGIC LINK" : "INITIALIZE SESSION"}
                        </span>
                        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </button>

                      {/* Verification Progress Bar */}
                      {showProgress && (
                        <div
                          id="auth-progress-box"
                          className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-3 space-y-2 backdrop-blur-md animate-in fade-in duration-200"
                        >
                          <div className="flex justify-between text-xs">
                            <span className="text-[#ffb4a3] animate-pulse flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[14px]">sync</span>
                              {progressText}
                            </span>
                            <span id="auth-pct" className="text-[#9B9992] font-semibold">
                              {progressPct}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                            <div
                              id="auth-bar-fill"
                              className="h-full bg-gradient-to-r from-[#ff5a36] to-[#ffb690] transition-all duration-300 rounded-full"
                              style={{ width: `${progressPct}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </form>

                    {/* Divider */}
                    <div className="relative my-6 flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/[0.08]"></div>
                      </div>
                      <span className="relative bg-[rgba(18,19,26,0.95)] px-3 py-0.5 rounded-full border border-white/[0.06] text-[10px] text-[#9B9992] uppercase tracking-widest font-semibold">
                        OR CONTINUE WITH
                      </span>
                    </div>

                    {/* Glassmorphic OAuth Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href={`${API_URL}/auth/google`}
                        className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/20 text-[#F4F4F6] text-[12px] font-medium transition-all duration-200 group active:scale-[0.98]"
                      >
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                          <path
                            d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.8 5 12 5z"
                            fill="#EA4335"
                          ></path>
                          <path
                            d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                            fill="#4285F4"
                          ></path>
                          <path
                            d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.3 0 10.1 0 12s.6 3.7 1.6 5.6l3.7-2.9z"
                            fill="#FBBC05"
                          ></path>
                          <path
                            d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.3-6.7-5.3L1.6 16c1.9 3.8 5.8 7 10.4 7z"
                            fill="#34A853"
                          ></path>
                        </svg>
                        <span>Google</span>
                      </a>

                      <a
                        href={`${API_URL}/auth/github`}
                        className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/20 text-[#F4F4F6] text-[12px] font-medium transition-all duration-200 group active:scale-[0.98]"
                      >
                        <svg className="w-4 h-4 fill-current text-[#F4F4F6] shrink-0" viewBox="0 0 24 24">
                          <path
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                        <span>GitHub</span>
                      </a>
                    </div>

                    {/* Signup Link */}
                    <div className="mt-5 text-center">
                      <p className="text-[12px] text-[#9B9992]">
                        Don't have an account?
                        <Link
                          href="/signup"
                          className="text-[#ffb4a3] hover:text-white transition-colors font-semibold ml-1.5 underline-offset-4 hover:underline"
                        >
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </div>

                  {/* Bottom Minimal Metric Strip */}
                  <div className="relative z-10 mt-8 pt-5 border-t border-white/[0.08]">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <div className="text-[#ffb4a3] font-bold font-['Space_Grotesk',sans-serif] text-[20px] leading-[28px]">
                          8+
                        </div>
                        <div className="text-[#9B9992] text-[10px] tracking-tight uppercase mt-0.5">
                          STUDENT TOOLS
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <div className="text-[#F4F4F6] font-bold font-['Space_Grotesk',sans-serif] text-[20px] leading-[28px]">
                          50+
                        </div>
                        <div className="text-[#9B9992] text-[10px] tracking-tight uppercase mt-0.5">
                          RESOURCES
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <div className="text-[#ff5a36] font-bold font-['Space_Grotesk',sans-serif] text-[20px] leading-[28px]">
                          100%
                        </div>
                        <div className="text-[#9B9992] text-[10px] tracking-tight uppercase mt-0.5">
                          OPEN CORE
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <span className="text-[10px] text-[#9B9992]/70 tracking-wider uppercase">
                        Join 3,000+ engineers from Waterloo, Berkeley &amp; CMU
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: High-Tech Hero Display Showcase (7 cols) */}
              <div className="lg:col-span-7 relative flex flex-col justify-between overflow-hidden bg-[#12131A] p-6 sm:p-8 lg:p-10 border border-[#272935] rounded-2xl md:rounded-3xl min-h-[580px]">
                {/* Visual Backdrop */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/aida/AEtjO1U4qeDLU5iuYA5Y0z-27l_GayzpzzOI7L-YMrpsBjSmIiosHQ9rY82BM_Jpsn9kFO9FeAWv-SM1jKHogTbS1DYfyrdVlZW6NDX4dCI4xsWXCiyKcIAND-gYPKv7aZqdMTLUpyh0_aGNPZ5ooT0UGMFbCCAPn4jVBSY-UT0J-uoTckXfH8-n2G8-J1ofbvCloar9mjq9NNhZSmFgQebzZYqaeomyGo5zZgLvxn8VKs9TqNw-D8uj6bIeMA"
                    alt="Dreamy developer resting on clouds above illuminated cyber city"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "38% 40%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F]/80 via-transparent to-[#090A0F]/40"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(9,10,15,0)_20%,rgba(9,10,15,0.7)_100%)]"></div>
                </div>

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      alt="Mimir Nest"
                      className="w-7 h-7 object-contain"
                      src="/logo/logo.png"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://lh3.googleusercontent.com/aida/AEtjO1XmLPfiwXd8YIJUS6V173deXh9cj_ENKugbCeoyOjA8pUG-KjrPzd_APXcQI4lpTHlhUM_U9M54alH9ASsojudKfTuB1pblNM8Bi6mRhNhm9C4tUx1zt8RchgB3Pl05pCxgpKBAEbS05jKTl9OSf3WChHNCYAP3I6gddZE3eRsDzdbUHbDgD4uzhvVD7yObrhO9Jnx-d9bxUjmZnJjLg9QjRN-kl3nLkMBOZSt3eJUpAgAzriEJWJ65Qg";
                      }}
                    />
                    <span className="font-bold tracking-widest text-[#F4F4F6] uppercase text-[11px]">
                      MIMIR // LOCKIN
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a36] animate-pulse"></span>
                    <span className="text-[11px] text-[#9B9992] tracking-wider uppercase font-medium">
                      SAME SKY, MORE POSSIBILITIES
                    </span>
                  </div>
                </div>

                {/* Center Hero Copy */}
                <div className="relative z-10 my-auto py-8 px-2 max-w-xl">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#ff5a36]"></span>
                    <span className="text-[11px] tracking-widest text-[#ff5a36] font-semibold uppercase">
                      A MORE CURIOUS DEVELOPER INTERNET
                    </span>
                  </div>
                  <h2 className="font-['Space_Grotesk',sans-serif] text-[36px] lg:text-[48px] lg:leading-[52px] font-bold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                    Building a<br />
                    <span className="text-[#ff5a36]">Brighter</span>
                    <span className="text-[#ff5a36]"> Tomorrow.</span>
                  </h2>
                  <p className="mt-3.5 text-[14px] leading-[22px] text-[#F4F4F6]/90 max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    Everything you need for college and beyond. Study smarter, build real systems, and reach higher.
                  </p>
                </div>

                {/* Bottom Card Footer */}
                <div className="relative z-10 flex items-center justify-between text-[#9B9992] text-[11px] pt-4 border-t border-[#272935]/60 bg-[#090A0F]/50 backdrop-blur-md px-6 -mx-6 lg:-mx-10 -mb-6 lg:-mb-10 py-3 rounded-b-2xl md:rounded-b-3xl">
                  <span>OPEN CORE // STUDENT FOUNDATION</span>
                  <span className="text-[#F4F4F6]/90 font-medium">DISCIPLINE BUILDS FREEDOM</span>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}
