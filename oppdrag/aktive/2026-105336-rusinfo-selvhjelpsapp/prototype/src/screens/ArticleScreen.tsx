import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { SectionTitle } from '../components/Primitives';
import { AppBar } from '../components/AppBar';
import { tokens } from '../theme/tokens';
import { ChevronLeft, Share2 } from 'lucide-react-native';

export const ArticleScreen: React.FC<{ route: any; onBack: () => void }> = ({ route, onBack }) => {
  const { theme } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { article } = route.params || { article: { title: 'Hvorfor kroppen lurer deg etter tre uker.', time: '6 min', tag: 'kropp' } };

  return (
    <View style={[styles.container, { backgroundColor: theme.base }]}>
      <AppBar 
        title={article.title} 
        label={article.tag}
        leftAction={{ icon: <ChevronLeft size={20} color={theme.text} />, onPress: onBack }}
        rightAction={{ icon: <Share2 size={20} color={theme.text} />, onPress: () => {} }}
        scrollY={scrollY}
      />

      <Animated.ScrollView 
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.meta}>
          <Text style={[styles.metaText, { color: theme.accent1 }]}>{article.tag.toUpperCase()}</Text>
          <Text style={[styles.metaTime, { color: theme.textFaint }]}>{article.time} lesing</Text>
        </View>
        <SectionTitle size={36} style={styles.title}>{article.title}</SectionTitle>
        <View style={styles.body}>
          <Text style={[styles.paragraph, { color: theme.text, fontFamily: tokens.typography.body }]}>Det skjer noe i hjernen rundt uke tre. Den første motivasjonen har lagt seg, og hverdagen begynner å melde seg med full tyngde.</Text>
          <Text style={[styles.paragraph, { color: theme.text, fontFamily: tokens.typography.body }]}>Kroppen har begynt å kvitte seg med de mest akutte reststoffene, men belønningssenteret ditt skriker fortsatt etter den stimulansen det er vant til.</Text>
          <Text style={[styles.quote, { color: theme.primary, borderColor: theme.accent2 }]}>"Det handler ikke om mangel på viljestyrke, men om kjemi som forsøker å finne balansen igjen."</Text>
          <Text style={[styles.paragraph, { color: theme.text, fontFamily: tokens.typography.body }]}>Når du forstår at denne følelsen av tomhet eller irritasjon er et tegn på tilheling, blir den lettere å bære.</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  metaText: { fontSize: 12, fontWeight: '600', letterSpacing: 0.5 },
  metaTime: { fontSize: 12 },
  title: { lineHeight: 44, letterSpacing: -0.5 },
  body: { marginTop: 32, gap: 20 },
  paragraph: { fontSize: 17, lineHeight: 28 },
  quote: { fontSize: 22, lineHeight: 32, fontStyle: 'italic', paddingLeft: 20, borderLeftWidth: 2, marginVertical: 10 },
});
