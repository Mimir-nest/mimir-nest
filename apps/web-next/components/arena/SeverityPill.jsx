import { cn } from "@/lib/utils";

const TONE = {
  "SEV-1": "bg-error/15 text-error border-error/40",
  "SEV-2": "bg-surface-tint/15 text-surface-tint border-surface-tint/40",
  "SEV-3": "bg-surface-container-highest text-on-surface-variant border-border",
};

export function SeverityPill({ severity, className }) {
  return (
    <span className={cn("px-2 py-0.5 rounded-full border font-mono text-[11px] font-semibold", TONE[severity] ?? TONE["SEV-3"], className)}>
      {severity}
    </span>
  );
}
