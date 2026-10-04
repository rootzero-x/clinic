import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, colors, fmt, productById } from '@qt/shared';
import { Card, FloatBtn, Kicker, Monogram, Page, Photo } from '../../components/common';
import { useApp } from '../../store';

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const articles = useApp((s) => s.articles);
  const a = articles.find((x) => x.id === Number(id)) ?? articles[0];
  if (!a) return <Page title="Maqola"><View /></Page>;
  const related = a.rel.map((r) => productById(r)).filter(Boolean);

  return (
    <Page
      noHeader
      padded={false}
      gap={0}
      bottomOverlay={
        <View pointerEvents="box-none" style={{ position: 'absolute', top: insets.top + 4, left: 14, right: 14, zIndex: 20 }}>
          <FloatBtn icon="back" label="Orqaga" onPress={() => router.back()} />
        </View>
      }
    >
      <StatusBar style="light" />
      <Photo id={a.img} w={900} h={700} style={{ width: '100%', height: 320 }} />
      <View style={{ marginTop: -30, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: colors.page, paddingTop: 24, paddingHorizontal: 20, gap: 14 }}>
        <Kicker style={{ fontSize: 12, letterSpacing: 0.72 }}>{`${a.tag} · ${a.read}`}</Kicker>
        <Text style={{ fontSize: 26, fontWeight: '700', color: colors.text, lineHeight: 31, letterSpacing: -0.52 }}>{a.title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Monogram size={32} ring fontSize={11} />
          <Text style={{ fontSize: 13.5, color: colors.secondary }}>{`Qahramon Tabib · ${a.date}`}</Text>
        </View>
        {a.body.map((para, i) => (
          <Text key={i} style={{ fontSize: 16, lineHeight: 26.4, color: colors.body }}>{para}</Text>
        ))}
        <Card style={{ padding: 16, gap: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: colors.text }}>Amaliy maslahatlar</Text>
          {a.tips.map((t, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ marginTop: 2 }}><Icon name="check" size={18} color={colors.accent} /></View>
              <Text style={{ flex: 1, fontSize: 14.5, lineHeight: 21.75, color: colors.body }}>{t}</Text>
            </View>
          ))}
        </Card>
        <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text, marginTop: 4 }}>Maqolaga oid mahsulotlar</Text>
        {related.map((p) => (
          <Pressable
            key={p!.id}
            onPress={() => router.push(`/product/${p!.id}`)}
            style={{ flexDirection: 'row', gap: 12, alignItems: 'center', padding: 8, borderRadius: 18, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle }}
          >
            <Photo id={p!.img} w={160} h={160} style={{ width: 60, height: 60, borderRadius: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14.5, fontWeight: '600', color: colors.text }}>{p!.name}</Text>
              <Text style={{ fontSize: 13, color: colors.muted }}>{fmt(p!.price)}</Text>
            </View>
            <View style={{ paddingRight: 6 }}><Icon name="chev" size={18} color={colors.placeholder} /></View>
          </Pressable>
        ))}
      </View>
    </Page>
  );
}
