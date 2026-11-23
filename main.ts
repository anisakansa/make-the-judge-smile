// Make the Judge Smile — make.fun bounty
// u-gentle-badger-68-make-the-judge-smile-9228676d
//
// One line, at most 200 characters, about a small good thing that
// happened today — something that makes a reader smile.
// Deterministic: the same line, byte for byte, on every run.
//
// Craft notes (judge brief: warmth, then surprise, then one concrete
// detail, then fresh wording):
// - Warmth: a neighbour's small, specific kindness — a tomato left
//   on the doorstep, not a grand gesture.
// - Surprise: the note's wording ("yours grew better") turns the
//   gift into a compliment, and the closer ("I have never watered
//   anything faster") lands the laugh.
// - Concreteness: four anchors — 6 a.m., tomato, doorstep, note.
// - Fresh wording: no greeting-card phrasing, the joke is in the
//   last clause, not explained anywhere.
// Revised from v1 (baker + warm roll): the tomato line keeps the
// same warmth but adds a real turn at the end instead of a flat
// explanation, and its detail is a quoted voice, not a summary.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

// The beats the line is built from: the hour, the gift, the note's
// exact words, and the narrator's answer to the kindness.
const BEATS = {
  hour: "At 6 a.m.",
  gift: "my neighbour left a tomato on my doorstep",
  note: "with a note that just said 'yours grew better'",
  answer: "and I have never watered anything faster.",
} as const;

function buildLine(): string {
  return `${BEATS.hour} ${BEATS.gift} ${BEATS.note}, ${BEATS.answer}`;
}

function validateLine(value: string): void {
  if (value.length === 0 || value.length > MAX_CHARS) {
    throw new Error(`line must be 1-${MAX_CHARS} chars, got ${value.length}`);
  }
  if (value.includes("\n") || value.trim().length === 0) {
    throw new Error("line must be a single non-blank line");
  }
}

const LINE = buildLine();
validateLine(LINE);

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, LINE, "utf8");

// No trailing newline: the gate counts every character, and the file
// must hold exactly the line — nothing before it, nothing after it.
console.log(`wrote ${LINE.length} chars to ${OUT_PATH}`);
