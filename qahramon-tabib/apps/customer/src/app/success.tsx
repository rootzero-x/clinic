import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  Easing, cancelAnimation, useAnimatedProps, useAnimatedStyle, useReducedMotion, useSharedValue, withDelay, withRepeat,
  withSequence, withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, ICON_PATHS, colors, fmt } from '@qt/shared';
import { useApp } from '../store';

const AnimatedPath = Animated.createAnimatedComponent(Path);

function Pulse({ delay, reduced }: { delay: number; reduced: boolean }) {
  const p = useSharedValue(0);
  useEffect(() => {
    if (reduced) return;
    p.value = withDelay(delay, withRepeat(withSequence(withTiming(1, { duration: 1800, easing: Easing.out(Easing.quad) }), withTiming(0, { duration: 0 })), -1));
    return () => cancelAnimation(p);
  }, [delay, p, reduced]);
  const style = useAnimatedStyle(() => ({ opacity: reduced ? 0 : 0.55 * (1 - p.value), transform: [{ scale: 0.5 + 2.7 * p.value }] }));
  return <Animated.View style={[styles.pulse, style]} />;
}

export default function Success() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const orders = useApp((s) => s.orders);
  const insets = useSafeAreaInsets();
  const reduced = useReducedMotion();
  const order = orders.find((o) => o.id === id) ?? orders[0];
  const pop = useSharedValue(reduced ? 1 : 0);
  const draw = useSharedValue(reduced ? 1 : 0);

  useEffect(() => {
    if (reduced) return;
    pop.value = withTiming(1, { duration: 700, easing: Easing.bezier(0.2, 0.8, 0.2, 1) });
    draw.value = withDelay(350, withTiming(1, { duration: 700, easing: Easing.out(Easing.quad) }));
  }, [reduced, pop, draw]);

  const circle = useAnimatedStyle(() => {
    const k = pop.value;
    const scale = k < 0.6 ? 0.4 + (0.68 * k) / 0.6 : 1.08 - 0.08 * ((k - 0.6) / 0.4);
    return { opacity: Math.min(1, k / 0.4), transform: [{ scale }, { rotate: `${k < 0.6 ? -12 + 14 * (k / 0.6) : 2 - 2 * ((k - 0.6) / 0.4)}deg` }] };
  });
  const check = useAnimatedProps(() => ({ strokeDashoffset: 80 * (1 - draw.value) }));

  return (
    <View style={[styles.root, { paddingTop: insets.top + 60, paddingBottom: Math.max(insets.bottom, 20) + 16 }]}>
      <View style={{ width: 110, height: 110, alignItems: 'center', justifyContent: 'center' }}>
        <Pulse delay={300} reduced={reduced} />
        <Pulse delay={800} reduced={reduced} />
        <Animated.View style={[styles.circle, circle]}>
          <Svg width={46} height={46} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <AnimatedPath d={ICON_PATHS.check} strokeDasharray="80" animatedProps={check} />
          </Svg>
        </Animated.View>
      </View>
      <Text style={styles.h1}>Buyurtma qabul qilindi</Text>
      <Text style={styles.sub}>{`Buyurtma ${order?.id ?? ''} · ${fmt(order?.total ?? 0)}. Yig'ilishi bilan kuryer siz bilan bog'lanadi.`}</Text>
      <View style={{ alignSelf: 'stretch', gap: 8, marginTop: 20 }}>
        <Button title="Buyurtmani kuzatish" size="lg" fullWidth onPress={() => router.replace({ pathname: '/tracking/[id]', params: { id: order?.id ?? '' } })} />
        <Button title="Bosh sahifaga" variant="secondary" size="lg" fullWidth onPress={() => router.replace('/home')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.page, alignItems: 'center', paddingHorizontal: 28, gap: 12 },
  pulse: { position: 'absolute', width: 110, height: 110, borderRadius: 55, borderWidth: 2, borderColor: 'rgba(47,90,64,.35)' },
  circle: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', shadowColor: colors.accent, shadowOpacity: 0.35, shadowRadius: 20, shadowOffset: { width: 0, height: 16 }, elevation: 8 },
  h1: { fontSize: 26, fontWeight: '700', color: colors.text, letterSpacing: -0.52, marginTop: 12, textAlign: 'center' },
  sub: { fontSize: 15, lineHeight: 22.5, color: colors.secondary, textAlign: 'center' },
});
