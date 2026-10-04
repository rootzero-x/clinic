import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Svg, { Defs, RadialGradient, Rect, Stop, Path } from 'react-native-svg';
import Animated, {
  Easing, cancelAnimation, useAnimatedProps, useAnimatedStyle, useReducedMotion, useSharedValue, withDelay,
  withRepeat, withSequence, withTiming, WithTimingConfig,
} from 'react-native-reanimated';
import { colors, motion } from '@qt/shared';

const AnimatedPath = Animated.createAnimatedComponent(Path);

/** 0→1 progress with delay; `loop` repeats. Jumps to 1 when reduced motion is on. */
function useProgress(delay: number, duration: number, opts?: { loop?: boolean; easing?: WithTimingConfig['easing']; reduced?: boolean }) {
  const p = useSharedValue(opts?.reduced ? 1 : 0);
  useEffect(() => {
    if (opts?.reduced) { p.value = 1; return; }
    const anim = withTiming(1, { duration, easing: opts?.easing ?? Easing.bezier(0.2, 0.8, 0.2, 1) });
    p.value = opts?.loop
      ? withDelay(delay, withRepeat(withSequence(anim, withTiming(0, { duration: 0 })), -1, false))
      : withDelay(delay, anim);
    return () => cancelAnimation(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts?.reduced]);
  return p;
}

function Ring({ index, reduced }: { index: number; reduced: boolean }) {
  const p = useProgress(200 + index * 550, 2600, { loop: true, easing: Easing.bezier(0.2, 0.6, 0.3, 1), reduced: false });
  const style = useAnimatedStyle(() => ({
    opacity: reduced ? 0 : 0.55 * (1 - p.value),
    transform: [{ scale: 0.5 + 2.7 * p.value }],
  }));
  return <Animated.View style={[styles.ring, style]} />;
}

function Glow({ reduced }: { reduced: boolean }) {
  const p = useSharedValue(0);
  useEffect(() => {
    if (reduced) { p.value = 0.5; return; }
    p.value = withRepeat(withSequence(withTiming(1, { duration: 1500 }), withTiming(0, { duration: 1500 })), -1);
    return () => cancelAnimation(p);
  }, [reduced, p]);
  const style = useAnimatedStyle(() => ({ opacity: 0.35 + 0.35 * p.value }));
  return (
    <Animated.View style={[styles.glow, style]}>
      <Svg width={420} height={420}>
        <Defs>
          <RadialGradient id="g" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor="#d9b45f" stopOpacity={0.22} />
            <Stop offset="0.65" stopColor="#d9b45f" stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect width={420} height={420} fill="url(#g)" />
      </Svg>
    </Animated.View>
  );
}

function Letter({ ch, i, gold, reduced }: { ch: string; i: number; gold: boolean; reduced: boolean }) {
  const p = useProgress(900 + i * 45, 600, { reduced });
  const style = useAnimatedStyle(() => ({ opacity: p.value, transform: [{ translateY: (1 - p.value) * 16 }] }));
  return <Animated.Text style={[styles.letter, { color: gold ? colors.gold : '#fff' }, style]}>{ch}</Animated.Text>;
}

function Fade({ delay, children, reduced }: { delay: number; children: React.ReactNode; reduced: boolean }) {
  const p = useProgress(delay, 700, { easing: Easing.out(Easing.quad), reduced });
  const style = useAnimatedStyle(() => ({ opacity: p.value, transform: [{ translateY: (1 - p.value) * 16 }] }));
  return <Animated.View style={style}>{children}</Animated.View>;
}

export default function Splash() {
  const reduced = useReducedMotion();
  const pop = useProgress(0, 900, { reduced });
  const draw = useProgress(350, 1400, { easing: Easing.out(Easing.quad), reduced });
  const shine = useProgress(1400, 1200, { easing: Easing.inOut(Easing.quad), reduced: false });
  const bar = useProgress(200, 3200, { easing: Easing.linear, reduced });

  useEffect(() => {
    const t = setTimeout(() => router.replace('/onboarding'), motion.splash);
    return () => clearTimeout(t);
  }, []);

  const tile = useAnimatedStyle(() => {
    const k = pop.value;
    const scale = k < 0.6 ? 0.4 + (0.68 * k) / 0.6 : 1.08 - 0.08 * ((k - 0.6) / 0.4);
    const rot = k < 0.6 ? -12 + 14 * (k / 0.6) : 2 - 2 * ((k - 0.6) / 0.4);
    return { opacity: Math.min(1, k / 0.4), transform: [{ scale }, { rotate: `${rot}deg` }] };
  });
  const leafProps = useAnimatedProps(() => ({ strokeDashoffset: 80 * (1 - draw.value) }));
  const sheen = useAnimatedStyle(() => ({ transform: [{ translateX: -56 + 190 * shine.value }, { skewX: '-20deg' }], opacity: shine.value > 0 && shine.value < 1 ? 1 : 0 }));
  const barStyle = useAnimatedStyle(() => ({ width: `${bar.value * 100}%` }));

  const word = 'Qahramon Tabib'.split('');
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <Glow reduced={reduced} />
      {[0, 1, 2].map((i) => <Ring key={i} index={i} reduced={reduced} />)}
      <Animated.View style={[styles.tile, tile]}>
        <Svg width={58} height={58} viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
          <AnimatedPath d="M5 19C5 10 10 5 20 4c0 10-5 15-14 15zM5 19l8-8" strokeDasharray="80" animatedProps={leafProps} />
        </Svg>
        <Animated.View style={[styles.sheen, sheen]} />
      </Animated.View>
      <View style={{ flexDirection: 'row', marginTop: 28 }}>
        {word.map((ch, i) => <Letter key={i} ch={ch === ' ' ? ' ' : ch} i={i} gold={i > 8} reduced={reduced} />)}
      </View>
      <View style={{ marginTop: 10 }}>
        <Fade delay={1750} reduced={reduced}>
          <Text style={styles.tag}>Tabiiy shifo · ishonchli maslahat</Text>
        </Fade>
      </View>
      <View style={styles.barTrack}>
        <Animated.View style={[styles.barFill, barStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.brandInk, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  glow: { position: 'absolute', width: 420, height: 420 },
  ring: { position: 'absolute', width: 120, height: 120, borderRadius: 60, borderWidth: 1, borderColor: 'rgba(217,180,95,.55)' },
  tile: {
    width: 108, height: 108, borderRadius: 34, backgroundColor: 'rgba(255,255,255,.08)', borderWidth: 1, borderColor: 'rgba(217,180,95,.6)',
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  sheen: { position: 'absolute', top: 0, bottom: 0, width: 40, backgroundColor: 'rgba(255,255,255,.28)' },
  letter: { fontSize: 32, fontWeight: '700', letterSpacing: -0.3 },
  tag: { fontSize: 13.5, letterSpacing: 1.9, textTransform: 'uppercase', color: 'rgba(255,255,255,.7)' },
  barTrack: { position: 'absolute', bottom: 70, width: 120, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,.12)', overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: colors.gold, borderRadius: 2 },
});
