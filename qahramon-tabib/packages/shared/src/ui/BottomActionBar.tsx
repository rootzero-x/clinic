import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassSurface } from './GlassSurface';

type Props = {
  children: React.ReactNode;
  /** Lift the bar above the floating tab bar (cart). */
  aboveTabBar?: boolean;
};

/** Floating glass capsule (radius 30, padding 8) holding a 48pt pill primary button. */
export function BottomActionBar({ children, aboveTabBar }: Props) {
  const insets = useSafeAreaInsets();
  const base = Math.max(24, insets.bottom - 10);
  return (
    <View pointerEvents="box-none" style={[styles.host, { bottom: aboveTabBar ? base + 74 : base }]}>
      <GlassSurface radius={30} tint={0.72} contentStyle={styles.row}>
        {children}
      </GlassSurface>
    </View>
  );
}

const styles = StyleSheet.create({
  host: { position: 'absolute', left: 14, right: 14, zIndex: 45 },
  row: { padding: 8, flexDirection: 'row', alignItems: 'center', gap: 8 },
});
