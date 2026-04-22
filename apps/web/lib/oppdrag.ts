import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const ROOT = join(process.cwd(), "content", "oppdrag");

export type TenderFrontmatter = {
  tender?: string;
  title?: string;
  status?: string;
  deadline?: string;
  questionsDeadline?: string;
  budget?: string;
  contract?: string;
};

export type TenderDoc = {
  id: string;
  slug: string;
  kind: "tender" | "analysis" | "notes" | "draft";
  frontmatter: TenderFrontmatter;
  content: string;
};

export function listTenders(): { id: string; analysis?: TenderFrontmatter; tender?: TenderFrontmatter }[] {
  if (!existsSync(ROOT)) return [];
  return readdirSync(ROOT)
    .filter((d) => {
      const p = join(ROOT, d);
      return existsSync(p) && statSync(p).isDirectory();
    })
    .map((id) => {
      const analysis = readDoc(id, "analysis");
      const tender = readDoc(id, "tender");
      return { id, analysis: analysis?.frontmatter, tender: tender?.frontmatter };
    });
}

export function readDoc(id: string, kind: TenderDoc["kind"]): TenderDoc | null {
  const path = join(ROOT, id, `${kind}.md`);
  if (!existsSync(path)) return null;
  const raw = readFileSync(path, "utf-8");
  const { data, content } = matter(raw);
  return {
    id,
    slug: id,
    kind,
    frontmatter: data as TenderFrontmatter,
    content,
  };
}

export function listDocs(id: string): TenderDoc["kind"][] {
  const dir = join(ROOT, id);
  if (!existsSync(dir)) return [];
  const kinds: TenderDoc["kind"][] = ["tender", "analysis", "notes", "draft"];
  return kinds.filter((k) => existsSync(join(dir, `${k}.md`)));
}
