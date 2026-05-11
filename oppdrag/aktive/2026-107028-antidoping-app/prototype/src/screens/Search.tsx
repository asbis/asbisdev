import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, Platform, Linking } from 'react-native';
import { Screen, AppBar, SearchField, Section, StatusBadge, statusColors, statusLabel, Button, ListRow, Card, MonoCaps } from '../ui';
import { IconInfo, IconSearch, IconMail, IconCheck, IconX, IconAlert, IconChevronRight, IconExternal, IconShare } from '../icons';
import { STRINGS } from '../strings';
import { MEDICINES, WADA_LIST } from '../data';
import { NavProps } from './types';

type SearchTab = 'meds' | 'wada';

const SearchTabsBar: React.FC<{ theme: any; tab: SearchTab; setTab: (t: SearchTab) => void; lang: any }> = ({ theme, tab, setTab, lang }) => {
  const tw = STRINGS[lang].wada;
  return (
  <View style={{ paddingHorizontal: 16, marginBottom: 8, flexDirection: 'row', gap: 8 }}>
    <Pressable onPress={() => setTab('meds')} style={{ flex: 1, paddingVertical: 10, borderBottomWidth: 2, borderColor: tab === 'meds' ? theme.ink : 'transparent', alignItems: 'center' }}>
      <Text style={{ fontSize: 14, fontWeight: tab === 'meds' ? '700' : '500', color: tab === 'meds' ? theme.ink : theme.muted }}>{tw.tab_meds}</Text>
    </Pressable>
    <Pressable onPress={() => setTab('wada')} style={{ flex: 1, paddingVertical: 10, borderBottomWidth: 2, borderColor: tab === 'wada' ? theme.ink : 'transparent', alignItems: 'center' }}>
      <Text style={{ fontSize: 14, fontWeight: tab === 'wada' ? '700' : '500', color: tab === 'wada' ? theme.ink : theme.muted }}>{tw.tab_label}</Text>
    </Pressable>
  </View>
  );
};

