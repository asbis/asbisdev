const DOFFIN_API = "https://api.doffin.no/public/v2/search";

export type Tender = {
  id: string;
  title: string;
  buyer: string;
  description?: string;
  cpvCodes: string[];
  deadline?: string;
  publishedAt?: string;
  location?: string;
  url: string;
};

export type SearchParams = {
  query?: string;
  cpv?: string[];
  location?: string;
  limit?: number;
};

export async function searchDoffin(params: SearchParams): Promise<Tender[]> {
  const body = {
    searchString: params.query ?? "",
    cpvCodes: params.cpv ?? [],
    nutsCodes: params.location ? [params.location] : [],
    size: params.limit ?? 25,
    from: 0,
  };

  const res = await fetch(DOFFIN_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Doffin API ${res.status}: ${await res.text()}`);
  }

  const data: any = await res.json();
  const hits: any[] = data?.hits ?? data?.results ?? [];

  return hits.map((h) => normalize(h));
}

function normalize(h: any): Tender {
  const id = h.id ?? h.noticeId ?? h.referenceNumber ?? "";
  return {
    id,
    title: h.title ?? h.heading ?? "",
    buyer: h.buyer?.name ?? h.contractingAuthority ?? "",
    description: h.description ?? h.shortDescription,
    cpvCodes: h.cpvCodes ?? h.cpv ?? [],
    deadline: h.deadline ?? h.tenderDeadline,
    publishedAt: h.publishedAt ?? h.publicationDate,
    location: h.nutsCodes?.[0] ?? h.location,
    url: `https://www.doffin.no/notices/${id}`,
  };
}

export function scoreTender(t: Tender, profile: ScoreProfile): number {
  let score = 0;
  const text = `${t.title} ${t.description ?? ""}`.toLowerCase();

  for (const kw of profile.keywords) {
    if (text.includes(kw.toLowerCase())) score += 3;
  }
  for (const cpv of profile.cpvCodes) {
    if (t.cpvCodes.includes(cpv)) score += 5;
  }
  if (profile.preferredLocations.some((l) => t.location?.startsWith(l))) {
    score += 4;
  }
  return score;
}

export type ScoreProfile = {
  keywords: string[];
  cpvCodes: string[];
  preferredLocations: string[];
};
