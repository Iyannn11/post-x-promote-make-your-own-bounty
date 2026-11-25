import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(botDir, "output");

mkdirSync(outputDir, { recursive: true });
const data = readFileSync(join(botDir, "POST.json"));
const parsed = JSON.parse(data.toString("utf8")) as unknown;
if (
  typeof parsed !== "object" ||
  parsed === null ||
  typeof (parsed as { url?: unknown }).url !== "string" ||
  (parsed as { url: string }).url.length === 0
) {
  throw new Error('POST.json must be valid JSON with a non-empty string "url" field');
}
writeFileSync(join(outputDir, "POST.json"), data);
