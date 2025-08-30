"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "../hooks/useAppStore";
import { isIOS, isInStandalone } from "../lib/a2hs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";

export default function InstallModal() {
  const { settings, setHideA2HS } = useAppStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (settings.hideA2HS) return;
    if (isInStandalone()) return;
    if (isIOS()) setOpen(true);
  }, [settings.hideA2HS]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Home Screen</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>On iPhone/iPad (Safari):</p>
          <ol className="list-decimal pl-6">
            <li>Tap the <strong>Share</strong> icon in Safari</li>
            <li>Select <strong>Add to Home Screen</strong></li>
            <li>Confirm the name and tap <strong>Add</strong></li>
          </ol>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => { setHideA2HS(true); setOpen(false); }}>
            Don’t show again
          </Button>
          <Button onClick={() => setOpen(false)}>Got it</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}