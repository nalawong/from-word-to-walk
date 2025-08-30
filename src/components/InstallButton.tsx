"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setSupported(true);
    };
    window.addEventListener("beforeinstallprompt", handler as any);
    return () => window.removeEventListener("beforeinstallprompt", handler as any);
  }, []);

  if (!supported) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        deferredPrompt?.prompt();
        try {
          await deferredPrompt?.userChoice;
        } finally {
          setDeferredPrompt(null);
          setSupported(false);
        }
      }}
    >
      Install
    </Button>
  );
}