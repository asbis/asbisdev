import React, { useRef } from 'react';
import { Pressable, Animated, ViewStyle, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

type HapticKind = 'light' | 'medium' | 'selection' | 'success' | 'warning' | 'none';

export function haptic(kind: HapticKind = 'light') {
  if (Platform.OS === 'web') return;
  try {
    if (kind === 'light') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    else if (kind === 'medium') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    else if (kind === 'selection') Haptics.selectionAsync();
    else if (kind === 'success') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    else if (kind === 'warning') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  } catch {}
}

type Props = {
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
  disabled?: boolean;
  scale?: number;
  hapticKind?: HapticKind;
};

/** iOS-style pressable: spring-scales down on press and triggers haptic. */
export const Tap: React.FC<Props> = ({ onPress, style, children, disabled, scale = 0.96, hapticKind = 'light' }) => {
  const anim = useRef(new Animated.Value(1)).current;

  const press = () => {
    Animated.spring(anim, { toValue: scale, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  };
  const release = () => {
    Animated.spring(anim, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 10 }).start();
  };

  return (
    <Pressable
      onPressIn={() => { if (!disabled) { press(); haptic(hapticKind); } }}
      onPressOut={release}
      onPress={disabled ? undefined : onPress}
      style={({ hovered }: any) => [
        style as any,
        Platform.OS === 'web' && !disabled && { cursor: 'pointer', transition: 'opacity 0.2s', opacity: hovered ? 0.9 : 1 }
      ]}
    >
      <Animated.View style={{ transform: [{ scale: anim }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};
