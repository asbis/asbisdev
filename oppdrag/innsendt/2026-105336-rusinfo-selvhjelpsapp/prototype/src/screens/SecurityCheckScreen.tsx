import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../components/ThemeContext';
import { SectionTitle } from '../components/Primitives';
import { Storage } from '../lib/storage';
import { Lock, Fingerprint } from 'lucide-react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

export const SecurityCheckScreen: React.FC<{ onAuthenticated: () => void }> = ({ onAuthenticated }) => {
  const { theme } = useTheme();
  const [pin, setPin] = useState('');
  const [storedSettings, setStoredSettings] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      const settings = await Storage.getSettings();
      setStoredSettings(settings);
      if (settings.useBiometrics) {
        authenticateBiometrics();
      }
    })();
  }, []);

  const authenticateBiometrics = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Lås opp Kord',
      fallbackLabel: 'Bruk PIN',
    });

    if (result.success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onAuthenticated();
    }
  };

  const handlePinPress = (num: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setError(false);
    const nextPin = pin + num;
    
    if (nextPin.length === 4) {
      if (nextPin === storedSettings?.pin || (!storedSettings?.pin && nextPin === '0000')) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        onAuthenticated();
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setError(true);
        setPin('');
      }
    } else {
      setPin(nextPin);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.base }]}>
      <View style={styles.content}>
        <View style={[styles.lockIcon, { backgroundColor: theme.primary + '11' }]}>
          <Lock color={theme.primary} size={32} />
        </View>
        <SectionTitle size={28}>Låst innhold</SectionTitle>
        <Text style={[styles.subtitle, { color: error ? theme.crisis : theme.textMuted }]}>
            {error ? 'Feil PIN, prøv igjen' : 'Tast PIN for å fortsette'}
        </Text>
        
        <View style={styles.pinDots}>
          {[1, 2, 3, 4].map(i => (
            <View 
              key={i} 
              style={[
                styles.dot, 
                { 
                  backgroundColor: pin.length >= i ? theme.primary : 'transparent',
                  borderColor: theme.hairline
                }
              ]} 
            />
          ))}
        </View>

        <View style={styles.keypad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'Slett'].map((num, i) => {
            if (num === '' && storedSettings?.useBiometrics) {
                return (
                    <TouchableOpacity key={i} style={styles.key} onPress={authenticateBiometrics}>
                        <Fingerprint color={theme.primary} size={28} />
                    </TouchableOpacity>
                );
            }
            return (
                <TouchableOpacity 
                    key={i} 
                    style={styles.key} 
                    onPress={() => num === 'Slett' ? setPin(pin.slice(0, -1)) : num !== '' && handlePinPress(num.toString())}
                    disabled={num === ''}
                >
                    <Text style={[styles.keyText, { color: theme.text, fontSize: num === 'Slett' ? 14 : 24 }]}>{num}</Text>
                </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  lockIcon: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  subtitle: { marginTop: 8, fontSize: 16 },
  pinDots: { flexDirection: 'row', gap: 16, marginTop: 40, marginBottom: 60 },
  dot: { width: 12, height: 12, borderRadius: 6, borderWidth: 1 },
  keypad: { flexDirection: 'row', flexWrap: 'wrap', width: 280, justifyContent: 'center', gap: 20 },
  key: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
  keyText: { fontWeight: '400' },
});
