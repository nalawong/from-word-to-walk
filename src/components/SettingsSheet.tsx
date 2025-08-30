"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { useAppStore } from "../hooks/useAppStore";

export default function SettingsSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { settings, setVersionId } = useAppStore();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-3">
          <label className="block text-sm">
            Translation (YouVersion ID)
            <input
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
              type="number"
              value={settings.versionId}
              onChange={(e) => setVersionId(parseInt(e.target.value || "111", 10))}
              min={1}
            />
            <span className="mt-1 block text-xs text-muted-foreground">111 = NIV (default)</span>
          </label>
        </div>
      </SheetContent>
    </Sheet>
  );
}