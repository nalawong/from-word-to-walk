"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export function Accordion({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { type: "single"; collapsible?: boolean }) {
  return (
    <div className={cn("rounded-lg border border-border", className)} {...props}>
      {children}
    </div>
  );
}

export function AccordionItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <div data-value={value} className="border-b border-border last:border-b-0">{children}</div>;
}

export function AccordionTrigger({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <button
      className="flex w-full items-center justify-between px-3 py-3 text-left text-sm font-medium"
      aria-expanded={open}
      onClick={() => setOpen((o) => !o)}
    >
      <span>{children}</span>
      <span className="ml-2 text-muted-foreground">{open ? "−" : "+"}</span>
    </button>
  );
}

export function AccordionContent({ children }: { children: React.ReactNode }) {
  return <div className="px-3 pb-3 text-sm">{children}</div>;
}