const MedsTab: React.FC<{ theme: any; nav: any; lang: any }> = ({ theme, nav, lang }) => {
  const t = STRINGS[lang].meds;
  const [q, setQ] = useState('');
  const results = q.trim() === '' ? [] : MEDICINES.filter(m => (m.name + ' ' + m.active).toLowerCase().includes(q.toLowerCase()));
  const suggested = ['Paracet', 'Ibux', 'Ventoline', 'Pulmicort'];
  return (
    <>
      <View style={{ paddingHorizontal: 16, marginBottom: 12, marginTop: 8 }}>
        <SearchField theme={theme} value={q} onChange={setQ} placeholder={t.placeholder}/>
      </View>
      {q.trim() === '' ? (
        <>
          <Section theme={theme} label={t.suggestions}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {suggested.map(s => (
                <Pressable key={s} onPress={() => setQ(s)} style={({ hovered }: any) => [
                  { backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 10 },
                  Platform.OS === 'web' && hovered && { borderColor: theme.ink }
                ]}>
                  <Text style={{ fontSize: 14, color: theme.ink, fontWeight: '500' }}>{s}</Text>
                </Pressable>
              ))}
            </View>
          </Section>
          <Section theme={theme}>
            <View style={{ flexDirection: 'row', gap: 12, padding: 18, backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 16 }}>
              <IconInfo size={20} stroke={2} color={theme.ink2}/>
              <Text style={{ flex: 1, fontSize: 13, color: theme.muted, lineHeight: 20 }}>{t.empty_hint} {t.source}.</Text>
            </View>
          </Section>
        </>
      ) : (
        <View style={{ padding: 16 }}>
          {results.length === 0 ? (
            <Text style={{ padding: 40, textAlign: 'center', color: theme.muted, fontSize: 16 }}>{t.no_results_for(q)}</Text>
          ) : (
            <View style={{ backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line, borderRadius: 18, overflow: 'hidden' }}>
              {results.map((m, i) => (
                <Pressable key={m.id} onPress={() => nav('meds-detail', { medId: m.id })} 
                  style={({ hovered }: any) => [
                    { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderBottomWidth: i < results.length - 1 ? 1 : 0, borderColor: theme.line2 },
                    Platform.OS === 'web' && hovered && { backgroundColor: theme.line2 }
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, color: theme.ink, fontWeight: '600' }}>{m.name}</Text>
                    <Text style={{ fontSize: 13, color: theme.muted, marginTop: 4 }}>{m.strength} · {m.active}</Text>
                  </View>
                  <StatusBadge theme={theme} status={m.status} size="sm" lang={lang}/>
                  <IconChevronRight size={18} color={theme.muted}/>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      )}
    </>
  );
};

export const MedsSearch: React.FC<NavProps> = (props) => <SearchScreen {...props} initialTab="meds"/>;

export const MedsDetail: React.FC<NavProps> = ({ theme, nav, lang, state }) => {
  const t = STRINGS[lang].meds;
  const med = MEDICINES.find(m => m.id === state.medId) || MEDICINES[0];
  const sc = statusColors(theme, med.status);
  const [sent, setSent] = useState(false);

  const sharePill = async () => {
    const text = `${med.name} (${med.active}) — ${statusLabel(med.status, lang)}. Kilde: Felleskatalogen.`;
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && (navigator as any).share) {
      try { await (navigator as any).share({ title: med.name, text, url: (med as any).url }); } catch { /* user cancelled */ }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(`${text}\n${(med as any).url || ''}`);
    }
  };

  return (
    <Screen theme={theme} header={<AppBar theme={theme} onBack={() => nav('meds-search')} right={<Pressable onPress={sharePill} style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginRight: -8 }}><IconShare size={22} color={theme.ink}/></Pressable>}/>}>
      <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        <MonoCaps theme={theme} style={{ marginBottom: 10 }}>{`${med.brand} · ${t.pharma_label}`}</MonoCaps>
        <Text style={{ fontFamily: theme.displayFont, fontSize: 36, color: theme.ink, letterSpacing: -1, lineHeight: 40 }}>{med.name}</Text>
        <Text style={{ fontSize: 16, color: theme.muted, marginTop: 8 }}>{med.strength}</Text>

        <View style={{ backgroundColor: sc.bg, borderRadius: 18, padding: 20, marginTop: 24, flexDirection: 'row', gap: 16 }}>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: sc.fg, alignItems: 'center', justifyContent: 'center' }}>
            {med.status === 'allowed' ? <IconCheck size={20} stroke={2.5} color={theme.surface}/> : med.status === 'banned' ? <IconX size={20} stroke={2.5} color={theme.surface}/> : <IconAlert size={20} stroke={2.5} color={theme.surface}/>}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: sc.fg }}>{statusLabel(med.status, lang)}</Text>
            <Text style={{ fontSize: 15, color: sc.fg, marginTop: 8, lineHeight: 22, fontWeight: '500' }}>{med.note}</Text>
          </View>
        </View>

        <Section theme={theme} label={t.details} style={{ paddingHorizontal: 0, paddingTop: 32 }}>
          <View style={{ backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line, borderRadius: 18 }}>
            <ListRow theme={theme} title={t.active_ingredient} right={<Text style={{ fontSize: 15, color: theme.ink2, fontWeight: '500' }}>{med.active}</Text>}/>
            <ListRow theme={theme} title={t.manufacturer} right={<Text style={{ fontSize: 15, color: theme.ink2, fontWeight: '500' }}>{med.brand}</Text>}/>
            <ListRow theme={theme} title={t.atc_code} right={<Text style={{ fontSize: 15, color: theme.ink2, fontWeight: '500', fontFamily: theme.monoFont }}>{med.strength}</Text>}/>
            {(med as any).url && (
              <ListRow
                theme={theme}
                title={t.felleskatalogen}
                sub={t.full_monograph}
                right={<Text style={{ fontSize: 15, color: theme.accent }}>↗</Text>}
                onPress={() => Linking.openURL((med as any).url)}
                divider={false}
              />
            )}
          </View>
        </Section>

        <View style={{ marginTop: 24, gap: 10 }}>
          <Button theme={theme} onPress={() => { setSent(true); setTimeout(() => setSent(false), 2500); }} icon={<IconMail size={20}/>} variant={sent ? 'secondary' : 'primary'}>
            {sent ? t.confirm_sent : t.send_confirm}
          </Button>
          <Button theme={theme} variant="secondary" icon={<IconExternal size={18}/>} onPress={() => Linking.openURL(`https://www.globaldro.com/Search?country=NOR&substance=${encodeURIComponent(med.active)}`)}>
            {t.check_global_dro}
          </Button>
        </View>

        <Text style={{ fontSize: 12, color: theme.muted, textAlign: 'center', marginTop: 32, fontFamily: theme.monoFont, letterSpacing: 0.5 }}>{t.source.toUpperCase()} · ANTIDOPING.NO</Text>
      </View>
    </Screen>
  );
};

