import React from 'react';
import { View, Text, Pressable, ScrollView, TextInput, StyleSheet, TextStyle, ViewStyle, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Line } from 'react-native-svg';
import { Theme } from './theme';
import { Status } from './data';
import { IconArrowLeft, IconSearch, IconX, IconChevronRight, IconCheck, IconAlert } from './icons';
import { Tap, haptic } from './native';

export const useT = (theme: Theme) => theme;

export const Screen: React.FC<{ 
  theme: Theme; 
  children: React.ReactNode; 
  scroll?: boolean;
  header?: React.ReactNode;
}> = ({ theme, children, scroll = true, header }) => {
  const insets = useSafeAreaInsets();
  const Inner = scroll ? ScrollView : View;
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      {header}
      <Inner 
        style={{ flex: 1 }} 
        contentContainerStyle={scroll ? { 
          paddingBottom: Math.max(insets.bottom, 24),
          paddingTop: header ? 0 : Math.max(insets.top, 20) 
        } : { flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </Inner>
    </View>
  );
};

export const AppBar: React.FC<{ theme: Theme; title?: string; subtitle?: string; onBack?: () => void; right?: React.ReactNode }> = ({ theme, title, subtitle, onBack, right }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ 
      flexDirection: 'row', 
      alignItems: 'center', 
      gap: 10, 
      paddingHorizontal: 16, 
      paddingTop: Math.max(insets.top, 12), 
      paddingBottom: 12, 
      backgroundColor: theme.bg,
      minHeight: 64, // Ensured minimum height for standard AppBar
    }}>
      <View style={{ width: 44, height: 44, marginLeft: -8, justifyContent: 'center' }}>
        {onBack && (
          <Pressable onPress={onBack} style={({ hovered }: any) => [
            { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
            Platform.OS === 'web' && hovered && { backgroundColor: theme.line2 }
          ]}>
            <IconArrowLeft size={24} stroke={2} color={theme.ink}/>
          </Pressable>
        )}
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {!!title && <Text style={{ fontFamily: theme.displayFont, fontSize: 18, fontWeight: '600', color: theme.ink }} numberOfLines={1}>{title}</Text>}
        {!!subtitle && <Text style={{ fontSize: 11, color: theme.muted, marginTop: 2, fontWeight: '600', letterSpacing: 0.5 }}>{subtitle.toUpperCase()}</Text>}
      </View>
      <View style={{ width: 44, marginRight: -8, alignItems: 'flex-end', justifyContent: 'center' }}>
        {right}
      </View>
    </View>
  );
};

export const LargeTitle: React.FC<{ theme: Theme; children: React.ReactNode; sub?: string }> = ({ theme, children, sub }) => (
  <View style={{ paddingHorizontal: 20, paddingTop: 4, paddingBottom: 16 }}>
    <Text style={{ fontFamily: theme.displayFont, fontSize: 34, lineHeight: 40, color: theme.ink, letterSpacing: -0.8 }}>{children}</Text>
    {!!sub && <Text style={{ fontSize: 15, color: theme.muted, marginTop: 10, lineHeight: 22 }}>{sub}</Text>}
  </View>
);

export const Card: React.FC<{ theme: Theme; onPress?: () => void; style?: ViewStyle; children: React.ReactNode }> = ({ theme, onPress, style, children }) => {
  const Inner = onPress ? Pressable : View;
  return (
    <Inner onPress={onPress} style={[{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 18, padding: 18 }, style]}>
      {children}
    </Inner>
  );
};

export type BtnVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'danger';
export const Button: React.FC<{ theme: Theme; onPress?: () => void; variant?: BtnVariant; disabled?: boolean; icon?: React.ReactNode; full?: boolean; children: React.ReactNode; style?: ViewStyle }> = ({ theme, onPress, variant = 'primary', disabled, icon, full = true, children, style }) => {
  const styles: Record<BtnVariant, { bg: string; fg: string; border: string }> = {
    primary:   { bg: theme.ink,     fg: theme.onInk,    border: theme.ink },
    secondary: { bg: 'transparent', fg: theme.ink,      border: theme.line },
    ghost:     { bg: 'transparent', fg: theme.ink,      border: 'transparent' },
    accent:    { bg: theme.accent,  fg: '#fff',         border: theme.accent },
    danger:    { bg: theme.bad,     fg: '#fff',         border: theme.bad },
  };
  const s = styles[variant];
  return (
    <Tap onPress={onPress} disabled={disabled} hapticKind={variant === 'primary' || variant === 'accent' ? 'medium' : 'light'} style={{ alignSelf: full ? 'stretch' : 'auto' }}>
      <View style={[{
        backgroundColor: s.bg, borderColor: s.border, borderWidth: 1.5,
        minHeight: 56, borderRadius: 16, paddingHorizontal: 24,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
        opacity: disabled ? 0.4 : 1,
      }, style]}>
        {icon && React.isValidElement(icon) ? React.cloneElement(icon as any, { color: s.fg, size: 20 }) : icon}
        <Text style={{ color: s.fg, fontSize: 16, fontWeight: '600' }}>{children}</Text>
      </View>
    </Tap>
  );
};

