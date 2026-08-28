"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuthStore } from "@/store/useAuthStore";
import { fetchContributions, createContribution, deleteContribution, ContributedProblem } from "@/lib/api/contributions";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  ExternalLink,
  Lock,
  Code,
  Sparkles,
  Loader2,
  Building2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export default function ContributionsPage() {
  const { isAuthenticated, openAuthModal, isLoading: authLoading } = useAuthStore();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Form States
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await fetchContributions();
      setProblems(res.data || []);
    } catch (err) {
      console.error("Failed to load contributions:", err);
      toast.error("Failed to load contributions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !url || !platform) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      // Parse comma-separated company names
      const companyArray = companyInput
        ? companyInput.split(",").map((c) => c.trim()).filter((c) => c.length > 0)
        : [];

      await createContribution(title, url, platform, companyArray);
      toast.success("Problem contributed successfully!");
      setIsSubmitModalOpen(false);
      // Reset Form
      setTitle("");
      setUrl("");
      setPlatform("");
      setCompanyInput("");
      // Reload Data
      loadData();
    } catch (err) {
      toast.error(err.message || "Failed to submit contribution");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (problemId) => {
    if (!confirm("Are you sure you want to delete this contribution?")) return;

    try {
      await deleteContribution(problemId);
      toast.success("Contribution deleted");
      loadData();
    } catch (err) {
      toast.error(err.message || "Failed to delete contribution");
    }
  };

  const getStatusBadge = (status) => {
    if (status === "Verified") {
      return <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Verified</Badge>;
    }
    return <Badge className="bg-amber-500/15 text-amber-400 border border-amber-500/30">Pending</Badge>;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-mn-background text-foreground flex flex-col justify-between">
        <Navbar />
        <div className="flex flex-col justify-center items-center py-40">
          <Loader2 className="w-12 h-12 text-surface-tint animate-spin mb-4" />
          <p className="text-muted-foreground text-sm">Synchronizing account status...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mn-background text-on-background selection:bg-surface-tint/30 flex flex-col justify-between">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow pt-[120px] pb-16 px-6 md:px-16 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            /* LOCK SCREEN (UNAUTHENTICATED) */
            <motion.div
              key="lock"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-md mx-auto my-16 p-8 rounded-3xl bg-surface-container border border-outline-variant/30 shadow-xl text-center space-y-6"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="w-8 h-8 text-surface-tint" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground font-headline-md">Unlock Contributions</h1>
                <p className="text-on-surface-variant/80 text-sm leading-relaxed font-body-md">
                  Sign in to contribute programming questions, monitor verification status, and manage your custom submissions list.
                </p>
              </div>
              <Button
                onClick={openAuthModal}
                className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold h-11 rounded-xl shadow-md transition-colors"
              >
                Sign In to Access
              </Button>
            </motion.div>
          ) : (
            /* DASHBOARD (AUTHENTICATED) */
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Header Panel */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-surface-container border border-outline-variant/30 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-surface-tint uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Contributor Vault</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground font-headline-lg">My Contributions</h1>
                  <p className="text-on-surface-variant/80 text-sm font-body-md max-w-xl">
                    Add new interview coding questions to the verification queue and expand the shared resource library.
                  </p>
                </div>
                <Button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-5 h-11 rounded-xl shadow-md transition-colors flex items-center gap-2 self-start sm:self-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Contribute Problem</span>
                </Button>
              </div>

              {/* Data Table */}
              <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-6 shadow-sm overflow-hidden">
                {loading ? (
                  <div className="flex flex-col justify-center items-center py-20">
                    <Loader2 className="w-10 h-10 text-surface-tint animate-spin mb-4" />
                    <p className="text-muted-foreground text-xs">Loading submission history...</p>
                  </div>
                ) : problems.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                      <Code className="w-6 h-6 text-on-surface-variant/60" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-foreground">No contributions found</h3>
                      <p className="text-xs text-on-surface-variant/70 font-body-md">
                        Get started by adding your first coding question to the vault!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="border-outline-variant/20">
                        <TableRow>
                          <TableHead className="text-foreground font-bold">Title</TableHead>
                          <TableHead className="text-foreground font-bold">Platform</TableHead>
                          <TableHead className="text-foreground font-bold">Companies</TableHead>
                          <TableHead className="text-foreground font-bold">Status</TableHead>
                          <TableHead className="text-foreground font-bold text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {problems.map((prob) => (
                          <TableRow key={prob.problemId} className="border-outline-variant/10 hover:bg-surface-container/25 transition-colors">
                            <TableCell className="font-semibold text-foreground">
                              <a
                                href={prob.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 hover:text-surface-tint transition-colors"
                              >
                                <span>{prob.title}</span>
                                <ExternalLink className="w-3 h-3 text-muted-foreground" />
                              </a>
                            </TableCell>
                            <TableCell className="text-on-surface-variant">{prob.platform}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {prob.company && prob.company.length > 0 ? (
                                  prob.company.map((c, i) => (
                                    <Badge key={i} variant="outline" className="bg-surface-container/40 border-outline-variant/30 text-xs font-normal">
                                      {c}
                                    </Badge>
                                  ))
                                ) : (
                                  <span className="text-xs text-on-surface-variant/60">n/a</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(prob.status)}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(prob.problemId)}
                                className="text-on-surface-variant/60 hover:text-destructive hover:bg-error-container/20 transition-all rounded-lg"
                                title="Delete Contribution"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* SUBMIT PROBLEM DIALOG */}
      <Dialog open={isSubmitModalOpen} onOpenChange={setIsSubmitModalOpen}>
        <DialogContent className="sm:max-w-[460px] bg-mn-surface border-outline-variant/40 shadow-2xl rounded-2xl">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Building2 className="w-5 h-5 text-surface-tint" />
              <span>Contribute Problem</span>
            </DialogTitle>
            <DialogDescription className="text-sm text-on-surface-variant/80">
              Submit interview coding questions to verify and index in our library.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-semibold text-foreground">Problem Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Reverse Linked List"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-surface-container-lowest border-outline-variant/30 text-foreground focus-visible:ring-primary"
                required
                disabled={submitting}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="url" className="text-xs font-semibold text-foreground">Problem URL *</Label>
              <Input
                id="url"
                type="url"
                placeholder="e.g. https://leetcode.com/problems/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-surface-container-lowest border-outline-variant/30 text-foreground focus-visible:ring-primary"
                required
                disabled={submitting}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="platform" className="text-xs font-semibold text-foreground">Platform *</Label>
                <Input
                  id="platform"
                  placeholder="e.g. LeetCode, HackerRank"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="bg-surface-container-lowest border-outline-variant/30 text-foreground focus-visible:ring-primary"
                  required
                  disabled={submitting}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="company" className="text-xs font-semibold text-foreground">Companies</Label>
                <Input
                  id="company"
                  placeholder="e.g. Google, Meta"
                  value={companyInput}
                  onChange={(e) => setCompanyInput(e.target.value)}
                  className="bg-surface-container-lowest border-outline-variant/30 text-foreground focus-visible:ring-primary"
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/20 mt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-on-surface-variant hover:bg-surface-container border border-outline-variant/30 rounded-xl"
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-4 rounded-xl shadow-md transition-colors"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Problem"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
