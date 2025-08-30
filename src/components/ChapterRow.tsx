"use client";

import { Chapter } from "../lib/plan";
import { useAppStore } from "../hooks/useAppStore";
import { Checkbox } from "./ui/checkbox";
import { NotebookPen, ExternalLink, Copy, Share2 } from "lucide-react";
import { copyChapterToClipboard, openYouVersion, shareProgress } from "../lib/utils";
import { Button } from "./ui/button";

export default function ChapterRow({ chapter, onOpenNotes }: { chapter: Chapter; onOpenNotes: () => void }) {
  const { toggleChapter, chapters } = useAppStore();
  const state = chapters[chapter.id];

  return (
    <li className="list-row px-3" aria-label={`${chapter.book} ${chapter.chapter}`}>
      <div className="flex items-center gap-3">
        <Checkbox
          checked={!!state?.checked}
          onChange={() => toggleChapter(chapter.id)}
          aria-label={`Mark ${chapter.book} ${chapter.chapter} as read`}
        />
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{chapter.book} {chapter.chapter}</div>
          {chapter.inPeriod && (
            <div className="truncate text-xs text-muted-foreground">{chapter.datePretty}</div>
          )}
        </div>
        <div className="ml-2 flex shrink-0 items-center gap-1">
          <Button variant="ghost" size="icon" aria-label={`Open notes for ${chapter.book} ${chapter.chapter}`} onClick={onOpenNotes}>
            <NotebookPen className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Copy book, chapter and note" onClick={() => copyChapterToClipboard(chapter.id)}>
            <Copy className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Open chapter on bible.com" onClick={() => openYouVersion(chapter)}>
            <ExternalLink className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Share progress" onClick={() => shareProgress()}>
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </li>
  );
}