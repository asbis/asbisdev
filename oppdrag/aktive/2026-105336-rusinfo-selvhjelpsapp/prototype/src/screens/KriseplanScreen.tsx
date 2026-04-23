import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { Card, Button } from '../components/Primitives';
import { AppBar } from '../components/AppBar';
import { X, Phone, ChevronRight, Sparkles } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

export const KriseplanScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const breathAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(breathAnim, { toValue: 1, duration: 4200, useNativeDriver: true }),
        Animated.timing(breathAnim, { toValue: 0, duration: 4200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const scale = breathAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.4] });
  const opacity = breathAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.1] });

  const steps = [
    'Pust ut lengre enn inn. Fire ganger.',
    'Drikk et glass vann, stående.',
    'Skriv ned hva kroppen kjenner nå.',
    'Gå ut eller åpne et vindu.',
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.base }]}>
      <AppBar 
        title="Du er her. Pust." 
        label="KRISEPLAN" 
        rightAction={{ icon: <X size={20} color={theme.text} />, onPress: onClose }}
        scrollY={scrollY}
      />

      <Animated.ScrollView 
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.breathContainer}>
          <View style={styles.breathWrapper}>
            <Animated.View style={[styles.breathCircle, { backgroundColor: theme.crisis, transform: [{ scale }], opacity }]} />
            <Animated.View style={[styles.breathRing, { borderColor: theme.crisis, transform: [{ scale: Animated.multiply(scale, 0.8) }], opacity: 0.5 }]} />
            <View style={styles.breathLabelContainer}><Text style={[styles.breathLabel, { color: theme.text }]}>pust</Text></View>
          </View>
        </View>

        <Card style={styles.stepsCard}>
          {steps.map((s, i, a) => (
            <View key={i} style={[styles.stepRow, { borderBottomWidth: i < a.length - 1 ? 1 : 0, borderBottomColor: theme.hairline }]}>
              <View style={[styles.stepNumber, { borderColor: theme.accent2 }]}><Text style={[styles.stepNumberText, { color: theme.accent2 }]}>{i + 1}</Text></View>
              <Text style={[styles.stepText, { color: theme.text }]}>{s}</Text>
            </View>
          ))}
        </Card>

        <Card style={styles.callCard}>
          <Text style={[styles.callLabel, { color: theme.textFaint }]}>RING NOEN</Text>
          <View style={styles.contactRow}>
            <View style={[styles.contactAvatar, { backgroundColor: theme.accent1 + '22', borderColor: theme.hairline }]}><Text style={[styles.avatarText, { color: theme.text }]}>S</Text></View>
            <View style={{ flex: 1 }}><Text style={[styles.contactName, { color: theme.text }]}>Siri</Text><Text style={[styles.contactPhone, { color: theme.textMuted }]}>+47 •• •• 42 17</Text></View>
            <Button onPress={() => {}} style={styles.callButton}>Ring</Button>
          </View>
        </Card>

        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); navigation.navigate('Chat'); }}
          style={[styles.actionButton, { backgroundColor: theme.surface, borderColor: theme.accent2, borderWidth: 1, marginBottom: 12 }]}
        >
          <View style={[styles.actionIcon, { backgroundColor: theme.accent2 + '22' }]}><Sparkles size={20} color={theme.accent2} /></View>
          <View style={{ flex: 1 }}><Text style={[styles.actionTitle, { color: theme.text }]}>Snakk med Kord AI</Text><Text style={[styles.actionSub, { color: theme.textMuted }]}>Anonym samtale for støtte nå</Text></View>
          <ChevronRight size={16} color={theme.textFaint} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} style={[styles.emergencyButton, { backgroundColor: theme.crisis }]}>
          <View style={styles.actionIcon}><Phone size={22} color={theme.primaryInk} /></View>
          <View style={{ flex: 1 }}><Text style={[styles.actionTitle, { color: theme.primaryInk }]}>Ring RUSinfo</Text><Text style={[styles.actionSub, { color: theme.primaryInk, opacity: 0.85 }]}>08588 · alltid åpen</Text></View>
          <ChevronRight size={16} color={theme.primaryInk} />
        </TouchableOpacity>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  breathContainer: { alignItems: 'center', justifyContent: 'center', marginVertical: 30 },
  breathWrapper: { width: 140, height: 140, alignItems: 'center', justifyContent: 'center' },
  breathCircle: { position: 'absolute', width: 100, height: 100, borderRadius: 50 },
  breathRing: { position: 'absolute', width: 100, height: 100, borderRadius: 50, borderWidth: 1 },
  breathLabelContainer: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  breathLabel: { fontSize: 18, fontStyle: 'italic' },
  stepsCard: { padding: 0, marginBottom: 12 },
  stepRow: { flexDirection: 'row', gap: 14, padding: 16, paddingHorizontal: 20, alignItems: 'center' },
  stepNumber: { width: 22, height: 22, borderRadius: 11, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  stepNumberText: { fontSize: 10 },
  stepText: { fontSize: 15, lineHeight: 22, flex: 1 },
  callCard: { padding: 18, marginBottom: 12 },
  callLabel: { fontSize: 10, letterSpacing: 0.8, marginBottom: 8 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  contactAvatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontStyle: 'italic' },
  contactName: { fontSize: 15, fontWeight: '500' },
  contactPhone: { fontSize: 11 },
  callButton: { height: 36, paddingHorizontal: 16, borderRadius: 18 },
  actionButton: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderRadius: 18, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  emergencyButton: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 18, borderRadius: 18, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 3 },
  actionIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  actionTitle: { fontSize: 16, fontWeight: '600' },
  actionSub: { fontSize: 12, marginTop: 2 },
});