export const statusColors = (theme: Theme, s: Status) => ({
  allowed: { bg: theme.okBg,   fg: theme.ok   },
  incomp:  { bg: theme.warnBg, fg: theme.warn },
  tue:     { bg: theme.warnBg, fg: theme.warn },
  banned:  { bg: theme.badBg,  fg: theme.bad  },
}[s]);

export const statusLabel = (s: Status) => ({
  allowed: 'Tillatt', incomp: 'Forbudt i konkurranse', tue: 'Krever fritak', banned: 'Forbudt'
}[s]);

export const StatusBadge: React.FC<{ theme: Theme; status: Status; size?: 'sm' | 'md' }> = ({ theme, status, size = 'md' }) => {
  const c = statusColors(theme, status);
  const p = size === 'sm' ? { fontSize: 12, px: 10, py: 4 } : { fontSize: 13, px: 12, py: 6 };
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 6, backgroundColor: c.bg, borderRadius: 999, paddingHorizontal: p.px, paddingVertical: p.py }}>
      <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: c.fg }}/>
      <Text style={{ color: c.fg, fontSize: p.fontSize, fontWeight: '600' }}>{statusLabel(status)}</Text>
    </View>
  );
};

export const RiskBar: React.FC<{ theme: Theme; level: number }> = ({ theme, level }) => {
  const zone = level < 0.34 ? 'low' : level < 0.67 ? 'mid' : 'high';
  return (
    <View style={{ flexDirection: 'row', gap: 6 }}>
      {[0, 1, 2].map(i => {
        const filled = (zone === 'low' && i === 0) || (zone === 'mid' && i <= 1) || zone === 'high';
        const col = i === 0 ? theme.ok : i === 1 ? theme.warn : theme.bad;
        return <View key={i} style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: filled ? col : theme.line2 }}/>;
      })}
    </View>
  );
};

export const RiskDisplay: React.FC<{ theme: Theme; level: number; title: string; sub?: string }> = ({ theme, level, title, sub }) => {
  const zone = level < 0.34 ? 'low' : level < 0.67 ? 'mid' : 'high';
  const fg = zone === 'low' ? theme.ok : zone === 'mid' ? theme.warn : theme.bad;
  const R = 90;
  const circ = Math.PI * R;
  const [animLevel, setAnimLevel] = React.useState(0);
  React.useEffect(() => {
    let raf: any; const start = Date.now(); const dur = 900;
    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimLevel(eased * level);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [level]);
  const dash = circ * animLevel;

  return (
    <View style={{ alignItems: 'center', paddingVertical: 10 }}>
      <View style={{ width: 220, height: 110 }}>
        <Svg width={220} height={120} viewBox="0 0 220 120">
          <Path d="M20 110 A 90 90 0 0 1 200 110" stroke={theme.line} strokeWidth={12} fill="none" strokeLinecap="round"/>
          <Path d="M20 110 A 90 90 0 0 1 200 110" stroke={fg} strokeWidth={12} fill="none" strokeLinecap="round" strokeDasharray={`${dash} ${circ}`}/>
        </Svg>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center' }}>
          {zone === 'low' ? <IconCheck size={40} stroke={2.5} color={fg}/> : <IconAlert size={40} stroke={2.5} color={fg}/>}
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 28, marginTop: 8 }}>
        <MonoCaps theme={theme}>Lav</MonoCaps>
        <MonoCaps theme={theme}>Middels</MonoCaps>
        <MonoCaps theme={theme}>Høy</MonoCaps>
      </View>
      <Text style={{ fontFamily: theme.displayFont, fontSize: 32, color: fg, letterSpacing: -0.6, marginTop: 20 }}>{title}</Text>
      {!!sub && <Text style={{ fontSize: 15, color: theme.muted, marginTop: 10, paddingHorizontal: 24, textAlign: 'center', lineHeight: 22 }}>{sub}</Text>}
    </View>
  );
};

export const SearchField: React.FC<{ theme: Theme; value: string; onChange: (v: string) => void; placeholder?: string; autoFocus?: boolean; onSubmit?: () => void }> = ({ theme, value, onChange, placeholder, autoFocus, onSubmit }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14 }}>
    <IconSearch size={20} stroke={2} color={theme.muted}/>
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor={theme.muted}
      autoFocus={autoFocus}
      autoCorrect={false}
      autoCapitalize="none"
      onSubmitEditing={onSubmit}
      returnKeyType={onSubmit ? 'search' : 'default'}
      style={{ flex: 1, fontSize: 16, color: theme.ink, paddingVertical: 0 }}
    />
    {value.length > 0 && (
      <Pressable onPress={() => onChange('')} style={{ padding: 4 }}><IconX size={18} color={theme.muted}/></Pressable>
    )}
  </View>
);

