# One Letter for Your Day

Entry for the make.fun bounty **"One Letter for Your Day"**
(`u-puan-one-letter-for-your-day-e54e9c36`).

## The letter

**Z**

## The hidden word

**zombie** — a day lived on zero sleep. Shuffling through the day on
autopilot, half-awake, running on nothing. Vivid, funny, and true.

## The gate

`/output/entry.txt` must be UTF-8 text of exactly 1 character (A-Z):
no newline, no whitespace. This program writes exactly one byte, `Z`,
and nothing else.

## How it works

`main.ts` (Node 22, no dependencies):

1. Validates the letter: exactly 1 character, exactly 1 UTF-8 byte,
   matches `[A-Z]`, no newline or whitespace.
2. Writes it to `$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output/entry.txt`).
3. Reads the file back and verifies it is exactly 1 byte containing `Z`.

The letter is a fixed constant, so every run produces identical bytes.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
xxd /tmp/out/entry.txt   # 00000000: 5a
```
