import { toISODate, isBetween, addDays, formatDayShort } from "./utils";

export const PLAN_BOOKS = [
  { key: "Luke", name: "Luke", chapters: 24, youVersion: "LUK" },
  { key: "John", name: "John", chapters: 21, youVersion: "JHN" },
  { key: "Acts", name: "Acts", chapters: 28, youVersion: "ACT" },
  { key: "Romans", name: "Romans", chapters: 16, youVersion: "ROM" },
  { key: "1Corinthians", name: "1 Corinthians", chapters: 16, youVersion: "1CO" },
  { key: "2Corinthians", name: "2 Corinthians", chapters: 13, youVersion: "2CO" },
  { key: "Galatians", name: "Galatians", chapters: 6, youVersion: "GAL" },
  { key: "Ephesians", name: "Ephesians", chapters: 6, youVersion: "EPH" },
  { key: "Philippians", name: "Philippians", chapters: 4, youVersion: "PHP" },
  { key: "Colossians", name: "Colossians", chapters: 4, youVersion: "COL" },
  { key: "1Thessalonians", name: "1 Thessalonians", chapters: 5, youVersion: "1TH" },
  { key: "2Thessalonians", name: "2 Thessalonians", chapters: 3, youVersion: "2TH" },
  { key: "1Timothy", name: "1 Timothy", chapters: 6, youVersion: "1TI" },
  { key: "2Timothy", name: "2 Timothy", chapters: 4, youVersion: "2TI" },
  { key: "Titus", name: "Titus", chapters: 3, youVersion: "TIT" },
  { key: "Philemon", name: "Philemon", chapters: 1, youVersion: "PHM" },
  { key: "Hebrews", name: "Hebrews", chapters: 13, youVersion: "HEB" },
  { key: "James", name: "James", chapters: 5, youVersion: "JAS" }
] as const;

export type Chapter = {
  id: string;
  book: string;
  bookKey: string;
  youVersion: string;
  chapter: number;
  date: string;        // ISO yyyy-mm-dd
  datePretty: string;  // 1 Sep
  inPeriod: boolean;
  checked: boolean;
  note?: string;
};

export const PERIOD = {
  start: "2025-09-01",
  end: "2025-11-30"
};

export const TOTAL_CHAPTERS = PLAN_BOOKS.reduce((sum, b) => sum + b.chapters, 0);

export const FINISH_DATE = (() => {
  const start = new Date(PERIOD.start + "T00:00:00+08:00");
  const last = addDays(start, TOTAL_CHAPTERS - 1);
  return last;
})();

export function buildPlan(): Chapter[] {
  const list: Chapter[] = [];
  let cursor = new Date(PERIOD.start + "T00:00:00+08:00");

  for (const b of PLAN_BOOKS) {
    for (let ch = 1; ch <= b.chapters; ch++) {
      const iso = toISODate(cursor);
      const chapter: Chapter = {
        id: `${b.youVersion}.${ch}`,
        book: b.name,
        bookKey: b.key,
        youVersion: b.youVersion,
        chapter: ch,
        date: iso,
        datePretty: formatDayShort(cursor),
        inPeriod: isBetween(cursor, new Date(PERIOD.start), new Date(PERIOD.end)),
        checked: false,
        note: ""
      };
      list.push(chapter);
      cursor = addDays(cursor, 1);
    }
  }
  return list;
}