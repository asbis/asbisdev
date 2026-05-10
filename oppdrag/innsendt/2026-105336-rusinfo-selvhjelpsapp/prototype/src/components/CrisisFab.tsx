import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Shield } from 'lucide-react-native';
import { useTheme, useCrisis } from './ThemeContext';
import * as Haptics from 'expo-haptics';

export const CrisisFab: React.FC<{ onPress?: () => void; style?: ViewStyle }> = ({ onPress, style }) => {
  const { theme } = useTheme();
  const { showCrisis } = useCrisis();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    if (onPress) {
        onPress();
    } else {
        showCrisis();
    }
  };

  useEffect(() => {
    const breathing = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.1, duration: 1500, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    );
    breathing.start();
    return () => breathing.stop();
  }, [scaleAnim]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          backgroundColor: theme.surface,
          borderColor: theme.crisis,
          shadowColor: theme.crisis,
        },
        style,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        style={styles.touchable}
      >
        <Shield color={theme.crisis} size={28} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20, // Lowered to sit naturally above the tab bar
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 100,
  },
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
