import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Dimensions, TextInput, KeyboardAvoidingView, Platform, Animated, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../components/ThemeContext';
import { Button, SectionTitle, Card } from '../components/Primitives';
import { tokens } from '../theme/tokens';
import { Storage } from '../lib/storage';
import { Fingerprint, Lock, ShieldCheck, ChevronLeft, ChevronRight, UserPlus, Info } from 'lucide-react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Haptics from 'expo-haptics';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay, isToday } from 'date-fns';
import { nb } from 'date-fns/locale';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const OnboardingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [slide, setSlide] = useState(1);
  const [selectedModule, setSelectedModule] = useState('stop');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Economics state
  const [freqIdx, setFreqIdx] = useState(0);
  const [costPerTime, setCostPerTime] = useState('400');

  // Security state
  const [securityEnabled, setSecurityEnabled] = useState(false);
  const [biometricsAvailable, setBiometricsAvailable] = useState(false);
  const [useBiometrics, setBiometrics] = useState(false);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinStep, setPinStep] = useState<'create' | 'confirm'>('create');
  const [pinError, setPinError] = useState(false);

  // Contact state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setBiometricsAvailable(compatible);
    })();
  }, []);

  const frequencies = [
      { l: 'Hver dag', factor: 1 },
      { l: 'Noen ganger i uka', factor: 0.4 },
      { l: 'Hver helg', factor: 0.28 },
      { l: 'En gang i måneden', factor: 0.033 },
      { l: 'En gang i blant', factor: 0.016 },
  ];

  const handleFinish = async () => {
    await Storage.saveSettings({
      module: selectedModule,
      startDate: selectedDate.toISOString(),
      usageFrequency: frequencies[freqIdx].l,
      costPerUse: parseInt(costPerTime) || 400,
      dailyCost: (parseInt(costPerTime) || 400) * frequencies[freqIdx].factor,
      securityEnabled,
      useBiometrics,
      pin: securityEnabled ? pin : null,
      contact: contactName ? { name: contactName, phone: contactPhone } : { name: 'Siri', phone: '+47 •• •• •• ••' }
    });
    
    await Storage.setOnboarded(true);
    onComplete();
  };

  const goBack = () => {
    if (slide === 6 && pinStep === 'confirm') { setPinStep('create'); setConfirmPin(''); return; }
    if (slide > 1) { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setSlide(slide - 1); }
  };

  const handlePinPress = (num: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPinError(false);
    if (pinStep === 'create') {
      if (pin.length < 4) {
        const nextPin = pin + num; setPin(nextPin);
        if (nextPin.length === 4) setTimeout(() => { setPinStep('confirm'); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); }, 300);
      }
    } else {
      if (confirmPin.length < 4) {
        const nextConfirm = confirmPin + num; setConfirmPin(nextConfirm);
        if (nextConfirm.length === 4) {
          if (nextConfirm === pin) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setSlide(7); 
          } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            setPinError(true);
            setConfirmPin('');
          }
        }
      }
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>{slide > 1 && <TouchableOpacity onPress={goBack} style={styles.backButton}><ChevronLeft color={theme.textMuted} size={24} /></TouchableOpacity>}</View>
      <View style={styles.progressContainer}>{[1, 2, 3, 4, 5, 6, 7].map((n) => (<View key={n} style={[styles.progressBar, { backgroundColor: slide >= n ? theme.primary : theme.hairline }]} />))}</View>
      <View style={styles.headerRight}>{slide < 7 && <TouchableOpacity onPress={handleFinish}><Text style={[styles.skipText, { color: theme.textMuted }]}>Hopp over</Text></TouchableOpacity>}</View>
    </View>
  );

  const renderSlide1 = () => (
    <View style={styles.slideContent}>
      <SectionTitle size={34} style={styles.title}>Velkommen.{'\n'}Du er anonym her.</SectionTitle>
      <Text style={[styles.subtitle, { color: theme.textMuted }]}>Velg et utgangspunkt. Du kan bytte senere.</Text>
      <View style={styles.moduleList}>
        {[{ id: 'stop', title: 'Jeg vil slutte helt', sub: 'Modul 1 · ca. 12 uker', tone: 'accent1' as const }, { id: 'reduce', title: 'Jeg vil redusere bruken', sub: 'Modul 2 · fleksibelt løp', tone: 'accent2' as const }, { id: 'learn', title: 'Jeg vil lære om kokain', sub: 'Modul 3 · edukativ', tone: 'primary' as const }].map((m) => {
          const active = selectedModule === m.id;
          return (
            <TouchableOpacity key={m.id} onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setSelectedModule(m.id); }} activeOpacity={0.8} style={[styles.moduleCard, { backgroundColor: active ? theme.surface : 'transparent', borderColor: active ? theme[m.tone] : theme.hairline }]}>
              <View style={styles.moduleRow}><View style={[styles.dot, { backgroundColor: active ? theme[m.tone] : 'transparent', borderColor: active ? theme[m.tone] : theme.textFaint }]} /><View><Text style={[styles.moduleTitle, { color: theme.text }]}>{m.title}</Text><Text style={[styles.moduleSub, { color: theme.textMuted }]}>{m.sub}</Text></View></View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderSlide2 = () => {
    const monthStart = startOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: endOfMonth(currentMonth) });
    const emptyDaysBefore = (getDay(monthStart) + 6) % 7;
    return (
      <View style={styles.slideContent}>
        <SectionTitle size={30} style={styles.title}>Sett en startdato.</SectionTitle>
        <Text style={[styles.subtitle, { color: theme.textMuted }]}>Dette er utgangspunktet. Du kan endre senere hvis livet endrer seg.</Text>
        <View style={styles.calendarContainer}>
           <Card style={styles.calendarCard}>
              <View style={styles.calendarNav}>
                <TouchableOpacity onPress={() => setCurrentMonth(subMonths(currentMonth, 1))}><ChevronLeft size={20} color={theme.primary} /></TouchableOpacity>
                <Text style={[styles.monthText, { color: theme.text }]}>{format(currentMonth, 'MMMM yyyy', { locale: nb }).toUpperCase()}</Text>
                <TouchableOpacity onPress={() => setCurrentMonth(addMonths(currentMonth, 1))}><ChevronRight size={20} color={theme.primary} /></TouchableOpacity>
              </View>
              <View style={styles.calendarGrid}>
                {['M','T','O','T','F','L','S'].map((d, i) => (<Text key={i} style={[styles.dayHeader, { color: theme.textFaint }]}>{d}</Text>))}
                {Array.from({length: emptyDaysBefore}).map((_, i) => (<View key={`empty-${i}`} style={styles.dayCell} />))}
                {days.map((day, i) => (
                  <TouchableOpacity key={i} onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setSelectedDate(day); }} style={[styles.dayCell, isSameDay(selectedDate, day) && { backgroundColor: theme.primary, borderRadius: 10 }]}>
                    <Text style={[styles.dayText, { color: isSameDay(selectedDate, day) ? theme.primaryInk : theme.text }, isToday(day) && !isSameDay(selectedDate, day) && { color: theme.accent1, fontWeight: 'bold' }]}>{format(day, 'd')}</Text>
                  </TouchableOpacity>
                ))}
              </View>
           </Card>
        </View>
      </View>
    );
  };

  const renderSlide3 = () => (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.slideContent}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
            <SectionTitle size={30} style={styles.title}>Dine vaner.</SectionTitle>
            <Text style={[styles.subtitle, { color: theme.textMuted }]}>Hvor ofte brukte du det, og hva koster det per gang? Brukes kun for din motivasjon.</Text>
            
            <View style={styles.costContainer}>
                <Text style={[styles.inputLabel, { color: theme.textFaint, textAlign: 'center' }]}>FREKVENS</Text>
                <View style={styles.freqGrid}>
                    {frequencies.map((f, i) => {
                        const active = freqIdx === i;
                        return (
                            <TouchableOpacity 
                              key={i} 
                              onPress={() => { Haptics.selectionAsync(); setFreqIdx(i); }} 
                              style={[styles.freqCard, { 
                                backgroundColor: active ? theme.primary : theme.surfaceAlt, 
                                borderColor: active ? theme.primary : theme.hairline,
                                width: (SCREEN_WIDTH - 58) / 2
                              }]}
                            >
                                <Text style={[styles.freqCardText, { color: active ? theme.primaryInk : theme.textMuted }]}>{f.l}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.costInputSection}>
                    <Text style={[styles.inputLabel, { color: theme.textFaint, textAlign: 'center' }]}>PRIS PER GANG</Text>
                    <View style={[styles.largeInputRow, { borderBottomColor: theme.hairline }]}>
                        <Text style={[styles.largeCurrency, { color: theme.textFaint }]}>kr</Text>
                        <TextInput 
                            keyboardType="numeric" 
                            value={costPerTime} 
                            onChangeText={setCostPerTime} 
                            style={[styles.largeCostInput, { color: theme.text, fontFamily: 'InstrumentSerif' }]} 
                        />
                    </View>
                </View>
            </View>

            <View style={[styles.minimalInfoBox, { borderTopColor: theme.hairline, marginTop: 40 }]}>
                <Lock size={14} color={theme.textFaint} />
                <Text style={[styles.minimalInfoText, { color: theme.textFaint }]}>
                    Kun lagret på din telefon.
                </Text>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
  );

  const renderSlide4 = () => (
    <View style={styles.slideContent}>
      <SectionTitle size={30} style={styles.title}>Løftet vårt.</SectionTitle>
      <View style={styles.promiseList}>
        {[{ k: 'Ingen data', v: 'Vi sender ingen data om deg noe sted.' }, { k: 'Ingen konto', v: 'Det finnes ingen konto. Ingen telefonnummer. Ingen e-post.' }, { k: 'Bare ditt', v: 'Hvis du sletter appen, er alt borte. Det er bare ditt.' }].map((r, i) => (
          <View key={i} style={styles.promiseRow}>
            <View style={[styles.numberCircle, { borderColor: theme.accent2 }]}><Text style={[styles.numberText, { color: theme.accent2 }]}>{i + 1}</Text></View>
            <View style={{ flex: 1 }}><Text style={[styles.promiseKey, { color: theme.text }]}>{r.k}</Text><Text style={[styles.promiseVal, { color: theme.textMuted }]}>{r.v}</Text></View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSlide5 = () => (
    <View style={styles.slideContent}>
      <SectionTitle size={30} style={styles.title}>Sikkerhet.</SectionTitle>
      <Text style={[styles.subtitle, { color: theme.textMuted }]}>Gjør appen privat slik at bare du kan se innholdet.</Text>
      <Card style={[styles.securityCard, { marginTop: 32 }]}>
        <View style={styles.securityRow}>
          <View style={[styles.securityIcon, { backgroundColor: theme.accent2 + '22' }]}><ShieldCheck color={theme.accent2} size={22} /></View>
          <View style={{ flex: 1 }}><Text style={[styles.securityTitle, { color: theme.text }]}>Slå på lås</Text><Text style={[styles.securitySub, { color: theme.textMuted }]}>Krev PIN for å åpne appen</Text></View>
          <Switch value={securityEnabled} onValueChange={setSecurityEnabled} trackColor={{ false: theme.hairline, true: theme.accent2 }} thumbColor={securityEnabled ? theme.surface : '#f4f3f4'} />
        </View>
        {securityEnabled && biometricsAvailable && (
          <View style={[styles.securityRow, { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: theme.hairline }]}>
            <View style={[styles.securityIcon, { backgroundColor: theme.primary + '22' }]}><Fingerprint color={theme.primary} size={22} /></View>
            <View style={{ flex: 1 }}><Text style={[styles.securityTitle, { color: theme.text }]}>Bruk biometri</Text><Text style={[styles.securitySub, { color: theme.textMuted }]}>Face ID / Touch ID</Text></View>
            <Switch value={useBiometrics} onValueChange={setBiometrics} trackColor={{ false: theme.hairline, true: theme.primary }} thumbColor={useBiometrics ? theme.surface : '#f4f3f4'} />
          </View>
        )}
      </Card>
    </View>
  );

  const renderSlide6 = () => {
    const currentPin = pinStep === 'create' ? pin : confirmPin;
    return (
      <View style={styles.slideContent}>
        <SectionTitle size={30} style={styles.title}>{pinStep === 'create' ? 'Velg en PIN-kode.' : 'Gjenta PIN-koden.'}</SectionTitle>
        <Text style={[styles.subtitle, { color: pinError ? theme.crisis : theme.textMuted }]}>{pinError ? 'Kodene var ikke like. Prøv igjen.' : 'Fire siffer for å sikre appen.'}</Text>
        <View style={styles.pinDots}>{[1, 2, 3, 4].map(i => (<View key={i} style={[styles.pinDot, { backgroundColor: currentPin.length >= i ? theme.primary : 'transparent', borderColor: theme.hairline }]} />))}</View>
        <View style={styles.keypad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'Slett'].map((num, i) => (
            <TouchableOpacity key={i} style={styles.key} onPress={() => num === 'Slett' ? (pinStep === 'create' ? setPin(pin.slice(0, -1)) : setConfirmPin(confirmPin.slice(0, -1))) : num !== '' && handlePinPress(num.toString())} disabled={num === ''}>
              <Text style={[styles.keyText, { color: theme.text, fontSize: num === 'Slett' ? 14 : 24 }]}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderSlide7 = () => (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.slideContent}>
        <SectionTitle size={30} style={styles.title}>Din støtte.</SectionTitle>
        <Text style={[styles.subtitle, { color: theme.textMuted }]}>Hvem er den første du ringer hvis det blir vanskelig? Dette lagres kun på din telefon.</Text>
        <Card style={[styles.securityCard, { marginTop: 32 }]}>
            <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: theme.textFaint }]}>NAVN</Text>
                <TextInput placeholder="Siri, Pappa, Erik..." placeholderTextColor={theme.textFaint} value={contactName} onChangeText={setContactName} style={[styles.textInput, { color: theme.text, borderBottomColor: theme.hairline }]} />
            </View>
            <View style={[styles.inputGroup, { marginTop: 24 }]}>
                <Text style={[styles.inputLabel, { color: theme.textFaint }]}>TELEFONNUMMER</Text>
                <TextInput placeholder="+47 •• •• •• ••" placeholderTextColor={theme.textFaint} value={contactPhone} onChangeText={setContactPhone} keyboardType="phone-pad" style={[styles.textInput, { color: theme.text, borderBottomColor: theme.hairline }]} />
            </View>
        </Card>
        <View style={[styles.infoBox, { marginTop: 24, backgroundColor: theme.surfaceAlt, borderColor: theme.hairline }]}>
            <UserPlus size={16} color={theme.textFaint} />
            <Text style={[styles.infoText, { color: theme.textMuted }]}>Du kan endre dette når som helst.</Text>
        </View>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.base }]} edges={['top', 'left', 'right']}>
      {renderHeader()}
      <View style={styles.main}>
        {slide === 1 && renderSlide1()}
        {slide === 2 && renderSlide2()}
        {slide === 3 && renderSlide3()}
        {slide === 4 && renderSlide4()}
        {slide === 5 && renderSlide5()}
        {slide === 6 && renderSlide6()}
        {slide === 7 && renderSlide7()}
      </View>
      {slide !== 6 && (
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
          <Button onPress={() => {
            if (slide === 3) setSlide(4);
            else if (slide === 5 && securityEnabled) setSlide(6);
            else if (slide === 5) setSlide(7);
            else if (slide === 7) handleFinish();
            else setSlide(slide + 1);
          }}>{slide === 7 ? 'Ferdig' : 'Fortsett'}</Button>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', height: 60, alignItems: 'center', paddingHorizontal: 10 },
  headerLeft: { width: 60, alignItems: 'center' },
  headerRight: { width: 80, alignItems: 'center' },
  backButton: { padding: 8 },
  progressContainer: { flex: 1, flexDirection: 'row', justifyContent: 'center', gap: 6 },
  progressBar: { width: 16, height: 3, borderRadius: 2 },
  skipText: { fontSize: 14 },
  main: { flex: 1, paddingHorizontal: 24 },
  slideContent: { flex: 1, paddingTop: 20 },
  title: { lineHeight: 40 },
  subtitle: { marginTop: 14, fontSize: 15, lineHeight: 22 },
  moduleList: { marginTop: 32, gap: 12 },
  moduleCard: { padding: 20, borderRadius: 20, borderWidth: 1 },
  moduleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dot: { width: 10, height: 10, borderRadius: 5, borderWidth: 1.5 },
  moduleTitle: { fontSize: 17, fontWeight: '500' },
  moduleSub: { fontSize: 13, marginTop: 2 },
  footer: { paddingHorizontal: 24, paddingTop: 20 },
  calendarContainer: { marginTop: 20 },
  calendarCard: { padding: 16 },
  calendarNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  monthText: { fontSize: 13, fontWeight: '600', letterSpacing: 1 },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayHeader: { width: `${100/7}%`, textAlign: 'center', fontSize: 10, marginBottom: 12 },
  dayCell: { width: `${100/7}%`, height: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  dayText: { fontSize: 14 },
  costContainer: { marginTop: 24 },
  freqGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 16 },
  freqCard: { paddingHorizontal: 12, paddingVertical: 18, borderRadius: 24, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  freqCardText: { fontSize: 12, fontWeight: '600', textAlign: 'center' },
  costInputSection: { marginTop: 32, alignItems: 'center' },
  largeInputRow: { flexDirection: 'row', alignItems: 'baseline', borderBottomWidth: 1.5, minWidth: 180, justifyContent: 'center', paddingBottom: 4 },
  largeCurrency: { fontSize: 24, marginRight: 8 },
  largeCostInput: { fontSize: 64, textAlign: 'center', minWidth: 100 },
  minimalInfoBox: { paddingTop: 16, borderTopWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  minimalInfoText: { fontSize: 12 },
  promiseList: { marginTop: 32, gap: 26 },
  promiseRow: { flexDirection: 'row', gap: 16 },
  numberCircle: { width: 26, height: 26, borderRadius: 13, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  numberText: { fontSize: 14, fontStyle: 'italic' },
  promiseKey: { fontSize: 18, fontWeight: '500', marginBottom: 3 },
  promiseVal: { fontSize: 15, lineHeight: 22 },
  securityList: { marginTop: 32, gap: 16 },
  securityCard: { padding: 24, borderRadius: 24 },
  securityRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  securityIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  securityTitle: { fontSize: 16, fontWeight: '600' },
  securitySub: { fontSize: 12, marginTop: 2 },
  infoBox: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderRadius: 14, borderWidth: 1 },
  infoText: { fontSize: 13, flex: 1, lineHeight: 18 },
  pinDots: { flexDirection: 'row', gap: 20, justifyContent: 'center', marginVertical: 40 },
  pinDot: { width: 16, height: 16, borderRadius: 8, borderWidth: 1.5 },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'center', gap: 10 },
  key: { width: (SCREEN_WIDTH - 100) / 3, height: 70, alignItems: 'center', justifyContent: 'center' },
  keyText: { fontWeight: '400' },
  inputGroup: {},
  inputLabel: { fontSize: 10, letterSpacing: 1, fontWeight: '700', marginBottom: 8 },
  textInput: { fontSize: 22, paddingVertical: 12, borderBottomWidth: 1 },
});
