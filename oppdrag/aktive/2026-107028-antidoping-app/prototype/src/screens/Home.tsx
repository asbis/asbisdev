import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Screen, MonoCaps } from '../ui';
import { Tap } from '../native';
import { IconBell, IconUser, IconFlask, IconPill, IconShield, IconBook, IconFileText, IconLungs, IconMegaphone, IconChat } from '../icons';
import { STRINGS } from '../strings';
import { NavProps } from './types';
import { Theme } from '../theme';

const Tile: React.FC<{ theme: Theme; label: string; icon: React.ReactNode; onPress: () => void }> = ({ theme, label, icon, onPress }) => (
  <Tap onPress={onPress} style={{ width: '31%' }} scale={0.92}>
    <View style={{
      aspectRatio: 0.92, backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line,
      borderRadius: 20, paddingHorizontal: 8, paddingVertical: 14, justifyContent: 'center', alignItems: 'center', gap: 10,
    }}>
      <View>{icon}</View>
      <Text
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
        style={{ fontSize: 12, color: theme.ink, fontWeight: '600', lineHeight: 15, textAlign: 'center', letterSpacing: -0.1 }}
      >
        {label}
      </Text>
    </View>
  </Tap>
);

export const Home: React.FC<NavProps> = ({ theme, nav, lang }) => {
  const t = STRINGS[lang];
  const iconProps = { size: 32, stroke: 1.8, color: theme.ink };
  const features: Array<{ key: keyof typeof t.home_features; route: string; icon: React.ReactNode }> = [
    { key: 'risk', route: 'risk-intro', icon: <IconFlask {...iconProps}/> },
    { key: 'medicine', route: 'meds-search', icon: <IconPill {...iconProps}/> },
    { key: 'wada', route: 'wada-search', icon: <IconShield {...iconProps}/> },
    { key: 'exemption', route: 'tue', icon: <IconFileText {...iconProps}/> },
    { key: 'asthma', route: 'asthma', icon: <IconLungs {...iconProps}/> },
    { key: 'learn', route: 'learn', icon: <IconBook {...iconProps}/> },
    { key: 'messages', route: 'messages', icon: <IconBell {...iconProps}/> },
    { key: 'report', route: 'report', icon: <IconMegaphone {...iconProps}/> },
    { key: 'contact', route: 'contact', icon: <IconChat {...iconProps}/> },
  ];

  return (
    <Screen theme={theme}>
      <View style={{ paddingTop: 20, paddingBottom: 24 }}>
        <View style={{ paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <MonoCaps theme={theme} style={{ fontSize: 9, marginBottom: 2 }}>Antidoping Norge</MonoCaps>
            <Text style={{ fontFamily: theme.displayFont, fontSize: 24, color: theme.ink, letterSpacing: -0.5 }}>
              {t.appName}<Text style={{ color: theme.accent, fontStyle: 'italic' }}>  {t.tagline}</Text>
            </Text>
          </View>
          <IconBtn theme={theme} onPress={() => nav('messages')} dot>
            <IconBell size={20} stroke={2} color={theme.ink}/>
          </IconBtn>
        </View>

        <View style={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 28 }}>
          <Text style={{ fontFamily: theme.displayFont, fontSize: 38, color: theme.ink, letterSpacing: -1, lineHeight: 40 }}>
            {t.home_hello}<Text style={{ color: theme.accent, fontStyle: 'italic' }}>.</Text>
          </Text>
          <Text style={{ fontSize: 16, color: theme.muted, marginTop: 10, lineHeight: 22 }}>{t.home_sub}</Text>
        </View>

        <View style={{ paddingHorizontal: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          {features.map(f => (
            <Tile key={String(f.key)} theme={theme} label={t.home_features[f.key]} icon={f.icon} onPress={() => nav(f.route)}/>
          ))}
        </View>

        <View style={{ paddingTop: 40, paddingBottom: 16, paddingHorizontal: 32, alignItems: 'center' }}>
          <Text style={{ fontFamily: theme.displayFont, fontSize: 16, fontStyle: 'italic', color: theme.muted, textAlign: 'center', lineHeight: 24, opacity: 0.8 }}>
            «Sjekk først. Konkurrer rent.»
          </Text>
        </View>
      </View>
    </Screen>
  );
};

const IconBtn: React.FC<{ theme: Theme; onPress: () => void; dot?: boolean; children: React.ReactNode }> = ({ theme, onPress, dot, children }) => (
  <Pressable onPress={onPress} style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line, alignItems: 'center', justifyContent: 'center' }}>
    {children}
    {dot && <View style={{ position: 'absolute', top: 10, right: 10, width: 10, height: 10, borderRadius: 5, backgroundColor: theme.bad, borderWidth: 2, borderColor: theme.surface }}/>}
  </Pressable>
);
