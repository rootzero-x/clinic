import React from 'react';
import { Pressable, ScrollView, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import {
  Button, GlassSurface, Icon, IconName, NavBar, colors, fmt, shadow, tabular, unsplash, useHeaderHeight, useTabBarInset,
  BottomActionBar, Product,
} from '@qt/shared';
import { actions, useApp } from '../store';

/* ---------- photo ---------- */
export function Photo({ id, w = 400, h = 400, style }: { id: string; w?: number; h?: number; style?: StyleProp<ViewStyle> }) {
  return <Image source={{ uri: unsplash(id, w, h) }} contentFit="cover" transition={200} style={style as never} />;
}

/* ---------- page shell: scroll content under glass nav bar ---------- */
type PageProps = {
  title?: string;
  large?: boolean;
  noHeader?: boolean;
  action?: { icon: IconName; label: string; onPress: () => void };
  /** reserve room for the floating tab bar */
  tabBar?: boolean;
  /** reserve room for a bottom action bar */
  actionBar?: boolean | 'tall';
  scrollRef?: React.RefObject<ScrollView | null>;
  children: React.ReactNode;
  gap?: number;
  padded?: boolean;
  bottomOverlay?: React.ReactNode;
};

export function Page({ title = '', large, noHeader, action, tabBar, actionBar, scrollRef, children, gap = 12, padded = true, bottomOverlay }: PageProps) {
  const headerH = useHeaderHeight(!!large);
  const tabInset = useTabBarInset();
  const bottom = tabBar ? tabInset + (actionBar ? 74 : 0) : actionBar ? (actionBar === 'tall' ? 170 : 110) : 40;
  return (
    <View style={{ flex: 1, backgroundColor: colors.page }}>
      <ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: noHeader ? 0 : headerH, paddingBottom: bottom, gap, paddingHorizontal: padded ? 16 : 0 }}
      >
        {children}
      </ScrollView>
      {noHeader ? null : <NavBar title={title} large={large} onBack={large ? undefined : () => router.back()} action={action} />}
      {bottomOverlay}
    </View>
  );
}

/* ---------- small helpers ---------- */
export const goBack = () => router.back();

