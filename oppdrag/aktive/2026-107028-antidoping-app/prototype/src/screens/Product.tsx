import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, ActivityIndicator, Platform, Linking } from 'react-native';
import { Screen, AppBar, SearchField, LargeTitle, Button, Section, MonoCaps, StatusBadge } from '../ui';
import { IconAlert, IconCheck, IconExternal, IconSearch, IconInfo, IconShield, IconChevronRight } from '../icons';
import { NavProps } from './types';
import { WADA_LIST_FK } from '../wada.generated';
import { storage } from '../storage';
import { STRINGS } from '../strings';

type OffProduct = {
  code: string;
  product_name?: string;
  brands?: string;
  ingredients_text?: string;
  ingredients_text_en?: string;
  image_front_small_url?: string;
  ingredients?: { id: string; text: string }[];
  categories_tags?: string[];
};

type Match = { ingredient: string; substance: string; status: 'banned' | 'incomp' | 'tue'; cat: string; note: string };

function buildSubstanceIndex() {
  // Lowercased keyword → WADA entry
  const idx: Array<{ keyword: string; entry: typeof WADA_LIST_FK[0] }> = [];
  for (const w of WADA_LIST_FK) {
    idx.push({ keyword: w.name.toLowerCase().split(/[\s(]/)[0], entry: w });
    idx.push({ keyword: w.id.toLowerCase(), entry: w });
    for (const a of w.aliases || []) idx.push({ keyword: a.toLowerCase(), entry: w });
  }
  return idx;
}

const SUBSTANCE_INDEX = buildSubstanceIndex();

function matchIngredients(text: string): Match[] {
  if (!text) return [];
  const lower = text.toLowerCase();
  const found: Map<string, Match> = new Map();
  for (const { keyword, entry } of SUBSTANCE_INDEX) {
    if (keyword.length < 4) continue; // skip too-short keywords
    if (lower.includes(keyword)) {
      if (!found.has(entry.id)) {
        found.set(entry.id, {
          ingredient: keyword,
          substance: entry.name,
          status: entry.status,
          cat: entry.cat,
          note: entry.note,
        });
      }
    }
  }
  return Array.from(found.values());
}

async function fetchByBarcode(barcode: string): Promise<OffProduct | null> {
  const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(barcode)}.json`);
  if (!res.ok) return null;
  const json = await res.json();
  return json?.status === 1 ? (json.product as OffProduct) : null;
}

async function searchByName(query: string): Promise<OffProduct[]> {
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=8&fields=code,product_name,brands,ingredients_text,ingredients_text_en,image_front_small_url`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const json = await res.json();
  return (json?.products || []) as OffProduct[];
}

