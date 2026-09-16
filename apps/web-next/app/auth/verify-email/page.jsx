"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { verifyEmail, resendVerification } from "@/lib/api/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Mail,
  ArrowRight,
  RefreshCw,
  Home,
} from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const alreadyVerified = searchParams.get("verified") === "true";

  const { openAuthModal } = useAuthStore();

  const [status, setStatus] = useState("loading"); // 'loading' | 'success' | 'error' | 'no-token'
  const [errorMessage, setErrorMessage] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // If redirected from GET /auth/verify-email?token=... -> /login?verified=true
    if (alreadyVerified) {
      setStatus("success");
      return;
    }

    if (!token) {
      setStatus("no-token");
      return;
    }

    let isMounted = true;

    async function executeVerification() {
      try {
        await verifyEmail(token);
        if (isMounted) {
          setStatus("success");
          toast.success("Email verified successfully!");
        }
      } catch (err) {
        if (isMounted) {
          setStatus("error");
          setErrorMessage(err.message || "Invalid or expired verification token.");
        }
      }
    }

    executeVerification();

    return () => {
      isMounted = false;
    };
  }, [token, alreadyVerified]);

  // Auto-redirect countdown on success
  useEffect(() => {
    if (status !== "success") return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          openAuthModal("signin");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status, router, openAuthModal]);

  const handleResend = async (e) => {
    e.preventDefault();
    if (!resendEmail.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsResending(true);
    try {
      const res = await resendVerification(resendEmail.trim());
      toast.success(res.message || "Verification link sent! Please check your inbox.");
      setResendEmail("");
    } catch (err) {
      toast.error(err.message || "Failed to send verification email.");
    } finally {
      setIsResending(false);
    }
  };

  const handleSignInClick = () => {
    router.push("/");
    openAuthModal("signin");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-mn-surface border border-outline-variant/40 shadow-2xl rounded-2xl p-8 text-center text-foreground relative overflow-hidden">
        {/* Glow background accent */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-surface-tint/10 rounded-full blur-3xl pointer-events-none" />

        {/* LOADING STATE */}
        {status === "loading" && (
          <div className="space-y-6 py-4">
            <div className="w-16 h-16 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center mx-auto text-surface-tint">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-bold font-headline-md tracking-tight">
                Verifying Your Email
              </h1>
              <p className="text-sm text-on-surface-variant/80">
                Please wait while we confirm your email address...
              </p>
            </div>
          </div>
        )}

        {/* SUCCESS STATE */}
        {status === "success" && (
          <div className="space-y-6 py-2">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold font-headline-md tracking-tight text-foreground">
                Email Verified!
              </h1>
              <p className="text-sm text-on-surface-variant/80 leading-relaxed">
                Your email address has been successfully verified. You now have full access to your Mimir Nest dashboard.
              </p>
            </div>

            <div className="pt-2 space-y-3">
              <Button
                onClick={handleSignInClick}
                className="w-full bg-primary hover:bg-primary/95 text-primary-foreground h-11 font-semibold rounded-xl shadow-sm transition-all"
              >
                Sign In Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <p className="text-xs text-on-surface-variant/60">
                Redirecting to home in {countdown}s...
              </p>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {status === "error" && (
          <div className="space-y-6 py-2 text-left">
            <div className="w-16 h-16 rounded-2xl bg-destructive/15 border border-destructive/30 flex items-center justify-center mx-auto text-destructive">
              <XCircle className="w-8 h-8" />
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold font-headline-md tracking-tight text-foreground">
                Verification Failed
              </h1>
              <p className="text-sm text-destructive font-medium">
                {errorMessage}
              </p>
              <p className="text-xs text-on-surface-variant/80">
                Verification links expire after 24 hours. You can request a fresh verification link below.
              </p>
            </div>

            {/* Resend Form */}
            <form onSubmit={handleResend} className="space-y-3 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="resend-email" className="text-xs font-semibold text-on-surface">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-on-surface-variant/60" />
                  <Input
                    id="resend-email"
                    type="email"
                    placeholder="you@example.com"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    className="pl-10 bg-surface-container-lowest border-outline-variant/30 text-foreground text-sm rounded-xl h-10 focus-visible:ring-primary"
                    required
                    disabled={isResending}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isResending}
                className="w-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 text-foreground h-10 font-semibold rounded-xl text-xs"
              >
                {isResending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                    Sending link...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 mr-2" />
                    Send Fresh Verification Link
                  </>
                )}
              </Button>
            </form>

            <div className="text-center pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-foreground transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                Return to Homepage
              </Link>
            </div>
          </div>
        )}

        {/* NO TOKEN STATE */}
        {status === "no-token" && (
          <div className="space-y-6 py-2 text-left">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <Mail className="w-8 h-8" />
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold font-headline-md tracking-tight text-foreground">
                Email Verification
              </h1>
              <p className="text-xs text-on-surface-variant/80">
                To activate your account, please click the link sent to your email address, or request a new verification link below.
              </p>
            </div>

            <form onSubmit={handleResend} className="space-y-3 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="no-token-email" className="text-xs font-semibold text-on-surface">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-on-surface-variant/60" />
                  <Input
                    id="no-token-email"
                    type="email"
                    placeholder="you@example.com"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    className="pl-10 bg-surface-container-lowest border-outline-variant/30 text-foreground text-sm rounded-xl h-10 focus-visible:ring-primary"
                    required
                    disabled={isResending}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isResending}
                className="w-full bg-primary hover:bg-primary/95 text-primary-foreground h-10 font-semibold rounded-xl text-xs"
              >
                {isResending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                    Sending link...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 mr-2" />
                    Send Verification Link
                  </>
                )}
              </Button>
            </form>

            <div className="text-center pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-foreground transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                Return to Homepage
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-surface-tint" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
