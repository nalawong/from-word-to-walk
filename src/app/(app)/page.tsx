"use client";

import { useEffect, useMemo, useState } from "react";
import { PLAN_BOOKS, buildPlan, Chapter, FINISH_DATE, PERIOD } from "../../lib/plan";
import { useAppStore } from "../../hooks/useAppStore";
import IntroAccordion from "../../components/IntroAccordion";
import ProgressHeader from "../../components/ProgressHeader";
import BadgesStrip from "../../components/BadgesStrip";
import ChapterRow from "../../components/ChapterRow";
import NotesSheet from "../../components/NotesSheet";
import InstallModal from "../../components/InstallModal";
import InstallButton from "../../components/InstallButton";
import ThemeToggle from "../../components/ThemeToggle";
import SettingsSheet from "../../components/SettingsSheet";
import { Button } from "../../components/ui/button";
import { ExternalLink, Settings } from "lucide-react";

export default function HomePage() {
  const {
    chapters,
    settings,
    stats,
    setShowFullPlan,
    resetAll,
    hydrateIfNeeded,
  } = useAppStore();

  const [notesOpenFor, setNotesOpenFor] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    hydrateIfNeeded();
  }, [hydrateIfNeeded]);

  const plan = useMemo(() => buildPlan(), []);
  const visibleChapters = useMemo(
    () => plan.filter((c) => settings.showFullPlan || c.inPeriod),
    [plan, settings.showFullPlan],
  );

  const banner =
    !settings.showFullPlan
      ? `Plan runs 1 Sep – 30 Nov 2025. Full Luke→James finishes on ${FINISH_DATE.toLocaleDateString("en-SG", { day: "numeric", month: "long", year: "numeric" })}.`
      : `Showing full plan: finishing ${FINISH_DATE.toLocaleDateString("en-SG", { day: "numeric", month: "long", year: "numeric" })}.`;

  return (
    <main className="container pb-24">
      <header className="sticky-header border-b border-border">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <img src="/icons/icon-192.svg" alt="" className="h-7 w-7" />
            <div className="text-lg font-semibold">From Word to Walk</div>
          </div>
          <div className="flex items-center gap-2">
            <InstallButton />
            <ThemeToggle />
            <Button variant="ghost" size="icon" aria-label="Settings" onClick={() => setSettingsOpen(true)}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="px-0 pb-3">
          <ProgressHeader />
        </div>
      </header>

      <section className="mt-3">
        <IntroAccordion />
        <div className="mt-2 rounded-md border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
          {banner}{" "}
          <button
            className="underline underline-offset-2"
            onClick={() => setShowFullPlan(!useAppStore.getState().settings.showFullPlan)}
          >
            {settings.showFullPlan ? "Show 1 Sep–30 Nov only" : "Show full plan"}
          </button>
        </div>
        <BadgesStrip />
      </section>

      <section className="mt-4">
        <ul className="rounded-lg border border-border">
          {visibleChapters.map((c) => (
            <ChapterRow key={c.id} chapter={c} onOpenNotes={() => setNotesOpenFor(c.id)} />
          ))}
        </ul>

        <div className="mt-6 flex justify-between">
          <Button variant="secondary" onClick={() => setShowFullPlan(!settings.showFullPlan)}>
            {settings.showFullPlan ? "Limit to Sep–Nov" : "Show full plan"}
          </Button>
          <Button variant="destructive" onClick={() => confirm("Reset all progress & notes?") && resetAll()}>
            Reset All
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Need the plan source?{" "}
          <a className="inline-flex items-center gap-1 underline" href="/docs">
            Docs <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      <NotesSheet
        open={!!notesOpenFor}
        chapterId={notesOpenFor}
        onOpenChange={(o) => !o && setNotesOpenFor(null)}
      />
      <InstallModal />
      <SettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />
    </main>
  );
}