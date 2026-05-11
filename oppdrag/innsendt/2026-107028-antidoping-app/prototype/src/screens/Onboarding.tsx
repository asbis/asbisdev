import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Theme } from '../theme';
import { AppBar, LargeTitle, Button, Screen, Switch, MonoCaps } from '../ui';
import { IconArrowRight, IconCheck, IllustShield } from '../icons';
import { STRINGS, Lang } from '../strings';
import { NavProps } from './types';

export const OnbWelcome: React.FC<NavProps> = ({ theme, nav, lang }) => {
  const t = STRINGS[lang].onboard;
  const s = STRINGS[lang];
  return (
    <Screen theme={theme} scroll={false}>
      <View style={{ flex: 1, paddingHorizontal: 28, paddingTop: 60, paddingBottom: 20 }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
            <IllustShield color={theme.ink} accent={theme.accent}/>
          </View>
          <View style={{ marginBottom: 40 }}>
            <MonoCaps theme={theme} style={{ marginBottom: 12 }}>{s.home_org}</MonoCaps>
            <Text style={{ fontFamily: theme.displayFont, fontSize: 44, color: theme.ink, letterSpacing: -1, lineHeight: 46 }}>
              {s.appName} <Text style={{ color: theme.accent, fontStyle: 'italic' }}>{s.tagline}</Text>
            </Text>
            <Text style={{ fontSize: 17, color: theme.ink2, marginTop: 20, lineHeight: 24 }}>{t.welcome_sub}</Text>
          </View>
        </ScrollView>
        <View style={{ paddingTop: 12 }}>
          <Button theme={theme} onPress={() => nav('onb-role')} icon={<IconArrowRight size={20}/>}>{t.continue}</Button>
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
    <Screen theme={theme} scroll={false} header={<AppBar theme={theme} onBack={() => nav('onb-welcome')}/>}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 20 }}>
        <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
          <Dots theme={theme} step={1}/>
        </View>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
          <LargeTitle theme={theme} sub={t.role_sub}>{t.role_title}</LargeTitle>
          <View style={{ gap: 12 }}>
            {roles.map(r => {
              const active = sel === r.id;
              return (
                <Pressable key={r.id} onPress={() => setSel(r.id)} style={{
                  backgroundColor: theme.surface, borderWidth: 2, borderColor: active ? theme.ink : theme.line,
                  borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 16,
                }}>
                  <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: active ? theme.ink : theme.line, backgroundColor: active ? theme.ink : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                    {active && <IconCheck size={14} stroke={3} color={theme.surface}/>}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: theme.ink }}>{r.title}</Text>
                    <Text style={{ fontSize: 13, color: theme.muted, marginTop: 4 }}>{r.sub}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
        <View style={{ paddingTop: 12 }}>
          <Button theme={theme} disabled={!sel} onPress={() => { setState({ ...state, role: sel }); nav('onb-consent'); }} icon={<IconArrowRight size={20}/>}>{STRINGS[lang].common.next}</Button>
        </View>
      </View>
    </Screen>
  );
};

export const OnbConsent: React.FC<NavProps> = ({ theme, nav, lang, state, setState }) => {
  const t = STRINGS[lang].onboard;
  const [push, setPush] = useState(true);
  const [privacy, setPrivacy] = useState(false);
  return (
    <Screen theme={theme} scroll={false} header={<AppBar theme={theme} onBack={() => nav('onb-role')}/>}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 20 }}>
        <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
          <Dots theme={theme} step={2}/>
        </View>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
          <LargeTitle theme={theme} sub={t.consent_sub}>{t.consent_title}</LargeTitle>
          <View style={{ gap: 12 }}>
            <ToggleRow theme={theme} on={push} onChange={setPush} title={t.consent_push} sub={t.consent_push_sub}/>
            <ToggleRow theme={theme} on={privacy} onChange={setPrivacy} title={t.consent_privacy} sub={t.consent_privacy_sub}/>
          </View>
        </ScrollView>
        <View style={{ paddingTop: 12 }}>
          <Button theme={theme} disabled={!privacy} onPress={() => nav('home')}>{STRINGS[lang].common.finish}</Button>
        </View>
      </View>
    </Screen>
  );
};

const ToggleRow: React.FC<{ theme: Theme; on: boolean; onChange: (v: boolean) => void; title: string; sub: string }> = ({ theme, on, onChange, title, sub }) => (
  <View style={{ backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line, borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'flex-start', gap: 16 }}>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', color: theme.ink }}>{title}</Text>
      <Text style={{ fontSize: 13, color: theme.muted, marginTop: 6, lineHeight: 19 }}>{sub}</Text>
    </View>
    <Switch theme={theme} value={on} onChange={onChange}/>
  </View>
);

const Dots: React.FC<{ theme: Theme; step: number }> = ({ theme, step }) => (
  <View style={{ flexDirection: 'row', gap: 4 }}>
    {[0, 1, 2].map(i => (
      <View key={i} style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: i <= step ? theme.ink : theme.line }}/>
    ))}
  </View>
);
