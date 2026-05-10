import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import matter from "gray-matter";

const ROOT = join(process.cwd(), "content", "oppdrag");

export type Frontmatter = {
  tender?: string;
  title?: string;
  status?: string;
  deadline?: string;
  questionsDeadline?: string;
  budget?: string;
  contract?: string;
  buyer?: string;
  portal?: string;
  oppdragsgiver?: string;
  leverandor?: string;
  kriterium?: string;
  sider?: string;
  dato?: string;
  versjon?: string;
};

export type DocEntry = {
  slug: string;           // relative path w/o .md, used as URL segment
  path: string;           // filesystem relative path
  title: string;
  section: string | null; // top folder (analyse / vart-utkast / metadata) or null for root
};

export type TenderSummary = {
  id: string;
  frontmatter: Frontmatter;
};

export type TenderDetail = {
  id: string;
  frontmatter: Frontmatter;
  docs: DocEntry[];
};

export type LoadedDoc = {
  frontmatter: Frontmatter;
  content: string;
  title: string;
};

function walkMd(dir: string, base: string, section: string | null): DocEntry[] {
  if (!existsSync(dir)) return [];
  const out: DocEntry[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...walkMd(full, base, section ?? entry));
    } else if (entry.endsWith(".md")) {
      const rel = relative(base, full).replace(/\\/g, "/");
      const slug = rel.replace(/\.md$/, "");
      const raw = readFileSync(full, "utf-8");
      const { data } = matter(raw);
      const title =
        (data as Frontmatter).title ??
        entry.replace(/\.md$/, "").replace(/^\d+-/, "").replace(/-/g, " ");
      out.push({ slug, path: rel, title, section });
    }
  }
  return out;
}

export function listTenders(): TenderSummary[] {
  if (!existsSync(ROOT)) return [];
  return readdirSync(ROOT)
    .filter((d) => {
      const p = join(ROOT, d);
      return existsSync(p) && statSync(p).isDirectory();
    })
    .map((id) => {
      const dir = join(ROOT, id);
      // Prefer README.md frontmatter; fall back to analyse/01-vinnerstrategi.md
      const candidates = [
        join(dir, "README.md"),
        join(dir, "analyse", "01-vinnerstrategi.md"),
        join(dir, "analysis.md"),
      ];
      for (const p of candidates) {
        if (existsSync(p)) {
          const { data } = matter(readFileSync(p, "utf-8"));
          return { id, frontmatter: data as Frontmatter };
        }
      }
      return { id, frontmatter: {} };
    });
}

export function listDocs(id: string): DocEntry[] {
  const dir = join(ROOT, id);
  if (!existsSync(dir)) return [];
  const entries = walkMd(dir, dir, null);
  // Preferred ordering: README, analyse, vart-utkast, metadata, rest
  const order = (e: DocEntry) => {
    if (e.path === "README.md") return 0;
    if (e.section === "analyse") return 1;
    if (e.section === "vart-utkast") return 2;
    if (e.section === "metadata") return 3;
    return 4;
  };
  return entries.sort((a, b) => order(a) - order(b) || a.path.localeCompare(b.path));
}

export function readDoc(id: string, slug: string): LoadedDoc | null {
  const full = join(ROOT, id, `${slug}.md`);
  if (!existsSync(full)) return null;
  const raw = readFileSync(full, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;
  const title =
    fm.title ??
    slug.split("/").pop()?.replace(/^\d+-/, "").replace(/-/g, " ") ??
    slug;
  return { frontmatter: fm, content, title };
}
