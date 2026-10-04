import React from 'react';
import { Pressable, ScrollView, StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { Chip, Icon, IconName, colors, tabular } from '@qt/shared';

/** White card: radius 18, hairline border. */
export function Card({ children, style, pad = 16, gap = 0 }: { children: React.ReactNode; style?: StyleProp<ViewStyle>; pad?: number; gap?: number }) {
  return <View style={[styles.card, { padding: pad, gap }, style]}>{children}</View>;
}

/** Grouped list container: rows sit on a 1pt hairline gap, clipped by an 18pt radius. */
export function Group({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.group, style]}>{children}</View>;
}

export function SectionLabel({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{ paddingHorizontal: 4, paddingTop: 4 }, style]}>
      <Text style={styles.label}>{children}</Text>
    </View>
  );
}

export function Avatar({ text, size = 40, bg = colors.accentFill, fg = colors.accentText, fontSize }: { text: string; size?: number; bg?: string; fg?: string; fontSize?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: fg, fontWeight: '700', fontSize: fontSize ?? Math.round(size * 0.35) }}>{text}</Text>
    </View>
  );
}

export function IconTile({ name, bg, fg, size = 34, radius = 10, iconSize = 18 }: { name: IconName; bg: string; fg: string; size?: number; radius?: number; iconSize?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: radius, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
      <Icon name={name} size={iconSize} color={fg} />
    </View>
  );
}

export function Chevron() {
  return <Icon name="chev" size={18} color={colors.placeholder} />;
}

/** Cream list row used inside a Group. */
export function ListRow({ children, onPress, style }: { children: React.ReactNode; onPress?: () => void; style?: StyleProp<ViewStyle> }) {
  const content = <View style={[styles.row, style]}>{children}</View>;
  if (!onPress) return content;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => ({ backgroundColor: pressed ? colors.raised : colors.card })}>
      {content}
    </Pressable>
  );
}

export function Empty({ icon, title, sub }: { icon: IconName; title: string; sub?: string }) {
  return (
    <View style={styles.empty}>
      <IconTile name={icon} bg={colors.inset} fg={colors.muted} size={56} radius={18} iconSize={22} />
      <Text style={{ fontSize: 17, fontWeight: '600', color: colors.text }}>{title}</Text>
      {sub ? <Text style={{ fontSize: 14, lineHeight: 21, color: colors.secondary, textAlign: 'center' }}>{sub}</Text> : null}
    </View>
  );
}

export function EmptyText({ text }: { text: string }) {
  return <Text style={{ paddingVertical: 40, paddingHorizontal: 20, textAlign: 'center', fontSize: 14, color: colors.secondary }}>{text}</Text>;
}

export function SwipeHint({ text }: { text: string }) {
  return (
    <View style={styles.hint}>
      <Icon name="swipe" size={18} color={colors.muted} />
      <Text style={{ fontSize: 12.5, color: colors.muted, flexShrink: 1 }}>{text}</Text>
    </View>
  );
}

/** Search field (44pt, radius 14). */
export function SearchField({ value, onChangeText, placeholder }: { value: string; onChangeText: (t: string) => void; placeholder: string }) {
  return (
    <View style={styles.search}>
      <Icon name="search" size={18} color={colors.muted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        style={{ flex: 1, fontSize: 15, color: colors.text, paddingVertical: 0 }}
        returnKeyType="search"
      />
    </View>
  );
}

/** Horizontal scrolling chip row with 16pt gutters. */
export function ChipsRow({ items }: { items: { label: string; selected: boolean; onPress: () => void }[] }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }} style={{ flexGrow: 0 }}>
      {items.map((c) => <Chip key={c.label} label={c.label} selected={c.selected} onPress={c.onPress} />)}
    </ScrollView>
  );
}

/** KPI tile: label, value, delta. */
export function Kpi({ label, value, delta, deltaColor, valueSize = 20 }: { label: string; value: string; delta?: string; deltaColor?: string; valueSize?: number }) {
  return (
    <View style={[styles.card, { flex: 1, padding: 14, gap: 6 }]}>
      <Text style={{ fontSize: 12.5, color: colors.muted }}>{label}</Text>
      <Text style={[{ fontSize: valueSize, fontWeight: '700', color: colors.text, letterSpacing: -0.2 }, tabular]}>{value}</Text>
      {delta ? <Text style={{ fontSize: 12, fontWeight: '600', color: deltaColor ?? colors.success }}>{delta}</Text> : null}
    </View>
  );
}

