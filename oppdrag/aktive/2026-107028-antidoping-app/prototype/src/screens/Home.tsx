import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Screen } from '../ui';
import { Tap } from '../native';
import { IconBell, IconUser, IconFlask, IconPill, IconShield, IconBook, IconFileText, IconLungs, IconMegaphone, IconChat } from '../icons';
import { STRINGS } from '../strings';
import { NavProps } from './types';
import { Theme } from '../theme';

const Tile: React.FC<{ theme: Theme; label: string; icon: React.ReactNode; onPress: () => void }> = ({ theme, label, icon, onPress }) => (
  <Tap onPress={onPress} style={{ width: '32%' }} scale={0.94}>
    <View style={{
      aspectRatio: 1, backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line,
      borderRadius: 18, padding: 14, paddingTop: 18, justifyContent: 'space-between',
    }}>
      <View>{icon}</View>
      <Text style={{ fontSize: 12, color: theme.ink, fontWeight: '500', lineHeight: 15 }}>{label}</Text>
    </View>
  </Tap>
);

export const Home: React.FC<NavProps> = ({ theme, nav, lang }) => {
  const t = STRINGS[lang];
  const iconProps = { size: 28, stroke: 1.6, color: theme.ink };
  const features: Array<{ key: keyof typeof t.home_features; route: string; icon: React.ReactNode }> = [
    { key: 'risk', route: 'risk-intro', icon: <IconFlask {...iconProps}/> },
    { key: 'medicine', route: 'meds-search', icon: <IconPill {...iconProps}/> },
    { key: 'wada', route: 'wada-search', icon: <IconShield {...iconProps}/> },
    { key: 'messages', route: 'messages', icon: <IconBell {...iconProps}/> },
    { key: 'learn', route: 'learn', icon: <IconBook {...iconProps}/> },
    { key: 'exemption', route: 'tue', icon: <IconFileText {...iconProps}/> },
    { key: 'asthma', route: 'asthma', icon: <IconLungs {...iconProps}/> },
    { key: 'report', route: 'report', icon: <IconMegaphone {...iconProps}/> },
    { key: 'contact', route: 'contact', icon: <IconChat {...iconProps}/> },
  ];

  return (
    <Screen theme={theme}>
      <View style={{ paddingTop: 12 }}>
        <View style={{ paddingHorizontal: 20, paddingTop: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily: theme.displayFont, fontSize: 20, color: theme.ink, letterSpacing: -0.3 }}>
            {t.appName}<Text style={{ color: theme.accent, fontStyle: 'italic' }}>  {t.tagline}</Text>
          </Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <IconBtn theme={theme} onPress={() => nav('messages')} dot>
              <IconBell size={18} stroke={1.8} color={theme.ink}/>
            </IconBtn>
            <IconBtn theme={theme} onPress={() => nav('settings')}>
              <IconUser size={18} stroke={1.8} color={theme.ink}/>
            </IconBtn>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 18 }}>
          <Text style={{ fontFamily: theme.displayFont, fontSize: 36, color: theme.ink, letterSpacing: -0.8, lineHeight: 38 }}>
            {t.home_hello}<Text style={{ color: theme.accent, fontStyle: 'italic' }}>.</Text>
          </Text>
          <Text style={{ fontSize: 15, color: theme.muted, marginTop: 8, lineHeight: 22 }}>{t.home_sub}</Text>
        </View>

        <View style={{ paddingHorizontal: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {features.map(f => (
            <Tile key={String(f.key)} theme={theme} label={t.home_features[f.key]} icon={f.icon} onPress={() => nav(f.route)}/>
          ))}
        </View>

        <View style={{ paddingTop: 32, paddingBottom: 8, paddingHorizontal: 28, alignItems: 'center' }}>
          <Text style={{ fontFamily: theme.displayFont, fontSize: 16, fontStyle: 'italic', color: theme.muted, textAlign: 'center', lineHeight: 22 }}>
            «Sjekk først. Konkurrer rent.»
          </Text>
        </View>
        <Text style={{ fontFamily: theme.monoFont, fontSize: 10, color: theme.muted, letterSpacing: 0.8, textAlign: 'center', paddingBottom: 24 }}>
          V 1.0 · ANTIDOPING.NO
        </Text>
      </View>
    </Screen>
  );
};

const IconBtn: React.FC<{ theme: Theme; onPress: () => void; dot?: boolean; children: React.ReactNode }> = ({ theme, onPress, dot, children }) => (
  <Pressable onPress={onPress} style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, alignItems: 'center', justifyContent: 'center' }}>
    {children}
    {dot && <View style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: theme.bad, borderWidth: 2, borderColor: theme.surface }}/>}
  </Pressable>
);
