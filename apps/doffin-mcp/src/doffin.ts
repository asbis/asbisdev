const DOFFIN_BASE =
  process.env.DOFFIN_API_BASE ?? "https://api.doffin.no/public";
const DOFFIN_KEY = process.env.DOFFIN_API_KEY ?? "";

export type Buyer = { id?: string; organizationId?: string; name?: string };

export type Tender = {
  id: string;
  heading: string;
  description?: string;
  buyer: Buyer[];
  cpvCodes: string[];
  locationId: string[];
  type?: string;
  status?: string;
  issueDate?: string;
  publicationDate?: string;
  estimatedValue?: { currencyCode?: string; amount?: number };
  url: string;
};

export type SearchParams = {
  searchString?: string;
  cpvCode?: string[];
  location?: string[];
  status?: string[];
  type?: string[];
  issueDateFrom?: string;
  issueDateTo?: string;
  numHitsPerPage?: number;
  page?: number;
  sortBy?: string;
};

function buildQuery(params: SearchParams): string {
  const qs = new URLSearchParams();
  const add = (k: string, v: string | number | undefined) => {
    if (v !== undefined && v !== "") qs.append(k, String(v));
  };
  const addEach = (k: string, arr: string[] | undefined) =>
    arr?.forEach((v) => qs.append(k, v));

  add("searchString", params.searchString);
  add("numHitsPerPage", params.numHitsPerPage ?? 25);
  add("page", params.page);
  add("sortBy", params.sortBy);
  add("issueDateFrom", params.issueDateFrom);
  add("issueDateTo", params.issueDateTo);
  addEach("cpvCode", params.cpvCode);
  addEach("location", params.location);
  addEach("status", params.status);
  addEach("type", params.type);
  return qs.toString();
}

export async function searchDoffin(params: SearchParams): Promise<{
  total: number;
  accessible: number;
  hits: Tender[];
}> {
  if (!DOFFIN_KEY) throw new Error("DOFFIN_API_KEY not set");

  const url = `${DOFFIN_BASE}/v2/search?${buildQuery(params)}`;
  const res = await fetch(url, {
    headers: {
      "Ocp-Apim-Subscription-Key": DOFFIN_KEY,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Doffin ${res.status}: ${await res.text()}`);
  }
  const data: any = await res.json();
  const rawHits: any[] = Array.isArray(data?.hits) ? data.hits : [];
  return {
    total: data?.numHitsTotal ?? 0,
    accessible: data?.numHitsAccessible ?? 0,
    hits: rawHits.map(normalize),
  };
}

function normalize(h: any): Tender {
  const id = h.id ?? "";
  return {
    id,
    heading: h.heading ?? "",
    description: h.description,
    buyer: h.buyer ?? [],
    cpvCodes: h.cpvCodes ?? [],
    locationId: h.locationId ?? [],
    type: h.type,
    status: h.status,
    issueDate: h.issueDate,
    publicationDate: h.publicationDate,
    estimatedValue: h.estimatedValue,
    url: `https://www.doffin.no/notices/${id}`,
  };
}

export type ScoreProfile = {
  keywords: string[];
  cpvCodes: string[];
  preferredLocations: string[];
};

export function scoreTender(t: Tender, profile: ScoreProfile): number {
  let score = 0;
  const text = `${t.heading} ${t.description ?? ""}`.toLowerCase();
  for (const kw of profile.keywords) {
    if (text.includes(kw.toLowerCase())) score += 3;
  }
  for (const cpv of profile.cpvCodes) {
    if (t.cpvCodes.includes(cpv)) score += 5;
  }
  if (
    profile.preferredLocations.some((l) =>
      t.locationId.some((loc) => loc.startsWith(l)),
    )
  ) {
    score += 4;
  }
  return score;
}