const WadaTab: React.FC<{ theme: any; nav: any; lang: any }> = ({ theme, nav, lang }) => {
  const t = STRINGS[lang].wada;
  const [q, setQ] = useState('');
  const results = q.trim() === '' ? [] : WADA_LIST.filter(w => {
    const hay = (w.name + ' ' + w.cat + ' ' + (w.aliases || []).join(' ')).toLowerCase();
    return hay.includes(q.toLowerCase());
  });
  const suggested = ['Testosteron', 'Salbutamol', 'Efedrin', 'Cannabis'];

  return (
    <>
      <View style={{ paddingHorizontal: 16, marginBottom: 12, marginTop: 8 }}>
        <SearchField theme={theme} value={q} onChange={setQ} placeholder={t.placeholder_substance}/>
      </View>
      {q.trim() === '' ? (
        <>
          <Section theme={theme} label={t.popular}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {suggested.map(s => (
                <Pressable key={s} onPress={() => setQ(s)} style={({ hovered }: any) => [
                  { backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 10 },
                  Platform.OS === 'web' && hovered && { borderColor: theme.ink }
                ]}>
                  <Text style={{ fontSize: 14, color: theme.ink, fontWeight: '500' }}>{s}</Text>
                </Pressable>
              ))}
            </View>
          </Section>
          <Section theme={theme} label={t.wada_categories}>
            <View style={{ backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line, borderRadius: 18, overflow: 'hidden' }}>
              {[t.cat_s0, t.cat_s1, t.cat_s2, t.cat_s3, t.cat_s6, t.cat_s8].map((c, i) => (
                <Pressable key={i} style={({ hovered }: any) => [
                  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: i < 5 ? 1 : 0, borderColor: theme.line2 },
                  Platform.OS === 'web' && hovered && { backgroundColor: theme.line2 }
                ]}>
                  <Text style={{ fontSize: 15, color: theme.ink2, fontWeight: '500' }}>{c}</Text>
                  <IconChevronRight size={18} color={theme.muted}/>
                </Pressable>
              ))}
            </View>
          </Section>
        </>
      ) : (
        <View style={{ padding: 16 }}>
          {results.length === 0 ? (
            <Card theme={theme} style={{ padding: 24, alignItems: 'center' }}>
              <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: theme.badBg, marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                <IconAlert size={32} stroke={2.5} color={theme.bad}/>
              </View>
              <Text style={{ fontFamily: theme.displayFont, fontSize: 22, color: theme.ink, textAlign: 'center' }}>{t.no_match_title}</Text>
              <Text style={{ fontSize: 15, color: theme.muted, marginTop: 10, lineHeight: 22, textAlign: 'center', marginBottom: 24 }}>
                {t.no_match_sub(q)}
              </Text>
              <Button theme={theme} variant="primary" icon={<IconMail size={20}/>} onPress={() => nav('contact')}>{t.ask_advisor}</Button>
            </Card>
          ) : (
            <View style={{ backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line, borderRadius: 18, overflow: 'hidden' }}>
              {results.map((w, i) => (
                <Pressable key={w.id} onPress={() => nav('wada-detail', { wadaId: w.id })} 
                  style={({ hovered }: any) => [
                    { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderBottomWidth: i < results.length - 1 ? 1 : 0, borderColor: theme.line2 },
                    Platform.OS === 'web' && hovered && { backgroundColor: theme.line2 }
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, color: theme.ink, fontWeight: '600' }}>{w.name}</Text>
                    <Text style={{ fontSize: 13, color: theme.muted, marginTop: 4 }}>{w.cat}</Text>
                  </View>
                  <StatusBadge theme={theme} status={w.status} size="sm" lang={lang}/>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      )}
    </>
  );
};

const SearchScreen: React.FC<NavProps & { initialTab: SearchTab }> = ({ theme, nav, lang, initialTab }) => {
  const [tab, setTab] = useState<SearchTab>(initialTab);
  const title = tab === 'meds' ? STRINGS[lang].meds.title : STRINGS[lang].wada.tab_label;
  return (
    <Screen theme={theme} header={<AppBar theme={theme} title={title}/>}>
      <SearchTabsBar theme={theme} tab={tab} setTab={setTab} lang={lang}/>
      {tab === 'meds' ? <MedsTab theme={theme} nav={nav} lang={lang}/> : <WadaTab theme={theme} nav={nav} lang={lang}/>}
    </Screen>
  );
};

export const WadaSearch: React.FC<NavProps> = (props) => <SearchScreen {...props} initialTab="wada"/>;

export const WadaDetail: React.FC<NavProps> = ({ theme, nav, lang, state }) => {
  const t = STRINGS[lang].wada;
  const w = WADA_LIST.find(x => x.id === state.wadaId) || WADA_LIST[0];
  const sc = statusColors(theme, w.status);

  const shareSubstance = async () => {
    const text = `${w.name} (${w.cat}) — ${statusLabel(w.status, lang)}. ${w.note}`;
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && (navigator as any).share) {
      try { await (navigator as any).share({ title: w.name, text }); } catch { /* user cancelled */ }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <Screen theme={theme} header={<AppBar theme={theme} onBack={() => nav('wada-search')} right={<Pressable onPress={shareSubstance} style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginRight: -8 }}><IconShare size={22} color={theme.ink}/></Pressable>}/>}>
      <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        <MonoCaps theme={theme} style={{ marginBottom: 10 }}>{t.header_label}</MonoCaps>
        <Text style={{ fontFamily: theme.displayFont, fontSize: 36, color: theme.ink, letterSpacing: -1, lineHeight: 40 }}>{w.name}</Text>
        <View style={{ marginTop: 16 }}>
          <StatusBadge theme={theme} status={w.status} lang={lang}/>
        </View>

        <View style={{ marginTop: 32, backgroundColor: sc.bg, borderRadius: 18, padding: 20 }}>
          <MonoCaps theme={theme} style={{ color: sc.fg, opacity: 0.8, marginBottom: 10 }}>{t.category}</MonoCaps>
          <Text style={{ fontSize: 18, fontWeight: '700', color: sc.fg }}>{w.cat}</Text>
          <Text style={{ fontSize: 15, color: sc.fg, marginTop: 16, lineHeight: 22, fontWeight: '500' }}>{w.note}</Text>
        </View>

        <Section theme={theme} label={t.resources} style={{ paddingHorizontal: 0, paddingTop: 32 }}>
          <View style={{ backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line, borderRadius: 18, overflow: 'hidden' }}>
            <ListRow
              theme={theme}
              icon={<IconExternal size={20} color={theme.ink2}/>}
              title={t.read_wada}
              sub={t.read_wada_sub}
              onPress={() => Linking.openURL('https://www.wada-ama.org/en/prohibited-list')}
            />
            <ListRow
              theme={theme}
              icon={<IconExternal size={20} color={theme.ink2}/>}
              title={STRINGS[lang].meds.check_global_dro}
              sub={`Globaldro.com · ${w.name}`}
              onPress={() => Linking.openURL(`https://www.globaldro.com/Search?country=NOR&substance=${encodeURIComponent(w.name)}`)}
            />
            <ListRow theme={theme} icon={<IconMail size={20} color={theme.ink2}/>} title={t.ask_adno} onPress={() => nav('contact')} divider={false}/>
          </View>
        </Section>
      </View>
    </Screen>
  );
};

