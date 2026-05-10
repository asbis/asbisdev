import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { Card } from '../components/Primitives';
import { AppBar } from '../components/AppBar';
import { Search, ChevronRight, Settings } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

export const InfoScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const scrollY = useRef(new Animated.Value(0)).current;

  const hubs = [
    { k: 'Kropp & hjerne', n: 12, tone: 'accent1' as const },
    { k: 'Når trangen kommer', n: 8, tone: 'crisis' as const },
    { k: 'Søvn & energi', n: 6, tone: 'accent2' as const },
    { k: 'Relasjoner', n: 5, tone: 'primary' as const },
    { k: 'Hjelp i Norge', n: 9, tone: 'accent1' as const },
  ];
  const articles = [
    { title: 'Hvorfor kroppen lurer deg etter tre uker.', time: '6 min', tag: 'kropp' },
    { title: 'Trygge samtaler med nære uten å skamme.', time: '4 min', tag: 'relasjoner' },
    { title: 'Hva søvnapneadetektor faktisk måler.', time: '3 min', tag: 'søvn' },
  ];

  const onArticlePress = (article: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('Article', { article });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.base }]}>
      <AppBar 
        title="Info" 
        rightAction={{ icon: <Settings size={20} color={theme.text} />, onPress: () => navigation.navigate('Settings') }}
        scrollY={scrollY}
      />

      <Animated.ScrollView 
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchSection}>
          <View style={[styles.searchBar, { backgroundColor: theme.surface, borderColor: theme.hairline }]}>
            <Search size={16} color={theme.textMuted} />
            <Text style={[styles.searchText, { color: theme.textFaint }]}>Søk i artikler, temaer, hjelp…</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: theme.textFaint }]}>TEMAER</Text>
          <View style={styles.hubList}>
            {hubs.map((h, i) => (
              <TouchableOpacity key={i} activeOpacity={0.7} onPress={() => {}}>
                <Card style={styles.hubCard}>
                  <View style={[styles.hubIcon, { backgroundColor: theme[h.tone] + '22' }]}>
                    <View style={[styles.hubDot, { backgroundColor: theme[h.tone] }]} />
                  </View>
                  <Text style={[styles.hubTitle, { color: theme.text }]}>{h.k}</Text>
                  <Text style={[styles.hubCount, { color: theme.textFaint }]}>{h.n}</Text>
                  <ChevronRight size={16} color={theme.textFaint} />
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: theme.textFaint }]}>NYE ARTIKLER</Text>
          <View style={styles.articleList}>
            {articles.map((a, i) => (
              <TouchableOpacity 
                key={i} 
                activeOpacity={0.6} 
                onPress={() => onArticlePress(a)}
                style={[
                  styles.articleItem, 
                  { borderBottomWidth: i < articles.length - 1 ? 1 : 0, borderBottomColor: theme.hairline }
                ]}
              >
                <Text style={[styles.articleTitle, { color: theme.text }]}>{a.title}</Text>
                <View style={styles.articleMeta}>
                  <Text style={[styles.metaText, { color: theme.textFaint }]}>{a.time}</Text>
                  <Text style={[styles.metaDivider, { color: theme.textFaint }]}>·</Text>
                  <Text style={[styles.metaText, { color: theme.textFaint }]}>#{a.tag}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 100, paddingTop: 10 },
  searchSection: { paddingHorizontal: 20, paddingVertical: 14 },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, paddingHorizontal: 16, borderRadius: 14, borderWidth: 1 },
  searchText: { fontSize: 14 },
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionLabel: { fontSize: 10, letterSpacing: 0.8, marginBottom: 10 },
  hubList: { gap: 8 },
  hubCard: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  hubIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  hubDot: { width: 10, height: 10, borderRadius: 3 },
  hubTitle: { flex: 1, fontSize: 15, fontWeight: '500' },
  hubCount: { fontSize: 11 },
  articleList: { gap: 0 },
  articleItem: { paddingBottom: 14, marginTop: 14 },
  articleTitle: { fontSize: 19, lineHeight: 24, fontWeight: '500', letterSpacing: -0.3 },
  articleMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  metaText: { fontSize: 11 },
  metaDivider: { fontSize: 11 },
});
