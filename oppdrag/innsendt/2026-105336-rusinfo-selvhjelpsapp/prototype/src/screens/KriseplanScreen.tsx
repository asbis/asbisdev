import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ScrollView, Dimensions, KeyboardAvoidingView, TextInput, Platform, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../components/ThemeContext';
import { Card, Button } from '../components/Primitives';
import { X, Phone, ChevronRight, Sparkles, ChevronLeft, Send } from 'lucide-react-native';
import { Storage } from '../lib/storage';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const KriseplanScreen: React.FC<{ onClose: () => void; onScrollAtTop?: (atTop: boolean) => void }> = ({ 
  onClose,
  onScrollAtTop 
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [currentView, setCurrentView] = useState<'plan' | 'chat'>('plan');
  const [contact, setContact] = useState({ name: 'Siri', phone: '+47 •• •• •• ••' });
  
  const scrollYPlan = useRef(new Animated.Value(0)).current;
  const scrollYChat = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const breathAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadSettings();
    Animated.loop(
      Animated.sequence([
        Animated.timing(breathAnim, { toValue: 1, duration: 4200, useNativeDriver: true }),
        Animated.timing(breathAnim, { toValue: 0, duration: 4200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const loadSettings = async () => {
    const settings = await Storage.getSettings();
    if (settings.contact) {
        setContact(settings.contact);
    }
  };

  const navigateToChat = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCurrentView('chat');
    Animated.spring(slideAnim, { toValue: 1, useNativeDriver: true, tension: 40, friction: 9 }).start();
  };

  const navigateBackToPlan = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 40, friction: 9 }).start(() => setCurrentView('plan'));
  };

  const handleCall = (phone: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Linking.openURL(`tel:${phone}`);
  };

  const activeScrollY = currentView === 'plan' ? scrollYPlan : scrollYChat;
  const headerShadowOpacity = activeScrollY.interpolate({ inputRange: [0, 20], outputRange: [0, 0.12], extrapolate: 'clamp' });
  const headerBorderOpacity = activeScrollY.interpolate({ inputRange: [0, 20], outputRange: [0, 1], extrapolate: 'clamp' });
  const scale = breathAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.4] });
  const opacity = breathAnim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.1] });

  return (
    <View style={styles.container}>
      <View style={styles.headerClipWrapper}>
        <Animated.View style={[styles.header, { backgroundColor: theme.base, shadowOpacity: headerShadowOpacity, elevation: activeScrollY.interpolate({ inputRange: [0, 20], outputRange: [0, 5], extrapolate: 'clamp' }) }]}>
            <View style={styles.headerInner}>
                <View style={styles.headerLeft}>{currentView === 'chat' && (<TouchableOpacity onPress={navigateBackToPlan} style={styles.iconButton}><ChevronLeft size={24} color={theme.text} /></TouchableOpacity>)}</View>
                <View style={styles.titleContainer}>
                    <Text style={[styles.headerLabel, { color: theme.textFaint }]}>{currentView === 'plan' ? 'KRISEPLAN' : 'ANONYM SAMTALE'}</Text>
                    <Text style={[styles.headerTitle, { color: theme.text, fontFamily: 'InstrumentSerif' }]}>{currentView === 'plan' ? 'Du er her. Pust.' : 'Kord AI Spesialist'}</Text>
                </View>
                <View style={styles.headerRight}><TouchableOpacity onPress={onClose} style={styles.iconButton}><X size={20} color={theme.text} /></TouchableOpacity></View>
            </View>
            <Animated.View style={[styles.headerHairline, { backgroundColor: theme.hairline, opacity: headerBorderOpacity }]} />
        </Animated.View>
      </View>

      <View style={styles.contentWrapper}>
        <Animated.View style={[styles.slideContainer, { transform: [{ translateX: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -SCREEN_WIDTH] }) }] }]}>
          <Animated.ScrollView onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollYPlan } } }], { useNativeDriver: true, listener: (e: any) => onScrollAtTop?.(e.nativeEvent.contentOffset.y <= 0) })} scrollEventThrottle={16} style={styles.viewPage} contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 60 }]} showsVerticalScrollIndicator={false}>
            <View style={styles.breathSection}>
              <View style={styles.breathWrapper}>
                <Animated.View style={[styles.breathCircle, { backgroundColor: theme.crisis, transform: [{ scale }], opacity }]} />
                <Animated.View style={[styles.breathRing, { borderColor: theme.crisis, transform: [{ scale: Animated.multiply(scale, 0.8) }], opacity: 0.5 }]} />
                <View style={styles.breathLabelContainer}><Text style={[styles.breathLabel, { color: theme.text }]}>pust</Text></View>
              </View>
            </View>

            <Card style={styles.stepsCard}>
              {['Pust ut lengre enn inn. Fire ganger.', 'Drikk et glass vann, stående.', 'Skriv ned hva kroppen kjenner nå.', 'Gå ut eller åpne et vindu.'].map((s, i, a) => (
                <View key={i} style={[styles.stepRow, { borderBottomWidth: i < a.length - 1 ? 1 : 0, borderBottomColor: theme.hairline }]}><View style={[styles.stepNumber, { borderColor: theme.accent2 }]}><Text style={[styles.stepNumberText, { color: theme.accent2 }]}>{i + 1}</Text></View><Text style={[styles.stepText, { color: theme.text }]}>{s}</Text></View>
              ))}
            </Card>

            <Card style={styles.callCard}>
              <Text style={[styles.callLabel, { color: theme.textFaint }]}>RING NOEN</Text>
              <View style={styles.contactRow}>
                <View style={[styles.contactAvatar, { backgroundColor: theme.accent1 + '22', borderColor: theme.hairline }]}><Text style={[styles.avatarText, { color: theme.text }]}>{contact.name.charAt(0)}</Text></View>
                <View style={{ flex: 1 }}><Text style={[styles.contactName, { color: theme.text }]}>{contact.name}</Text><Text style={[styles.contactPhone, { color: theme.textMuted }]}>{contact.phone}</Text></View>
                <Button onPress={() => handleCall(contact.phone)} style={styles.callButton}>Ring</Button>
              </View>
            </Card>

            <TouchableOpacity activeOpacity={0.8} onPress={navigateToChat} style={[styles.actionButton, { backgroundColor: theme.surface, borderColor: theme.accent2, borderWidth: 1, marginBottom: 12 }]}><View style={[styles.actionIcon, { backgroundColor: theme.accent2 + '22' }]}><Sparkles size={20} color={theme.accent2} /></View><View style={{ flex: 1 }}><Text style={[styles.actionTitle, { color: theme.text }]}>Snakk med Kord AI</Text><Text style={[styles.actionSub, { color: theme.textMuted }]}>Anonym samtale for støtte nå</Text></View><ChevronRight size={16} color={theme.textFaint} /></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleCall('08588')} style={[styles.emergencyButton, { backgroundColor: theme.crisis }]}><View style={styles.actionIcon}><Phone size={22} color={theme.primaryInk} /></View><View style={{ flex: 1 }}><Text style={[styles.actionTitle, { color: theme.primaryInk }]}>Ring RUSinfo</Text><Text style={[styles.actionSub, { color: theme.primaryInk, opacity: 0.85 }]}>08588 · alltid åpen</Text></View><ChevronRight size={16} color={theme.primaryInk} /></TouchableOpacity>
          </Animated.ScrollView>
          <View style={styles.viewPage}><ChatInSheet scrollY={scrollYChat} onScrollAtTop={onScrollAtTop} /></View>
        </Animated.View>
      </View>
    </View>
  );
};

