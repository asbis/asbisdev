import { cpSync, existsSync, mkdirSync, rmSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SRC = join(process.cwd(), "..", "..", "oppdrag", "aktive");
const DEST = join(process.cwd(), "content", "oppdrag");

if (!existsSync(SRC)) {
  console.log(`[copy-oppdrag] no source at ${SRC} — skipping`);
  process.exit(0);
}

rmSync(DEST, { recursive: true, force: true });
mkdirSync(DEST, { recursive: true });

for (const dir of readdirSync(SRC)) {
  const full = join(SRC, dir);
  if (!statSync(full).isDirectory()) continue;
  if (dir.startsWith("_") || dir.startsWith(".")) continue;

  const target = join(DEST, dir);
  mkdirSync(target, { recursive: true });
  // Copy only markdown — skip tender.xml, portal.html, vedlegg/ (can be large/binary)
  for (const f of readdirSync(full)) {
    if (f.endsWith(".md")) cpSync(join(full, f), join(target, f));
  }
}
console.log(`[copy-oppdrag] copied to ${DEST}`);
