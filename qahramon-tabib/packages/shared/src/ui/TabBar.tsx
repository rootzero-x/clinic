import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { GlassSurface } from './GlassSurface';
import { Icon, IconName } from './Icon';

export type TabItem = { key: string; label: string; icon: IconName; badge?: number };

type Props = {
  items: TabItem[];
  activeKey: string;
  onPress: (key: string) => void;
};

export const TAB_BAR_HEIGHT = 64;

/** Distance reserved at the bottom of scroll content for the floating tab bar. */
export function useTabBarInset() {
  const insets = useSafeAreaInsets();
  return Math.max(24, insets.bottom - 10) + TAB_BAR_HEIGHT + 16;
}

/** Floating glass tab bar: left/right 14, height 64, radius 32; active item = white capsule. */
export function FloatingTabBar({ items, activeKey, onPress }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View pointerEvents="box-none" style={[styles.host, { bottom: Math.max(24, insets.bottom - 10) }]}>
      <GlassSurface radius={32} tint={0.7} contentStyle={styles.row}>
        {items.map((it) => {
          const on = it.key === activeKey;
          return (
            <Pressable key={it.key} accessibilityRole="tab" accessibilityState={{ selected: on }} onPress={() => onPress(it.key)} style={styles.slot}>
              <View style={[styles.item, on && styles.itemOn]}>
                <View>
                  <Icon name={it.icon} size={22} strokeWidth={on ? 2 : 1.7} color={on ? colors.accentText : colors.secondary} />
                  {it.badge ? (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{it.badge > 99 ? '99+' : it.badge}</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={{ fontSize: 10.5, fontWeight: on ? '700' : '600', color: on ? colors.accentText : colors.secondary }} numberOfLines={1}>
                  {it.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </GlassSurface>
    </View>
  );
}

const styles = StyleSheet.create({
  host: { position: 'absolute', left: 14, right: 14, zIndex: 40 },
  row: { height: TAB_BAR_HEIGHT, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6 },
  slot: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  item: { alignItems: 'center', justifyContent: 'center', gap: 3, height: 52, minWidth: 60, paddingHorizontal: 8, borderRadius: 26 },
  itemOn: {
    backgroundColor: 'rgba(255,253,248,.95)',
    shadowColor: '#18241c',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  badge: { position: 'absolute', top: -6, right: -10, minWidth: 17, height: 17, borderRadius: 9, paddingHorizontal: 4, backgroundColor: colors.danger, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#fff', fontSize: 10.5, fontWeight: '700' },
});
