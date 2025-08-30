import { useAppStore } from "../hooks/useAppStore";
import { Chapter } from "./plan";

export function cn(...args: (string | false | null | undefined)[]) {
  return args.filter(Boolean).join(" ");
}

export const ThemeScript = (
  <script
    dangerouslySetInnerHTML={{
      __html: `
      try {
        const key = 'fwtw:v1';
        const raw = localStorage.getItem(key);
        const theme = raw ? JSON.parse(raw)?.state?.settings?.theme : 'dark';
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      } catch {}
    `,
    }}
  />
);

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(d: Date, days: number) {
  const nd = new Date(d);
  nd.setDate(nd.getDate() + days);
  return nd;
}

export function isBetween(d: Date, start: Date, end: Date) {
  const t = new Date(d.toDateString()).getTime();
  const s = new Date(start.toDateString()).getTime();
  const e = new Date(end.toDateString()).getTime();
  return t >= s && t <= e;
}

export function formatDayShort(d: Date) {
  return d.toLocaleDateString("en-SG", { day: "numeric", month: "short" });
}

export function youVersionUrl(chapter: Chapter, versionId: number) {
  return `https://www.bible.com/bible/${versionId}/${chapter.youVersion}.${chapter.chapter}.NIV`;
}

export function openYouVersion(chapter: Chapter) {
  const { settings } = useAppStore.getState();
  const url = youVersionUrl(chapter, settings.versionId || 111);
  window.open(url, "_blank", "noopener,noreferrer");
}

export async function copyChapterToClipboard(chapterId: string) {
  const { chapters } = useAppStore.getState();
  const c = chapters[chapterId];
  const text = `${c.book} ${c.chapter} — ${c.note?.trim() || "(no notes yet)"}`;
  await navigator.clipboard.writeText(text);
  alert("Copied!");
}

export async function shareProgress() {
  const { stats } = useAppStore.getState();
  const text = `I’ve completed ${stats.completedCount}/${stats.totalCount} chapters (${Math.round(
    stats.percent,
  )}%) in “From Word to Walk”. Join me!`;
  const url = typeof window !== "undefined" ? window.location.origin : "https://example.com";
  if (navigator.share) {
    try {
      await navigator.share({ title: "From Word to Walk", text, url });
      return;
    } catch {}
  }
  const wa = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`;
  window.open(wa, "_blank", "noopener,noreferrer");
}