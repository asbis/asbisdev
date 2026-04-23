import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Theme } from '../theme';
import { AppBar, LargeTitle, Button, Screen } from '../ui';
import { IconArrowRight, IconCheck, IllustShield } from '../icons';
import { STRINGS, Lang } from '../strings';
import { NavProps } from './types';

export const OnbWelcome: React.FC<NavProps> = ({ theme, nav, lang }) => {
  const t = STRINGS[lang].onboard;
  const s = STRINGS[lang];
  return (
    <Screen theme={theme}>
      <View style={{ flex: 1, paddingHorizontal: 28, paddingTop: 40, paddingBottom: 28, justifyContent: 'space-between' }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <IllustShield color={theme.ink} accent={theme.accent}/>
        </View>
        <View>
          <Text style={{ fontFamily: theme.monoFont, fontSize: 10, color: theme.muted, letterSpacing: 1, marginBottom: 10 }}>ANTIDOPING NORGE</Text>
          <Text style={{ fontFamily: theme.displayFont, fontSize: 42, color: theme.ink, letterSpacing: -0.8, lineHeight: 44 }}>
            {s.appName} <Text style={{ color: theme.accent, fontStyle: 'italic' }}>{s.tagline}</Text>
          </Text>
          <Text style={{ fontSize: 15, color: theme.ink2, marginTop: 16, lineHeight: 22 }}>{t.welcome_sub}</Text>
        </View>
        <View style={{ marginTop: 22 }}>
          <Dots theme={theme} step={0}/>
          <View style={{ height: 14 }}/>
          <Button theme={theme} onPress={() => nav('onb-role')} icon={<IconArrowRight size={18}/>}>{t.continue}</Button>
        </View>
      </View>
    </Screen>
  );
};

export const OnbRole: React.FC<NavProps> = ({ theme, nav, lang, state, setState }) => {
  const t = STRINGS[lang].onboard;
  const [sel, setSel] = useState<string | null>(state.role || null);
  const roles = [
    { id: 'athlete', title: t.role_athlete, sub: t.role_athlete_sub },
    { id: 'coach', title: t.role_coach, sub: t.role_coach_sub },
    { id: 'parent', title: t.role_parent, sub: t.role_parent_sub },
  ];
  return (
    <Screen theme={theme}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 28 }}>
        <AppBar theme={theme} onBack={() => nav('onb-welcome')}/>
        <LargeTitle theme={theme} sub={t.role_sub}>{t.role_title}</LargeTitle>
        <View style={{ gap: 10, paddingHorizontal: 0 }}>
          {roles.map(r => {
            const active = sel === r.id;
            return (
              <Pressable key={r.id} onPress={() => setSel(r.id)} style={{
                backgroundColor: theme.surface, borderWidth: 1.5, borderColor: active ? theme.ink : theme.line,
                borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14,
              }}>
                <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, borderColor: active ? theme.ink : theme.line, backgroundColor: active ? theme.ink : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                  {active && <IconCheck size={12} stroke={3} color={theme.surface}/>}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: theme.ink }}>{r.title}</Text>
                  <Text style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>{r.sub}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
        <View style={{ flex: 1 }}/>
        <Dots theme={theme} step={1}/>
        <View style={{ height: 14 }}/>
        <Button theme={theme} disabled={!sel} onPress={() => { setState({ ...state, role: sel }); nav('onb-consent'); }} icon={<IconArrowRight size={18}/>}>{t.continue}</Button>
      </View>
    </Screen>
  );
};

export const OnbConsent: React.FC<NavProps> = ({ theme, nav, lang, state, setState }) => {
  const t = STRINGS[lang].onboard;
  const [push, setPush] = useState(true);
  const [privacy, setPrivacy] = useState(false);
  return (
    <Screen theme={theme}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 28 }}>
        <AppBar theme={theme} onBack={() => nav('onb-role')}/>
        <LargeTitle theme={theme} sub={t.consent_sub}>{t.consent_title}</LargeTitle>
        <View style={{ gap: 10 }}>
          <ToggleRow theme={theme} on={push} onChange={setPush} title={t.consent_push} sub={t.consent_push_sub}/>
          <ToggleRow theme={theme} on={privacy} onChange={setPrivacy} title={t.consent_privacy} sub={t.consent_privacy_sub}/>
        </View>
        <View style={{ flex: 1 }}/>
        <Dots theme={theme} step={2}/>
        <View style={{ height: 14 }}/>
        <Button theme={theme} disabled={!privacy} onPress={() => nav('home')}>{t.finish}</Button>
      </View>
    </Screen>
  );
};

const ToggleRow: React.FC<{ theme: Theme; on: boolean; onChange: (v: boolean) => void; title: string; sub: string }> = ({ theme, on, onChange, title, sub }) => (
  <View style={{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'flex-start', gap: 14 }}>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 15, fontWeight: '500', color: theme.ink }}>{title}</Text>
      <Text style={{ fontSize: 12, color: theme.muted, marginTop: 4, lineHeight: 17 }}>{sub}</Text>
    </View>
    <Pressable onPress={() => onChange(!on)} style={{ width: 44, height: 26, borderRadius: 13, backgroundColor: on ? theme.ink : theme.line, justifyContent: 'center' }}>
      <View style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 20, height: 20, borderRadius: 10, backgroundColor: theme.surface }}/>
    </Pressable>
  </View>
);

const Dots: React.FC<{ theme: Theme; step: number }> = ({ theme, step }) => (
  <View style={{ flexDirection: 'row', gap: 4 }}>
    {[0, 1, 2].map(i => (
      <View key={i} style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: i <= step ? theme.ink : theme.line }}/>
    ))}
  </View>
);
