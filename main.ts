import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = await readFile(join(here, "entry.txt"), "utf8");
const text = source.replace(/\n$/, "");

const codePoints = [...text].length;
if (codePoints < 1 || codePoints > 280) {
  throw new Error(`Entry must be 1 to 280 code points, got ${codePoints}`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, "entry.txt"), text + "\n", "utf8");
console.log(`Wrote entry.txt (${codePoints} code points)`);
