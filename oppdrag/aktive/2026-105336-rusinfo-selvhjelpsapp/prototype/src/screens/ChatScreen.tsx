import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { AppBar } from '../components/AppBar';
import { tokens } from '../theme/tokens';
import { ChevronLeft, Send, Sparkles } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface Message { id: string; text: string; sender: 'user' | 'ai'; timestamp: Date; }

export const ChatScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([{ id: '1', text: 'Hei. Jeg er her for å lytte. Hvordan føles kroppen din akkurat nå?', sender: 'ai', timestamp: new Date() }]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsAiTyping] = useState(false);
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const onSend = () => {
    if (!inputText.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text: inputText.trim(), sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsAiTyping(true);
    setTimeout(() => {
      const responses = ["Jeg forstår. Det er helt naturlig å føle det slik i denne fasen. Pust rolig.", "Takk for at du deler det. Husk at trangen er som en bølge – den når en topp, men den går alltid ned igjen.", "Du gjør en viktig jobb akkurat nå bare ved å være her og snakke om det.", "Det krever mot å kjenne på disse følelsene uten å handle på dem."];
      const aiMsg: Message = { id: (Date.now() + 1).toString(), text: responses[Math.floor(Math.random() * responses.length)], sender: 'ai', timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
      setIsAiTyping(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 1500);
  };

  useEffect(() => {
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages, isTyping]);

  return (
    <View style={[styles.container, { backgroundColor: theme.base }]}>
      <AppBar 
        title="Kord AI Spesialist" 
        label="ANONYM SAMTALE" 
        leftAction={{ icon: <ChevronLeft size={20} color={theme.text} />, onPress: onBack }}
        rightAction={{ icon: <Sparkles size={18} color={theme.accent2} />, onPress: () => {} }}
        scrollY={scrollY}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <Animated.ScrollView 
          ref={scrollViewRef}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
          scrollEventThrottle={16}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((m) => (
            <View key={m.id} style={[styles.messageWrapper, m.sender === 'ai' ? styles.aiWrapper : styles.userWrapper]}>
              <View style={[styles.messageBubble, m.sender === 'ai' ? { backgroundColor: theme.surface, borderColor: theme.hairline, borderBottomLeftRadius: 4 } : { backgroundColor: theme.primary, borderBottomRightRadius: 4 }]}>
                <Text style={[styles.messageText, { color: m.sender === 'ai' ? theme.text : theme.primaryInk }]}>{m.text}</Text>
              </View>
              <Text style={[styles.timestamp, { color: theme.textFaint }]}>{m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </View>
          ))}
          {isTyping && <View style={[styles.messageWrapper, styles.aiWrapper]}><View style={[styles.messageBubble, { backgroundColor: theme.surfaceAlt, borderColor: theme.hairline }]}><Text style={[styles.messageText, { color: theme.textFaint }]}>Skriver...</Text></View></View>}
        </Animated.ScrollView>

        <View style={[styles.inputContainer, { borderTopColor: theme.hairline, backgroundColor: theme.base }]}>
          <TextInput placeholder="Skriv melding..." placeholderTextColor={theme.textFaint} value={inputText} onChangeText={setInputText} multiline style={[styles.input, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.hairline }]} />
          <TouchableOpacity onPress={onSend} disabled={!inputText.trim()} style={[styles.sendButton, { backgroundColor: inputText.trim() ? theme.primary : theme.surfaceAlt }]}><Send size={20} color={inputText.trim() ? theme.primaryInk : theme.textFaint} /></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  messageList: { paddingHorizontal: 20, paddingVertical: 20, gap: 20 },
  messageWrapper: { maxWidth: '85%' },
  aiWrapper: { alignSelf: 'flex-start' },
  userWrapper: { alignSelf: 'flex-end' },
  messageBubble: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 18, borderWidth: 1, borderColor: 'transparent' },
  messageText: { fontSize: 16, lineHeight: 22 },
  timestamp: { fontSize: 10, marginTop: 4, marginHorizontal: 4 },
  inputContainer: { padding: 16, flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  input: { flex: 1, borderRadius: 24, borderWidth: 1, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12, fontSize: 16, maxHeight: 100 },
  sendButton: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
});
