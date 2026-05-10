import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, PanResponder, TouchableWithoutFeedback, Modal, Platform } from 'react-native';
import { useTheme } from './ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ 
  isVisible, 
  onClose, 
  children,
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  
  // Local state to keep the Modal mounted during the closing animation
  const [actuallyVisible, setActuallyVisible] = useState(isVisible);
  
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    if (isVisible) {
      setActuallyVisible(true);
      // Small delay to ensure Modal is mounted before animating
      requestAnimationFrame(() => {
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 9,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setActuallyVisible(false);
      });
    }
  }, [isVisible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return isAtTop && gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 120 || gestureState.vy > 0.5) {
          onClose();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 9,
          }).start();
        }
      },
    })
  ).current;

  if (!actuallyVisible && !isVisible) return null;

  return (
    <Modal
      visible={actuallyVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View 
            style={[
              styles.backdrop, 
              { 
                backgroundColor: 'rgba(0,0,0,0.5)',
                opacity: backdropOpacity 
              }
            ]} 
          />
        </TouchableWithoutFeedback>
        
        <Animated.View 
          {...panResponder.panHandlers}
          style={[
            styles.sheet, 
            { 
              backgroundColor: theme.base,
              height: SCREEN_HEIGHT - insets.top - 10,
              transform: [{ translateY }],
            }
          ]}
        >
          <View style={styles.handleContainer}>
            <View style={[styles.handle, { backgroundColor: theme.hairline }]} />
          </View>
          
          <View style={styles.content}>
            {React.Children.map(children, child => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child as any, { 
                  onScrollAtTop: (atTop: boolean) => setIsAtTop(atTop) 
                });
              }
              return child;
            })}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    width: '100%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 24,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: 'transparent',
    zIndex: 100,
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 3,
  },
  content: {
    flex: 1,
  },
});