/** Small centred stat tile (value over label). */
export function StatTile({ k, v, radius = 18, valueSize = 19 }: { k: string; v: string; radius?: number; valueSize?: number }) {
  return (
    <View style={[styles.card, { flex: 1, padding: 12, alignItems: 'center', borderRadius: radius }]}>
      <Text style={[{ fontSize: valueSize, fontWeight: '700', color: colors.text }, tabular]}>{v}</Text>
      <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>{k}</Text>
    </View>
  );
}

/** Two buttons-like bordered action (call / chat). */
export function OutlineAction({ icon, label, onPress, height = 40, radius = 12 }: { icon: IconName; label: string; onPress: () => void; height?: number; radius?: number }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.outline, { height, borderRadius: radius, backgroundColor: pressed ? colors.raised : colors.card }]}
    >
      <Icon name={icon} size={18} color={colors.text} />
      <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>{label}</Text>
    </Pressable>
  );
}

/** Small 34pt square outline icon button (reorder arrows). */
export function SquareIconButton({ icon, onPress, label }: { icon: IconName; onPress: () => void; label: string }) {
  return (
    <Pressable
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={4}
      style={({ pressed }) => [styles.sq, { backgroundColor: pressed ? colors.raised : colors.card }]}
    >
      <Icon name={icon} size={18} color={colors.text} />
    </Pressable>
  );
}

/** Pill-shaped small text button (review reply/hide). */
export function PillButton({ label, onPress, tone = 'text' }: { label: string; onPress: () => void; tone?: 'text' | 'secondary' }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.pill, { backgroundColor: pressed ? colors.raised : colors.card }]}>
      <Text style={{ fontSize: 13, fontWeight: '600', color: tone === 'text' ? colors.text : colors.secondary }}>{label}</Text>
    </Pressable>
  );
}

/** Counter pill used on rows ("Ko'proq" badges, unread counts). */
export function CountPill({ n, size = 22 }: { n: number | string; size?: number }) {
  return (
    <View style={{ minWidth: size, height: size, paddingHorizontal: 6, borderRadius: size / 2, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: size > 20 ? 12 : 11.5, fontWeight: '700' }}>{n}</Text>
    </View>
  );
}

/** Inline +/- stepper with a 1pt border (inventory, product form). */
export function CountStepper({ value, onInc, onDec, size = 40, bold }: { value: number; onInc: () => void; onDec: () => void; size?: number; bold?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.borderDefault, borderRadius: 12, height: size }}>
      <Pressable accessibilityLabel="Kamaytirish" onPress={onDec} style={{ width: size, height: size - 2, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="minus" size={18} color={colors.text} />
      </Pressable>
      <Text style={[{ minWidth: size - 4, textAlign: 'center', fontWeight: bold ? '700' : '600', fontSize: 15, color: colors.text }, tabular]}>{value}</Text>
      <Pressable accessibilityLabel="Ko'paytirish" onPress={onInc} style={{ width: size, height: size - 2, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="plus" size={18} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 18 },
  group: { backgroundColor: colors.borderSubtle, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 18, overflow: 'hidden', gap: 1 },
  label: { fontSize: 13, fontWeight: '600', color: colors.muted, textTransform: 'uppercase', letterSpacing: 0.65 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: colors.card },
  empty: { alignItems: 'center', gap: 8, paddingVertical: 48, paddingHorizontal: 24 },
  hint: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 4 },
  search: { height: 44, borderRadius: 14, borderWidth: 1, borderColor: colors.borderDefault, backgroundColor: colors.card, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 8 },
  outline: { flex: 1, borderWidth: 1, borderColor: colors.borderDefault, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  sq: { width: 34, height: 34, borderRadius: 10, borderWidth: 1, borderColor: colors.borderDefault, alignItems: 'center', justifyContent: 'center' },
  pill: { height: 34, paddingHorizontal: 14, borderRadius: 17, borderWidth: 1, borderColor: colors.borderDefault, alignItems: 'center', justifyContent: 'center' },
});

export type { TextInputProps };
