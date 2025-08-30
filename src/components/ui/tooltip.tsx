"use client";
import { ReactNode, useState } from "react";

export function Tooltip({ children, text }: { children: ReactNode; text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      {open && <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white">{text}</span>}
    </span>
  );
}