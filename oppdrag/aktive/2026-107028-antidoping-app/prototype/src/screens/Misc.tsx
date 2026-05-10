import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, ActivityIndicator, Linking, Alert as RNAlert, Platform, KeyboardAvoidingView } from 'react-native';
import { Screen, AppBar, LargeTitle, Button, Section, ListRow, Switch } from '../ui';
import { IconLock, IconExternal, IconChat, IconCheck, IconAlert, IconBell, IconGlobe, IconSparkle, IconFileText, IconInfo, IconDownload, IconPlay, IconChevronDown, IconSearch } from '../icons';
import { STRINGS } from '../strings';
import { ASTHMA_MEDS } from '../data';
import { NavProps } from './types';
import { Theme } from '../theme';
import { storage } from '../storage';
import { requestPermission, showNotification, getPermission } from '../notifications';

type Alert = {
  id: string;
  cat: 'Hastevarsel' | 'Regelendring' | 'Påminnelse' | 'Nyhet';
  title: string;
  preview: string;
  body: string;
  date: string;
  source: string;
  url?: string;
};

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}

const MOCK_ALERTS: Alert[] = [
  { id: 'a1', cat: 'Hastevarsel', title: 'Kosttilskudd Pure Mass XL trukket fra markedet', preview: 'Prøver viser stanozolol. Stopp bruk umiddelbart.', body: 'ADNO advarer mot Pure Mass XL fra musclezone.com etter at uavhengige laboratorieprøver påviste stanozolol i tre av fem partier. Utøvere som har brukt produktet bes kontakte ADNO snarest.', date: '2026-05-09', source: 'ADNO', url: 'https://www.antidoping.no' },
  { id: 'a2', cat: 'Regelendring', title: 'WADA 2026: nye grenseverdier for salbutamol', preview: 'Maks 600 µg per 8 timer (tidligere 800 µg).', body: 'WADA strammet inn grenseverdiene for salbutamol fra 1. januar 2026. Maks 600 mikrogram per 8 timer og 1600 mikrogram per døgn. Utøvere som bruker høyere doser må søke fritak.', date: '2026-05-02', source: 'WADA' },
  { id: 'a3', cat: 'Nyhet', title: 'Ny e-læringsmodul: Whereabouts for U23-utøvere', preview: 'Lansert sammen med Olympiatoppen.', body: 'Modulen er på 25 minutter og dekker rutiner for å registrere oppholdssted, konsekvenser ved tre tapte tester, og hvordan korrigere oppføringer i ADAMS.', date: '2026-04-28', source: 'Ren Utøver' },
  { id: 'a4', cat: 'Påminnelse', title: 'Frist for fritakssøknad nærmer seg', preview: 'Send senest 30 dager før konkurransestart.', body: 'Hvis du planlegger å konkurrere internasjonalt i sommer og bruker forbudt substans av medisinske grunner, må du sende fritakssøknad innen fristen. Bruk skjema fra antidoping.no.', date: '2026-04-22', source: 'ADNO' },
];

