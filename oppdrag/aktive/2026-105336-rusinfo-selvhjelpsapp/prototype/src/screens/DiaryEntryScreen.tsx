import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { AppBar } from '../components/AppBar';
import { tokens } from '../theme/tokens';
import { Storage } from '../lib/storage';
import { X, Check } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export const DiaryEntryScreen: React.FC<{ route: any; onBack: () => void }> = ({ route, onBack }) => {
  const { theme } = useTheme();
  const { type = 'Notat' } = route.params || {};
  const [text, setText] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const onSave = async () => {
    const entry = {
      id: Date.now().toString(),
      type,
      title: text.split('\n')[0].slice(0, 40),
      body: text.split('\n').slice(1).join('\n'),
      tags,
      mood: '🌱',
      date: new Date().toLocaleDateString('nb-NO', { day: '2-digit', month: 'short' }),
      weekday: new Date().toLocaleDateString('nb-NO', { weekday: 'long' }),
      createdAt: new Date().toISOString(),
    };
    await Storage.saveEntry(entry);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onBack();
  };

  const toggleTag = (tag: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (tags.includes(tag)) { setTags(tags.filter(t => t !== tag)); }
    else { setTags([...tags, tag]); }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.base }]}>
      <AppBar 
        title={`Nytt ${type}`} 
        leftAction={{ icon: <X size={20} color={theme.text} />, onPress: onBack }}
        rightAction={{ icon: <Check size={20} color={text ? theme.primaryInk : theme.textFaint} />, onPress: onSave }}
        fixed
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.content}>
          <TextInput autoFocus multiline placeholder="Hva skjedde i dag?" placeholderTextColor={theme.textFaint} value={text} onChangeText={setText} style={[styles.input, { color: theme.text, fontFamily: tokens.typography.body, fontSize: 20 }]} />
        </View>

        <View style={styles.footer}>
          <View style={styles.tagBar}>
            {['stress', 'kveld', 'helg', 'jobb'].map(tag => {
              const active = tags.includes(tag);
              return (
                <TouchableOpacity key={tag} onPress={() => toggleTag(tag)} style={[styles.tag, { backgroundColor: active ? theme.accent1 : theme.surfaceAlt, borderColor: active ? theme.accent1 : theme.hairline }]}>
                  <Text style={[styles.tagText, { color: active ? theme.primaryInk : theme.textMuted }]}>#{tag}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 24 },
  input: { flex: 1, textAlignVertical: 'top', lineHeight: 30 },
  footer: { padding: 20, paddingBottom: 40 },
  tagBar: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1 },
  tagText: { fontSize: 13 },
});
