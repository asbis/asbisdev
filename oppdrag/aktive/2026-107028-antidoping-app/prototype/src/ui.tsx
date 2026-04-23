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
      borderBottomWidth: 0, // Keep it clean, or use theme.line2 for a divider
    }}>
      <View style={{ width: 36, height: 36, marginLeft: -4, justifyContent: 'center' }}>
        {onBack && (
          <Pressable onPress={onBack} style={({ hovered }) => [
            { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
            Platform.OS === 'web' && hovered && { backgroundColor: theme.line2 }
          ]}>
            <IconArrowLeft size={22} stroke={1.8} color={theme.ink}/>
          </Pressable>
        )}
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {!!title && <Text style={{ fontFamily: theme.displayFont, fontSize: 17, fontWeight: '600', color: theme.ink }} numberOfLines={1}>{title}</Text>}
        {!!subtitle && <Text style={{ fontSize: 10, color: theme.muted, marginTop: 1, fontWeight: '500' }}>{subtitle.toUpperCase()}</Text>}
      </View>
      <View style={{ width: 36, marginRight: -4, alignItems: 'flex-end', justifyContent: 'center' }}>
        {right}
      </View>
    </View>
  );
};

export const LargeTitle: React.FC<{ theme: Theme; children: React.ReactNode; sub?: string }> = ({ theme, children, sub }) => (
  <View style={{ paddingHorizontal: 20, paddingTop: 4, paddingBottom: 16 }}>
    <Text style={{ fontFamily: theme.displayFont, fontSize: 36, lineHeight: 38, color: theme.ink, letterSpacing: -0.8 }}>{children}</Text>
    {!!sub && <Text style={{ fontSize: 14, color: theme.muted, marginTop: 8, lineHeight: 20 }}>{sub}</Text>}
  </View>
);

export const Card: React.FC<{ theme: Theme; onPress?: () => void; style?: ViewStyle; children: React.ReactNode }> = ({ theme, onPress, style, children }) => {
  const Inner = onPress ? Pressable : View;
  return (
    <Inner onPress={onPress} style={[{ backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 16, padding: 16 }, style]}>
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
        backgroundColor: s.bg, borderColor: s.border, borderWidth: 1,
        minHeight: 52, borderRadius: 14, paddingHorizontal: 20,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
        opacity: disabled ? 0.4 : 1,
      }, style]}>
        {icon && React.isValidElement(icon) ? React.cloneElement(icon as any, { color: s.fg }) : icon}
        <Text style={{ color: s.fg, fontSize: 15, fontWeight: '500' }}>{children}</Text>
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
  const p = size === 'sm' ? { fontSize: 11, px: 8, py: 3 } : { fontSize: 12, px: 10, py: 5 };
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 6, backgroundColor: c.bg, borderRadius: 999, paddingHorizontal: p.px, paddingVertical: p.py }}>
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: c.fg }}/>
      <Text style={{ color: c.fg, fontSize: p.fontSize, fontWeight: '500' }}>{statusLabel(status)}</Text>
    </View>
  );
};

