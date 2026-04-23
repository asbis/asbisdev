import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { SectionTitle, Badge } from '../components/Primitives';
import { AppBar } from '../components/AppBar';
import { CrisisFab } from '../components/CrisisFab';
import { tokens } from '../theme/tokens';
import { StickyNote } from 'lucide-react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Storage } from '../lib/storage';
import * as Haptics from 'expo-haptics';

export const DagbokScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const [entries, setEntries] = useState<any[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const pills = ['Notat', 'Trigger', 'Plan'];

  useEffect(() => {
    if (isFocused) {
      loadEntries();
    }
  }, [isFocused]);

  const loadEntries = async () => {
    const data = await Storage.getEntries();
    setEntries(data);
  };

  const onAddEntry = (type: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (type === 'Plan') {
        navigation.navigate('Kriseplan');
    } else {
        navigation.navigate('DiaryEntry', { type });
    }
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIcon, { backgroundColor: theme.glow + '44' }]}>
        <StickyNote color={theme.accent1} size={34} />
      </View>
      <SectionTitle size={26} style={styles.emptyTitle}>Hvert innlegg er bare ditt.</SectionTitle>
      <Text style={[styles.emptyText, { color: theme.textMuted }]}>
        Vi anbefaler å skrive kort og ofte — lettere enn langt og sjeldent.
      </Text>
      
      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={() => onAddEntry('Notat')}
        style={[styles.emptyCard, { backgroundColor: theme.surface, borderColor: theme.hairline }]}
      >
        <Text style={[styles.emptyCardLabel, { color: theme.textFaint }]}>I DAG</Text>
        <Text style={[styles.emptyCardTitle, { color: theme.text }]}>Hva skjedde i dag?</Text>
        <View style={[styles.emptyCardDivider, { backgroundColor: theme.hairline }]} />
        <Text style={[styles.emptyCardPlaceholder, { color: theme.textFaint }]}>Skriv noen ord...</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.base }]}>
      <AppBar 
        title="Dagbok" 
        scrollY={scrollY}
      />

      <Animated.ScrollView 
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pillsContainer}>
            {pills.map(p => (
            <TouchableOpacity 
                key={p} 
                onPress={() => onAddEntry(p)}
                activeOpacity={0.7}
                style={[styles.pill, { 
                backgroundColor: theme.surfaceAlt,
                borderColor: theme.hairline
                }]}
            >
                <Text style={[styles.pillText, { 
                color: theme.textMuted,
                fontFamily: tokens.typography.body
                }]}>+ {p}</Text>
            </TouchableOpacity>
            ))}
        </View>

        {entries.length === 0 ? renderEmpty() : entries.map((e, i) => (
          <View key={e.id || i} style={[styles.entry, { borderTopWidth: i === 0 ? 0 : 1, borderTopColor: theme.hairline }]}>
            <View style={styles.entryHeader}>
              <Text style={[styles.dateText, { color: theme.textFaint }]}>{e.date.toUpperCase()} · {e.weekday.toUpperCase()}</Text>
              <View style={{ flex: 1 }} />
              <Text style={styles.moodEmoji}>{e.mood}</Text>
            </View>
            <Text style={[styles.entryTitle, { color: theme.text }]}>{e.title}</Text>
            {e.body ? (
              <Text style={[styles.entryBody, { color: theme.textMuted }]}>{e.body}</Text>
            ) : null}
            {e.tags && e.tags.length > 0 && (
              <View style={styles.tagRow}>
                {e.tags.map((t: string, j: number) => (
                  <Badge key={j} style={styles.badge}>{t}</Badge>
                ))}
              </View>
            )}
          </View>
        ))}
      </Animated.ScrollView>

      <CrisisFab onPress={() => navigation.navigate('Kriseplan')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 100, paddingTop: 10 },
  pillsContainer: { paddingHorizontal: 20, paddingVertical: 12, flexDirection: 'row', gap: 8 },
  pill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  pillText: { fontSize: 13 },
  entry: { paddingVertical: 18, paddingHorizontal: 24 },
  entryHeader: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 6 },
  dateText: { fontSize: 11, letterSpacing: 0.6 },
  moodEmoji: { fontSize: 14 },
  entryTitle: { fontSize: 20, lineHeight: 24, fontWeight: '500', letterSpacing: -0.3 },
  entryBody: { marginTop: 6, fontSize: 14, lineHeight: 22 },
  tagRow: { marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  badge: { paddingHorizontal: 8, paddingVertical: 2 },
  emptyContainer: { flex: 1, paddingHorizontal: 28, paddingTop: 40, alignItems: 'center' },
  emptyIcon: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  emptyTitle: { textAlign: 'center', lineHeight: 32 },
  emptyText: { textAlign: 'center', marginTop: 14, fontSize: 15, lineHeight: 22, maxWidth: 280 },
  emptyCard: { marginTop: 30, padding: 20, borderRadius: 20, borderWidth: 1, width: '100%' },
  emptyCardLabel: { fontSize: 10, letterSpacing: 0.8, marginBottom: 6 },
  emptyCardTitle: { fontSize: 20, fontWeight: '500' },
  emptyCardDivider: { height: 1, marginVertical: 12 },
  emptyCardPlaceholder: { fontSize: 14 },
});