const ChatInSheet: React.FC<{ scrollY: Animated.Value, onScrollAtTop?: (atTop: boolean) => void }> = ({ scrollY, onScrollAtTop }) => {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();
    const [messages, setMessages] = useState<any[]>([{ id: '1', text: 'Hei. Jeg er her for å lytte. Hvordan føles kroppen din akkurat nå?', sender: 'ai' }]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsAiTyping] = useState(false);
    const scrollRef = useRef<Animated.ScrollView>(null);

    const onSend = () => {
        if (!inputText.trim()) return;
        setMessages(prev => [...prev, { id: Date.now().toString(), text: inputText.trim(), sender: 'user' }]);
        setInputText('');
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIsAiTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { id: (Date.now()+1).toString(), text: "Jeg forstår. Det er helt naturlig å føle det slik. Pust rolig.", sender: 'ai' }]);
            setIsAiTyping(false);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }, 1500);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} keyboardVerticalOffset={80}>
            <Animated.ScrollView ref={scrollRef} onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })} onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true, listener: (e: any) => onScrollAtTop?.(e.nativeEvent.contentOffset.y <= 0) })} scrollEventThrottle={16} style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 20 }}>
                {messages.map(m => (<View key={m.id} style={[styles.msgWrapper, m.sender === 'ai' ? styles.msgAi : styles.msgUser]}><View style={[styles.msgBubble, m.sender === 'ai' ? { backgroundColor: theme.surface, borderColor: theme.hairline } : { backgroundColor: theme.primary }]}><Text style={{ color: m.sender === 'ai' ? theme.text : theme.primaryInk, fontSize: 16 }}>{m.text}</Text></View></View>))}
                {isTyping && <Text style={{ color: theme.textFaint, marginLeft: 10, fontSize: 12 }}>Skriver...</Text>}
            </Animated.ScrollView>
            <View style={[styles.chatInputRow, { borderTopColor: theme.hairline, paddingBottom: Math.max(insets.bottom, 16) }]}><TextInput placeholder="Skriv melding..." value={inputText} onChangeText={setInputText} style={[styles.chatInput, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.hairline }]} /><TouchableOpacity onPress={onSend} style={[styles.sendBtn, { backgroundColor: inputText ? theme.primary : theme.surfaceAlt }]}><Send size={20} color={inputText ? theme.primaryInk : theme.textFaint} /></TouchableOpacity></View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerClipWrapper: { overflow: 'hidden', paddingBottom: 20, marginBottom: -20, zIndex: 10 },
  header: { shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowRadius: 6 },
  headerInner: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, height: 64, paddingTop: 8 },
  headerLeft: { width: 40 },
  headerRight: { width: 40 },
  headerHairline: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 1 },
  titleContainer: { flex: 1, alignItems: 'center' },
  headerLabel: { fontSize: 10, letterSpacing: 0.8, marginBottom: 2 },
  headerTitle: { fontSize: 22, fontWeight: '500' },
  iconButton: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  contentWrapper: { flex: 1, overflow: 'hidden' },
  slideContainer: { flexDirection: 'row', flex: 1, width: SCREEN_WIDTH * 2 },
  viewPage: { width: SCREEN_WIDTH, flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10 },
  breathSection: { alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
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
  msgWrapper: { marginBottom: 16, maxWidth: '85%' },
  msgAi: { alignSelf: 'flex-start' },
  msgUser: { alignSelf: 'flex-end' },
  msgBubble: { padding: 12, borderRadius: 16, borderWidth: 1, borderColor: 'transparent' },
  chatInputRow: { flexDirection: 'row', padding: 16, gap: 10, alignItems: 'center' },
  chatInput: { flex: 1, borderRadius: 20, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 10, fontSize: 16 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' }
});
