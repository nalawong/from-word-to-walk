"use client";
import { useEffect, useState } from "react";
import { useAppStore } from "../hooks/useAppStore";
import { Badge } from "./ui/badge";

const MILESTONES = [10, 25, 50, 75, 100];

export default function BadgesStrip() {
  const { stats, awardMilestones } = useAppStore();
  const [recent, setRecent] = useState<number | null>(null);

  useEffect(() => {
    const newOne = awardMilestones(MILESTONES);
    if (newOne != null) {
      setRecent(newOne);
      setTimeout(() => setRecent(null), 1200);
    }
  }, [stats.percent, awardMilestones]);

  return (
    <div className="mt-3">
      <div className="mb-1 text-sm text-muted-foreground">Badges</div>
      <div className="flex gap-2 overflow-x-auto">
        {MILESTONES.map((m) => {
          const earned = stats.milestones.includes(m);
          return (
            <Badge key={m} variant={earned ? "default" : "secondary"}>
              {m}% {earned ? "✓" : ""}
            </Badge>
          );
        })}
      </div>
      {recent != null && (
        <div className="relative mt-2 h-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="confetti-dot"
              style={{
                left: `${(i / 12) * 100}%`,
                background: i % 2 ? "#22c55e" : "#0ea5e9",
                animationDelay: `${i * 40}ms`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}