export const ProductSearch: React.FC<NavProps> = ({ theme, nav, lang }) => {
  const t = STRINGS[lang].product;
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<OffProduct[]>([]);
  const [recents, setRecents] = useState<string[]>(() => storage.get<string[]>('product-history', []));

  const isBarcode = /^\d{8,14}$/.test(q.trim());

  const performSearch = async () => {
    const query = q.trim();
    if (!query) return;
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      if (isBarcode) {
        const p = await fetchByBarcode(query);
        if (!p) {
          setError(t.barcode_not_found(query));
        } else {
          setResults([p]);
          // Auto-open the only result
          openProduct(p, query);
          return;
        }
      } else {
        const ps = await searchByName(query);
        if (ps.length === 0) setError(t.no_results_for(query));
        setResults(ps);
      }
      const next = [query, ...recents.filter((r) => r !== query)].slice(0, 6);
      setRecents(next);
      storage.set('product-history', next);
    } catch (e) {
      setError(t.off_unreachable(e instanceof Error ? e.message : t.unknown_error));
    } finally {
      setLoading(false);
    }
  };

  const openProduct = (p: OffProduct, query: string) => {
    nav('product-detail', { product: p, query });
  };

  return (
    <Screen theme={theme} scroll={false} header={<AppBar theme={theme} onBack={() => nav('home')} title={t.title}/>}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }} keyboardShouldPersistTaps="handled">
        <View style={{ paddingHorizontal: 4, marginBottom: 14 }}>
          <Text style={{ fontSize: 13, color: theme.muted, lineHeight: 20 }}>
            {t.intro}
          </Text>
        </View>

        <SearchField
          theme={theme}
          value={q}
          onChange={setQ}
          placeholder={t.placeholder}
          onSubmit={performSearch}
        />

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
          <View style={{ flex: 1 }}>
            <Button theme={theme} onPress={performSearch} disabled={!q.trim() || loading} icon={<IconSearch size={18}/>}>
              {loading ? t.searching : isBarcode ? t.lookup_barcode : t.search_product}
            </Button>
          </View>
        </View>

        {Platform.OS === 'web' && (
          <View style={{ marginTop: 14, padding: 14, backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 12, flexDirection: 'row', gap: 10 }}>
            <IconInfo size={18} color={theme.muted}/>
            <Text style={{ flex: 1, fontSize: 12, color: theme.muted, lineHeight: 18 }}>
              {t.web_hint_prefix}<Text style={{ fontFamily: theme.monoFont, color: theme.ink2 }}>3017624010701</Text>{t.web_hint_suffix}
            </Text>
          </View>
        )}

        {error && (
          <View style={{ marginTop: 18, padding: 14, backgroundColor: theme.badBg, borderRadius: 12, flexDirection: 'row', gap: 10 }}>
            <IconAlert size={18} color={theme.bad}/>
            <Text style={{ flex: 1, fontSize: 13, color: theme.bad, lineHeight: 19 }}>{error}</Text>
          </View>
        )}

        {!loading && results.length > 1 && (
          <View style={{ marginTop: 18 }}>
            <MonoCaps theme={theme} style={{ marginBottom: 10 }}>{t.results_count(results.length)}</MonoCaps>
            <View style={{ backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line, borderRadius: 18, overflow: 'hidden' }}>
              {results.map((p, i) => (
                <Pressable
                  key={p.code || i}
                  onPress={() => openProduct(p, q)}
                  style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderBottomWidth: i < results.length - 1 ? 1 : 0, borderColor: theme.line2 }}
                >
                  <View style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: theme.line2, overflow: 'hidden' }}>
                    {/* Image only available via remote URL — not shown to keep bundle simple */}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, color: theme.ink, fontWeight: '500' }} numberOfLines={1}>
                      {p.product_name || t.unnamed}
                    </Text>
                    <Text style={{ fontSize: 12, color: theme.muted, marginTop: 2 }} numberOfLines={1}>
                      {p.brands || p.code}
                    </Text>
                  </View>
                  <IconChevronRight size={18} color={theme.muted}/>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {q.trim() === '' && recents.length > 0 && (
          <Section theme={theme} label={t.recent} style={{ paddingHorizontal: 0, paddingTop: 22 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {recents.map((r) => (
                <Pressable
                  key={r}
                  onPress={() => setQ(r)}
                  style={{ backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 }}
                >
                  <Text style={{ fontSize: 13, color: theme.ink2 }}>{r}</Text>
                </Pressable>
              ))}
            </View>
          </Section>
        )}

        <Text style={{ fontSize: 11, color: theme.muted, textAlign: 'center', marginTop: 30, fontFamily: theme.monoFont, letterSpacing: 0.5 }}>
          {t.source_off_wada}
        </Text>
      </ScrollView>
    </Screen>
  );
};

