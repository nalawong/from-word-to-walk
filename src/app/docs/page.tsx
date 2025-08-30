"use client";
import { PLAN_BOOKS, TOTAL_CHAPTERS, PERIOD, FINISH_DATE } from "../../lib/plan";

export default function Docs() {
  return (
    <main className="container pt-6 pb-12">
      <h1 className="text-xl font-semibold">From Word to Walk — Docs</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        One chapter a day from <strong>Luke</strong> through <strong>James</strong>. Period focus:
        {` ${new Date(PERIOD.start).toLocaleDateString("en-SG", { day: "numeric", month: "long", year: "numeric" })} – ${new Date(PERIOD.end).toLocaleDateString("en-SG", { day: "numeric", month: "long", year: "numeric" })}. `}
        Total chapters: <strong>{TOTAL_CHAPTERS}</strong>. Projected finish:{" "}
        <strong>
          {FINISH_DATE.toLocaleDateString("en-SG", { day: "numeric", month: "long", year: "numeric" })}
        </strong>.
      </p>
      <h2 className="mt-6 font-medium">Books & chapter counts</h2>
      <ul className="mt-2 list-disc pl-6 text-sm">
        {PLAN_BOOKS.map((b) => (
          <li key={b.key}>
            {b.name}: {b.chapters} ch. (code: {b.youVersion})
          </li>
        ))}
      </ul>
      <h2 className="mt-6 font-medium">Privacy</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        All data (progress, notes, preferences) are stored on your device only via{" "}
        <code>localStorage</code>. Nothing is sent to a server.
      </p>
    </main>
  );
}