import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { SectionTitle } from '../components/Primitives';
import { CrisisFab } from '../components/CrisisFab';
import { tokens } from '../theme/tokens';
import { Target, Navigation, Hand, Activity, Circle } from 'lucide-react-native';

export const PrestasjonScreen: React.FC = () => {
  const { theme } = useTheme();

  const items = [
    { id: 'next', kind: 'next',  title: 'Én måned ren', date: 'om 7 dager', desc: '30 dager siden startdato.' },
    { id: 0, date: '17. apr', title: '23 dager', desc: 'Du har passert første kritiske fase.', icon: 'disk' },
    { id: 1, date: '10. apr', title: 'Ti dager', desc: 'Søvn-mønsteret har begynt å normalisere seg.', icon: 'arc' },
    { id: 2, date: '07. apr', title: 'Første kriseplan brukt', desc: 'Du valgte planen fremfor bruk.', icon: 'hand' },
    { id: 3, date: '03. apr', title: 'Første uke', desc: 'Syv dager. Kroppens første rydding.', icon: 'line' },
    { id: 4, date: '30. mar', title: 'Startdato satt', desc: 'Du åpnet døra.', icon: 'dot' },
  ];

  const renderIcon = (kind: string, color: string) => {
    switch (kind) {
      case 'disk': return <Target color={color} size={14} />;
      case 'arc': return <Navigation color={color} size={14} />;
      case 'hand': return <Hand color={color} size={14} />;
      case 'line': return <Activity color={color} size={14} />;
      default: return <Circle color={color} size={14} />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.base }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <SectionTitle size={34}>Prestasjoner</SectionTitle>
        </View>

        <View style={styles.timelineContainer}>
          {/* Vertical line */}
          <View style={[styles.verticalLine, { backgroundColor: theme.hairline }]} />
          
          {items.map((it, i) => {
            const isNext = it.kind === 'next';
            return (
              <View key={it.id} style={styles.timelineItem}>
                <View style={[
                  styles.iconContainer, 
                  { 
                    backgroundColor: isNext ? 'transparent' : theme.surface,
                    borderColor: isNext ? theme.accent1 : theme.hairline,
                    borderStyle: isNext ? 'dashed' : 'solid',
                  }
                ]}>
                  {isNext ? (
                    <View style={[styles.nextDot, { backgroundColor: theme.accent1 }]} />
                  ) : (
                    renderIcon(it.icon || 'dot', theme.accent1)
                  )}
                </View>
                <View style={styles.content}>
                  <Text style={[
                    styles.dateLabel, 
                    { color: isNext ? theme.accent1 : theme.textFaint }
                  ]}>
                    {isNext ? `NESTE · ${it.date.toUpperCase()}` : it.date.toUpperCase()}
                  </Text>
                  <Text style={[styles.title, { color: theme.text }]}>{it.title}</Text>
                  <Text style={[styles.desc, { color: theme.textMuted }]}>{it.desc}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <CrisisFab onPress={() => {}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  timelineContainer: {
    paddingHorizontal: 24,
    paddingTop: 18,
    position: 'relative',
  },
  verticalLine: {
    position: 'absolute',
    left: 35,
    top: 30,
    bottom: 26,
    width: 1,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 26,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  nextDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  content: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 10,
    letterSpacing: 0.6,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    marginTop: 2,
    letterSpacing: -0.3,
  },
  desc: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 19,
  },
});
