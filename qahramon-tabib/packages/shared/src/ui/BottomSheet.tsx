import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, motion } from '../theme';
import { GlassSurface } from './GlassSurface';

type Props = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const EASE = Easing.bezier(0.2, 0, 0.2, 1);

/** Inset 8pt, radius 34, glass .88, 38×5 grabber, scrim .33, slide-up .24s. */
export function BottomSheet({ visible, onClose, children }: Props) {
  const [mounted, setMounted] = useState(visible);
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const p = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      p.value = withTiming(1, { duration: motion.sheet, easing: EASE });
    } else if (mounted) {
      p.value = withTiming(0, { duration: motion.sheet, easing: EASE }, (done) => {
        if (done) runOnJS(setMounted)(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const scrim = useAnimatedStyle(() => ({ opacity: p.value }));
  const sheet = useAnimatedStyle(() => ({ transform: [{ translateY: (1 - p.value) * height }] }));

  if (!mounted) return null;
  return (
    <Modal transparent visible animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: colors.scrim }, scrim]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Yopish" />
        </Animated.View>
        <KeyboardAvoidingView
          pointerEvents="box-none"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.host}
        >
          <Animated.View style={[{ marginHorizontal: 8, marginBottom: Math.max(insets.bottom, 8) }, sheet]}>
            <GlassSurface radius={34} tint={0.9} intensity={60} contentStyle={styles.body}>
              <View style={styles.grabber} />
              {children}
            </GlassSurface>
          </Animated.View>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  host: { flex: 1, justifyContent: 'flex-end' },
  body: { padding: 20, paddingTop: 10, gap: 14 },
  grabber: { alignSelf: 'center', width: 38, height: 5, borderRadius: 3, backgroundColor: colors.borderStrong, marginBottom: 4 },
});
