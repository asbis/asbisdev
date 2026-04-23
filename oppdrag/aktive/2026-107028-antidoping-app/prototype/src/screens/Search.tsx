import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Screen, AppBar, SearchField, Section, StatusBadge, statusColors, statusLabel, Button, ListRow, Card } from '../ui';
import { IconInfo, IconSearch, IconMail, IconCheck, IconX, IconAlert, IconChevronRight, IconExternal } from '../icons';
import { STRINGS } from '../strings';
import { MEDICINES, WADA_LIST } from '../data';
import { NavProps } from './types';

export const MedsSearch: React.FC<NavProps> = ({ theme, nav, lang }) => {
  const t = STRINGS[lang].meds;
  const [q, setQ] = useState('');
  const results = q.trim() === '' ? [] : MEDICINES.filter(m => (m.name + ' ' + m.active).toLowerCase().includes(q.toLowerCase()));
  const suggested = ['Paracet', 'Ibux', 'Ventoline', 'Pulmicort'];

  return (
    <Screen theme={theme}>
      <AppBar theme={theme} onBack={() => nav('home')} title={t.title}/>
      <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
        <SearchField theme={theme} value={q} onChange={setQ} placeholder={t.placeholder} autoFocus/>
      </View>
      {q.trim() === '' ? (
        <>
          <Section theme={theme} label="Forslag">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {suggested.map(s => (
                <Pressable key={s} onPress={() => setQ(s)} style={({ hovered }) => [
                  { backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
                  Platform.OS === 'web' && hovered && { borderColor: theme.ink }
                ]}>
                  <Text style={{ fontSize: 13, color: theme.ink }}>{s}</Text>
                </Pressable>
              ))}
            </View>
          </Section>
          <Section theme={theme}>
            <View style={{ flexDirection: 'row', gap: 10, padding: 14, backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 12 }}>
              <IconInfo size={16} stroke={1.6} color={theme.ink2}/>
              <Text style={{ flex: 1, fontSize: 12, color: theme.muted, lineHeight: 18 }}>{t.empty_hint} {t.source}.</Text>
            </View>
          </Section>
        </>
      ) : (
        <View style={{ padding: 16 }}>
          {results.length === 0 ? (
            <Text style={{ padding: 40, textAlign: 'center', color: theme.muted, fontSize: 14 }}>Ingen treff på «{q}»</Text>
          ) : (
            <View style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 16, overflow: 'hidden' }}>
              {results.map((m, i) => (
                <Pressable key={m.id} onPress={() => nav('meds-detail', { medId: m.id })} 
                  style={({ hovered }) => [
                    { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderBottomWidth: i < results.length - 1 ? 1 : 0, borderColor: theme.line2 },
                    Platform.OS === 'web' && hovered && { backgroundColor: theme.line2 }
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, color: theme.ink, fontWeight: '500' }}>{m.name}</Text>
                    <Text style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>{m.strength} · {m.active}</Text>
                  </View>
                  <StatusBadge theme={theme} status={m.status} size="sm"/>
                  <IconChevronRight size={16} color={theme.muted}/>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      )}
    </Screen>
  );
};

export const MedsDetail: React.FC<NavProps> = ({ theme, nav, lang, state }) => {
  const t = STRINGS[lang].meds;
  const med = MEDICINES.find(m => m.id === state.medId) || MEDICINES[0];
  const sc = statusColors(theme, med.status);
  const [sent, setSent] = useState(false);

  return (
    <Screen theme={theme}>
      <AppBar theme={theme} onBack={() => nav('meds-search')}/>
      <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        <Text style={{ fontFamily: theme.monoFont, fontSize: 11, color: theme.muted, letterSpacing: 0.8, marginBottom: 8 }}>{med.brand.toUpperCase()} · LEGEMIDDEL</Text>
        <Text style={{ fontFamily: theme.displayFont, fontSize: 36, color: theme.ink, letterSpacing: -0.8, lineHeight: 38 }}>{med.name}</Text>
        <Text style={{ fontSize: 14, color: theme.muted, marginTop: 6 }}>{med.strength}</Text>

        <View style={{ backgroundColor: sc.bg, borderRadius: 16, padding: 18, marginTop: 20, flexDirection: 'row', gap: 14 }}>
          <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: sc.fg, alignItems: 'center', justifyContent: 'center' }}>
            {med.status === 'allowed' ? <IconCheck size={18} stroke={2.4} color={theme.surface}/> : med.status === 'banned' ? <IconX size={18} stroke={2.4} color={theme.surface}/> : <IconAlert size={18} stroke={2} color={theme.surface}/>}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: sc.fg }}>{statusLabel(med.status)}</Text>
            <Text style={{ fontSize: 13, color: sc.fg, marginTop: 6, lineHeight: 19, opacity: 0.88 }}>{med.note}</Text>
          </View>
        </View>

        <Section theme={theme} label="Detaljer" style={{ paddingHorizontal: 0, paddingTop: 24 }}>
          <View style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 16 }}>
            <ListRow theme={theme} title="Virkestoff" right={<Text style={{ fontSize: 14, color: theme.ink2 }}>{med.active}</Text>}/>
            <ListRow theme={theme} title="Produsent" right={<Text style={{ fontSize: 14, color: theme.ink2 }}>{med.brand}</Text>}/>
            <ListRow theme={theme} title="Form" right={<Text style={{ fontSize: 14, color: theme.ink2 }}>{med.strength}</Text>} divider={false}/>
          </View>
        </Section>

        <View style={{ marginTop: 24 }}>
          <Button theme={theme} onPress={() => { setSent(true); setTimeout(() => setSent(false), 2500); }} icon={<IconMail size={18}/>} variant={sent ? 'secondary' : 'primary'}>
            {sent ? t.confirm_sent : t.send_confirm}
          </Button>
        </View>

        <Text style={{ fontSize: 11, color: theme.muted, textAlign: 'center', marginTop: 24, fontFamily: theme.monoFont, letterSpacing: 0.4 }}>{t.source} · ANTIDOPING.NO</Text>
      </View>
    </Screen>
  );
};

