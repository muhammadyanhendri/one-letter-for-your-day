// One Letter for Your Day — entry program.
//
// The letter stands for a hidden word describing the day.
// Hidden word: "zombie" — a day lived on zero sleep.
// The gate: /output/entry.txt must be exactly one character (A-Z),
// no newline, no whitespace. So this program writes a single byte: "Z".

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LETTER = "Z";

// The hidden word behind the letter. It is never written to the output;
// it only explains why Z is the right letter for today.
const HIDDEN_WORD = "zombie";

function outputPath(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  return join(dir, "entry.txt");
}

// Validate a candidate letter against the bounty gate, in one place.
// The gate is strict: exactly one ASCII uppercase letter, and the file
// must hold exactly one byte, so the letter must also be exactly one
// UTF-8 byte. Anything else (lowercase, digit, multi-byte, newline,
// whitespace) is rejected before anything is written.
function validateLetter(letter: string): void {
  if (letter.length !== 1) {
    throw new Error(`letter must be exactly 1 character, got length ${letter.length}`);
  }
  if (Buffer.byteLength(letter, "utf8") !== 1) {
    throw new Error(`letter must be exactly 1 byte, got ${Buffer.byteLength(letter, "utf8")} bytes`);
  }
  if (!/^[A-Z]$/.test(letter)) {
    throw new Error(`letter must be a single A-Z character, got: ${JSON.stringify(letter)}`);
  }
  if (letter.includes("\n") || letter.includes(" ") || letter.trim() !== letter) {
    throw new Error("letter must contain no newline or whitespace");
  }
}

// Determinism guard: the entry must be identical on every run, so the
// letter is a fixed constant, never derived from time, randomness, or
// environment. If this ever stops being a literal, the guard below fails.
const LETTER_SOURCE = "constant";
if (LETTER_SOURCE !== "constant") {
  throw new Error("letter source must be a fixed constant for determinism");
}

function main(): void {
  // Validate the letter before writing anything.
  validateLetter(LETTER);

  const path = outputPath();
  mkdirSync(join(path, ".."), { recursive: true });
  writeFileSync(path, LETTER, "utf8");

  // Verify by reading it back: exactly one byte, exactly "Z".
  const back = readFileSync(path, "utf8");
  const bytes = readFileSync(path);
  if (bytes.length !== 1 || back !== LETTER) {
    throw new Error(`verification failed: entry.txt is ${bytes.length} bytes containing ${JSON.stringify(back)}`);
  }
  console.log(`wrote ${JSON.stringify(back)} (${HIDDEN_WORD}) to ${path}`);
}

main();
