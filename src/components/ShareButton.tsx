"use client";
import { Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { shareProgress } from "../lib/utils";

export default function ShareButton() {
  return (
    <Button variant="outline" size="sm" onClick={() => shareProgress()}>
      <Share2 className="mr-2 h-4 w-4" />
      Share
    </Button>
  );
}