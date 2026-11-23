"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ExternalLink, Lock } from "lucide-react";
import { signInWithGitHub, supabase, useSession } from "@/lib/arena/supabase";

const MIN_WORDS = 200;
const MAX_WORDS = 600;
const PROMPTS = ["What was the code doing?", "Why did the test catch it?", "What would you add to catch it next time?"];

export default function AutopsyForm({ slug, postmortem }) {
  const session = useSession();
  const [unlocked, setUnlocked] = useState(null);
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const draftKey = `arena:autopsy:${slug}`;

  useEffect(() => {
    setText(localStorage.getItem(draftKey) ?? "");
    setUnlocked(localStorage.getItem(`arena:passed:${slug}`) === "1");
  }, [slug, draftKey]);

  // A recorded completion unlocks it on any device.
  useEffect(() => {
    if (!session) return;
    supabase
      .from("arena_completions")
      .select("id", { count: "exact", head: true })
      .eq("slug", slug)
      .then(({ count }) => count && setUnlocked(true));
  }, [session, slug]);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const inRange = words >= MIN_WORDS && words <= MAX_WORDS;

  const save = async (e) => {
    e.preventDefault();
    if (!inRange || saving) return;
    localStorage.setItem(draftKey, text);
    if (!session) {
      toast.success("Draft saved in this browser.", { description: "Sign in with GitHub to attach it to your completion." });
      return;
    }
    setSaving(true);
    const { data: latest } = await supabase.from("arena_completions").select("id").eq("slug", slug).order("created_at", { ascending: false }).limit(1).maybeSingle();
    const { error } = latest ? await supabase.from("arena_completions").update({ autopsy: text }).eq("id", latest.id) : { error: { message: "no recorded completion yet" } };
    setSaving(false);
    if (error) toast.error(`Couldn't save: ${error.message}`);
    else toast.success("Autopsy saved.");
  };

  if (unlocked === null) return null;
  if (!unlocked) {
    return (
      <div className="mt-10 p-16 rounded-2xl bg-surface-container/40 border border-dashed border-border/70 text-center space-y-3">
        <Lock className="w-6 h-6 mx-auto text-on-surface-variant" aria-hidden />
        <p className="text-sm text-on-surface-variant">The autopsy unlocks once every hidden grader passes.</p>
        <a href={`/arena/incident/${slug}`} className="inline-block text-sm text-surface-tint hover:underline">
          Back to the IDE →
        </a>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={save} className="mt-10 p-6 rounded-xl bg-surface-container border border-border/60">
        <label htmlFor="autopsy" className="block font-headline-md text-lg font-semibold text-mn-primary">
          Your root cause
        </label>
        <ul className="mt-2 mb-4 text-sm text-on-surface-variant list-disc pl-5 space-y-1">
          {PROMPTS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <textarea
          id="autopsy"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={14}
          aria-describedby="autopsy-count"
          className="w-full rounded-lg bg-mn-background border border-border/70 p-4 text-sm leading-relaxed text-mn-primary placeholder:text-outline focus:outline-none focus:border-surface-tint/60 focus:ring-1 focus:ring-surface-tint/60"
          placeholder="Two or three paragraphs, as if you were writing the postmortem for your team."
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <span id="autopsy-count" className={`text-xs font-mono ${inRange ? "text-surface-tint" : "text-on-surface-variant"}`}>
            {words} / {MIN_WORDS}–{MAX_WORDS} words
          </span>
          <div className="flex items-center gap-2">
            {supabase && !session && (
              <button type="button" onClick={signInWithGitHub} className="px-3 py-2 rounded-lg border border-border text-xs text-mn-primary hover:border-surface-tint/50">
                Sign in with GitHub
              </button>
            )}
            <button type="submit" disabled={!inRange || saving} className="px-4 py-2 rounded-lg bg-surface-tint text-mn-background text-sm font-semibold disabled:opacity-40">
              {saving ? "Saving…" : "Submit autopsy"}
            </button>
          </div>
        </div>
      </form>

      {postmortem && (
        <section aria-labelledby="pm-heading" className="mt-8 p-6 rounded-xl bg-surface-container-low border border-border/60">
          <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">The real-world counterpart</span>
          <h2 id="pm-heading" className="mt-2 font-headline-md text-lg font-semibold text-mn-primary">
            {postmortem.title}
          </h2>
          <p className="text-xs text-on-surface-variant">
            {postmortem.org} · {postmortem.date}
          </p>
          <blockquote className="mt-4 pl-4 border-l-2 border-surface-tint text-mn-primary italic">“{postmortem.quote}”</blockquote>
          <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">{postmortem.takeaway}</p>
          <a href={postmortem.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm text-surface-tint hover:underline">
            Read the original <ExternalLink className="w-3.5 h-3.5" aria-hidden />
          </a>
        </section>
      )}
    </>
  );
}
