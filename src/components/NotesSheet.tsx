"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Textarea } from "./ui/textarea";
import { useAppStore } from "../hooks/useAppStore";

export default function NotesSheet({
  open,
  onOpenChange,
  chapterId
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chapterId: string | null;
}) {
  const { chapters, setNote } = useAppStore();
  const chapter = chapterId ? chapters[chapterId] : null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{chapter ? `${chapter.book} ${chapter.chapter}` : "Notes"}</SheetTitle>
        </SheetHeader>
        <div className="mt-3">
          <Textarea
            value={chapter?.note ?? ""}
            onChange={(e) => chapterId && setNote(chapterId, e.target.value)}
            placeholder="Write your note (saved on this device)"
            rows={8}
            aria-label="Chapter notes"
          />
          <div className="mt-2 text-right text-xs text-muted-foreground">
            {chapter?.note?.length ?? 0} chars
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}