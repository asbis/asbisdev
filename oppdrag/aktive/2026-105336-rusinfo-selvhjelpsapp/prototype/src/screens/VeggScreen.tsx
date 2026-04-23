import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { AppBar } from '../components/AppBar';
import { tokens } from '../theme/tokens';
import { ChevronLeft, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export const VeggScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { theme } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  const posts = [
    { tone: 'accent1' as const, label: 'still water', quote: 'Jeg er ikke ferdig. Jeg bygger.', date: '22. apr' },
    { tone: 'accent2' as const, label: 'mountains', quote: 'Sakte er fortsatt fremover.', date: '20. apr' },
    { tone: 'primary' as const, label: 'morning light', quote: 'Én dag til, én dag til.', date: '15. apr' },
    { tone: 'accent1' as const, label: 'ceramic', quote: 'Ting kan gå i stykker og bygges igjen.', date: '10. apr' },
    { tone: 'accent2' as const, label: 'forest floor', quote: 'Jeg velger hvem jeg blir i morgen.', date: '07. apr' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.base }]}>
      <AppBar 
        title="Ditt galleri." 
        label="MOTIVASJONSVEGG"
        leftAction={{ icon: <ChevronLeft size={20} color={theme.text} />, onPress: onBack }}
        scrollY={scrollY}
      />

      <Animated.ScrollView 
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {posts.map((p, i) => {
            const isFullWidth = i === 0;
            return (
              <View key={i} style={[styles.postCard, { backgroundColor: theme.surface, borderColor: theme.hairline, width: isFullWidth ? '100%' : (width - 50) / 2, aspectRatio: isFullWidth ? 1 / 1.2 : 1 / 1.15 }]}>
                <LinearGradient colors={[theme[p.tone] + '66', theme[p.tone] + '22', 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientOverlay} />
                <View style={styles.postContent}>
                  <Text style={[styles.postPhotoLabel, { color: theme.textMuted }]}>PHOTO: {p.label.toUpperCase()}</Text>
                  <View style={{ flex: 1 }} />
                  <Text style={[styles.postQuote, { color: theme.text, fontSize: isFullWidth ? 24 : 16 }]}>{p.quote}</Text>
                  <Text style={[styles.postDate, { color: theme.textFaint }]}>{p.date}</Text>
                </View>
              </View>
            );
          })}
          <TouchableOpacity activeOpacity={0.7} style={[styles.addPostCard, { borderColor: theme.hairline, width: (width - 50) / 2, aspectRatio: 1 / 1.15 }]}>
            <Plus size={22} color={theme.textMuted} />
            <Text style={[styles.addPostLabel, { color: theme.textMuted }]}>Ny vegg</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  postCard: { borderRadius: 18, borderWidth: 1, overflow: 'hidden' },
  gradientOverlay: { ...StyleSheet.absoluteFillObject },
  postContent: { flex: 1, padding: 14 },
  postPhotoLabel: { fontSize: 9, letterSpacing: 0.5 },
  postQuote: { fontWeight: '500', letterSpacing: -0.3, lineHeight: 28 },
  postDate: { marginTop: 6, fontSize: 10 },
  addPostCard: { borderRadius: 18, borderWidth: 1.5, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 10 },
  addPostLabel: { fontSize: 13 },
});
