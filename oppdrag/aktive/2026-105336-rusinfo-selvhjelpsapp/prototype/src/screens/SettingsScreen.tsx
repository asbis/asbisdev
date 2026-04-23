import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { Card } from '../components/Primitives';
import { AppBar } from '../components/AppBar';
import { tokens } from '../theme/tokens';
import { ChevronLeft, Check, Trash2 } from 'lucide-react-native';
import { Storage } from '../lib/storage';
import * as Haptics from 'expo-haptics';

export const SettingsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { theme, palette, setPalette } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  const togglePalette = (p: 'A' | 'B') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPalette(p);
    Storage.saveSettings({ palette: p });
  };

  const onReset = () => {
    Alert.alert('Slett alt?', 'Dette vil slette alle dagbokinnlegg og innstillinger permanent. Du kan ikke angre.', [
      { text: 'Avbryt', style: 'cancel' },
      { text: 'Slett alt', style: 'destructive', onPress: async () => {
        await Storage.clearAll();
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert('Slettet', 'Appen er nullstilt. Start appen på nytt for å se endringene.');
      }}
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.base }]}>
      <AppBar 
        title="Innstillinger" 
        leftAction={{ icon: <ChevronLeft size={20} color={theme.text} />, onPress: onBack }}
        scrollY={scrollY}
      />

      <Animated.ScrollView 
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: theme.textFaint }]}>UTSEENDE</Text>
          <Card style={styles.paletteCard}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => togglePalette('A')} style={[styles.paletteRow, { borderBottomWidth: 1, borderBottomColor: theme.hairline }]}>
              <View style={[styles.palettePreview, { backgroundColor: tokens.colors.paletteA.base }]}><View style={[styles.paletteDot, { backgroundColor: tokens.colors.paletteA.primary }]} /><View style={[styles.paletteDot, { backgroundColor: tokens.colors.paletteA.accent1 }]} /></View>
              <Text style={[styles.paletteName, { color: theme.text }]}>Varm stein</Text>
              {palette === 'A' && <Check size={20} color={theme.accent2} />}
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => togglePalette('B')} style={styles.paletteRow}>
              <View style={[styles.palettePreview, { backgroundColor: tokens.colors.paletteB.base }]}><View style={[styles.paletteDot, { backgroundColor: tokens.colors.paletteB.primary }]} /><View style={[styles.paletteDot, { backgroundColor: tokens.colors.paletteB.accent1 }]} /></View>
              <Text style={[styles.paletteName, { color: theme.text }]}>Stille vann</Text>
              {palette === 'B' && <Check size={20} color={theme.accent2} />}
            </TouchableOpacity>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: theme.textFaint }]}>PERSONVERN</Text>
          <Card style={{ marginBottom: 12 }}>
            <Text style={[styles.privacyInfo, { color: theme.textMuted }]}>Appen er helt anonym. Ingen data forlater telefonen din. Hvis du sletter appen, slettes også all historikk og alle dagbokinnlegg permanent.</Text>
          </Card>
          <TouchableOpacity onPress={onReset} activeOpacity={0.7} style={[styles.resetButton, { borderColor: theme.crisis + '44' }]}><Trash2 size={18} color={theme.crisis} /><Text style={[styles.resetButtonText, { color: theme.crisis }]}>Nullstill alt</Text></TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  section: { marginBottom: 28 },
  sectionLabel: { fontSize: 10, letterSpacing: 0.8, marginBottom: 10 },
  paletteCard: { padding: 0 },
  paletteRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 16 },
  palettePreview: { width: 48, height: 32, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  paletteDot: { width: 8, height: 8, borderRadius: 4 },
  paletteName: { flex: 1, fontSize: 16, fontWeight: '500' },
  privacyInfo: { fontSize: 14, lineHeight: 22 },
  resetButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 16, borderRadius: 16, borderWidth: 1, borderStyle: 'dashed', marginTop: 8 },
  resetButtonText: { fontSize: 15, fontWeight: '500' },
});
