import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { SectionTitle, Card } from '../components/Primitives';
import { CrisisFab } from '../components/CrisisFab';
import { tokens } from '../theme/tokens';
import Svg, { Path, Circle } from 'react-native-svg';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Storage } from '../lib/storage';
import { differenceInDays, parseISO } from 'date-fns';

const { width } = Dimensions.get('window');

const PieChart = ({ segments, size = 110 }: { segments: any[], size?: number }) => {
  const { theme } = useTheme();
  const radius = size / 2 - 6;
  const cx = size / 2;
  const cy = size / 2;
  let acc = 0;
  const total = segments.reduce((s, x) => s + x.v, 0);

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segments.map((s, i) => {
        const startAngle = (acc / total) * 2 * Math.PI - Math.PI / 2;
        acc += s.v;
        const endAngle = (acc / total) * 2 * Math.PI - Math.PI / 2;
        
        const x1 = cx + radius * Math.cos(startAngle);
        const y1 = cy + radius * Math.sin(startAngle);
        const x2 = cx + radius * Math.cos(endAngle);
        const y2 = cy + radius * Math.sin(endAngle);
        
        const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
        
        const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
        
        return <Path key={i} d={d} fill={s.c} />;
      })}
      <Circle cx={cx} cy={cy} r={radius * 0.5} fill={theme.surface} />
    </Svg>
  );
};

