import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Badge, Icon, OST, STEPS, Tone, colors, fmt, productById, tabular } from '@qt/shared';
import { Card, Kicker, Page, PrimaryBar } from '../../components/common';
import { actions, notify, useApp } from '../../store';

export default function Tracking() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const orders = useApp((s) => s.orders);
  const addrs = useApp((s) => s.addrs);
  const ord = orders.find((o) => o.id === id) ?? orders[0];
  if (!ord) return <Page title="Buyurtma"><View /></Page>;
  const eta = ord.step === 3 ? 'Yetkazildi' : ord.step === 2 ? '~ 25 daqiqa' : '~ 70 daqiqa';

  return (
    <Page
      title={'Buyurtma ' + ord.id}
      gap={14}
      actionBar={ord.step < 3}
      bottomOverlay={ord.step < 3 ? <PrimaryBar color={colors.brandInk} label="Keyingi holat (namuna)" onPress={() => actions.advanceOrder(ord.id)} /> : null}
    >
      <View style={styles.eta}>
        <View style={styles.ring} />
        <Kicker color={colors.gold} style={{ fontSize: 12, letterSpacing: 0.96 }}>{OST[ord.step][0]}</Kicker>
        <Text style={{ fontSize: 30, fontWeight: '800', color: '#fff', letterSpacing: -0.6 }}>{eta}</Text>
        <Text style={{ fontSize: 14, color: 'rgba(255,255,255,.75)' }}>{`${ord.id} · ${fmt(ord.total)}`}</Text>
      </View>

      <Card radius={22} style={{ paddingVertical: 18, paddingHorizontal: 16 }}>
        {STEPS.map((s, i) => {
          const done = i <= ord.step;
          const cur = i === ord.step;
          return (
            <View key={s[0]} style={{ flexDirection: 'row', gap: 14 }}>
              <View style={{ alignItems: 'center' }}>
                <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: done ? colors.accent : colors.card, borderWidth: done ? 0 : 2, borderColor: colors.borderDefault, alignItems: 'center', justifyContent: 'center' }}>
                  {done ? <Icon name="check" size={14} strokeWidth={2.4} color="#fff" /> : null}
                </View>
                {i < 3 ? <View style={{ width: 2, flex: 1, minHeight: 22, backgroundColor: i < ord.step ? colors.accent : colors.borderSubtle }} /> : null}
              </View>
              <View style={{ paddingBottom: 18 }}>
                <Text style={{ fontSize: 15, fontWeight: cur ? '700' : '500', color: done ? colors.text : colors.muted }}>{s[0]}</Text>
                <Text style={{ fontSize: 12.5, color: colors.muted, marginTop: 2 }}>{done ? s[1] : 'Kutilmoqda'}</Text>
              </View>
            </View>
          );
        })}
      </Card>

      {ord.step >= 2 ? (
        <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 14 }}>
          <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.accentFill, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: colors.accentText, fontWeight: '700' }}>BR</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>Bekzod Rahimov</Text>
            <Text style={{ fontSize: 13, color: colors.muted }}>Kuryer · ★ 4.9</Text>
          </View>
          <Pressable accessibilityLabel="Qo'ng'iroq" onPress={() => notify("Kuryerga qo'ng'iroq qilinmoqda")} style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="phone" size={18} color="#fff" />
          </Pressable>
        </Card>
      ) : null}

      <Card style={{ paddingVertical: 6, paddingHorizontal: 14 }}>
        {ord.items.map((i) => {
          const p = productById(i.id);
          return (
            <View key={i.id} style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.borderSubtle }}>
              <Text style={{ flex: 1, fontSize: 14.5, color: colors.text }}>{`${p?.name} × ${i.q}`}</Text>
              <Text style={[{ fontSize: 14.5, color: colors.secondary }, tabular]}>{fmt((p?.price ?? 0) * i.q)}</Text>
            </View>
          );
        })}
        <Text style={{ paddingVertical: 10, fontSize: 13.5, color: colors.muted }}>{addrs[0]?.text}</Text>
      </Card>
    </Page>
  );
}

const styles = StyleSheet.create({
  eta: { borderRadius: 26, backgroundColor: colors.brandInk, padding: 20, gap: 6, overflow: 'hidden' },
  ring: { position: 'absolute', right: -40, bottom: -60, width: 180, height: 180, borderRadius: 90, borderWidth: 1, borderColor: 'rgba(217,180,95,.25)' },
});