export function SectionTitle({ title, action, onAction, style }: { title: string; action?: string; onAction?: () => void; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.sectionRow, style]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function Kicker({ children, color = colors.goldText, style }: { children: React.ReactNode; color?: string; style?: StyleProp<TextStyle> }) {
  return (
    <Text style={[{ fontSize: 11.5, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', color }, style]}>{children}</Text>
  );
}

export function Card({ children, style, onPress, radius = 20 }: { children: React.ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void; radius?: number }) {
  const s = [{ borderRadius: radius, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle }, style];
  if (onPress) return <Pressable onPress={onPress} style={s}>{children}</Pressable>;
  return <View style={s}>{children}</View>;
}

/** iOS grouped list: hairline-separated rows inside one rounded card. */
export function Group({ children, radius = 20 }: { children: React.ReactNode; radius?: number }) {
  return (
    <View style={{ backgroundColor: colors.borderSubtle, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: radius, overflow: 'hidden', gap: 1 }}>
      {children}
    </View>
  );
}

export function GroupLabel({ children }: { children: string }) {
  return <Text style={styles.groupLabel}>{children}</Text>;
}

export function EmptyState({ icon, title, text, cta, onCta, big }: { icon: IconName; title: string; text?: string; cta?: string; onCta?: () => void; big?: boolean }) {
  return (
    <View style={{ alignItems: 'center', gap: 8, paddingVertical: big ? 60 : 44, paddingHorizontal: 24 }}>
      <View style={{ width: big ? 64 : 56, height: big ? 64 : 56, borderRadius: big ? 20 : 18, backgroundColor: colors.inset, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={26} color={colors.muted} />
      </View>
      <Text style={{ fontSize: big ? 18 : 17, fontWeight: big ? '700' : '600', color: colors.text, textAlign: 'center' }}>{title}</Text>
      {text ? <Text style={{ fontSize: 14.5, lineHeight: 22, color: colors.secondary, textAlign: 'center' }}>{text}</Text> : null}
      {cta ? <View style={{ marginTop: 8 }}><Button title={cta} onPress={onCta} variant={big ? 'primary' : 'secondary'} /></View> : null}
    </View>
  );
}

export function Monogram({ size = 40, border = 1.5, ring = false, bg = colors.brandInk, fontSize }: { size?: number; border?: number; ring?: boolean; bg?: string; fontSize?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: ring ? size / 2 : size * 0.31, backgroundColor: bg, borderWidth: border, borderColor: colors.goldLine, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.gold, fontWeight: '800', fontSize: fontSize ?? Math.round(size * 0.31), letterSpacing: 0.3 }}>QT</Text>
    </View>
  );
}

/** Glass circle button for use over photos (back / fav / hero actions). */
export function FloatBtn({ icon, onPress, label, color = colors.text, size = 44, fill = 'none', strokeWidth, children }: {
  icon: IconName; onPress: () => void; label: string; color?: string; size?: number; fill?: string; strokeWidth?: number; children?: React.ReactNode;
}) {
  return (
    <Pressable accessibilityLabel={label} onPress={onPress} hitSlop={4}>
      <GlassSurface radius={size / 2} tint={0.55} intensity={40} contentStyle={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={size > 40 ? 22 : 20} color={color} fill={fill} strokeWidth={strokeWidth} />
        {children}
      </GlassSurface>
    </Pressable>
  );
}

export function PrimaryBar({ label, onPress, disabled, aboveTabBar, left, color }: { label: string; onPress: () => void; disabled?: boolean; aboveTabBar?: boolean; left?: React.ReactNode; color?: string }) {
  return (
    <BottomActionBar aboveTabBar={aboveTabBar}>
      {left}
      <Button
        title={label}
        onPress={onPress}
        disabled={disabled}
        size="lg"
        style={{ flex: 1, backgroundColor: disabled ? colors.disabled : color ?? colors.accent, borderColor: 'transparent', opacity: 1 }}
        textStyle={{ fontWeight: '700' }}
      />
    </BottomActionBar>
  );
}

/* ---------- product card ---------- */
export function ProductCard({ p, variant = 'grid' }: { p: Product; variant?: 'grid' | 'carousel' | 'fav' }) {
  const faved = useApp((s) => s.favs.includes(p.id));
  const off = p.old ? '−' + Math.round((1 - p.price / p.old) * 100) + '%' : '';
  const open = () => router.push(`/product/${p.id}`);
  const add = () => (p.rx ? open() : actions.addCart(p.id));
  return (
    <Pressable onPress={open} style={[styles.pCard, variant === 'carousel' && { width: 156 }, variant !== 'carousel' && { flex: 1, minWidth: 0 }]}>
      <View>
        <Photo id={p.img} style={{ width: '100%', aspectRatio: 1, borderRadius: 16 }} />
        {variant !== 'carousel' ? (
          <Pressable accessibilityLabel="Sevimlilarga" onPress={() => actions.toggleFav(p.id)} style={styles.favBtn}>
            <GlassSurface radius={16} tint={0.7} intensity={30} noShadow contentStyle={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="heart" size={16} strokeWidth={1.8} color={faved || variant === 'fav' ? colors.danger : colors.text} fill={faved || variant === 'fav' ? colors.danger : 'none'} />
            </GlassSurface>
          </Pressable>
        ) : null}
        {variant === 'grid' && p.rx ? <Pill bg={colors.danger} fg="#fff" label="Retsept bilan" small /> : null}
        {off && !(variant === 'grid' && p.rx) ? <Pill bg={colors.gold} fg={colors.brandInk} label={off} /> : null}
      </View>
      <View style={{ paddingHorizontal: 4, gap: 2 }}>
        <Text numberOfLines={2} style={styles.pName}>{p.name}</Text>
        {variant !== 'fav' ? (
          <Text style={{ fontSize: 12, color: colors.muted }}>{p.size}{variant === 'grid' ? ` · ★ ${p.rating}` : ''}</Text>
        ) : null}
      </View>
      <View style={styles.pFoot}>
        <Text style={[styles.pPrice, tabular]}>{fmt(p.price)}</Text>
        <Pressable accessibilityLabel="Savatga" onPress={add} style={styles.addBtn}>
          <Icon name="plus" size={18} color="#fff" />
        </Pressable>
      </View>
    </Pressable>
  );
}

function Pill({ bg, fg, label, small }: { bg: string; fg: string; label: string; small?: boolean }) {
  return (
    <View style={{ position: 'absolute', top: 8, left: 8, height: 22, paddingHorizontal: 8, borderRadius: 11, backgroundColor: bg, justifyContent: 'center' }}>
      <Text style={{ color: fg, fontSize: small ? 11 : 11.5, fontWeight: '700' }}>{label}</Text>
    </View>
  );
}

/** Two-column grid of products. */
export function ProductGrid({ items, variant = 'grid' }: { items: Product[]; variant?: 'grid' | 'fav' }) {
  const rows: Product[][] = [];
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2));
  return (
    <View style={{ gap: 10 }}>
      {rows.map((r, i) => (
        <View key={i} style={{ flexDirection: 'row', gap: 10 }}>
          {r.map((p) => <ProductCard key={p.id} p={p} variant={variant} />)}
          {r.length === 1 ? <View style={{ flex: 1 }} /> : null}
        </View>
      ))}
    </View>
  );
}

export function useSwipeInset() { return useTabBarInset(); }

const styles = StyleSheet.create({
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingHorizontal: 4 },
  sectionTitle: { fontSize: 19, fontWeight: '700', letterSpacing: -0.19, color: colors.text },
  sectionAction: { fontSize: 14, fontWeight: '600', color: colors.accentText },
  groupLabel: { fontSize: 13, fontWeight: '600', color: colors.muted, textTransform: 'uppercase', letterSpacing: 0.65, paddingHorizontal: 4 },
  pCard: { borderRadius: 22, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle, padding: 8, gap: 8 },
  favBtn: { position: 'absolute', top: 8, right: 8 },
  pName: { fontSize: 14, fontWeight: '600', color: colors.text, lineHeight: 18, height: 36 },
  pFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 4, paddingRight: 2, paddingBottom: 2 },
  pPrice: { fontSize: 14.5, fontWeight: '700', color: colors.text },
  addBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
});

export { shadow };
