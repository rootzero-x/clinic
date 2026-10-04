import React, { useCallback, useEffect, useId, useRef } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { motion } from '../theme';
import { Icon, IconName } from './Icon';

export type SwipeAction = { label: string; icon: IconName; bg: string; onPress: () => void };

const ACTION_W = 76;
const RUBBER = 28;
const SNAP = Easing.bezier(0.2, 0.8, 0.2, 1);

/* Only one row is open at a time: a tiny module-level registry. */
let openId: string | null = null;
const closers = new Map<string, () => void>();
function claim(id: string) {
  if (openId && openId !== id) closers.get(openId)?.();
  openId = id;
}
function release(id: string) {
  if (openId === id) openId = null;
}

type Props = {
  actions: SwipeAction[];
  onPress?: () => void;
  radius?: number;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

/**
 * Swipe-to-reveal row. Drag left to reveal 76pt actions; snaps open past 38%
 * of the action width, rubber-bands 28pt, tap while open closes it.
 */
export function SwipeRow({ actions, onPress, radius = 18, style, children }: Props) {
  const id = useId();
  const W = actions.length * ACTION_W;
  const x = useSharedValue(0);
  const start = useSharedValue(0);
  const isOpen = useRef(false);

  const close = useCallback(() => {
    x.value = withTiming(0, { duration: motion.snap, easing: SNAP });
    isOpen.current = false;
    release(id);
  }, [id, x]);

  const open = useCallback(() => {
    claim(id);
    x.value = withTiming(-W, { duration: motion.snap, easing: SNAP });
    isOpen.current = true;
  }, [id, W, x]);

  useEffect(() => {
    closers.set(id, close);
    return () => {
      closers.delete(id);
      release(id);
    };
  }, [id, close]);

  const pan = Gesture.Pan()
    .activeOffsetX([-8, 8])
    .failOffsetY([-10, 10])
    .onBegin(() => {
      start.value = x.value;
    })
    .onUpdate((e) => {
      x.value = Math.max(-W - RUBBER, Math.min(0, start.value + e.translationX));
    })
    .onEnd((e) => {
      const shouldOpen = x.value < -W * 0.38 || e.velocityX < -600;
      if (shouldOpen && e.velocityX < 600) runOnJS(open)();
      else runOnJS(close)();
    });

  const rowStyle = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));

  const handleTap = () => {
    if (isOpen.current) close();
    else onPress?.();
  };

  return (
    <View style={[{ borderRadius: radius, overflow: 'hidden' }, style]}>
      <View style={[StyleSheet.absoluteFill, styles.actions]}>
        {actions.map((a) => (
          <Pressable
            key={a.label}
            accessibilityLabel={a.label}
            onPress={() => {
              close();
              a.onPress();
            }}
            style={[styles.action, { backgroundColor: a.bg }]}
          >
            <Icon name={a.icon} size={19} color="#fff" />
            <Text style={styles.actionText}>{a.label}</Text>
          </Pressable>
        ))}
      </View>
      <GestureDetector gesture={pan}>
        <Animated.View style={rowStyle}>
          <Pressable onPress={handleTap}>{children}</Pressable>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: { flexDirection: 'row', justifyContent: 'flex-end' },
  action: { width: ACTION_W, alignItems: 'center', justifyContent: 'center', gap: 4 },
  actionText: { color: '#fff', fontSize: 11.5, fontWeight: '600' },
});