export const Section: React.FC<{ theme: Theme; label?: string; children: React.ReactNode; style?: ViewStyle }> = ({ theme, label, children, style }) => (
  <View style={[{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }, style]}>
    {!!label && <MonoCaps theme={theme} style={{ marginBottom: 12 }}>{label}</MonoCaps>}
    {children}
  </View>
);

export const ListRow: React.FC<{ theme: Theme; icon?: React.ReactNode; title: string; sub?: string; right?: React.ReactNode; onPress?: () => void; divider?: boolean }> = ({ theme, icon, title, sub, right, onPress, divider = true }) => {
  const Inner: any = onPress ? Pressable : View;
  return (
    <Inner onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: divider ? 1 : 0, borderBottomColor: theme.line2 }}>
      {icon}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, color: theme.ink, fontWeight: '500' }}>{title}</Text>
        {!!sub && <Text style={{ fontSize: 13, color: theme.muted, marginTop: 4, lineHeight: 18 }}>{sub}</Text>}
      </View>
      {right}
      {onPress && !right && <IconChevronRight size={20} color={theme.muted}/>}
    </Inner>
  );
};

export const Switch: React.FC<{ theme: Theme; value: boolean; onChange: (v: boolean) => void }> = ({ theme, value, onChange }) => (
  <Pressable onPress={() => onChange(!value)} style={{ width: 52, height: 30, borderRadius: 15, backgroundColor: value ? theme.ink : theme.line, justifyContent: 'center', paddingHorizontal: 3 }}>
    <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: theme.surface, alignSelf: value ? 'flex-end' : 'flex-start' }}/>
  </Pressable>
);

export const MonoCaps: React.FC<{ theme: Theme; children: string; style?: TextStyle }> = ({ theme, children, style }) => (
  <Text style={[{ fontFamily: theme.monoFont, fontSize: 12, color: theme.muted, letterSpacing: 1, fontWeight: '600' }, style]}>{children.toUpperCase()}</Text>
);

export const TabBar: React.FC<{ theme: Theme; current: string; onNav: (route: string) => void; lang?: 'nb' | 'en' }> = ({ theme, current, onNav, lang = 'nb' }) => {
  const insets = useSafeAreaInsets();
  const { IconHome, IconBell, IconBook, IconUser, IconSearch: IconS } = require('./icons');

  const labels = lang === 'en'
    ? { home: 'Home', search: 'Search', messages: 'Alerts', learn: 'Courses', profile: 'Profile' }
    : { home: 'Hjem', search: 'Søk', messages: 'Varsler', learn: 'Kurs', profile: 'Profil' };

  const isSearch = current === 'meds-search' || current === 'wada-search' || current.includes('search');
  const items = [
    { id: 'home', label: labels.home, active: current === 'home', Icon: IconHome, target: 'home' },
    { id: 'search', label: labels.search, active: isSearch, Icon: IconS, target: 'meds-search' },
    { id: 'messages', label: labels.messages, active: current === 'messages', Icon: IconBell, target: 'messages' },
    { id: 'learn', label: labels.learn, active: current === 'learn', Icon: IconBook, target: 'learn' },
    { id: 'settings', label: labels.profile, active: current === 'settings', Icon: IconUser, target: 'settings' },
  ];

  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: theme.surface,
      borderTopWidth: 1,
      borderTopColor: theme.line,
      paddingBottom: Math.max(insets.bottom, 12),
      paddingTop: 10,
      paddingHorizontal: 6,
    }}>
      {items.map(it => (
        <Tab key={it.id} theme={theme} active={it.active} label={it.label} onPress={() => onNav(it.target)}
          icon={<it.Icon size={22} color={it.active ? theme.ink : theme.muted} stroke={it.active ? 2.4 : 2}/>}
        />
      ))}
    </View>
  );
};

const Tab: React.FC<{ theme: Theme; active: boolean; label: string; icon: React.ReactNode; onPress: () => void }> = ({ theme, active, label, icon, onPress }) => (
  <Pressable onPress={onPress} style={{ flex: 1, alignItems: 'center', gap: 4, paddingVertical: 4 }}>
    <View style={{
      paddingHorizontal: 14,
      paddingVertical: 4,
      borderRadius: 14,
      backgroundColor: active ? theme.line2 : 'transparent',
    }}>
      {icon}
    </View>
    <Text style={{ fontSize: 11, fontWeight: active ? '700' : '500', color: active ? theme.ink : theme.muted }}>{label}</Text>
  </Pressable>
);

