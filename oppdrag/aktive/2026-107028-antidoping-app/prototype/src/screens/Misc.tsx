import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { Screen, AppBar, LargeTitle, Button, Section, ListRow, Switch } from '../ui';
import { IconLock, IconExternal, IconChat, IconCheck, IconAlert, IconBell, IconGlobe, IconSparkle, IconFileText, IconInfo, IconDownload, IconPlay, IconChevronDown } from '../icons';
import { STRINGS } from '../strings';
import { MESSAGES, ASTHMA_MEDS } from '../data';
import { NavProps } from './types';
import { Theme } from '../theme';

export const Messages: React.FC<NavProps> = ({ theme, nav, lang }) => {
  const t = STRINGS[lang].messages;
  return (
    <Screen theme={theme}>
      <AppBar theme={theme} onBack={() => nav('home')} title={t.title}/>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>
        <View style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 16, overflow: 'hidden' }}>
          {MESSAGES.map((m, i) => (
            <Pressable key={m.id} onPress={() => nav('message-detail', { msgId: m.id })} style={{ padding: 14, borderBottomWidth: i < MESSAGES.length - 1 ? 1 : 0, borderColor: theme.line2, flexDirection: 'row', gap: 12 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, marginTop: 8, backgroundColor: m.unread ? theme.bad : 'transparent' }}/>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontFamily: theme.monoFont, fontSize: 10, color: theme.muted, letterSpacing: 0.8 }}>{m.cat.toUpperCase()}</Text>
                  <Text style={{ fontSize: 11, color: theme.muted }}>{m.date}</Text>
                </View>
                <Text style={{ fontSize: 15, color: theme.ink, fontWeight: m.unread ? '600' : '500', marginTop: 4 }}>{m.title}</Text>
                <Text style={{ fontSize: 13, color: theme.muted, marginTop: 4, lineHeight: 18 }} numberOfLines={2}>{m.preview}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

export const MessageDetail: React.FC<NavProps> = ({ theme, nav, state }) => {
  const m = MESSAGES.find(x => x.id === state.msgId) || MESSAGES[0];
  return (
    <Screen theme={theme}>
      <AppBar theme={theme} onBack={() => nav('messages')}/>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 30 }}>
        <Text style={{ fontFamily: theme.monoFont, fontSize: 11, color: theme.muted, letterSpacing: 0.8 }}>{m.cat.toUpperCase()} · {m.date}</Text>
        <Text style={{ fontFamily: theme.displayFont, fontSize: 32, color: theme.ink, lineHeight: 36, letterSpacing: -0.5, marginTop: 8, marginBottom: 16 }}>{m.title}</Text>
        <Text style={{ fontSize: 15, color: theme.ink2, lineHeight: 24 }}>{m.body}</Text>
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
    <Screen theme={theme}>
      <AppBar theme={theme} onBack={() => nav('home')}/>
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

export const Tue: React.FC<NavProps> = ({ theme, nav, lang }) => {
  const t = STRINGS[lang].tue;
  const sections = [
    { title: 'Hvem trenger fritak?', body: 'Utøvere som må bruke en substans eller metode som står på dopinglisten av medisinske grunner.' },
    { title: 'Hvordan søker jeg?', body: 'Fyll ut søknadsskjema sammen med legen din. Send til ADNO senest 30 dager før konkurranse.' },
    { title: 'Skjemaer', body: 'Last ned søknadsskjema, legeerklæring og journalutdrag.', attach: true },
    { title: 'Frister', body: 'Nasjonalt nivå: 30 dager før. Internasjonalt: kontakt ditt særforbund.' },
  ];
  return (
    <Screen theme={theme}>
      <AppBar theme={theme} onBack={() => nav('home')}/>
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
                  {['TUE-søknadsskjema.pdf', 'Legeerklæring.pdf'].map(f => (
                    <View key={f} style={{ flexDirection: 'row', gap: 10, alignItems: 'center', padding: 10, borderWidth: 1, borderColor: theme.line, borderRadius: 10 }}>
                      <IconDownload size={16} stroke={1.6} color={theme.ink2}/>
                      <Text style={{ flex: 1, fontSize: 13, color: theme.ink2 }}>{f}</Text>
                      <Text style={{ fontSize: 11, fontFamily: theme.monoFont, color: theme.muted }}>PDF</Text>
                    </View>
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
    <Screen theme={theme}>
      <AppBar theme={theme} onBack={() => nav('home')}/>
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
          <Button theme={theme} icon={<IconExternal size={18}/>}>{t.cta}</Button>
        </View>
        <Text style={{ fontSize: 11, color: theme.muted, textAlign: 'center', marginTop: 20, fontFamily: theme.monoFont }}>
          dopingvarsel.whistleblowernetwork.net
        </Text>
      </ScrollView>
    </Screen>
  );
};

export const Contact: React.FC<NavProps> = ({ theme, nav, lang }) => {
  const t = STRINGS[lang].contact;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const field = (label: string, value: string, set: (v: string) => void, placeholder: string, multiline?: boolean) => (
    <View>
      <Text style={{ fontFamily: theme.monoFont, fontSize: 11, color: theme.muted, letterSpacing: 0.8, marginBottom: 8 }}>{label.toUpperCase()}</Text>
      <TextInput
        value={value} onChangeText={set} placeholder={placeholder} placeholderTextColor={theme.muted}
        multiline={multiline} numberOfLines={multiline ? 4 : 1}
        style={{
          backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line,
          borderRadius: 12, padding: 12, fontSize: 15, color: theme.ink,
          minHeight: multiline ? 96 : undefined, textAlignVertical: multiline ? 'top' : 'center',
        }}
      />
    </View>
  );

  return (
    <Screen theme={theme}>
      <AppBar theme={theme} onBack={() => nav('home')}/>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }} keyboardShouldPersistTaps="handled">
        <LargeTitle theme={theme}>{t.title}</LargeTitle>
        <View style={{ backgroundColor: theme.okBg, borderRadius: 16, padding: 16, flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: theme.ok }}/>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: theme.ok }}>{t.chat_open}</Text>
            <Text style={{ fontSize: 12, color: theme.ok, opacity: 0.85, marginTop: 2 }}>{t.hours}</Text>
          </View>
        </View>

        {sent ? (
          <View style={{ marginTop: 30, padding: 30, alignItems: 'center' }}>
            <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: theme.okBg, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <IconCheck size={26} stroke={2.4} color={theme.ok}/>
            </View>
            <Text style={{ fontFamily: theme.displayFont, fontSize: 26, color: theme.ink, letterSpacing: -0.3 }}>Takk!</Text>
            <Text style={{ fontSize: 14, color: theme.muted, marginTop: 8 }}>Vi svarer innen 24 timer.</Text>
          </View>
        ) : (
          <>
            <View style={{ marginTop: 22, gap: 14 }}>
              {field(t.form_name, name, setName, 'Emma Berg')}
              {field(t.form_email, email, setEmail, 'emma@idrett.no')}
              {field(t.form_message, msg, setMsg, 'Skriv meldingen din her…', true)}
            </View>
            <View style={{ marginTop: 18 }}>
              <Button theme={theme} onPress={() => setSent(true)} disabled={!name || !email || !msg}>{t.send}</Button>
            </View>
          </>
        )}
      </ScrollView>
    </Screen>
  );
};

