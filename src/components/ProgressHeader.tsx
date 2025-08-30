"use client";

import { useAppStore } from "../hooks/useAppStore";
import { Progress } from "./ui/progress";

export default function ProgressHeader() {
  const { stats } = useAppStore();
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="flex items-center justify-between text-sm">
        <div className="font-medium">Progress</div>
        <div className="text-muted-foreground">
          {stats.completedCount}/{stats.totalCount} ({Math.round(stats.percent)}%)
        </div>
      </div>
      <Progress className="mt-2" value={stats.percent} />
    </div>
  );
}