export const Messages: React.FC<NavProps> = ({ theme, nav, lang }) => {
  const t = STRINGS[lang].messages;
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readIds, setReadIds] = useState<string[]>(() => storage.get<string[]>('read-alerts', []));

  useEffect(() => {
    let cancelled = false;
    const id = setTimeout(() => {
      if (cancelled) return;
      setAlerts(MOCK_ALERTS);
      setLoading(false);
    }, 450);
    return () => { cancelled = true; clearTimeout(id); };
  }, []);

  const openMsg = (a: Alert) => {
    if (!readIds.includes(a.id)) {
      const next = [...readIds, a.id];
      setReadIds(next);
      storage.set('read-alerts', next);
    }
    nav('message-detail', { alert: a });
  };

  const unreadCount = alerts.filter((a) => !readIds.includes(a.id)).length;

  return (
    <Screen theme={theme} scroll={false} header={<AppBar theme={theme} onBack={() => nav('home')} title={t.title} subtitle={unreadCount > 0 ? `${unreadCount} uleste` : 'Alt lest'}/>}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>
        {loading && (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <ActivityIndicator size="small" color={theme.muted}/>
            <Text style={{ marginTop: 10, fontSize: 13, color: theme.muted }}>Henter varsler…</Text>
          </View>
        )}
        {error && (
          <View style={{ padding: 14, marginBottom: 14, backgroundColor: theme.badBg, borderRadius: 12, flexDirection: 'row', gap: 10 }}>
            <IconAlert size={18} color={theme.bad}/>
            <Text style={{ flex: 1, fontSize: 13, color: theme.bad, lineHeight: 19 }}>Kunne ikke hente varsler: {error}</Text>
          </View>
        )}
        {!loading && alerts.length > 0 && (
          <View style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 16, overflow: 'hidden' }}>
            {alerts.map((m, i) => {
              const unread = !readIds.includes(m.id);
              return (
                <Pressable key={m.id} onPress={() => openMsg(m)} style={({ hovered }: any) => [
                  { padding: 14, borderBottomWidth: i < alerts.length - 1 ? 1 : 0, borderColor: theme.line2, flexDirection: 'row', gap: 12 },
                  Platform.OS === 'web' && hovered && { backgroundColor: theme.line2 },
                ]}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, marginTop: 8, backgroundColor: unread ? (m.cat === 'Hastevarsel' ? theme.bad : theme.accent) : 'transparent' }}/>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ fontFamily: theme.monoFont, fontSize: 10, color: m.cat === 'Hastevarsel' ? theme.bad : theme.muted, letterSpacing: 0.8 }}>{m.cat.toUpperCase()} · {m.source.toUpperCase()}</Text>
                      <Text style={{ fontSize: 11, color: theme.muted }}>{formatDate(m.date)}</Text>
                    </View>
                    <Text style={{ fontSize: 15, color: theme.ink, fontWeight: unread ? '700' : '500', marginTop: 4 }}>{m.title}</Text>
                    <Text style={{ fontSize: 13, color: theme.muted, marginTop: 4, lineHeight: 18 }} numberOfLines={2}>{m.preview}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}
        <Text style={{ fontFamily: theme.monoFont, fontSize: 10, color: theme.muted, letterSpacing: 0.8, textAlign: 'center', marginTop: 22 }}>
          OPPDATERES FRA ADNO + WADA
        </Text>
      </ScrollView>
    </Screen>
  );
};

