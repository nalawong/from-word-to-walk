"use client";
import { InputHTMLAttributes } from "react";

export function Checkbox(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      className="h-5 w-5 rounded border-border text-primary focus:ring-ring"
      {...props}
    />
  );
}