import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Badge, OST, Tone, colors, fmt, productById, tabular } from '@qt/shared';
import { Page, Photo } from '../components/common';
import { useApp } from '../store';

export default function Orders() {
  const orders = useApp((s) => s.orders);
  return (
    <Page title="Buyurtmalarim" gap={10}>
      {orders.map((o) => {
        const items = o.items.map((i) => ({ p: productById(i.id)!, q: i.q })).filter((x) => x.p);
        const count = items.reduce((s, i) => s + i.q, 0);
        return (
          <Pressable
            key={o.id}
            onPress={() => router.push({ pathname: '/tracking/[id]', params: { id: o.id } })}
            style={{ gap: 8, padding: 14, borderRadius: 20, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ flex: 1, fontSize: 13, fontWeight: '600', color: colors.muted }}>{`${o.id} · ${o.date}`}</Text>
              <Badge dot label={OST[o.step][0]} tone={OST[o.step][1] as Tone} />
            </View>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {items.map((i) => <Photo key={i.p.id} id={i.p.img} w={120} h={120} style={{ width: 44, height: 44, borderRadius: 10 }} />)}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 14.5, color: colors.secondary }}>{`${count} ta mahsulot`}</Text>
              <Text style={[{ fontSize: 14.5, fontWeight: '700', color: colors.text }, tabular]}>{fmt(o.total)}</Text>
            </View>
          </Pressable>
        );
      })}
    </Page>
  );
}
