"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildPlan, Chapter, TOTAL_CHAPTERS } from "../lib/plan";

type Theme = "dark" | "light";
type Settings = { theme: Theme; versionId: number; hideA2HS: boolean; showFullPlan: boolean };
type Stats = { completedCount: number; totalCount: number; percent: number; milestones: number[] };

type State = {
  chapters: Record<string, Chapter>;
  settings: Settings;
  stats: Stats;
  hydrated: boolean;
};

type Actions = {
  hydrateIfNeeded: () => void;
  toggleChapter: (id: string) => void;
  setNote: (id: string, note: string) => void;
  setTheme: (t: Theme) => void;
  setVersionId: (v: number) => void;
  setHideA2HS: (b: boolean) => void;
  setShowFullPlan: (b: boolean) => void;
  resetAll: () => void;
  awardMilestones: (thresholds: number[]) => number | null;
};

function computeStats(chapters: Record<string, Chapter>, prev?: Stats): Stats {
  const total = TOTAL_CHAPTERS;
  const done = Object.values(chapters).filter((c) => c.checked).length;
  const percent = (done / total) * 100;
  return { completedCount: done, totalCount: total, percent, milestones: prev?.milestones ?? [] };
}

export const useAppStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      chapters: {},
      settings: { theme: "dark", versionId: 111, hideA2HS: false, showFullPlan: false },
      stats: { completedCount: 0, totalCount: TOTAL_CHAPTERS, percent: 0, milestones: [] },
      hydrated: false,

      hydrateIfNeeded: () => {
        if (get().hydrated) return;
        const plan = buildPlan();
        const map: Record<string, Chapter> = {};
        for (const c of plan) map[c.id] = { ...c, checked: get().chapters[c.id]?.checked ?? false, note: get().chapters[c.id]?.note ?? "" };
        set({ chapters: map, stats: computeStats(map, get().stats), hydrated: true });
        const theme = get().settings.theme;
        document.documentElement.classList.toggle("dark", theme === "dark");
      },

      toggleChapter: (id) => {
        const map = { ...get().chapters };
        map[id] = { ...map[id], checked: !map[id].checked };
        set({ chapters: map, stats: computeStats(map, get().stats) });
      },

      setNote: (id, note) => {
        const map = { ...get().chapters };
        map[id] = { ...map[id], note };
        set({ chapters: map });
      },

      setTheme: (t) => {
        set({ settings: { ...get().settings, theme: t } });
        document.documentElement.classList.toggle("dark", t === "dark");
      },

      setVersionId: (v) => set({ settings: { ...get().settings, versionId: v || 111 } }),
      setHideA2HS: (b) => set({ settings: { ...get().settings, hideA2HS: b } }),
      setShowFullPlan: (b) => set({ settings: { ...get().settings, showFullPlan: b } }),

      resetAll: () => {
        localStorage.removeItem("fwtw:v1");
        window.location.reload();
      },

      awardMilestones: (thresholds) => {
        const s = get().stats;
        const newly = thresholds.find((p) => s.percent >= p && !s.milestones.includes(p));
        if (newly != null) {
          set({ stats: { ...s, milestones: [...s.milestones, newly] } });
          return newly;
        }
        return null;
      }
    }),
    {
      name: "fwtw:v1",
      partialize: (s) => ({ chapters: s.chapters, settings: s.settings, stats: s.stats })
    }
  )
);