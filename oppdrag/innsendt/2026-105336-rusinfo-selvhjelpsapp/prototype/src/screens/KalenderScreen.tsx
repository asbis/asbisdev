import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { Card } from '../components/Primitives';
import { AppBar } from '../components/AppBar';
import { tokens } from '../theme/tokens';
import { ChevronLeft } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export const KalenderScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { theme } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  const days = Array.from({ length: 28 }).map((_, i) => {
    const planned = [2, 5, 9, 13, 17, 21].includes(i);
    const actual = [2, 5, 9, 17].includes(i);
    const extra = [12].includes(i);
    return { i, planned, actual, extra, date: i + 1 };
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.base }]}>
      <AppBar 
        title="Planlagt vs. faktisk." 
        label="KARTLEGGING"
        leftAction={{ icon: <ChevronLeft size={20} color={theme.text} />, onPress: onBack }}
        scrollY={scrollY}
      />

      <View style={styles.legend}>
        <View style={styles.legendItem}><View style={[styles.legendBoxPlanned, { backgroundColor: theme.accent2 + '40', borderColor: theme.accent2 }]} /><Text style={[styles.legendText, { color: theme.textMuted }]}>planlagt</Text></View>
        <View style={styles.legendItem}><View style={[styles.legendBoxActual, { backgroundColor: theme.accent1 }]} /><Text style={[styles.legendText, { color: theme.textMuted }]}>faktisk</Text></View>
        <View style={styles.legendItem}><View style={[styles.legendBoxExtra, { backgroundColor: theme.crisis }]} /><Text style={[styles.legendText, { color: theme.textMuted }]}>ekstra</Text></View>
      </View>

      <Animated.ScrollView 
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.calendarCard}>
          <Text style={[styles.calendarTitle, { color: theme.textFaint }]}>PERIODE · 4 UKER</Text>
          <View style={styles.grid}>
            {['M', 'T', 'O', 'T', 'F', 'L', 'S'].map((d, i) => (<View key={i} style={styles.gridHeaderCell}><Text style={[styles.gridHeaderText, { color: theme.textFaint }]}>{d}</Text></View>))}
            {days.map((d) => (
              <View key={d.i} style={[styles.gridCell, { backgroundColor: d.planned ? theme.accent2 + '30' : 'transparent', borderColor: d.planned ? theme.accent2 : theme.hairline, borderStyle: d.planned ? 'dashed' : 'solid' }]}>
                <Text style={[styles.dateText, { color: theme.textMuted }]}>{d.date}</Text>
                {(d.actual || d.extra) && <View style={[styles.statusDot, { backgroundColor: d.actual ? theme.accent1 : theme.crisis }]} />}
              </View>
            ))}
          </View>
        </Card>

        <View style={[styles.comparisonCard, { backgroundColor: theme.surfaceAlt, borderColor: theme.hairline }]}>
          <Text style={[styles.comparisonTitle, { color: theme.textFaint }]}>SAMMENLIGNING</Text>
          <Text style={[styles.comparisonSummary, { color: theme.text }]}>Du holdt planen på 4 av 6 dager. Én uplanlagt bruk, tirsdag den 13.</Text>
          <Text style={[styles.comparisonDetail, { color: theme.textMuted }]}>Tirsdag er tilbakevendende. Vil du legge inn en "varm tirsdag"-plan neste uke?</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  legend: { flexDirection: 'row', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 6, gap: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendBoxPlanned: { width: 12, height: 12, borderRadius: 4, borderWidth: 1, borderStyle: 'dashed' },
  legendBoxActual: { width: 12, height: 12, borderRadius: 4 },
  legendBoxExtra: { width: 12, height: 12, borderRadius: 4 },
  legendText: { fontSize: 11 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 40 },
  calendarCard: { padding: 16 },
  calendarTitle: { fontSize: 10, letterSpacing: 0.6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12 },
  gridHeaderCell: { width: (width - 72 - 36) / 7, alignItems: 'center' },
  gridHeaderText: { fontSize: 9 },
  gridCell: { width: (width - 72 - 36) / 7, aspectRatio: 1, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  dateText: { fontSize: 10 },
  statusDot: { position: 'absolute', right: 4, bottom: 4, width: 8, height: 8, borderRadius: 4 },
  comparisonCard: { marginTop: 16, padding: 16, borderRadius: 18, borderWidth: 1 },
  comparisonTitle: { fontSize: 10, letterSpacing: 0.6 },
  comparisonSummary: { marginTop: 8, fontSize: 20, fontWeight: '500', lineHeight: 26, letterSpacing: -0.3 },
  comparisonDetail: { marginTop: 10, fontSize: 13, lineHeight: 20 },
});
