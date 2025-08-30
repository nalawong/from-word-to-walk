"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";

export default function IntroAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>How this plan works</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted-foreground">
            Read one chapter a day starting at Luke 1, following the Bible order through James. Tick the
            checkbox when done. Your progress and notes are kept on this device only.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Install to Home Screen</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted-foreground">
            On iOS Safari: tap <strong>Share</strong> → <strong>Add to Home Screen</strong>.<br />
            On Android Chrome: tap the <strong>Install</strong> button in the header (or browser prompt).
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Privacy</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted-foreground">
            Everything stays on your phone. No accounts, no tracking, no sync.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}