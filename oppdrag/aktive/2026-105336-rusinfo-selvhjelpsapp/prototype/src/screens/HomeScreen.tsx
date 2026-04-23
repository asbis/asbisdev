import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../components/ThemeContext';
import { SectionTitle, Card } from '../components/Primitives';
import { CrisisFab } from '../components/CrisisFab';
import { tokens } from '../theme/tokens';
import { CheckCircle2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Storage } from '../lib/storage';
import { differenceInDays, parseISO, format } from 'date-fns';
import { nb } from 'date-fns/locale';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  
  const [mood, setMood] = useState<string | null>(null);
  const [checkDone, setCheckDone] = useState(false);
  const [daysCount, setDaysCount] = useState(0);
  const [startDateFormatted, setStartDateFormatted] = useState('');
  const [savedAmount, setSavedAmount] = useState('0');

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  const loadData = async () => {
    const settings = await Storage.getSettings();
    const start = parseISO(settings.startDate);
    const now = new Date();
    const days = differenceInDays(now, start);
    
    setDaysCount(days);
    setStartDateFormatted(format(start, 'd. MMMM', { locale: nb }));
    setSavedAmount((days * 420).toLocaleString('nb-NO'));
  };

  const onMoodSelect = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setMood(id);
    setCheckDone(true);
    setTimeout(() => setCheckDone(false), 2000);
  };

  const onNavigateToResource = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    switch (id) {
      case 'info': navigation.navigate('Info'); break;
      case 'crisis': navigation.navigate('Kriseplan'); break;
      case 'overview': navigation.navigate('Oversikt'); break;
      case 'achievements': navigation.navigate('Prestasjon'); break;
      case 'vegg': navigation.navigate('Motivasjonsvegg'); break;
      case 'kalender': navigation.navigate('Kartlegging'); break;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.base }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarRow}>
            <TouchableOpacity 
              onPress={() => onNavigateToResource('vegg')}
              activeOpacity={0.8}
              style={[styles.avatar, { 
                backgroundColor: theme.accent1 + '33',
                borderColor: theme.hairline 
              }]}
            >
              <Text style={[styles.avatarText, { color: theme.text }]}>m</Text>
            </TouchableOpacity>
            <Text style={[styles.greeting, { color: theme.textMuted }]}>God dag.</Text>
          </View>

          <TouchableOpacity 
            onPress={() => onNavigateToResource('kalender')}
            activeOpacity={0.9}
            style={styles.daysContainer}
          >
            <View style={[styles.glow, { backgroundColor: theme.glow + '44' }]} />
            <Text style={[styles.daysCount, { color: theme.text }]}>{daysCount}</Text>
            <Text style={[styles.daysLabel, { color: theme.textMuted }]}>dager siden {startDateFormatted}</Text>
          </TouchableOpacity>
        </View>

        {/* Check-in Section */}
        <View style={styles.section}>
          <Card style={styles.checkInCard}>
            <SectionTitle size={22}>Hvordan har du det i dag?</SectionTitle>
            <Text style={[styles.checkInSub, { color: theme.textMuted }]}>
              Ett tap. Du kan endre senere.
            </Text>
            
            <View style={styles.moodRow}>
              {[
                { id: 'good', emoji: '🌱', label: 'Bra' },
                { id: 'grey', emoji: '🌫', label: 'Gråsone' },
                { id: 'heavy', emoji: '🌊', label: 'Tung' },
              ].map((m) => {
                const active = mood === m.id;
                return (
                  <TouchableOpacity
                    key={m.id}
                    onPress={() => onMoodSelect(m.id)}
                    activeOpacity={0.7}
                    style={[
                      styles.moodButton,
                      {
                        backgroundColor: active ? theme.surfaceAlt : 'transparent',
                        borderColor: active ? theme.accent2 : theme.hairline,
                      },
                    ]}
                  >
                    <Text style={styles.moodEmoji}>{m.emoji}</Text>
                    <Text style={[styles.moodLabel, { color: theme.textMuted }]}>{m.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {checkDone && (
              <View style={styles.savedNotice}>
                <CheckCircle2 color={theme.accent2} size={16} />
                <Text style={[styles.savedNoticeText, { color: theme.accent2 }]}>Lagret i dagboka.</Text>
              </View>
            )}
          </Card>
        </View>

        {/* Resources Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <SectionTitle size={18}>Nå for deg</SectionTitle>
            <Text style={[styles.sectionCount, { color: theme.textFaint }]}>6 kort</Text>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.resourceScroll}
            snapToInterval={182}
            decelerationRate="fast"
          >
            {[
              { id: 'info', h: 'Ukens tema', t: 'Når kroppen vil ha', sub: '4 min lesing', tone: 'accent1' as const },
              { id: 'crisis', h: 'Kriseplan', t: 'Tre linjer du har skrevet', sub: 'oppdatert nylig', tone: 'crisis' as const },
              { id: 'overview', h: 'Spart', t: `kr ${savedAmount}`, sub: `siste ${daysCount} dager`, tone: 'accent2' as const },
              { id: 'achievements', h: 'Prestasjon', t: 'Neste nivå', sub: 'om få dager', tone: 'primary' as const },
              { id: 'vegg', h: 'Vegg', t: 'Ditt galleri', sub: 'Inspirasjon', tone: 'accent1' as const },
              { id: 'kalender', h: 'Plan', t: 'Kartlegging', sub: 'Ukesoversikt', tone: 'accent2' as const },
            ].map((c, i) => (
              <TouchableOpacity 
                key={i} 
                activeOpacity={0.8}
                onPress={() => onNavigateToResource(c.id)}
                style={[styles.resourceCard, { backgroundColor: theme.surface, borderColor: theme.hairline }]}
              >
                <Text style={[styles.resourceLabel, { color: theme[c.tone] || theme.accent1 }]}>
                  {c.h.toUpperCase()}
                </Text>
                <Text style={[styles.resourceTitle, { color: theme.text }]}>{c.t}</Text>
                <Text style={[styles.resourceSub, { color: theme.textMuted }]}>{c.sub}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontStyle: 'italic',
  },
  greeting: {
    fontSize: 14,
  },
  daysContainer: {
    marginTop: 20,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  daysCount: {
    fontSize: 88,
    fontWeight: '300',
    letterSpacing: -2,
    lineHeight: 88,
  },
  daysLabel: {
    marginTop: 6,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  checkInCard: {
    padding: 22,
  },
  checkInSub: {
    marginTop: 6,
    fontSize: 13,
  },
  moodRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  moodButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
  },
  moodEmoji: {
    fontSize: 24,
  },
  moodLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  savedNotice: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  savedNoticeText: {
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 4,
    marginBottom: 10,
  },
  sectionCount: {
    fontSize: 12,
  },
  resourceScroll: {
    paddingHorizontal: 4,
    gap: 12,
  },
  resourceCard: {
    width: 170,
    padding: 16,
    paddingBottom: 18,
    borderRadius: 18,
    borderWidth: 1,
  },
  resourceLabel: {
    fontSize: 10,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  resourceTitle: {
    fontSize: 22,
    lineHeight: 24,
    fontWeight: '500',
  },
  resourceSub: {
    marginTop: 8,
    fontSize: 12,
  },
});