export const ProductDetail: React.FC<NavProps> = ({ theme, nav, state, lang }) => {
  const t = STRINGS[lang].product;
  const p: OffProduct | undefined = state.product;
  if (!p) {
    return (
      <Screen theme={theme} scroll={false} header={<AppBar theme={theme} onBack={() => nav('product-search')}/>}>
        <Text style={{ padding: 30, textAlign: 'center', color: theme.muted }}>{t.no_product_data}</Text>
      </Screen>
    );
  }

  const ingredientsText = p.ingredients_text || p.ingredients_text_en || '';
  const matches = matchIngredients(ingredientsText);
  const worstStatus: 'banned' | 'incomp' | 'tue' | 'allowed' =
    matches.some((m) => m.status === 'banned') ? 'banned' :
    matches.some((m) => m.status === 'tue') ? 'tue' :
    matches.some((m) => m.status === 'incomp') ? 'incomp' :
    'allowed';
  const offUrl = `https://world.openfoodfacts.org/product/${p.code}`;

  return (
    <Screen theme={theme} scroll={false} header={<AppBar theme={theme} onBack={() => nav('product-search')} title={p.product_name || t.product_fallback}/>}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}>
        <MonoCaps theme={theme} style={{ marginBottom: 8 }}>{`${p.brands || t.product_fallback} · OFF`}</MonoCaps>
        <Text style={{ fontFamily: theme.displayFont, fontSize: 30, color: theme.ink, letterSpacing: -0.5, lineHeight: 34 }}>
          {p.product_name || t.unnamed}
        </Text>
        <Text style={{ fontFamily: theme.monoFont, fontSize: 12, color: theme.muted, marginTop: 6 }}>{p.code}</Text>

        <View style={{ marginTop: 22, padding: 18, borderRadius: 16, backgroundColor:
          worstStatus === 'banned' ? theme.badBg :
          worstStatus === 'tue' || worstStatus === 'incomp' ? theme.warnBg :
          theme.okBg
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            {worstStatus === 'allowed' ? <IconCheck size={20} stroke={2.4} color={theme.ok}/> :
             worstStatus === 'banned' ? <IconAlert size={20} stroke={2.4} color={theme.bad}/> :
             <IconShield size={20} color={theme.warn}/>}
            <Text style={{ fontSize: 17, fontWeight: '700', color:
              worstStatus === 'banned' ? theme.bad :
              worstStatus === 'tue' || worstStatus === 'incomp' ? theme.warn :
              theme.ok
            }}>
              {worstStatus === 'allowed' ? t.no_wada_match :
               worstStatus === 'banned' ? t.banned_ingredient :
               worstStatus === 'tue' ? t.requires_tue :
               t.banned_in_comp}
            </Text>
          </View>
          <Text style={{ fontSize: 13, lineHeight: 19, color:
            worstStatus === 'banned' ? theme.bad :
            worstStatus === 'tue' || worstStatus === 'incomp' ? theme.warn :
            theme.ok, opacity: 0.92,
          }}>
            {worstStatus === 'allowed'
              ? t.allowed_note
              : t.found_matches(matches.length)}
          </Text>
        </View>

        {matches.length > 0 && (
          <Section theme={theme} label={t.wada_matches} style={{ paddingHorizontal: 0, paddingTop: 24 }}>
            <View style={{ gap: 10 }}>
              {matches.map((m) => (
                <Pressable
                  key={m.substance}
                  onPress={() => nav('wada-detail', { wadaId: m.substance.toLowerCase().split(/[\s(]/)[0] })}
                  style={{ backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line, borderRadius: 14, padding: 14 }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 15, color: theme.ink, fontWeight: '600' }}>{m.substance}</Text>
                      <Text style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>{m.cat}</Text>
                    </View>
                    <StatusBadge theme={theme} status={m.status} size="sm" lang={lang}/>
                  </View>
                  <Text style={{ fontSize: 12, color: theme.ink2, marginTop: 8, lineHeight: 17 }}>{m.note}</Text>
                </Pressable>
              ))}
            </View>
          </Section>
        )}

        <Section theme={theme} label={t.ingredients} style={{ paddingHorizontal: 0, paddingTop: 24 }}>
          <View style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 14, padding: 14 }}>
            <Text style={{ fontSize: 13, color: theme.ink2, lineHeight: 20 }}>
              {ingredientsText || t.no_ingredients}
            </Text>
          </View>
        </Section>

        <View style={{ marginTop: 18 }}>
          <Button theme={theme} variant="secondary" icon={<IconExternal size={18}/>} onPress={() => Linking.openURL(offUrl)}>
            {t.view_on_off}
          </Button>
        </View>

        <Text style={{ fontSize: 11, color: theme.muted, textAlign: 'center', marginTop: 28, fontFamily: theme.monoFont, letterSpacing: 0.5 }}>
          {t.disclaimer}
        </Text>
      </ScrollView>
    </Screen>
  );
};
