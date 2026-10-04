import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, motion } from '../theme';
import { GlassSurface } from './GlassSurface';
import { Icon } from './Icon';

type Ctx = { show: (text: string) => void };
const ToastCtx = createContext<Ctx>({ show: () => {} });

export const useToast = () => useContext(ToastCtx);

/** Top-centre glass pill with a check icon; auto-hides after ~2 s. */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const insets = useSafeAreaInsets();
  const p = useSharedValue(0);

  const show = useCallback((t: string) => {
    if (timer.current) clearTimeout(timer.current);
    setText(t);
    p.value = withTiming(1, { duration: 200, easing: Easing.bezier(0.2, 0, 0.2, 1) });
    timer.current = setTimeout(() => {
      p.value = withTiming(0, { duration: 200 });
      timer.current = setTimeout(() => setText(null), 220);
    }, motion.toast);
  }, [p]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const anim = useAnimatedStyle(() => ({
    opacity: p.value,
    transform: [{ translateY: (1 - p.value) * -8 }],
  }));

  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      {text ? (
        <Animated.View pointerEvents="none" style={[styles.host, { top: insets.top + 6 }, anim]}>
          <GlassSurface radius={22} tint={0.86} contentStyle={styles.pill}>
            <Icon name="check" size={17} color={colors.accent} strokeWidth={2.2} />
            <Text style={styles.text}>{text}</Text>
          </GlassSurface>
        </Animated.View>
      ) : null}
    </ToastCtx.Provider>
  );
}

const styles = StyleSheet.create({
  host: { position: 'absolute', left: 0, right: 0, alignItems: 'center', zIndex: 1000 },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 8, height: 44, paddingHorizontal: 16 },
  text: { fontSize: 14, fontWeight: '600', color: colors.text },
});
