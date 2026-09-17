"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";
import { API_URL } from "@/lib/api/client";
import { toast } from "sonner";
import {
  Lock,
  Mail,
  User,
  Loader2,
  Github,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

const GoogleIcon = () => (
  <svg className="w-4 h-4 mr-2 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

export default function AuthModal({ isOpen, onClose }) {
  const {
    login,
    signup,
    resendVerification,
    isLoading,
    unverifiedEmail,
    authModalTab,
  } = useAuthStore();

  const [activeTab, setActiveTab] = useState(authModalTab || "signin");
  const [isResending, setIsResending] = useState(false);
  const [signupComplete, setSignupComplete] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up Form State
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

  // Sync tab with store when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(authModalTab || "signin");
      setSignupComplete(false);
    }
  }, [isOpen, authModalTab]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await login(signInEmail.trim(), signInPassword);
      toast.success("Welcome back!");
      onClose();
      // Reset form
      setSignInEmail("");
      setSignInPassword("");
    } catch (err) {
      toast.error(err.message || "Failed to sign in");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = signUpName.trim();
    const email = signUpEmail.trim();

    if (!name || !email || !signUpPassword || !signUpConfirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (signUpPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await signup(name, email, signUpPassword, signUpConfirmPassword);
      setRegisteredEmail(email);
      setSignupComplete(true);
      toast.success(res?.message || "Account created! Please check your email to verify.");
      // Reset form
      setSignUpName("");
      setSignUpEmail("");
      setSignUpPassword("");
      setSignUpConfirmPassword("");
    } catch (err) {
      toast.error(err.message || "Failed to create account");
    }
  };

  const handleResendVerification = async (targetEmail) => {
    const emailToSend = targetEmail || unverifiedEmail || signInEmail;
    if (!emailToSend) {
      toast.error("Please provide your email address to resend verification.");
      return;
    }

    setIsResending(true);
    try {
      const res = await resendVerification(emailToSend.trim());
      toast.success(res?.message || `Fresh verification email sent to ${emailToSend}`);
    } catch (err) {
      toast.error(err.message || "Failed to resend verification email");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[440px] bg-mn-surface border-outline-variant/40 shadow-2xl rounded-2xl p-6 text-foreground">
        <DialogHeader className="space-y-1.5 pb-2">
          <DialogTitle className="text-2xl font-bold text-center font-headline-md tracking-tight">
            Mimir <span className="text-surface-tint">Nest</span>
          </DialogTitle>
          <DialogDescription className="text-center text-xs text-on-surface-variant/80">
            {activeTab === "signin"
              ? "Access your learning vault, bookmarks, and progress"
              : "Create your account to start tracking system design & DSA"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(val) => {
          setActiveTab(val);
          setSignupComplete(false);
        }} className="w-full mt-2">
          <TabsList className="grid w-full grid-cols-2 bg-surface-container-low border border-outline-variant/30 rounded-xl p-1 mb-4">
            <TabsTrigger
              value="signin"
              className="rounded-lg font-semibold text-xs py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-on-surface-variant/80 transition-all"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="rounded-lg font-semibold text-xs py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-on-surface-variant/80 transition-all"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* SIGN IN TAB */}
          <TabsContent value="signin" className="space-y-4 focus-visible:outline-none">
            {/* Unverified Email Warning Banner */}
            {unverifiedEmail && (
              <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3.5 space-y-2 text-amber-200">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <p className="font-semibold text-amber-300">Email Verification Required</p>
                    <p className="text-amber-200/80 mt-0.5">
                      Please verify <span className="font-medium text-amber-100">{unverifiedEmail}</span> before signing in.
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleResendVerification(unverifiedEmail)}
                  disabled={isResending}
                  className="w-full text-xs h-8 bg-amber-500/15 border-amber-500/30 hover:bg-amber-500/25 text-amber-200 font-medium rounded-lg"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                      Sending Link...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                      Resend Verification Email
                    </>
                  )}
                </Button>
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-3.5">
              <div className="space-y-1.5">
                <Label htmlFor="signin-email" className="text-xs font-semibold text-on-surface">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-on-surface-variant/60" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="pl-10 bg-surface-container-lowest border-outline-variant/30 text-foreground text-sm rounded-xl h-10 focus-visible:ring-primary"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signin-password" className="text-xs font-semibold text-on-surface">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-on-surface-variant/60" />
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="pl-10 bg-surface-container-lowest border-outline-variant/30 text-foreground text-sm rounded-xl h-10 focus-visible:ring-primary"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-primary-foreground h-10 font-semibold rounded-xl shadow-sm transition-colors text-sm mt-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/20"></div>
              </div>
              <div className="relative flex justify-center text-[11px] uppercase">
                <span className="bg-mn-surface px-2 text-on-surface-variant/70 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={`${API_URL}/auth/google`}
                className="inline-flex items-center justify-center gap-2 h-10 px-3 text-xs font-semibold rounded-xl border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container text-foreground transition-all hover:border-outline-variant/60"
              >
                <GoogleIcon />
                <span>Google</span>
              </a>

              <a
                href={`${API_URL}/auth/github`}
                className="inline-flex items-center justify-center gap-2 h-10 px-3 text-xs font-semibold rounded-xl border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container text-foreground transition-all hover:border-outline-variant/60"
              >
                <Github className="w-4 h-4 shrink-0 text-surface-tint" />
                <span>GitHub</span>
              </a>
            </div>
          </TabsContent>

          {/* SIGN UP TAB */}
          <TabsContent value="signup" className="space-y-4 focus-visible:outline-none">
            {signupComplete ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-foreground">Verify your email address</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    We sent a verification link to <span className="text-emerald-400 font-semibold">{registeredEmail}</span>.
                    Please check your inbox to activate your account.
                  </p>
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleResendVerification(registeredEmail)}
                    disabled={isResending}
                    className="w-full text-xs h-9 bg-surface-container border-outline-variant/30 text-foreground font-semibold rounded-lg"
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                        Resending...
                      </>
                    ) : (
                      "Didn't receive email? Resend"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSignupComplete(false);
                      setActiveTab("signin");
                    }}
                    className="w-full text-xs text-on-surface-variant hover:text-foreground"
                  >
                    <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                    Back to Sign In
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <form onSubmit={handleSignUp} className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="signup-name" className="text-xs font-semibold text-on-surface">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 h-4 w-4 text-on-surface-variant/60" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Alex Morgan"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        className="pl-10 bg-surface-container-lowest border-outline-variant/30 text-foreground text-sm rounded-xl h-10 focus-visible:ring-primary"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="signup-email" className="text-xs font-semibold text-on-surface">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 h-4 w-4 text-on-surface-variant/60" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        className="pl-10 bg-surface-container-lowest border-outline-variant/30 text-foreground text-sm rounded-xl h-10 focus-visible:ring-primary"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="signup-password" className="text-xs font-semibold text-on-surface">
                      Password (min 6 characters)
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 h-4 w-4 text-on-surface-variant/60" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        className="pl-10 bg-surface-container-lowest border-outline-variant/30 text-foreground text-sm rounded-xl h-10 focus-visible:ring-primary"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="signup-confirm-password" className="text-xs font-semibold text-on-surface">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 h-4 w-4 text-on-surface-variant/60" />
                      <Input
                        id="signup-confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={signUpConfirmPassword}
                        onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                        className="pl-10 bg-surface-container-lowest border-outline-variant/30 text-foreground text-sm rounded-xl h-10 focus-visible:ring-primary"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/95 text-primary-foreground h-10 font-semibold rounded-xl shadow-sm transition-colors text-sm mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>

                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-outline-variant/20"></div>
                  </div>
                  <div className="relative flex justify-center text-[11px] uppercase">
                    <span className="bg-mn-surface px-2 text-on-surface-variant/70 font-medium">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* OAuth Buttons */}
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={`${API_URL}/auth/google`}
                    className="inline-flex items-center justify-center gap-2 h-10 px-3 text-xs font-semibold rounded-xl border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container text-foreground transition-all hover:border-outline-variant/60"
                  >
                    <GoogleIcon />
                    <span>Google</span>
                  </a>

                  <a
                    href={`${API_URL}/auth/github`}
                    className="inline-flex items-center justify-center gap-2 h-10 px-3 text-xs font-semibold rounded-xl border border-outline-variant/30 bg-surface-container-low hover:bg-surface-container text-foreground transition-all hover:border-outline-variant/60"
                  >
                    <Github className="w-4 h-4 shrink-0 text-surface-tint" />
                    <span>GitHub</span>
                  </a>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