export const OversiktScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  
  const [stats, setStats] = useState({
    days: 0,
    saved: '0',
    entries: 0,
    crisisUsed: 0,
  });

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  const loadData = async () => {
    const settings = await Storage.getSettings();
    const entries = await Storage.getEntries();
    const start = parseISO(settings.startDate);
    const now = new Date();
    const days = differenceInDays(now, start);
    
    setStats({
      days,
      saved: (days * 420).toLocaleString('nb-NO'),
      entries: entries.length,
      crisisUsed: entries.filter((e: any) => e.tags && e.tags.includes('krise')).length,
    });
  };

  const phases = [
    { id: 'Uke 0–1', label: 'Akutt', done: stats.days > 7 },
    { id: 'Uke 1–2', label: 'Tidlig', done: stats.days > 14 },
    { id: 'Uke 2–6', label: 'Oppbygging', active: stats.days <= 42 && stats.days > 14 },
    { id: 'Uke 6–12', label: 'Konsol.', done: false },
    { id: '12+ uker', label: 'Vedvar.', done: false },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.base }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <SectionTitle size={34}>Oversikt</SectionTitle>
        </View>

        {/* Phase Indicator */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: theme.textFaint }]}>DIN STATUS</Text>
          <Card style={styles.phaseCard}>
            <View style={styles.phaseTimeline}>
              <View style={[styles.timelineBase, { backgroundColor: theme.hairline }]} />
              <View style={[styles.timelineProgress, { backgroundColor: theme.accent1, width: `${Math.min(100, (stats.days / 84) * 100)}%` }]} />
              <View style={styles.phaseDotsRow}>
                {phases.map((p, i) => (
                  <View key={i} style={styles.phaseDotContainer}>
                    <View style={[
                      styles.phaseDot,
                      { 
                        backgroundColor: p.done || p.active ? theme.accent1 : theme.surface,
                        borderColor: p.done || p.active ? theme.accent1 : theme.hairline,
                        width: p.active ? 18 : 11,
                        height: p.active ? 18 : 11,
                        borderRadius: 9,
                      },
                    ]} />
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.phaseLabelsRow}>
              {phases.map((p, i) => (
                <View key={i} style={styles.phaseLabelContainer}>
                  <Text style={[
                    styles.phaseLabelText, 
                    { color: p.active ? theme.text : theme.textFaint, fontWeight: p.active ? '600' : '400' }
                  ]}>{p.label}</Text>
                  <Text style={[styles.phaseIdText, { color: theme.textFaint }]}>{p.id}</Text>
                </View>
              ))}
            </View>
            <View style={[styles.phaseInfo, { borderTopColor: theme.hairline }]}>
              <Text style={[styles.phaseInfoText, { color: theme.textMuted }]}>
                <Text style={[styles.phaseInfoHighlight, { color: theme.text }]}>
                  {stats.days < 7 ? 'Akutt fase. ' : stats.days < 14 ? 'Tidlig fase. ' : 'Oppbygging. '}
                </Text>
                {stats.days < 7 ? 'Kroppen kjemper hardt nå. Hold ut.' : 'Søvnen kommer sakte tilbake.'}
              </Text>
            </View>
          </Card>
        </View>

        {/* Patterns */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: theme.textFaint }]}>DINE MØNSTRE</Text>
          <View style={styles.patternsGrid}>
            {[
              { title: 'Triggere som drar', segs: [
                { v: 40, c: theme.crisis, l: 'Kveld alene' },
                { v: 28, c: theme.accent1, l: 'Fest' },
                { v: 18, c: theme.textMuted, l: 'Stress' },
                { v: 14, c: theme.hairline, l: 'Annet' },
              ]},
              { title: 'Som hjelper', segs: [
                { v: 34, c: theme.accent2, l: 'Tur' },
                { v: 30, c: theme.primary, l: 'Ring Siri' },
                { v: 22, c: theme.accent1, l: 'Dusj + søvn' },
                { v: 14, c: theme.hairline, l: 'Annet' },
              ]},
            ].map((g, i) => (
              <Card key={i} style={styles.patternCard}>
                <Text style={[styles.patternTitle, { color: theme.textMuted }]}>{g.title}</Text>
                <View style={styles.pieContainer}>
                  <PieChart segments={g.segs} size={100} />
                </View>
                <View style={styles.legend}>
                  {g.segs.slice(0, 3).map((s, j) => (
                    <View key={j} style={styles.legendItem}>
                      <View style={[styles.legendDot, { backgroundColor: s.c }]} />
                      <Text style={[styles.legendText, { color: theme.textMuted }]} numberOfLines={1}>{s.l}</Text>
                    </View>
                  ))}
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Numbers */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: theme.textFaint }]}>DINE TALL</Text>
          <Card style={styles.numbersCard}>
            {[
              { k: 'Dager uten bruk', v: stats.days.toString(), sub: 'siden start' },
              { k: 'Spart', v: `kr ${stats.saved}`, sub: '420 kr/dag' },
              { k: 'Dagbok-innlegg', v: stats.entries.toString(), sub: 'total loggføring' },
              { k: 'Kriseplan brukt', v: stats.crisisUsed.toString(), sub: 'aktiverte planer' },
            ].map((r, i, arr) => (
              <View key={i} style={[
                styles.numberRow, 
                { borderBottomWidth: i < arr.length - 1 ? 1 : 0, borderBottomColor: theme.hairline }
              ]}>
                <Text style={[styles.numberKey, { color: theme.text }]}>{r.k}</Text>
                <Text style={[styles.numberValue, { color: theme.text }]}>{r.v}</Text>
                <Text style={[styles.numberSub, { color: theme.textFaint }]}>{r.sub}</Text>
              </View>
            ))}
          </Card>
        </View>
      </ScrollView>
      <CrisisFab onPress={() => navigation.navigate('Kriseplan')} />
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
  section: {
    marginTop: 28,
    paddingHorizontal: 20,
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  phaseCard: {
    padding: 22,
    paddingHorizontal: 18,
  },
  phaseTimeline: {
    height: 40,
    justifyContent: 'center',
    position: 'relative',
  },
  timelineBase: {
    height: 3,
    borderRadius: 2,
    marginHorizontal: 8,
  },
  timelineProgress: {
    position: 'absolute',
    height: 3,
    borderRadius: 2,
    left: 8,
  },
  phaseDotsRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phaseDotContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phaseDot: {
    borderWidth: 1.5,
  },
  phaseLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  phaseLabelContainer: {
    width: 60,
    alignItems: 'center',
  },
  phaseLabelText: {
    fontSize: 10,
  },
  phaseIdText: {
    fontSize: 9,
    marginTop: 2,
  },
  phaseInfo: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  phaseInfoText: {
    fontSize: 13,
    lineHeight: 20,
  },
  phaseInfoHighlight: {
    fontWeight: '600',
  },
  patternsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  patternCard: {
    flex: 1,
    padding: 14,
  },
  patternTitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  pieContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  legend: {
    marginTop: 10,
    gap: 3,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 11,
    flex: 1,
  },
  numbersCard: {
    padding: 0,
  },
  numberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingVertical: 18,
    paddingHorizontal: 20,
    gap: 14,
  },
  numberKey: {
    flex: 1,
    fontSize: 14,
  },
  numberValue: {
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: -0.3,
  },
  numberSub: {
    width: 80,
    textAlign: 'right',
    fontSize: 10,
  },
});
