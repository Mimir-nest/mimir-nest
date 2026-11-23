"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** null when Supabase isn't configured: the arena still runs, completions just aren't recorded. */
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

const PENDING_KEY = "arena:pending-completions";

export function useSession() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (s) flushPending();
    });
    return () => data.subscription.unsubscribe();
  }, []);
  return session;
}

export function signInWithGitHub() {
  return supabase?.auth.signInWithOAuth({ provider: "github", options: { redirectTo: window.location.href } });
}

/** Records a completion now if signed in, otherwise queues it until the next sign-in. */
export async function recordCompletion(row) {
  const { data } = (await supabase?.auth.getSession()) ?? { data: {} };
  if (!data?.session) {
    const pending = JSON.parse(localStorage.getItem(PENDING_KEY) || "[]");
    localStorage.setItem(PENDING_KEY, JSON.stringify([...pending, row]));
    return { recorded: false };
  }
  const { error } = await supabase.from("arena_completions").upsert(row, { onConflict: "user_id,slug,src_sha256", ignoreDuplicates: true });
  if (error) throw error;
  return { recorded: true };
}

async function flushPending() {
  const pending = JSON.parse(localStorage.getItem(PENDING_KEY) || "[]");
  if (!pending.length) return;
  const { error } = await supabase.from("arena_completions").upsert(pending, { onConflict: "user_id,slug,src_sha256", ignoreDuplicates: true });
  if (!error) localStorage.removeItem(PENDING_KEY);
}

export async function fetchCompletionCounts() {
  if (!supabase) return {};
  const { data, error } = await supabase.rpc("arena_completion_counts");
  if (error) return {};
  return Object.fromEntries(data.map((r) => [r.slug, Number(r.completions)]));
}