export const RiskBar: React.FC<{ theme: Theme; level: number }> = ({ theme, level }) => {
  const zone = level < 0.34 ? 'low' : level < 0.67 ? 'mid' : 'high';
  return (
    <View style={{ flexDirection: 'row', gap: 4 }}>
      {[0, 1, 2].map(i => {
        const filled = (zone === 'low' && i === 0) || (zone === 'mid' && i <= 1) || zone === 'high';
        const col = i === 0 ? theme.ok : i === 1 ? theme.warn : theme.bad;
        return <View key={i} style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: filled ? col : theme.line2 }}/>;
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
      <View style={{ width: 220, height: 130 }}>
        <Svg width={220} height={130} viewBox="0 0 220 130">
          <Path d="M20 110 A 90 90 0 0 1 200 110" stroke={theme.line} strokeWidth={10} fill="none" strokeLinecap="round"/>
          <Path d="M20 110 A 90 90 0 0 1 200 110" stroke={fg} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray={`${dash} ${circ}`}/>
          {[0, 0.33, 0.67, 1].map((tt, i) => {
            const a = Math.PI * (1 - tt);
            const x1 = 110 + Math.cos(a) * 78;
            const y1 = 110 - Math.sin(a) * 78;
            const x2 = 110 + Math.cos(a) * 68;
            const y2 = 110 - Math.sin(a) * 68;
            return <Line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={theme.muted} strokeWidth={1}/>;
          })}
        </Svg>
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 8, alignItems: 'center' }}>
          {zone === 'low' ? <IconCheck size={36} stroke={2.2} color={fg}/> : <IconAlert size={36} stroke={2} color={fg}/>}
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 28, marginTop: -4 }}>
        <Text style={{ fontFamily: theme.monoFont, fontSize: 10, color: theme.muted, letterSpacing: 0.8 }}>LAV</Text>
        <Text style={{ fontFamily: theme.monoFont, fontSize: 10, color: theme.muted, letterSpacing: 0.8 }}>MIDDELS</Text>
        <Text style={{ fontFamily: theme.monoFont, fontSize: 10, color: theme.muted, letterSpacing: 0.8 }}>HØY</Text>
      </View>
      <Text style={{ fontFamily: theme.displayFont, fontSize: 32, color: fg, letterSpacing: -0.6, marginTop: 20 }}>{title}</Text>
      {!!sub && <Text style={{ fontSize: 14, color: theme.muted, marginTop: 8, paddingHorizontal: 24, textAlign: 'center', lineHeight: 20 }}>{sub}</Text>}
    </View>
  );
};

export const SearchField: React.FC<{ theme: Theme; value: string; onChange: (v: string) => void; placeholder?: string; autoFocus?: boolean }> = ({ theme, value, onChange, placeholder, autoFocus }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.line, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12 }}>
    <IconSearch size={18} stroke={1.8} color={theme.muted}/>
    <TextInput value={value} onChangeText={onChange} placeholder={placeholder} placeholderTextColor={theme.muted} autoFocus={autoFocus}
      style={{ flex: 1, fontSize: 15, color: theme.ink, paddingVertical: 0 }}/>
    {value.length > 0 && (
      <Pressable onPress={() => onChange('')}><IconX size={16} color={theme.muted}/></Pressable>
    )}
  </View>
);

export const Section: React.FC<{ theme: Theme; label?: string; children: React.ReactNode; style?: ViewStyle }> = ({ theme, label, children, style }) => (
  <View style={[{ paddingHorizontal: 20, paddingTop: 18, paddingBottom: 8 }, style]}>
    {!!label && <Text style={{ fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 0.8, color: theme.muted, marginBottom: 10 }}>{label.toUpperCase()}</Text>}
    {children}
  </View>
);

export const ListRow: React.FC<{ theme: Theme; icon?: React.ReactNode; title: string; sub?: string; right?: React.ReactNode; onPress?: () => void; divider?: boolean }> = ({ theme, icon, title, sub, right, onPress, divider = true }) => {
  const Inner: any = onPress ? Pressable : View;
  return (
    <Inner onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: divider ? 1 : 0, borderBottomColor: theme.line2 }}>
      {icon}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, color: theme.ink }}>{title}</Text>
        {!!sub && <Text style={{ fontSize: 12, color: theme.muted, marginTop: 2 }}>{sub}</Text>}
      </View>
      {right}
      {onPress && !right && <IconChevronRight size={18} color={theme.muted}/>}
    </Inner>
  );
};

export const Switch: React.FC<{ theme: Theme; value: boolean; onChange: (v: boolean) => void }> = ({ theme, value, onChange }) => (
  <Pressable onPress={() => onChange(!value)} style={{ width: 44, height: 26, borderRadius: 13, backgroundColor: value ? theme.ink : theme.line, justifyContent: 'center' }}>
    <View style={{ position: 'absolute', top: 3, left: value ? 21 : 3, width: 20, height: 20, borderRadius: 10, backgroundColor: theme.surface }}/>
  </Pressable>
);

export const MonoCaps: React.FC<{ theme: Theme; children: string; style?: TextStyle }> = ({ theme, children, style }) => (
  <Text style={[{ fontFamily: theme.monoFont, fontSize: 11, color: theme.muted, letterSpacing: 0.8 }, style]}>{children.toUpperCase()}</Text>
);
