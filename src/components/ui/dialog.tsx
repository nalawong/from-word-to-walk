"use client";
import * as React from "react";
import { cn } from "../../lib/utils";

export function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (o: boolean) => void; children: React.ReactNode; }) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onOpenChange(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onOpenChange]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={() => onOpenChange(false)} />
      <div className="relative z-10 w-[92%] max-w-md rounded-lg border border-border bg-background p-4 shadow-lg">
        {children}
      </div>
    </div>
  );
}
export function DialogContent({ children }: { children: React.ReactNode }) { return <>{children}</>; }
export function DialogHeader({ children }: { children: React.ReactNode }) { return <div>{children}</div>; }
export function DialogTitle({ children }: { children: React.ReactNode }) { return <h2 className="text-lg font-semibold">{children}</h2>; }
export function DialogFooter({ children }: { children: React.ReactNode }) { return <div className="mt-4 flex justify-end gap-2">{children}</div>; }