import React, { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AIL, AIMG, Input, colors } from '@qt/shared';
import { EmptyState, Page, Photo, ProductGrid } from '../../components/common';
import { actions, useApp } from '../../store';

export default function Shop() {
  const products = useApp((s) => s.products);
  const ail = useApp((s) => s.ail);
  const query = useApp((s) => s.query);

  const list = useMemo(() => {
    const q = query.toLowerCase();
    return products.filter((p) => (ail === 'Hammasi' || p.ail === ail) && (!q || (p.name + p.ail + (p.desc || '')).toLowerCase().includes(q)));
  }, [products, ail, query]);

  return (
    <Page title="Do'kon" large tabBar action={{ icon: 'chat', label: 'Savol berish', onPress: () => router.push('/chat') }} padded={false} gap={12}>
      <View style={{ paddingHorizontal: 16, paddingTop: 4 }}>
        <Input placeholder="Asal, choy, malham..." leadingIcon="search" value={query} onChangeText={actions.setQuery} returnKeyType="search" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}>
        {AIL.map((a) => {
          const on = ail === a;
          return (
            <Pressable key={a} onPress={() => actions.setAil(a)} style={{ width: 74, alignItems: 'center', gap: 6 }}>
              <View style={{ width: 66, height: 66, borderRadius: 22, padding: 2, borderWidth: 2, borderColor: on ? colors.accent : 'transparent' }}>
                <Photo id={AIMG[a]} w={160} h={160} style={{ width: '100%', height: '100%', borderRadius: 18 }} />
              </View>
              <Text style={{ fontSize: 11.5, lineHeight: 14, textAlign: 'center', fontWeight: on ? '700' : '500', color: on ? colors.accentText : colors.secondary }}>{a}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <Text style={{ fontSize: 13, color: colors.muted, paddingHorizontal: 20 }}>{`${list.length} ta mahsulot`}</Text>
      <View style={{ paddingHorizontal: 16 }}>
        <ProductGrid items={list} />
      </View>
      {list.length === 0 ? (
        <EmptyState icon="search" title="Hech narsa topilmadi" text="Boshqa so'z bilan qidiring yoki Tabib jamoasidan so'rang." cta="Savol berish" onCta={() => router.push('/chat')} />
      ) : null}
    </Page>
  );
}
