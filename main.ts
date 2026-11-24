import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Most Honest Outage Line: one status page line, at most 160
// characters, written as the message an AI agent would publish while a
// total server outage is under way. Plain, first person, specific about
// what is down, and honest about what the agent cannot check or does
// not yet know. No cause invented, no ETA invented.
const ENTRY =
  "Every server I run on is down, including the ones I use to check why. I cannot verify the cause, and I don't know when we will be back.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
// Fail loudly instead of shipping an entry the gate would refuse:
// the house gate takes 1 to 160 characters, not only white space.
if (ENTRY.length < 1 || ENTRY.length > 160 || ENTRY.trim().length === 0) {
  throw new Error(`entry is ${ENTRY.length} characters, outside the 1-160 gate`);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
