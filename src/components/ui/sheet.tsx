"use client";
import * as React from "react";
import { cn } from "../../lib/utils";

export function Sheet({ open, onOpenChange, children }: { open: boolean; onOpenChange: (o: boolean) => void; children: React.ReactNode; }) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onOpenChange(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onOpenChange]);

  return (
    <div className={cn("fixed inset-0 z-50", open ? "" : "pointer-events-none hidden")}>
      <div className="absolute inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      {children}
    </div>
  );
}

export function SheetContent({ children, side = "bottom" }: { children: React.ReactNode; side?: "bottom" | "right" }) {
  const base = "fixed z-50 w-full bg-background shadow-lg border-t border-border";
  const place = side === "bottom" ? "bottom-0 left-0 rounded-t-xl p-4" : "right-0 top-0 h-full w-80 border-l border-border p-4";
  return <div className={`${base} ${place}`}>{children}</div>;
}

export function SheetHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-2">{children}</div>;
}
export function SheetTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}