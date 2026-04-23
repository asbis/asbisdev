import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../components/ThemeContext';
import { AppBar } from '../components/AppBar';
import { tokens } from '../theme/tokens';
import { Storage } from '../lib/storage';
import { X, Check, Shield, History, Zap, ChevronRight, ChevronLeft } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export const DiaryEntryScreen: React.FC<{ route: any; onBack: () => void }> = ({ route, onBack }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { type: initialType = 'Notat' } = route.params || {};
  
  const [step, setStep] = useState(initialType === 'Notat' ? 3 : 1);
  const [type, setType] = useState(initialType === 'Hendelse' ? 'Trigger' : initialType);
  const [outcome, setOutcome] = useState<'managed' | 'used' | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [text, setText] = useState('');

  const onSave = async () => {
    const finalType = type === 'Trigger' && outcome === 'used' ? 'Bruk' : type;
    const entry = {
      id: Date.now().toString(),
      type: finalType,
      title: finalType === 'Bruk' ? 'Jeg sprakk.' : finalType === 'Trigger' ? `Trigger: ${category || 'Sug'}` : text.split('\n')[0].slice(0, 40),
      body: text,
      tags: category ? [category] : [],
      outcome: outcome,
      mood: finalType === 'Bruk' ? '🌊' : outcome === 'managed' ? '💪' : '🌱',
      date: new Date().toLocaleDateString('nb-NO', { day: '2-digit', month: 'short' }),
      weekday: new Date().toLocaleDateString('nb-NO', { weekday: 'long' }),
      createdAt: new Date().toISOString(),
    };
    await Storage.saveEntry(entry);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onBack();
  };

  const nextStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setStep(step + 1);
  };

  const goBack = () => {
    if (step > 1) {
        setStep(step - 1);
    } else {
        onBack();
    }
  };

  const renderChoice = (title: string, sub: string, icon: any, color: string, onPress: () => void) => (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.choiceCard, { backgroundColor: theme.surface, borderColor: theme.hairline }]}
    >
      <View style={[styles.choiceIcon, { backgroundColor: color + '22' }]}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.choiceTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.choiceSub, { color: theme.textMuted }]}>{sub}</Text>
      </View>
      <ChevronRight size={18} color={theme.textFaint} />
    </TouchableOpacity>
  );

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepLabel, { color: theme.textMuted }]}>HVA SKJER?</Text>
      <View style={styles.optionsList}>
        {renderChoice('Jeg kjenner sug', 'En trigger eller vanskelig situasjon', <Zap size={22} color={theme.accent2} />, theme.accent2, () => { setType('Trigger'); nextStep(); })}
        {renderChoice('Jeg har brukt', 'Logg en sprekk ærlig og anonymt', <History size={22} color={theme.crisis} />, theme.crisis, () => { setType('Bruk'); setOutcome('used'); setStep(3); })}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepLabel, { color: theme.textMuted }]}>HVORDAN GIKK DET?</Text>
      <View style={styles.optionsList}>
        {renderChoice('Jeg sto imot', 'En seier! Logg hva som hjalp', <Shield size={22} color={theme.accent2} />, theme.accent2, () => { setOutcome('managed'); nextStep(); })}
        {renderChoice('Jeg ga etter', 'Vær ærlig. Vi lærer av dette.', <History size={22} color={theme.crisis} />, theme.crisis, () => { setOutcome('used'); setType('Bruk'); nextStep(); })}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.step3Container}>
      <Text style={[styles.stepLabel, { color: theme.textMuted }]}>KATEGORI & NOTATER</Text>
      <View style={styles.tagBar}>
        {(type === 'Bruk' ? ['Impulsivt', 'Planlagt', 'Press', 'Tristhet'] : ['Sosialt', 'Stress', 'Kjedsomhet', 'Alene', 'Fest']).map(c => (
          <TouchableOpacity key={c} onPress={() => setCategory(category === c ? null : c)} style={[styles.tag, { backgroundColor: category === c ? theme.primary : theme.surfaceAlt, borderColor: category === c ? theme.primary : theme.hairline }]}>
            <Text style={[styles.tagText, { color: category === c ? theme.primaryInk : theme.textMuted }]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.textSection}>
        <TextInput 
          multiline autoFocus 
          placeholder={type === 'Bruk' ? "Hva ledet opp til dette?" : "Hva føler du nå?"} 
          placeholderTextColor={theme.textFaint} 
          value={text} onChangeText={setText} 
          style={[styles.input, { color: theme.text, fontFamily: tokens.typography.body }]} 
        />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.base }]}>
      <AppBar 
        title={step === 1 ? "Ny hendelse" : step === 2 ? "Resultat" : type === 'Bruk' ? "Logg bruk" : "Notater"} 
        leftAction={{ icon: step > 1 ? <ChevronLeft size={20} color={theme.text} /> : <X size={20} color={theme.text} />, onPress: goBack }}
        rightAction={step === 3 ? { icon: <Check size={20} color={theme.primary} />, onPress: onSave } : undefined}
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        {step < 3 ? (
            <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: Math.max(insets.bottom, 20) }}>
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
            </View>
        ) : (
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
                {renderStep3()}
            </ScrollView>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  stepContainer: { padding: 20 },
  step3Container: { padding: 20, paddingTop: 10 },
  stepLabel: { fontSize: 10, letterSpacing: 1, fontWeight: '700', marginBottom: 16 },
  optionsList: { gap: 12 },
  choiceCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 18, 
    borderRadius: 20, 
    borderWidth: 1, 
    gap: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5
  },
  choiceIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  choiceTitle: { fontSize: 17, fontWeight: '600' },
  choiceSub: { fontSize: 13, marginTop: 2 },
  textSection: { marginTop: 24 },
  input: { fontSize: 18, lineHeight: 26, textAlignVertical: 'top' },
  tagBar: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, borderWidth: 1 },
  tagText: { fontSize: 13, fontWeight: '500' },
});
