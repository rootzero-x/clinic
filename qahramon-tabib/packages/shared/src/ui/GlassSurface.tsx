import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { shadow } from '../theme';

type Props = {
  /** `light` = cream glass on page; `dark` = clear glass over photos. */
  variant?: 'light' | 'dark';
  /** Cream tint alpha for the light variant (.56–.9). */
  tint?: number;
  intensity?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  noShadow?: boolean;
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
};

/** Liquid-glass surface: blur + cream tint + white hairline + soft shadow. */
export function GlassSurface({
  variant = 'light',
  tint = 0.7,
  intensity = 45,
  radius = 24,
  style,
  contentStyle,
  children,
  noShadow,
  pointerEvents,
}: Props) {
  const dark = variant === 'dark';
  return (
    <View pointerEvents={pointerEvents} style={[{ borderRadius: radius }, !noShadow && !dark && shadow.glass, style]}>
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius: radius,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: dark ? 'rgba(255,255,255,.45)' : 'rgba(255,255,255,.9)',
          },
        ]}
      >
        <BlurView intensity={intensity} tint="light" style={StyleSheet.absoluteFill} />
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: dark ? 'rgba(255,255,255,.22)' : `rgba(255,253,248,${tint})` },
          ]}
        />
        {!dark && <View style={styles.topShine} />}
      </View>
      <View style={[{ borderRadius: radius }, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  topShine: { position: 'absolute', top: 0, left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,255,255,.95)' },
});
