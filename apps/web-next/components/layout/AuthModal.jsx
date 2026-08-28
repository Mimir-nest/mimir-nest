"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { Lock, Mail, User, Loader2 } from "lucide-react";

const GoogleIcon = () => (
  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

export default function AuthModal({ isOpen, onClose }) {
  const { login, signup, isLoading } = useAuthStore();
  const [activeTab, setActiveTab] = useState("signin");

  // Sign In State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up State
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await login(signInEmail, signInPassword);
      toast.success("Welcome back!");
      onClose();
      // Reset state
      setSignInEmail("");
      setSignInPassword("");
    } catch (err) {
      toast.error(err.message || "Failed to sign in");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!signUpName || !signUpEmail || !signUpPassword || !signUpConfirmPassword) {
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
      await signup(signUpName, signUpEmail, signUpPassword);
      toast.success("Account created successfully!");
      onClose();
      // Reset state
      setSignUpName("");
      setSignUpEmail("");
      setSignUpPassword("");
      setSignUpConfirmPassword("");
    } catch (err) {
      toast.error(err.message || "Failed to create account");
    }
  };

  const handleGoogleSignIn = () => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    window.location.href = `${backendUrl}/auth/google`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[420px] bg-mn-surface border-outline-variant/40 shadow-2xl rounded-xl">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-bold text-center font-headline-md text-foreground">
            Mimir <span className="text-surface-tint">Nest</span>
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-on-surface-variant/80">
            {activeTab === "signin"
              ? "Access your dashboard and resume learning"
              : "Create an account to track progress and contribute"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-surface-container-low border border-outline-variant/30 rounded-lg p-1">
            <TabsTrigger
              value="signin"
              className="rounded-md font-semibold text-sm transition-all py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-on-surface-variant/80"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="rounded-md font-semibold text-sm transition-all py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-on-surface-variant/80"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4 mt-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="signin-email" className="text-xs font-semibold text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-on-surface-variant/60" />
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="name@example.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="pl-10 bg-surface-container-lowest border-outline-variant/30 text-foreground focus-visible:ring-primary"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signin-password" className="text-xs font-semibold text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-on-surface-variant/60" />
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="pl-10 bg-surface-container-lowest border-outline-variant/30 text-foreground focus-visible:ring-primary"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-primary-foreground h-11 font-semibold rounded-lg shadow-sm transition-colors mt-2"
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

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/20"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-mn-surface px-2 text-on-surface-variant/60 font-medium">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border border-outline-variant/30 hover:bg-surface-container text-foreground h-11 font-semibold rounded-lg shadow-sm transition-all"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <GoogleIcon />
                Google
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 mt-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="signup-name" className="text-xs font-semibold text-foreground">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-on-surface-variant/60" />
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Jane Doe"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className="pl-10 bg-surface-container-lowest border-outline-variant/30 text-foreground focus-visible:ring-primary"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signup-email" className="text-xs font-semibold text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-on-surface-variant/60" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="name@example.com"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="pl-10 bg-surface-container-lowest border-outline-variant/30 text-foreground focus-visible:ring-primary"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signup-password" className="text-xs font-semibold text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-on-surface-variant/60" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="pl-10 bg-surface-container-lowest border-outline-variant/30 text-foreground focus-visible:ring-primary"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="signup-confirm-password" className="text-xs font-semibold text-foreground">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-on-surface-variant/60" />
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    className="pl-10 bg-surface-container-lowest border-outline-variant/30 text-foreground focus-visible:ring-primary"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-primary-foreground h-11 font-semibold rounded-lg shadow-sm transition-colors mt-2"
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

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/20"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-mn-surface px-2 text-on-surface-variant/60 font-medium">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border border-outline-variant/30 hover:bg-surface-container text-foreground h-11 font-semibold rounded-lg shadow-sm transition-all"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <GoogleIcon />
                Google
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
