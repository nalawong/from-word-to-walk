"use client";
import { Copy } from "lucide-react";
import { Button } from "./ui/button";

export default function CopyButton({ onCopy }: { onCopy: () => void }) {
  return (
    <Button variant="outline" size="sm" onClick={onCopy}>
      <Copy className="mr-2 h-4 w-4" />
      Copy
    </Button>
  );
}