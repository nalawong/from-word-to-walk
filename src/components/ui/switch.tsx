"use client";
import { InputHTMLAttributes } from "react";

export function Switch(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" className="peer sr-only" {...props} />
      <div className="peer h-5 w-9 rounded-full bg-muted after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-background after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-4" />
    </label>
  );
}