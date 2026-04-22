import { cpSync, existsSync, mkdirSync, rmSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const SRC = join(process.cwd(), "..", "..", "oppdrag", "aktive");
const DEST = join(process.cwd(), "content", "oppdrag");

if (!existsSync(SRC)) {
  console.log(`[copy-oppdrag] no source at ${SRC} — skipping`);
  process.exit(0);
}

rmSync(DEST, { recursive: true, force: true });
mkdirSync(DEST, { recursive: true });

const SKIP_DIRS = new Set(["fra-kunden", "hap-src", "til-innsending", "files", "vedlegg", "node_modules"]);

function copyMarkdownRecursive(from: string, to: string) {
  for (const entry of readdirSync(from)) {
    if (entry.startsWith(".")) continue;
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(from, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      const sub = join(to, entry);
      mkdirSync(sub, { recursive: true });
      copyMarkdownRecursive(full, sub);
    } else if (entry.endsWith(".md")) {
      cpSync(full, join(to, entry));
    }
  }
}

for (const dir of readdirSync(SRC)) {
  const full = join(SRC, dir);
  if (!statSync(full).isDirectory()) continue;
  if (dir.startsWith("_") || dir.startsWith(".")) continue;
  const target = join(DEST, dir);
  mkdirSync(target, { recursive: true });
  copyMarkdownRecursive(full, target);
}
console.log(`[copy-oppdrag] copied to ${DEST}`);
