import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../components/ThemeContext';
import { SectionTitle, Button } from '../components/Primitives';
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
      mood: '🌱', // Default mood
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
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.base }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={onBack}
            style={[styles.headerButton, { backgroundColor: theme.surfaceAlt }]}
          >
            <X size={20} color={theme.text} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={[styles.headerLabel, { color: theme.textFaint }]}>NYTT {type.toUpperCase()}</Text>
          </View>
          <TouchableOpacity 
            onPress={onSave}
            disabled={!text}
            style={[
              styles.saveButton, 
              { 
                backgroundColor: text ? theme.primary : theme.surfaceAlt,
                opacity: text ? 1 : 0.5 
              }
            ]}
          >
            <Check size={20} color={text ? theme.primaryInk : theme.textFaint} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <TextInput
            autoFocus
            multiline
            placeholder="Hva skjedde i dag?"
            placeholderTextColor={theme.textFaint}
            value={text}
            onChangeText={setText}
            style={[
              styles.input, 
              { 
                color: theme.text, 
                fontFamily: tokens.typography.body,
                fontSize: 20,
              }
            ]}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.tagBar}>
            {['stress', 'kveld', 'helg', 'jobb'].map(tag => {
              const active = tags.includes(tag);
              return (
                <TouchableOpacity 
                  key={tag}
                  onPress={() => toggleTag(tag)}
                  style={[
                    styles.tag, 
                    { 
                      backgroundColor: active ? theme.accent1 : theme.surfaceAlt, 
                      borderColor: active ? theme.accent1 : theme.hairline 
                    }
                  ]}
                >
                  <Text style={[styles.tagText, { color: active ? theme.primaryInk : theme.textMuted }]}>#{tag}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </KeyboardAvoidingView>
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
    gap: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLabel: {
    fontSize: 10,
    letterSpacing: 0.8,
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    lineHeight: 30,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  tagBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 13,
  },
});