export const Settings: React.FC<NavProps> = ({ theme, nav, lang, setLang, dark, setDark }) => {
  const t = STRINGS[lang].settings;
  return (
    <Screen theme={theme}>
      <AppBar theme={theme} onBack={() => nav('home')} title={t.title}/>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}>
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
            <ListRow theme={theme} icon={<IconBell size={18} color={theme.ink2}/>} title={t.push} sub="Hastevarsler, regelendringer, nyheter" onPress={() => {}}/>
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
            <ListRow theme={theme} icon={<IconLock size={18} color={theme.ink2}/>} title="Personvern" sub="WADA ISPPPI-kompatibel" onPress={() => {}}/>
            <ListRow theme={theme} icon={<IconFileText size={18} color={theme.ink2}/>} title="Last ned mine data" onPress={() => {}}/>
            <ListRow theme={theme} icon={<IconInfo size={18} color={theme.ink2}/>} title={t.about} sub={t.version} onPress={() => {}} divider={false}/>
          </View>
        </Section>

        <View style={{ paddingHorizontal: 4, paddingTop: 18 }}>
          <Button theme={theme} variant="secondary">{t.signout}</Button>
        </View>
        <Text style={{ fontFamily: theme.monoFont, fontSize: 10, color: theme.muted, letterSpacing: 0.8, textAlign: 'center', marginTop: 16 }}>
          ANTIDOPING NORGE · {t.version.toUpperCase()}
        </Text>
      </ScrollView>
    </Screen>
  );
};

export const Learn: React.FC<NavProps> = ({ theme, nav }) => {
  const courses = [
    { ix: '01', title: 'Grunnkurs Ren Utøver', sub: '6 moduler · 45 min', done: true },
    { ix: '02', title: 'Kosttilskudd og risiko', sub: '3 moduler · 20 min', done: true },
    { ix: '03', title: 'Whereabouts', sub: '4 moduler · 30 min', done: false, progress: 0.4 },
    { ix: '04', title: 'Medisinsk fritak', sub: '2 moduler · 15 min', done: false, progress: 0 },
  ];
  return (
    <Screen theme={theme}>
      <AppBar theme={theme} onBack={() => nav('home')}/>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}>
        <LargeTitle theme={theme} sub="Offisiell e-læring for norske utøvere. Ca. 90 minutter.">Ren Utøver</LargeTitle>
        <View style={{ gap: 10 }}>
          {courses.map((c, i) => (
            <View key={i} style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 16, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <Text style={{ fontFamily: theme.displayFont, fontSize: 28, color: theme.muted, minWidth: 40 }}>{c.ix}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, color: theme.ink, fontWeight: '500' }}>{c.title}</Text>
                <Text style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>{c.sub}</Text>
                {c.progress !== undefined && c.progress > 0 && c.progress < 1 && (
                  <View style={{ marginTop: 8, height: 3, backgroundColor: theme.line2, borderRadius: 2, overflow: 'hidden' }}>
                    <View style={{ height: '100%', width: `${c.progress * 100}%`, backgroundColor: theme.accent }}/>
                  </View>
                )}
              </View>
              {c.done ? (
                <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: theme.okBg, alignItems: 'center', justifyContent: 'center' }}>
                  <IconCheck size={15} stroke={2.4} color={theme.ok}/>
                </View>
              ) : (
                <IconPlay size={18} color={theme.accent}/>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};
