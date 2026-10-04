import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { DELIV, Icon, PAY, colors, customerApi, fmt, tabular } from '@qt/shared';
import { Card, Group, GroupLabel, Page, PrimaryBar } from '../components/common';
import { actions, useApp } from '../store';

export default function Checkout() {
  const cart = useApp((s) => s.cart);
  const promo = useApp((s) => s.promo);
  const addrs = useApp((s) => s.addrs);
  const addr = useApp((s) => s.addr);
  const deliv = useApp((s) => s.deliv);
  const pay = useApp((s) => s.pay);
  const [busy, setBusy] = useState(false);
  const t = useMemo(() => customerApi.totals(cart, promo, deliv), [cart, promo, deliv]);

  const place = async () => {
    setBusy(true);
    const order = await actions.placeOrder();
    setBusy(false);
    router.replace({ pathname: '/success', params: { id: order.id } });
  };

  return (
    <Page
      title="Rasmiylashtirish"
      actionBar
      gap={12}
      bottomOverlay={<PrimaryBar label={busy ? 'Yuborilmoqda…' : `Buyurtma berish · ${fmt(t.total)}`} disabled={busy || cart.length === 0} onPress={place} />}
    >
      <GroupLabel>MANZIL</GroupLabel>
      <Group>
        {addrs.map((a, i) => (
          <Pressable key={a.id} onPress={() => actions.setAddr(i)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, paddingHorizontal: 14, backgroundColor: colors.card }}>
            <Icon name="pin" size={18} color={colors.muted} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>{a.label}</Text>
              <Text style={{ fontSize: 13, color: colors.muted }}>{a.text}</Text>
            </View>
            <View style={{ opacity: addr === i ? 1 : 0 }}><Icon name="check" size={22} color={colors.accent} /></View>
          </Pressable>
        ))}
      </Group>

      <GroupLabel>YETKAZISH VAQTI</GroupLabel>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {DELIV.map((d, i) => (
          <Pressable key={d.label} onPress={() => actions.setDeliv(i)} style={{ flex: 1, paddingVertical: 12, paddingHorizontal: 8, borderRadius: 16, borderWidth: 1.5, borderColor: deliv === i ? colors.accent : colors.borderSubtle, backgroundColor: colors.card, alignItems: 'center', gap: 2 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>{d.label}</Text>
            <Text style={{ fontSize: 12, color: colors.muted }}>{d.sub}</Text>
          </Pressable>
        ))}
      </View>

      <GroupLabel>TO'LOV</GroupLabel>
      <Group>
        {PAY.map((p, i) => (
          <Pressable key={p.label} onPress={() => actions.setPay(i)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, paddingHorizontal: 14, backgroundColor: colors.card }}>
            <View style={{ width: 36, height: 26, borderRadius: 7, backgroundColor: p.bg, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 10, fontWeight: '800' }}>{p.short}</Text>
            </View>
            <Text style={{ flex: 1, fontSize: 15, color: colors.text }}>{p.label}</Text>
            <View style={{ opacity: pay === i ? 1 : 0 }}><Icon name="check" size={22} color={colors.accent} /></View>
          </Pressable>
        ))}
      </Group>

      <Card style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>To'lanadi</Text>
        <Text style={[{ fontSize: 16, fontWeight: '700', color: colors.text }, tabular]}>{fmt(t.total)}</Text>
      </Card>
    </Page>
  );
}
