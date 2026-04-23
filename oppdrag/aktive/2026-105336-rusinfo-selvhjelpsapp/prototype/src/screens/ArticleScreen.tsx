import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { SectionTitle } from '../components/Primitives';
import { tokens } from '../theme/tokens';
import { ChevronLeft, Share2, Heart } from 'lucide-react-native';

export const ArticleScreen: React.FC<{ route: any; onBack: () => void }> = ({ route, onBack }) => {
  const { theme } = useTheme();
  const { article } = route.params || { article: { title: 'Hvorfor kroppen lurer deg etter tre uker.', time: '6 min', tag: 'kropp' } };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.base }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={onBack}
          style={[styles.headerButton, { backgroundColor: theme.surfaceAlt }]}
        >
          <ChevronLeft size={20} color={theme.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: theme.surfaceAlt }]}>
            <Heart size={20} color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: theme.surfaceAlt }]}>
            <Share2 size={20} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.meta}>
          <Text style={[styles.metaText, { color: theme.accent1 }]}>{article.tag.toUpperCase()}</Text>
          <Text style={[styles.metaTime, { color: theme.textFaint }]}>{article.time} lesing</Text>
        </View>
        
        <SectionTitle size={36} style={styles.title}>{article.title}</SectionTitle>
        
        <View style={styles.body}>
          <Text style={[styles.paragraph, { color: theme.text, fontFamily: tokens.typography.body }]}>
            Det skjer noe i hjernen rundt uke tre. Den første motivasjonen har lagt seg, og hverdagen begynner å melde seg med full tyngde. Dette er ofte den vanskeligste fasen for mange.
          </Text>
          <Text style={[styles.paragraph, { color: theme.text, fontFamily: tokens.typography.body }]}>
            Kroppen har begynt å kvitte seg med de mest akutte reststoffene, men belønningssenteret ditt skriker fortsatt etter den stimulansen det er vant til. Dette kalles ofte for "den tørre fasen".
          </Text>
          <Text style={[styles.quote, { color: theme.primary, borderColor: theme.accent2 }]}>
            "Det handler ikke om mangel på viljestyrke, men om kjemi som forsøker å finne balansen igjen."
          </Text>
          <Text style={[styles.paragraph, { color: theme.text, fontFamily: tokens.typography.body }]}>
            Når du forstår at denne følelsen av tomhet eller irritasjon er et tegn på tilheling, blir den lettere å bære. Det er hjernen din som bygger seg opp igjen, lag for lag.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  metaTime: {
    fontSize: 12,
  },
  title: {
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  body: {
    marginTop: 32,
    gap: 20,
  },
  paragraph: {
    fontSize: 17,
    lineHeight: 28,
  },
  quote: {
    fontSize: 22,
    lineHeight: 32,
    fontStyle: 'italic',
    paddingLeft: 20,
    borderLeftWidth: 2,
    marginVertical: 10,
  },
});