export const WadaSearch: React.FC<NavProps> = ({ theme, nav, lang }) => {
  const t = STRINGS[lang].wada;
  const [q, setQ] = useState('');
  const results = q.trim() === '' ? [] : WADA_LIST.filter(w => (w.name + ' ' + w.cat).toLowerCase().includes(q.toLowerCase()));
  const suggested = ['Testosteron', 'Salbutamol', 'Efedrin', 'Cannabis'];

  return (
    <Screen theme={theme}>
      <AppBar theme={theme} onBack={() => nav('home')} title={t.title} subtitle={t.sub}/>
      <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
        <SearchField theme={theme} value={q} onChange={setQ} placeholder={t.placeholder} autoFocus/>
      </View>
      {q.trim() === '' ? (
        <>
          <Section theme={theme} label="Populære søk">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {suggested.map(s => (
                <Pressable key={s} onPress={() => setQ(s)} style={({ hovered }) => [
                  { backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
                  Platform.OS === 'web' && hovered && { borderColor: theme.ink }
                ]}>
                  <Text style={{ fontSize: 13, color: theme.ink }}>{s}</Text>
                </Pressable>
              ))}
            </View>
          </Section>
          <Section theme={theme} label="WADA-kategorier">
            <View style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 16, overflow: 'hidden' }}>
              {['S0 — Ikke-godkjente substanser', 'S1 — Anabole stoffer', 'S2 — Peptidhormoner', 'S3 — Beta-2-agonister', 'S6 — Stimulerende midler', 'S8 — Cannabinoider'].map((c, i) => (
                <Pressable key={i} style={({ hovered }) => [
                  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderBottomWidth: i < 5 ? 1 : 0, borderColor: theme.line2 },
                  Platform.OS === 'web' && hovered && { backgroundColor: theme.line2 }
                ]}>
                  <Text style={{ fontSize: 14, color: theme.ink2 }}>{c}</Text>
                  <IconChevronRight size={16} color={theme.muted}/>
                </Pressable>
              ))}
            </View>
          </Section>
        </>
      ) : (
        <View style={{ padding: 16 }}>
          {results.length === 0 ? (
            <Card theme={theme}>
              <View style={{ alignItems: 'center', padding: 10, paddingBottom: 20 }}>
                <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: theme.line2, marginBottom: 14, alignItems: 'center', justifyContent: 'center' }}>
                  <IconSearch size={22} stroke={1.6} color={theme.ink2}/>
                </View>
                <Text style={{ fontFamily: theme.displayFont, fontSize: 22, color: theme.ink }}>{t.no_result}</Text>
                <Text style={{ fontSize: 13, color: theme.muted, marginTop: 8, lineHeight: 19, textAlign: 'center' }}>{t.no_result_sub}</Text>
              </View>
              <Button theme={theme} variant="accent" icon={<IconMail size={18}/>} onPress={() => nav('contact')}>{t.ask_adno}</Button>
            </Card>
          ) : (
            <View style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 16, overflow: 'hidden' }}>
              {results.map((w, i) => (
                <Pressable key={w.id} onPress={() => nav('wada-detail', { wadaId: w.id })} 
                  style={({ hovered }) => [
                    { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderBottomWidth: i < results.length - 1 ? 1 : 0, borderColor: theme.line2 },
                    Platform.OS === 'web' && hovered && { backgroundColor: theme.line2 }
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, color: theme.ink, fontWeight: '500' }}>{w.name}</Text>
                    <Text style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>{w.cat}</Text>
                  </View>
                  <StatusBadge theme={theme} status={w.status} size="sm"/>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      )}
    </Screen>
  );
};