export const MessageDetail: React.FC<NavProps> = ({ theme, nav, state }) => {
  const m: Alert | undefined = state.alert;
  if (!m) {
    return (
      <Screen theme={theme} scroll={false} header={<AppBar theme={theme} onBack={() => nav('messages')}/>}>
        <Text style={{ padding: 30, textAlign: 'center', color: theme.muted }}>Fant ikke meldingen.</Text>
      </Screen>
    );
  }
  return (
    <Screen theme={theme} scroll={false} header={<AppBar theme={theme} onBack={() => nav('messages')}/>}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 30 }}>
        <Text style={{ fontFamily: theme.monoFont, fontSize: 11, color: m.cat === 'Hastevarsel' ? theme.bad : theme.muted, letterSpacing: 0.8 }}>
          {m.cat.toUpperCase()} · {formatDate(m.date)} · {m.source.toUpperCase()}
        </Text>
        <Text style={{ fontFamily: theme.displayFont, fontSize: 30, color: theme.ink, lineHeight: 36, letterSpacing: -0.5, marginTop: 8, marginBottom: 16 }}>{m.title}</Text>
        <Text style={{ fontSize: 15, color: theme.ink2, lineHeight: 24 }}>{m.body}</Text>
        {m.url && (
          <View style={{ marginTop: 22 }}>
            <Button theme={theme} variant="secondary" icon={<IconExternal size={18}/>} onPress={() => Linking.openURL(m.url!)}>
              Les originalkilde
            </Button>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};

const Dropdown: React.FC<{ theme: Theme; value: any; onChange: (v: any) => void; options: { value: any; label: string }[] }> = ({ theme, value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const cur = options.find(o => o.value === value);
  return (
    <View>
      <Pressable onPress={() => setOpen(!open)} style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 12, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 15, color: theme.ink }}>{cur?.label}</Text>
        <IconChevronDown size={18} color={theme.muted}/>
      </Pressable>
      {open && (
        <View style={{ marginTop: 4, backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 12, overflow: 'hidden' }}>
          {options.map(o => (
            <Pressable key={String(o.value)} onPress={() => { onChange(o.value); setOpen(false); }} style={{ padding: 14, borderBottomWidth: 1, borderColor: theme.line2 }}>
              <Text style={{ fontSize: 15, color: theme.ink }}>{o.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export const Asthma: React.FC<NavProps> = ({ theme, nav, lang }) => {
  const t = STRINGS[lang].asthma;
  const [medId, setMedId] = useState('salbutamol');
  const [perDose, setPerDose] = useState(200);
  const [freq, setFreq] = useState(4);
  const [show, setShow] = useState(false);
  const med = ASTHMA_MEDS.find(m => m.id === medId)!;
  const total = perDose * freq;
  const allowed = total <= med.limit24h;

  return (
    <Screen theme={theme} scroll={false} header={<AppBar theme={theme} onBack={() => nav('home')} title={t.title}/>}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}>
        <LargeTitle theme={theme} sub={t.sub}>{t.title}</LargeTitle>

        <View style={{ gap: 14 }}>
          <View>
            <Text style={{ fontFamily: theme.monoFont, fontSize: 11, color: theme.muted, letterSpacing: 0.8, marginBottom: 8 }}>{t.select_med.toUpperCase()}</Text>
            <Dropdown theme={theme} value={medId} onChange={(v) => { setMedId(v); setShow(false); }} options={ASTHMA_MEDS.map(m => ({ value: m.id, label: m.name }))}/>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: theme.monoFont, fontSize: 11, color: theme.muted, letterSpacing: 0.8, marginBottom: 8 }}>{t.dose.toUpperCase()}</Text>
              <Dropdown theme={theme} value={perDose} onChange={(v) => { setPerDose(v); setShow(false); }} options={[100, 200, 400].map(n => ({ value: n, label: `${n} µg` }))}/>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: theme.monoFont, fontSize: 11, color: theme.muted, letterSpacing: 0.8, marginBottom: 8 }}>{t.frequency.toUpperCase()}</Text>
              <Dropdown theme={theme} value={freq} onChange={(v) => { setFreq(v); setShow(false); }} options={[1, 2, 3, 4, 6, 8].map(n => ({ value: n, label: `${n} ×` }))}/>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 18 }}>
          <Button theme={theme} onPress={() => setShow(true)}>{t.calc}</Button>
        </View>

        {show && (
          <View style={{ marginTop: 18, borderRadius: 16, padding: 20, backgroundColor: allowed ? theme.okBg : theme.warnBg }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: allowed ? theme.ok : theme.warn, alignItems: 'center', justifyContent: 'center' }}>
                {allowed ? <IconCheck size={18} stroke={2.4} color={theme.surface}/> : <IconAlert size={18} stroke={2} color={theme.surface}/>}
              </View>
              <Text style={{ fontFamily: theme.displayFont, fontSize: 22, color: allowed ? theme.ok : theme.warn, letterSpacing: -0.3 }}>
                {allowed ? t.allowed : t.needs_tue}
              </Text>
            </View>
            <Text style={{ fontSize: 13, marginTop: 12, lineHeight: 20, color: allowed ? theme.ok : theme.warn, opacity: 0.92 }}>
              {allowed ? t.allowed_sub : t.needs_tue_sub}
            </Text>
            <View style={{ marginTop: 14, padding: 10, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: theme.monoFont, fontSize: 12, color: allowed ? theme.ok : theme.warn }}>Daglig dose</Text>
              <Text style={{ fontFamily: theme.monoFont, fontSize: 12, color: allowed ? theme.ok : theme.warn }}>{total} µg / {med.limit24h} µg</Text>
            </View>
            {!allowed && (
              <View style={{ marginTop: 14 }}>
                <Button theme={theme} variant="accent" onPress={() => nav('tue')}>{t.goto_tue}</Button>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};

const TUE_RESOURCES = [
  { label: 'Søknadsskjema TUE (norsk)', url: 'https://www.antidoping.no/medisinsk-fritak' },
  { label: 'WADA TUE Application Form (engelsk)', url: 'https://www.wada-ama.org/sites/default/files/2024-01/2024_tue_application_form.pdf' },
  { label: 'Internasjonale standarder for fritak (ISTUE)', url: 'https://www.wada-ama.org/sites/default/files/2024-12/2025_ISTUE.pdf' },
];

export const Tue: React.FC<NavProps> = ({ theme, nav, lang }) => {
  const t = STRINGS[lang].tue;
  const sections = [
    { title: 'Hvem trenger fritak?', body: 'Utøvere som må bruke en substans eller metode som står på dopinglisten av medisinske grunner.' },
    { title: 'Hvordan søker jeg?', body: 'Fyll ut søknadsskjema sammen med legen din. Send til ADNO senest 30 dager før konkurranse.' },
    { title: 'Skjemaer og veiledning', body: 'Offisielle skjemaer fra Antidoping Norge og WADA.', attach: true },
    { title: 'Frister', body: 'Nasjonalt nivå: 30 dager før. Internasjonalt: kontakt ditt særforbund.' },
  ];
  return (
    <Screen theme={theme} scroll={false} header={<AppBar theme={theme} onBack={() => nav('home')} title={t.title}/>}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}>
        <LargeTitle theme={theme} sub={t.sub}>{t.title}</LargeTitle>
        <View style={{ gap: 10 }}>
          {sections.map((s, i) => (
            <View key={i} style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 16, padding: 18 }}>
              <Text style={{ fontFamily: theme.monoFont, fontSize: 11, color: theme.muted, letterSpacing: 0.8 }}>DEL {i + 1}</Text>
              <Text style={{ fontFamily: theme.displayFont, fontSize: 22, color: theme.ink, letterSpacing: -0.3, marginTop: 6, lineHeight: 26 }}>{s.title}</Text>
              <Text style={{ fontSize: 14, color: theme.ink2, marginTop: 10, lineHeight: 20 }}>{s.body}</Text>
              {s.attach && (
                <View style={{ marginTop: 14, gap: 6 }}>
                  {TUE_RESOURCES.map((f) => (
                    <Pressable
                      key={f.url}
                      onPress={() => Linking.openURL(f.url)}
                      style={({ hovered }: any) => [
                        { flexDirection: 'row', gap: 10, alignItems: 'center', padding: 12, borderWidth: 1, borderColor: theme.line, borderRadius: 10 },
                        Platform.OS === 'web' && hovered && { backgroundColor: theme.line2, borderColor: theme.ink2 },
                      ]}
                    >
                      <IconExternal size={16} color={theme.ink2}/>
                      <Text style={{ flex: 1, fontSize: 13, color: theme.ink2 }}>{f.label}</Text>
                      <Text style={{ fontSize: 11, fontFamily: theme.monoFont, color: theme.muted }}>↗</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

export const Report: React.FC<NavProps> = ({ theme, nav, lang }) => {
  const t = STRINGS[lang].report;
  return (
    <Screen theme={theme} scroll={false} header={<AppBar theme={theme} onBack={() => nav('home')} title={t.title}/>}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 30 }}>
        <LargeTitle theme={theme} sub={t.sub}>{t.title}</LargeTitle>
        <View style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 16, padding: 20, marginTop: 8 }}>
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: theme.line2, alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
            <IconLock size={22} stroke={1.8} color={theme.ink}/>
          </View>
          <Text style={{ fontSize: 14, color: theme.ink2, lineHeight: 21 }}>{t.body}</Text>
          <View style={{ marginTop: 16, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: theme.ok }}/>
            <Text style={{ fontSize: 12, color: theme.ok, fontFamily: theme.monoFont }}>{t.secure.toUpperCase()}</Text>
          </View>
        </View>
        <View style={{ marginTop: 18 }}>
          <Button
            theme={theme}
            icon={<IconExternal size={18}/>}
            onPress={() => Linking.openURL('https://www.antidoping.no/varslingsportal')}
          >{t.cta}</Button>
        </View>
        <Pressable
          onPress={() => Linking.openURL('https://www.antidoping.no/varslingsportal')}
          style={{ marginTop: 20 }}
        >
          <Text style={{ fontSize: 11, color: theme.muted, textAlign: 'center', fontFamily: theme.monoFont }}>
            antidoping.no/varslingsportal
          </Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
};

type ChatMsg = { role: 'user' | 'assistant'; content: string };

const SUGGESTED_QUESTIONS = [
  'Kan jeg ta Paracet før konkurranse?',
  'Hvor mye Ventoline kan jeg bruke per døgn?',
  'Trenger jeg fritak for Ritalin?',
  'Hvordan vurderer jeg risiko ved kosttilskudd?',
];

export const Contact: React.FC<NavProps> = ({ theme, nav }) => {
  const [messages, setMessages] = useState<ChatMsg[]>(() =>
    storage.get<ChatMsg[]>('chat-history', []),
  );
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    storage.set('chat-history', messages);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  }, [messages]);

  const mockReply = (q: string): string => {
    const lower = q.toLowerCase();
    if (lower.includes('paracet')) return 'Paracet (paracetamol) står ikke på WADAs prohibited list og kan trygt brukes både i og utenfor konkurranse. Følg anbefalt dose på pakningen.';
    if (lower.includes('ventoline') || lower.includes('salbutamol')) return 'Salbutamol (Ventoline) er tillatt i inhalert form opptil 600 µg per 8 timer og 1600 µg per døgn (WADA 2026). Doser over dette krever medisinsk fritak.';
    if (lower.includes('ritalin') || lower.includes('metylfenidat')) return 'Metylfenidat (Ritalin) er forbudt i konkurranse (S6 Stimulerende midler). Du må ha innvilget medisinsk fritak før konkurranse.';
    if (lower.includes('kosttilskudd')) return 'Bruk Risikosjekk-funksjonen i appen, og sjekk om produktet er Informed Sport-sertifisert. Om mulig velg apotekkjøp i Norge fra leverandører med batch-testing.';
    return 'Takk for spørsmålet. Generelt råd: sjekk legemidler i Felleskatalogen + dopinglisten, og kontakt ADNOs medisinske rådgiver direkte ved tvil. Ansvar for hva som inntas ligger alltid hos utøveren.';
  };

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;
    setError(null);
    const next: ChatMsg[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(next);
    setInput('');
    setStreaming(true);
    const reply = mockReply(trimmed);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      setStreaming(false);
    }, 900 + Math.random() * 700);
  };

  const clearChat = () => {
    setMessages([]);
    storage.remove('chat-history');
    setError(null);
  };

  return (
    <Screen theme={theme} scroll={false} header={<AppBar theme={theme} onBack={() => nav('home')} title="Spør ADNO" right={
        messages.length > 0 ? (
          <Pressable onPress={clearChat} style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
            <Text style={{ fontSize: 13, color: theme.muted }}>Tøm</Text>
          </Pressable>
        ) : undefined
      }/>}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={80}>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        {messages.length === 0 ? (
          <View style={{ paddingVertical: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' }}>
                <IconSparkle size={18} color="#fff"/>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: theme.ink }}>AI-rådgiver</Text>
                <Text style={{ fontSize: 12, color: theme.muted }}>Bygget på WADA 2026 + ADNO-veiledning</Text>
              </View>
            </View>
            <Text style={{ fontSize: 14, color: theme.ink2, lineHeight: 22, marginBottom: 18 }}>
              Spør om legemidler, fritak, kosttilskudd eller WADA-regler. Jeg svarer basert på offisiell informasjon, men endelig ansvar ligger hos deg.
            </Text>
            <Text style={{ fontFamily: theme.monoFont, fontSize: 11, color: theme.muted, letterSpacing: 0.8, marginBottom: 10 }}>FORSLAG</Text>
            <View style={{ gap: 8 }}>
              {SUGGESTED_QUESTIONS.map((q) => (
                <Pressable key={q} onPress={() => send(q)} style={{ backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line, borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <IconSearch size={16} color={theme.muted}/>
                  <Text style={{ flex: 1, fontSize: 14, color: theme.ink, lineHeight: 20 }}>{q}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            {messages.map((m, i) => (
              <Bubble key={i} theme={theme} role={m.role} content={m.content}/>
            ))}
            {streaming && messages[messages.length - 1]?.role === 'user' && (
              <View style={{ alignSelf: 'flex-start', flexDirection: 'row', gap: 6, padding: 12 }}>
                <ActivityIndicator size="small" color={theme.muted}/>
                <Text style={{ fontSize: 13, color: theme.muted }}>tenker…</Text>
              </View>
            )}
          </View>
        )}

        {error && (
          <View style={{ marginTop: 14, padding: 14, backgroundColor: theme.badBg, borderRadius: 12, flexDirection: 'row', gap: 10 }}>
            <IconAlert size={18} color={theme.bad}/>
            <Text style={{ flex: 1, fontSize: 13, color: theme.bad, lineHeight: 19 }}>{error}</Text>
          </View>
        )}
      </ScrollView>

      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12, borderTopWidth: 1, borderColor: theme.line2, backgroundColor: theme.bg }}>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-end' }}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Skriv et spørsmål…"
            placeholderTextColor={theme.muted}
            multiline
            onSubmitEditing={() => send(input)}
            blurOnSubmit
            editable={!streaming}
            style={{
              flex: 1, backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line,
              borderRadius: 18, paddingHorizontal: 14, paddingVertical: 10, fontSize: 15, color: theme.ink,
              maxHeight: 120,
            }}
          />
          <Pressable
            onPress={() => send(input)}
            disabled={!input.trim() || streaming}
            style={{
              width: 44, height: 44, borderRadius: 22,
              backgroundColor: input.trim() && !streaming ? theme.ink : theme.line,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Text style={{ color: theme.surface, fontSize: 18, fontWeight: '600' }}>↑</Text>
          </Pressable>
        </View>
        <Text style={{ fontSize: 10, color: theme.muted, textAlign: 'center', marginTop: 6, fontFamily: theme.monoFont, letterSpacing: 0.5 }}>
          AI-GENERERT · DOBBELTSJEKK MED ADNO VED TVIL
        </Text>
      </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const Bubble: React.FC<{ theme: Theme; role: 'user' | 'assistant'; content: string }> = ({ theme, role, content }) => {
  const isUser = role === 'user';
  return (
    <View style={{ alignSelf: isUser ? 'flex-end' : 'flex-start', maxWidth: '88%' }}>
      {!isUser && (
        <Text style={{ fontFamily: theme.monoFont, fontSize: 10, color: theme.muted, letterSpacing: 0.8, marginBottom: 4, marginLeft: 4 }}>ADNO RÅDGIVER</Text>
      )}
      <View style={{
        backgroundColor: isUser ? theme.ink : theme.surface,
        borderWidth: isUser ? 0 : 1.5,
        borderColor: theme.line,
        borderRadius: 18,
        paddingHorizontal: 14,
        paddingVertical: 10,
      }}>
        <Text style={{
          fontSize: 14,
          lineHeight: 21,
          color: isUser ? theme.surface : theme.ink,
        }}>
          {content || ' '}
        </Text>
      </View>
    </View>
  );
};

export const Settings: React.FC<NavProps> = ({ theme, nav, lang, setLang, dark, setDark }) => {
  const t = STRINGS[lang].settings;
  const [pushOn, setPushOn] = useState<boolean>(() => storage.get('push-on', true));
  const [pushPerm, setPushPerm] = useState(getPermission());
  useEffect(() => { storage.set('push-on', pushOn); }, [pushOn]);

  const togglePush = async (next: boolean) => {
    setPushOn(next);
    if (next) {
      const status = await requestPermission();
      setPushPerm(status);
      if (status === 'granted') {
        showNotification({
          title: 'Push-varsler aktivert',
          body: 'Du får varsel ved hastevarsel og regelendringer fra ADNO.',
          tag: 'adno-permission-granted',
        });
      }
    }
  };

  const sendTestNotification = () => {
    const ok = showNotification({
      title: 'Antidoping Norge · Hastevarsel',
      body: 'Pure Mass XL fra musclezone.com testet positivt for stanozolol. Slutt å bruke umiddelbart.',
      tag: 'adno-test',
    });
    if (!ok) {
      RNAlert.alert('Push-varsler', 'Aktiver push-varsler først, og gi nettleseren tillatelse.');
    }
  };

  const downloadMyData = () => {
    const data = {
      profile: { name: 'Emma Berg', email: 'emma@idrett.no', role: 'Utøver' },
      darkMode: dark,
      language: lang,
      pushNotifications: pushOn,
      favorites: storage.get<string[]>('favorites', []),
      searchHistory: storage.get<string[]>('search-history', []),
      chatHistory: storage.get<unknown[]>('chat-history', []),
      exportedAt: new Date().toISOString(),
    };
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `adno-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      RNAlert.alert('Mine data', JSON.stringify(data, null, 2));
    }
  };

  const signOut = () => {
    const doSignOut = () => {
      ['onboarding-done', 'favorites', 'search-history', 'chat-history', 'push-on'].forEach((k) =>
        storage.remove(k),
      );
      if (Platform.OS === 'web' && typeof window !== 'undefined') window.location.reload();
    };
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.confirm('Er du sikker på at du vil logge ut? All lagret data slettes.')) {
        doSignOut();
      }
    } else {
      RNAlert.alert('Logg ut', 'Er du sikker? All lagret data slettes.', [
        { text: 'Avbryt', style: 'cancel' },
        { text: 'Logg ut', style: 'destructive', onPress: doSignOut },
      ]);
    }
  };

  return (
    <Screen theme={theme} scroll={false} header={<AppBar theme={theme} onBack={() => nav('home')} title={t.title}/>}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <Section theme={theme} label="Profil">
          <View style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 16, padding: 18, flexDirection: 'row', gap: 14, alignItems: 'center' }}>
            <View style={{ width: 54, height: 54, borderRadius: 27, backgroundColor: theme.accent, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily: theme.displayFont, fontSize: 22, color: '#fff' }}>EB</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, color: theme.ink, fontWeight: '500' }}>Emma Berg</Text>
              <Text style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>Utøver · emma@idrett.no</Text>
            </View>
          </View>
        </Section>

        <Section theme={theme} label="Preferanser">
          <View style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 16 }}>
            <ListRow
              theme={theme}
              icon={<IconBell size={18} color={theme.ink2}/>}
              title={t.push}
              sub={
                pushPerm === 'granted' ? 'Aktive · Hastevarsler og regelendringer' :
                pushPerm === 'denied' ? 'Blokkert i nettleseren — endre i sideinnstillinger' :
                pushPerm === 'unsupported' ? 'Krever native bygg (iOS/Android)' :
                'Hastevarsler, regelendringer, nyheter'
              }
              right={<Switch theme={theme} value={pushOn} onChange={togglePush}/>}
            />
            {pushOn && pushPerm === 'granted' && (
              <ListRow
                theme={theme}
                icon={<IconAlert size={18} color={theme.ink2}/>}
                title="Send testvarsel"
                sub="Verifiser at varsler fungerer på enheten din"
                onPress={sendTestNotification}
              />
            )}
            <ListRow theme={theme} icon={<IconGlobe size={18} color={theme.ink2}/>} title={t.language} right={
              <View style={{ flexDirection: 'row', gap: 4 }}>
                {(['nb', 'en'] as const).map(l => (
                  <Pressable key={l} onPress={() => setLang(l)} style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, backgroundColor: lang === l ? theme.ink : 'transparent' }}>
                    <Text style={{ fontSize: 12, color: lang === l ? theme.onInk : theme.muted }}>{l.toUpperCase()}</Text>
                  </Pressable>
                ))}
              </View>
            }/>
            <ListRow theme={theme} icon={<IconSparkle size={18} color={theme.ink2}/>} title="Mørk modus" right={<Switch theme={theme} value={dark} onChange={setDark}/>} divider={false}/>
          </View>
        </Section>

        <Section theme={theme} label="Personvern og data">
          <View style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 16 }}>
            <ListRow
              theme={theme}
              icon={<IconLock size={18} color={theme.ink2}/>}
              title="Personvernerklæring"
              sub="WADA ISPPPI-kompatibel · antidoping.no"
              onPress={() => Linking.openURL('https://www.antidoping.no/personvern')}
            />
            <ListRow
              theme={theme}
              icon={<IconDownload size={18} color={theme.ink2}/>}
              title="Last ned mine data"
              sub="JSON-eksport av alt appen har lagret om deg"
              onPress={downloadMyData}
            />
            <ListRow
              theme={theme}
              icon={<IconInfo size={18} color={theme.ink2}/>}
              title={t.about}
              sub={t.version}
              onPress={() => Linking.openURL('https://www.antidoping.no/om-oss')}
              divider={false}
            />
          </View>
        </Section>

        <View style={{ paddingHorizontal: 4, paddingTop: 18 }}>
          <Button theme={theme} variant="secondary" onPress={signOut}>{t.signout}</Button>
        </View>
        <Text style={{ fontFamily: theme.monoFont, fontSize: 10, color: theme.muted, letterSpacing: 0.8, textAlign: 'center', marginTop: 16 }}>
          ANTIDOPING NORGE · {t.version.toUpperCase()}
        </Text>
      </ScrollView>
    </Screen>
  );
};

type Course = { ix: string; title: string; sub: string; url: string; done: boolean; progress?: number };

const COURSES: Course[] = [
  { ix: '01', title: 'Grunnkurs Ren Utøver', sub: '6 moduler · 45 min', url: 'https://www.renutover.no/grunnkurs', done: false },
  { ix: '02', title: 'Kosttilskudd og risiko', sub: '3 moduler · 20 min', url: 'https://www.renutover.no/kosttilskudd', done: false },
  { ix: '03', title: 'Whereabouts', sub: '4 moduler · 30 min', url: 'https://www.renutover.no/whereabouts', done: false },
  { ix: '04', title: 'Medisinsk fritak', sub: '2 moduler · 15 min', url: 'https://www.renutover.no/fritak', done: false },
];

export const Learn: React.FC<NavProps> = ({ theme, nav }) => {
  const [completed, setCompleted] = useState<Record<string, number>>(() => storage.get('completed-courses', {} as Record<string, number>));

  const openCourse = (c: Course) => {
    Linking.openURL(c.url);
    // Mark as visited (50% if not started, otherwise leave alone)
    setCompleted((prev) => {
      const next = { ...prev };
      if (next[c.ix] === undefined) next[c.ix] = 0.5;
      else if (next[c.ix] < 1) next[c.ix] = Math.min(1, (next[c.ix] || 0) + 0.25);
      storage.set('completed-courses', next);
      return next;
    });
  };

  return (
    <Screen theme={theme} scroll={false} header={<AppBar theme={theme} onBack={() => nav('home')} title="Ren Utøver"/>}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}>
        <LargeTitle theme={theme} sub="Offisiell e-læring fra Antidoping Norge. Ca. 110 minutter totalt.">Ren Utøver</LargeTitle>
        <View style={{ gap: 10 }}>
          {COURSES.map((c) => {
            const progress = completed[c.ix] ?? 0;
            const done = progress >= 1;
            return (
              <Pressable
                key={c.ix}
                onPress={() => openCourse(c)}
                style={({ hovered }: any) => [
                  { backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 16, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14 },
                  Platform.OS === 'web' && hovered && { borderColor: theme.ink2 },
                ]}
              >
                <Text style={{ fontFamily: theme.displayFont, fontSize: 28, color: theme.muted, minWidth: 40 }}>{c.ix}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, color: theme.ink, fontWeight: '500' }}>{c.title}</Text>
                  <Text style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>{c.sub} · renutover.no</Text>
                  {progress > 0 && progress < 1 && (
                    <View style={{ marginTop: 8, height: 3, backgroundColor: theme.line2, borderRadius: 2, overflow: 'hidden' }}>
                      <View style={{ height: '100%', width: `${progress * 100}%`, backgroundColor: theme.accent }}/>
                    </View>
                  )}
                </View>
                {done ? (
                  <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: theme.okBg, alignItems: 'center', justifyContent: 'center' }}>
                    <IconCheck size={15} stroke={2.4} color={theme.ok}/>
                  </View>
                ) : (
                  <IconExternal size={18} color={theme.accent}/>
                )}
              </Pressable>
            );
          })}
        </View>
        <Text style={{ fontFamily: theme.monoFont, fontSize: 10, color: theme.muted, letterSpacing: 0.8, textAlign: 'center', marginTop: 24 }}>
          KILDE · ANTIDOPING NORGE / RENUTOVER.NO
        </Text>
      </ScrollView>
    </Screen>
  );
};
