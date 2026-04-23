import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { tokens } from '../theme/tokens';
import * as Haptics from 'expo-haptics';

export const Button: React.FC<{
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
}> = ({ children, onPress, variant = 'primary', style }) => {
  const { theme } = useTheme();
  const isPrimary = variant === 'primary';

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={[
        styles.button,
        {
          backgroundColor: isPrimary ? theme.primary : 'transparent',
          borderWidth: isPrimary ? 0 : 1,
          borderColor: isPrimary ? 'transparent' : theme.hairline,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color: isPrimary ? theme.primaryInk : theme.text,
            fontFamily: tokens.typography.body,
          },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export const Card: React.FC<{ children: React.ReactNode; style?: ViewStyle }> = ({ children, style }) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.hairline,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export const SectionTitle: React.FC<{ children: React.ReactNode; size?: number; style?: TextStyle }> = ({
  children,
  size = 24,
  style,
}) => {
  const { theme } = useTheme();
  return (
    <Text
      style={[
        styles.sectionTitle,
        {
          color: theme.text,
          fontSize: size,
          fontFamily: tokens.typography.head,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; style?: ViewStyle }> = ({ children, style }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.badge, { borderColor: theme.hairline }, style]}>
      <Text style={[styles.badgeText, { color: theme.textMuted }]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: tokens.radii.xl,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  card: {
    borderRadius: tokens.radii.xl,
    padding: 22,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: 'normal',
    letterSpacing: -0.5,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
  },
});