export const WadaDetail: React.FC<NavProps> = ({ theme, nav, lang, state }) => {
  const t = STRINGS[lang].wada;
  const w = WADA_LIST.find(x => x.id === state.wadaId) || WADA_LIST[0];
  const sc = statusColors(theme, w.status);

  return (
    <Screen theme={theme}>
      <AppBar theme={theme} onBack={() => nav('wada-search')}/>
      <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        <Text style={{ fontFamily: theme.monoFont, fontSize: 11, color: theme.muted, letterSpacing: 0.8, marginBottom: 8 }}>WADA PROHIBITED LIST 2026</Text>
        <Text style={{ fontFamily: theme.displayFont, fontSize: 36, color: theme.ink, letterSpacing: -0.8, lineHeight: 38 }}>{w.name}</Text>
        <View style={{ marginTop: 12 }}>
          <StatusBadge theme={theme} status={w.status}/>
        </View>

        <View style={{ marginTop: 24, backgroundColor: sc.bg, borderRadius: 16, padding: 18 }}>
          <Text style={{ fontFamily: theme.monoFont, fontSize: 11, color: sc.fg, letterSpacing: 0.8, opacity: 0.85, marginBottom: 8 }}>{t.category.toUpperCase()}</Text>
          <Text style={{ fontSize: 16, fontWeight: '500', color: sc.fg }}>{w.cat}</Text>
          <Text style={{ fontSize: 14, color: sc.fg, marginTop: 14, lineHeight: 21, opacity: 0.92 }}>{w.note}</Text>
        </View>

        <Section theme={theme} label="Ressurser" style={{ paddingHorizontal: 0, paddingTop: 24 }}>
          <View style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 16, overflow: 'hidden' }}>
            <ListRow theme={theme} icon={<IconExternal size={18} color={theme.ink2}/>} title="Les WADA-dokumentasjon" sub="wada-ama.org" onPress={() => {}}/>
            <ListRow theme={theme} icon={<IconMail size={18} color={theme.ink2}/>} title={t.ask_adno} onPress={() => nav('contact')} divider={false}/>
          </View>
        </Section>
      </View>
    </Screen>
  );
};
