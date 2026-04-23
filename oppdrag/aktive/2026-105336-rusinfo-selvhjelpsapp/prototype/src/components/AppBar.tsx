import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from './ThemeContext';
import { tokens } from '../theme/tokens';

interface AppBarProps {
  title: string;
  label?: string;
  leftAction?: {
    icon: React.ReactNode;
    onPress: () => void;
  };
  rightAction?: {
    icon: React.ReactNode;
    onPress: () => void;
  };
  scrollY?: Animated.Value;
  fixed?: boolean; // If true, border/shadow is always visible
}

export const AppBar: React.FC<AppBarProps> = ({ 
  title, 
  label, 
  leftAction, 
  rightAction, 
  scrollY,
  fixed = false 
}) => {
  const { theme } = useTheme();

  // If scrollY isn't provided, we default to a non-animating 0
  const actualScrollY = scrollY || new Animated.Value(0);

  const headerShadowOpacity = fixed ? 0.05 : actualScrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [0, 0.05],
    extrapolate: 'clamp',
  });

  const headerBorderOpacity = fixed ? 1 : actualScrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerElevation = fixed ? 4 : actualScrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [0, 4],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[
      styles.appBar, 
      { 
        backgroundColor: theme.base, 
        shadowOpacity: headerShadowOpacity,
        elevation: headerElevation,
      }
    ]}>
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.appBarContent}>
        <View style={styles.appBarInner}>
          <View style={styles.actionContainer}>
            {leftAction && (
              <TouchableOpacity 
                onPress={leftAction.onPress}
                style={[styles.iconButton, { backgroundColor: theme.surfaceAlt }]}
              >
                {leftAction.icon}
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.titleContainer}>
            {label && (
              <Text style={[styles.headerLabel, { color: theme.textFaint }]}>{label.toUpperCase()}</Text>
            )}
            <Text 
              numberOfLines={1}
              style={[styles.appBarTitle, { color: theme.text, fontFamily: tokens.typography.head }]}
            >
              {title}
            </Text>
          </View>

          <View style={styles.actionContainer}>
            {rightAction && (
              <TouchableOpacity 
                onPress={rightAction.onPress}
                style={[styles.iconButton, { backgroundColor: theme.surfaceAlt }]}
              >
                {rightAction.icon}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
      <Animated.View style={[
          styles.hairline, 
          { backgroundColor: theme.hairline, opacity: headerBorderOpacity }
      ]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  appBarContent: {
    paddingBottom: 8,
  },
  appBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },
  actionContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLabel: { 
    fontSize: 9, 
    letterSpacing: 0.8,
    marginBottom: 1,
    textAlign: 'center',
  },
  appBarTitle: { 
    fontSize: 19, 
    fontWeight: '500',
    textAlign: 'center',
  },
  iconButton: { 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  hairline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
  },
});
