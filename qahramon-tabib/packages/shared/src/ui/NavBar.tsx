import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, type } from '../theme';
import { GlassSurface } from './GlassSurface';
import { Icon, IconName } from './Icon';

const LARGE = 64;
const SMALL = 52;

/** Height the header occupies below the status bar; add `insets.top` for the full figure. */
export function useHeaderHeight(large: boolean) {
  const insets = useSafeAreaInsets();
  return insets.top + (large ? LARGE : SMALL) + 6;
}

type Action = { icon: IconName; label: string; onPress: () => void };

type Props = {
  title: string;
  /** Tab roots: 31pt large title. Pushed screens: 52pt bar with back button. */
  large?: boolean;
  onBack?: () => void;
  action?: Action;
  /** Small muted line above a large title (admin dashboard date). */
  kicker?: string;
};

export function CircleButton({ icon, onPress, label, color = colors.text, size = 40 }: { icon: IconName; onPress: () => void; label: string; color?: string; size?: number }) {
  return (
    <Pressable accessibilityLabel={label} onPress={onPress} hitSlop={4}>
      <GlassSurface radius={size / 2} tint={0.72} contentStyle={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={20} color={color} />
      </GlassSurface>
    </Pressable>
  );
}

export function NavBar({ title, large, onBack, action, kicker }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.host, { height: insets.top + (large ? LARGE : SMALL) }]} pointerEvents="box-none">
      <GlassSurface
        radius={0}
        tint={0.78}
        noShadow
        style={StyleSheet.absoluteFill}
        contentStyle={StyleSheet.absoluteFill}
      />
      <View style={[styles.hairline]} pointerEvents="none" />
      {large ? (
        <View style={[styles.row, { paddingTop: insets.top }]}>
          <View style={{ flex: 1 }}>
            {kicker ? <Text style={styles.kicker}>{kicker}</Text> : null}
            <Text style={type.largeTitle} numberOfLines={1}>{title}</Text>
          </View>
          {action ? <CircleButton icon={action.icon} label={action.label} onPress={action.onPress} /> : null}
        </View>
      ) : (
        <View style={[styles.row, { paddingTop: insets.top }]}>
          {onBack ? <CircleButton icon="back" label="Orqaga" onPress={onBack} /> : <View style={{ width: 40 }} />}
          <Text style={[type.navTitle, styles.center]} numberOfLines={1}>{title}</Text>
          {action ? <CircleButton icon={action.icon} label={action.label} onPress={action.onPress} /> : <View style={{ width: 40 }} />}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  host: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50 },
  hairline: { position: 'absolute', left: 0, right: 0, bottom: 0, height: StyleSheet.hairlineWidth, backgroundColor: colors.borderDefault },
  row: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingBottom: 6 },
  center: { flex: 1, textAlign: 'center' },
  kicker: { fontSize: 12.5, fontWeight: '500', color: colors.muted },
});
