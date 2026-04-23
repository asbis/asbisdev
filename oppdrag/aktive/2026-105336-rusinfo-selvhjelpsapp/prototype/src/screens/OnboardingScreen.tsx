import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Dimensions, Animated } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../components/ThemeContext';
import { Button, SectionTitle, Card } from '../components/Primitives';
import { tokens } from '../theme/tokens';
import { Storage } from '../lib/storage';
import { Fingerprint, Lock, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Haptics from 'expo-haptics';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay, isToday } from 'date-fns';
import { nb } from 'date-fns/locale';

const { width } = Dimensions.get('window');

export const OnboardingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [slide, setSlide] = useState(1);
  const [selectedModule, setSelectedModule] = useState('stop');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Security state
  const [securityEnabled, setSecurityEnabled] = useState(false);
  const [biometricsAvailable, setBiometricsAvailable] = useState(false);
  const [useBiometrics, setBiometrics] = useState(false);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinStep, setPinStep] = useState<'create' | 'confirm'>('create');
  const [pinError, setPinError] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setBiometricsAvailable(compatible);
    })();
  }, []);

  const modules = [
    { id: 'stop', title: 'Jeg vil slutte helt', sub: 'Modul 1 · ca. 12 uker', tone: 'accent1' as const },
    { id: 'reduce', title: 'Jeg vil redusere bruken', sub: 'Modul 2 · fleksibelt løp', tone: 'accent2' as const },
    { id: 'learn', title: 'Jeg vil lære om kokain', sub: 'Modul 3 · edukativ', tone: 'primary' as const },
  ];

  const handleFinish = async () => {
    await Storage.saveSettings({
      module: selectedModule,
      startDate: selectedDate.toISOString(),
      securityEnabled,
      useBiometrics,
      pin: securityEnabled ? pin : null,
    });
    
    await Storage.setOnboarded(true);
    onComplete();
  };

  const goBack = () => {
    if (slide === 5 && pinStep === 'confirm') {
      setPinStep('create');
      setConfirmPin('');
      return;
    }
    if (slide > 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setSlide(slide - 1);
    }
  };

  const handlePinPress = (num: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPinError(false);
    
    if (pinStep === 'create') {
      if (pin.length < 4) {
        const nextPin = pin + num;
        setPin(nextPin);
        if (nextPin.length === 4) {
          setTimeout(() => {
            setPinStep('confirm');
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }, 300);
        }
      }
    } else {
      if (confirmPin.length < 4) {
        const nextConfirm = confirmPin + num;
        setConfirmPin(nextConfirm);
        if (nextConfirm.length === 4) {
          if (nextConfirm === pin) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            handleFinish();
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
      <View style={styles.headerLeft}>
        {slide > 1 && (
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <ChevronLeft color={theme.textMuted} size={24} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.progressContainer}>
        {[1, 2, 3, 4, 5].map((n) => (
          <View
            key={n}
            style={[
              styles.progressBar,
              { backgroundColor: slide >= n ? theme.primary : theme.hairline },
            ]}
          />
        ))}
      </View>
      <View style={styles.headerRight}>
        {slide < 4 && (
          <TouchableOpacity onPress={handleFinish}>
            <Text style={[styles.skipText, { color: theme.textMuted }]}>Hopp over</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderSlide1 = () => (
    <View style={styles.slideContent}>
      <SectionTitle size={34} style={styles.title}>Velkommen.{'\n'}Du er anonym her.</SectionTitle>
      <Text style={[styles.subtitle, { color: theme.textMuted }]}>Velg et utgangspunkt. Du kan bytte senere.</Text>
      <View style={styles.moduleList}>
        {modules.map((m) => {
          const active = selectedModule === m.id;
          return (
            <TouchableOpacity key={m.id} onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setSelectedModule(m.id); }} activeOpacity={0.8} style={[styles.moduleCard, { backgroundColor: active ? theme.surface : 'transparent', borderColor: active ? theme[m.tone] : theme.hairline }]}>
              <View style={styles.moduleRow}>
                <View style={[styles.dot, { backgroundColor: active ? theme[m.tone] : 'transparent', borderColor: active ? theme[m.tone] : theme.textFaint }]} />
                <View><Text style={[styles.moduleTitle, { color: theme.text }]}>{m.title}</Text><Text style={[styles.moduleSub, { color: theme.textMuted }]}>{m.sub}</Text></View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderSlide2 = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
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
                {days.map((day, i) => {
                  const active = isSameDay(selectedDate, day);
                  return (
                    <TouchableOpacity key={i} onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setSelectedDate(day); }} style={[styles.dayCell, active && { backgroundColor: theme.primary, borderRadius: 10 }]}>
                      <Text style={[styles.dayText, { color: active ? theme.primaryInk : theme.text }, isToday(day) && !active && { color: theme.accent1, fontWeight: 'bold' }]}>{format(day, 'd')}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
           </Card>
        </View>
      </View>
    );
  };

  const renderSlide3 = () => (
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

  const renderSlide4 = () => (
    <View style={styles.slideContent}>
      <SectionTitle size={30} style={styles.title}>Sikkerhet.</SectionTitle>
      <Text style={[styles.subtitle, { color: theme.textMuted }]}>Gjør appen privat slik at bare du kan se innholdet.</Text>
      <View style={styles.securityList}>
        <Card style={styles.securityCard}>
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
    </View>
  );

  const renderSlide5 = () => {
    const currentPin = pinStep === 'create' ? pin : confirmPin;
    return (
      <View style={styles.slideContent}>
        <SectionTitle size={30} style={styles.title}>{pinStep === 'create' ? 'Velg en PIN-kode.' : 'Gjenta PIN-koden.'}</SectionTitle>
        <Text style={[styles.subtitle, { color: pinError ? theme.crisis : theme.textMuted }]}>
          {pinError ? 'Kodene var ikke like. Prøv igjen.' : 'Fire siffer for å sikre appen.'}
        </Text>
        
        <View style={styles.pinDots}>
          {[1, 2, 3, 4].map(i => (
            <View key={i} style={[styles.pinDot, { backgroundColor: currentPin.length >= i ? theme.primary : 'transparent', borderColor: theme.hairline }]} />
          ))}
        </View>

        <View style={styles.keypad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'Slett'].map((num, i) => (
            <TouchableOpacity 
              key={i} 
              style={styles.key} 
              onPress={() => num === 'Slett' ? (pinStep === 'create' ? setPin(pin.slice(0, -1)) : setConfirmPin(confirmPin.slice(0, -1))) : num !== '' && handlePinPress(num.toString())}
              disabled={num === ''}
            >
              <Text style={[styles.keyText, { color: theme.text, fontSize: num === 'Slett' ? 14 : 24 }]}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.base }]} edges={['top', 'left', 'right']}>
      {renderHeader()}
      <View style={styles.main}>
        {slide === 1 && renderSlide1()}
        {slide === 2 && renderSlide2()}
        {slide === 3 && renderSlide3()}
        {slide === 4 && renderSlide4()}
        {slide === 5 && renderSlide5()}
      </View>
      {slide !== 5 && (
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
          <Button onPress={() => {
            if (slide === 4 && securityEnabled) { setSlide(5); }
            else if (slide === 4) { handleFinish(); }
            else { setSlide(slide + 1); }
          }}>Fortsett</Button>
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
  progressBar: { width: 24, height: 3, borderRadius: 2 },
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
  promiseList: { marginTop: 32, gap: 26 },
  promiseRow: { flexDirection: 'row', gap: 16 },
  numberCircle: { width: 26, height: 26, borderRadius: 13, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  numberText: { fontSize: 14, fontStyle: 'italic' },
  promiseKey: { fontSize: 18, fontWeight: '500', marginBottom: 3 },
  promiseVal: { fontSize: 15, lineHeight: 22 },
  securityList: { marginTop: 32, gap: 16 },
  securityCard: { padding: 20 },
  securityRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  securityIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  securityTitle: { fontSize: 16, fontWeight: '600' },
  securitySub: { fontSize: 12, marginTop: 2 },
  infoBox: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 16, borderRadius: 14, borderWidth: 1 },
  infoText: { fontSize: 13 },
  pinDots: { flexDirection: 'row', gap: 20, justifyContent: 'center', marginVertical: 40 },
  pinDot: { width: 16, height: 16, borderRadius: 8, borderWidth: 1.5 },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'center', gap: 10 },
  key: { width: (width - 100) / 3, height: 70, alignItems: 'center', justifyContent: 'center' },
  keyText: { fontWeight: '400' },
});
