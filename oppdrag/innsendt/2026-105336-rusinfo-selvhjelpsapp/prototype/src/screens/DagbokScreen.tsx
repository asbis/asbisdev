import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../components/ThemeContext';
import { SectionTitle, Badge } from '../components/Primitives';
import { AppBar } from '../components/AppBar';
import { tokens } from '../theme/tokens';
import { StickyNote, Zap } from 'lucide-react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Storage } from '../lib/storage';
import * as Haptics from 'expo-haptics';

export const DagbokScreen: React.FC = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const [entries, setEntries] = useState<any[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFocused) { loadEntries(); }
  }, [isFocused]);

  const loadEntries = async () => {
    const data = await Storage.getEntries();
    setEntries(data);
  };

  const onAddEntry = (type: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('DiaryEntry', { type });
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIcon, { backgroundColor: theme.glow + '44' }]}><StickyNote color={theme.accent1} size={34} /></View>
      <SectionTitle size={26} style={styles.emptyTitle}>Hvert innlegg er bare ditt.</SectionTitle>
      <Text style={[styles.emptyText, { color: theme.textMuted }]}>Å logge ærlig er det første steget mot kontroll.</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.base }]}>
      <AppBar title="Dagbok" scrollY={scrollY} />

      <Animated.ScrollView 
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]} 
        showsVerticalScrollIndicator={false}
      >
        {entries.length === 0 ? renderEmpty() : entries.map((e, i) => (
          <View key={e.id || i} style={[styles.entry, { borderTopWidth: i === 0 ? 0 : 1, borderTopColor: theme.hairline }]}>
            <View style={styles.entryHeader}>
              <Text style={[styles.dateText, { color: theme.textFaint }]}>{e.date.toUpperCase()} · {e.type.toUpperCase()}</Text>
              {e.type === 'Bruk' && <Badge style={{ borderColor: theme.crisis }}><Text style={{ color: theme.crisis, fontSize: 10 }}>NULLSTILLER</Text></Badge>}
              <View style={{ flex: 1 }} />
              <Text style={styles.moodEmoji}>{e.outcome === 'managed' ? '💪' : e.mood}</Text>
            </View>
            <Text style={[styles.entryTitle, { color: e.type === 'Bruk' ? theme.crisis : theme.text }]}>{e.title}</Text>
            {e.body ? <Text style={[styles.entryBody, { color: theme.textMuted }]}>{e.body}</Text> : null}
            {e.tags && e.tags.length > 0 && (
              <View style={styles.tagRow}>{e.tags.map((t: string, j: number) => (<Badge key={j} style={styles.badge}>{t}</Badge>))}</View>
            )}
          </View>
        ))}
      </Animated.ScrollView>

      {/* Pinned Bottom Actions */}
      <View style={[styles.footer, { paddingBottom: 12, backgroundColor: theme.base }]}>
        <View style={[styles.hairline, { backgroundColor: theme.hairline }]} />
        <View style={styles.logButtonsRow}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onAddEntry('Notat')} style={[styles.logBtn, { backgroundColor: theme.surface }]}>
                <StickyNote size={20} color={theme.primary} />
                <Text style={[styles.logBtnText, { color: theme.text }]}>Notat</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onAddEntry('Hendelse')} style={[styles.logBtn, { backgroundColor: theme.surface }]}>
                <Zap size={20} color={theme.accent1} />
                <Text style={[styles.logBtnText, { color: theme.text }]}>Logg hendelse</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingTop: 10 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingTop: 16 },
  hairline: { position: 'absolute', top: 0, left: 0, right: 0, height: 1, opacity: 0.5 },
  logButtonsRow: { flexDirection: 'row', gap: 12 },
  logBtn: { flex: 1, flexDirection: 'row', paddingVertical: 16, borderRadius: 18, alignItems: 'center', justifyContent: 'center', gap: 8, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },
  logBtnText: { fontSize: 14, fontWeight: '600' },
  entry: { paddingVertical: 20, paddingHorizontal: 24 },
  entryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 8 },
  dateText: { fontSize: 10, letterSpacing: 0.6 },
  moodEmoji: { fontSize: 14 },
  entryTitle: { fontSize: 19, fontWeight: '600', letterSpacing: -0.3 },
  entryBody: { marginTop: 6, fontSize: 15, lineHeight: 22 },
  tagRow: { marginTop: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  badge: { paddingHorizontal: 8, paddingVertical: 2 },
  emptyContainer: { paddingHorizontal: 28, paddingTop: 80, alignItems: 'center' },
  emptyIcon: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  emptyTitle: { textAlign: 'center', fontSize: 24, lineHeight: 32 },
  emptyText: { textAlign: 'center', marginTop: 14, fontSize: 16, lineHeight: 24 },
});
