import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AIL, AIMG, Button, GlassSurface, Icon, IconName, colors, productById } from '@qt/shared';
import { Card, Kicker, Page, Photo, ProductCard, SectionTitle } from '../../components/common';
import { actions, useApp } from '../../store';

const QUICK: { label: string; icon: IconName; bg: string; fg: string; go: () => void }[] = [
  { label: "Do'kon", icon: 'leaf', bg: colors.accentFill, fg: colors.accentText, go: () => { actions.openShop(); router.navigate('/shop'); } },
  { label: 'Maslahat', icon: 'video', bg: colors.goldFill, fg: colors.goldText, go: () => router.navigate('/consult') },
  { label: 'Retsept', icon: 'rx', bg: colors.dangerFill, fg: colors.danger, go: () => router.push('/rx') },
  { label: 'Savol', icon: 'chat', bg: colors.infoFill, fg: colors.info, go: () => router.push('/chat') },
];

export default function Home() {
  const insets = useSafeAreaInsets();
  const user = useApp((s) => s.user);
  const notifs = useApp((s) => s.notifs);
  const articles = useApp((s) => s.articles);
  const unread = notifs.some((n) => !n.read);
  const popular = useMemo(() => [3, 1, 2, 11, 9].map((id) => productById(id)!).filter(Boolean), []);

  return (
    <Page noHeader tabBar padded={false} gap={20}>
      <StatusBar style="light" />
      <View style={{ height: 300, marginBottom: 24 }}>
        <Photo id="1514733670139-4d87a1941d55" w={900} h={700} style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(14,28,18,.38)' }]} />
        <View style={[styles.heroTop, { top: insets.top + 8 }]}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, color: 'rgba(255,255,255,.85)' }}>Assalomu alaykum,</Text>
            <Text style={{ fontSize: 22, fontWeight: '700', color: '#fff', letterSpacing: -0.22 }}>{user?.name ?? 'Aziza'}</Text>
          </View>
          <HeroBtn label="Bildirishnomalar" onPress={() => router.push('/notifications')}>
            <Icon name="bell" size={20} color="#fff" />
            {unread ? <View style={styles.dot} /> : null}
          </HeroBtn>
          <HeroBtn label="Savol berish" onPress={() => router.push('/chat')}>
            <Icon name="chat" size={20} color="#fff" />
          </HeroBtn>
          <HeroBtn label="Profil" onPress={() => router.navigate('/profile')}>
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>{user?.initials ?? 'AK'}</Text>
          </HeroBtn>
        </View>
        <Text style={styles.headline}>{'Tabiiy shifo,\nishonchli maslahat'}</Text>
        <Pressable onPress={() => { actions.openShop(); router.navigate('/shop'); }} style={styles.search}>
          <GlassSurface radius={26} tint={0.78} intensity={60} contentStyle={styles.searchInner}>
            <Icon name="search" size={20} color={colors.muted} />
            <Text style={{ flex: 1, fontSize: 15, color: colors.muted }}>Mahsulot yoki muammo qidiring</Text>
          </GlassSurface>
        </Pressable>
      </View>

      <View style={styles.quickRow}>
        {QUICK.map((q) => (
          <Pressable key={q.label} onPress={q.go} style={styles.quick}>
            <View style={{ width: 42, height: 42, borderRadius: 14, backgroundColor: q.bg, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={q.icon} size={20} color={q.fg} />
            </View>
            <Text style={{ fontSize: 12, fontWeight: '600', color: colors.text }}>{q.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.promo}>
        <View style={[styles.ring, { right: -30, top: -30, width: 140, height: 140, borderColor: 'rgba(217,180,95,.3)' }]} />
        <View style={[styles.ring, { right: -60, top: -60, width: 200, height: 200, borderColor: 'rgba(217,180,95,.18)' }]} />
        <View style={{ flex: 1 }}>
          <Kicker color={colors.gold} style={{ letterSpacing: 0.92 }}>Onlayn maslahat</Kicker>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#fff', marginTop: 6, lineHeight: 22.5 }}>Qahramon Tabib bilan shaxsiy suhbat</Text>
          <Text style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', marginTop: 6 }}>Bugun 3 ta bo'sh vaqt bor</Text>
        </View>
        <Button title="Yozilish" variant="gold" onPress={() => router.navigate('/consult')} style={{ height: 40 }} />
      </View>

      <View style={{ gap: 12 }}>
        <SectionTitle title="Muammo bo'yicha" style={{ paddingHorizontal: 20 }} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}>
          {AIL.slice(1, 7).map((a) => (
            <Pressable key={a} onPress={() => { actions.openShop(a); router.navigate('/shop'); }} style={styles.tile}>
              <Photo id={AIMG[a]} w={240} h={300} style={StyleSheet.absoluteFill} />
              <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(14,28,18,.28)' }]} />
              <View style={styles.tileLabelHost}>
                <GlassSurface variant="dark" radius={14} noShadow intensity={30} contentStyle={{ paddingVertical: 7, paddingHorizontal: 6 }}>
                  <Text style={styles.tileLabel}>{a}</Text>
                </GlassSurface>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={{ gap: 12 }}>
        <SectionTitle title="Ommabop mahsulotlar" action="Barchasi" onAction={() => { actions.openShop(); router.navigate('/shop'); }} style={{ paddingHorizontal: 20 }} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}>
          {popular.map((p) => <ProductCard key={p.id} p={p} variant="carousel" />)}
        </ScrollView>
      </View>

      <View style={{ gap: 12, paddingHorizontal: 16 }}>
        <SectionTitle title="Tabib maslahatlari" action="Barchasi" onAction={() => router.push('/articles')} />
        {articles.slice(0, 2).map((a) => (
          <Card key={a.id} radius={20} onPress={() => router.push(`/article/${a.id}`)} style={{ flexDirection: 'row', gap: 12, alignItems: 'center', padding: 8 }}>
            <Photo id={a.img} style={{ width: 84, height: 84, borderRadius: 14 }} />
            <View style={{ flex: 1, paddingRight: 6 }}>
              <Kicker style={{ letterSpacing: 0.7 }}>{a.tag}</Kicker>
              <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text, lineHeight: 19.5, marginTop: 4 }}>{a.title}</Text>
              <Text style={{ fontSize: 12.5, color: colors.muted, marginTop: 4 }}>{a.read}</Text>
            </View>
          </Card>
        ))}
      </View>
    </Page>
  );
}

function HeroBtn({ children, onPress, label }: { children: React.ReactNode; onPress: () => void; label: string }) {
  return (
    <Pressable accessibilityLabel={label} onPress={onPress}>
      <GlassSurface variant="dark" radius={21} intensity={35} contentStyle={{ width: 42, height: 42, alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </GlassSurface>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  heroTop: { position: 'absolute', left: 18, right: 18, flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: { position: 'absolute', top: 8, right: 9, width: 9, height: 9, borderRadius: 5, backgroundColor: colors.gold, borderWidth: 1.5, borderColor: colors.brandInk },
  headline: { position: 'absolute', left: 18, right: 18, top: 138, color: '#fff', fontSize: 27, fontWeight: '700', lineHeight: 31, letterSpacing: -0.54 },
  search: { position: 'absolute', left: 16, right: 16, bottom: -24 },
  searchInner: { height: 52, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 18 },
  quickRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingTop: 12 },
  quick: { flex: 1, alignItems: 'center', gap: 8, paddingTop: 14, paddingBottom: 12, paddingHorizontal: 4, borderRadius: 20, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle },
  promo: { marginHorizontal: 16, borderRadius: 24, backgroundColor: colors.brandInk, padding: 18, flexDirection: 'row', gap: 14, alignItems: 'center', overflow: 'hidden' },
  ring: { position: 'absolute', borderRadius: 999, borderWidth: 1 },
  tile: { width: 108, height: 132, borderRadius: 24, overflow: 'hidden', backgroundColor: colors.inset },
  tileLabelHost: { position: 'absolute', left: 6, right: 6, bottom: 6 },
  tileLabel: { color: '#fff', fontSize: 12, fontWeight: '700', lineHeight: 14.5, textAlign: 'center' },
});
