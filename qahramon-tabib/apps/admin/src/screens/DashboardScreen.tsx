import React, { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  ADMIN_KPI, ADMIN_ORDER_STATUS, Badge, Segmented, colors, fmt, moreFor, orderTotal, tabsFor, tabular, type IconName,
} from '@qt/shared';
import { Screen, Stack } from '../components/Screen';
import { Card, Chevron, Group, IconTile, Kpi, ListRow, SectionLabel } from '../components/Ui';
import { actions, useAdmin } from '../store';
import { openOrder, openTabOrList, pushList, tabTo } from '../nav';

const RANGES = [['today', 'Bugun'], ['week', 'Hafta'], ['month', 'Oy']] as const;

export function DashboardScreen({ root = true }: { root?: boolean }) {
  const range = useAdmin((s) => s.range);
  const role = useAdmin((s) => s.role);
  const orders = useAdmin((s) => s.orders);
  const rxs = useAdmin((s) => s.rxs);
  const chats = useAdmin((s) => s.chats);
  const appts = useAdmin((s) => s.appts);
  const products = useAdmin((s) => s.products);

  const K = ADMIN_KPI[range];
  const mx = Math.max(...K.bars);
  const kpis: [string, string][] = [['Savdo', fmt(K.s)], ['Buyurtmalar', String(K.o)], ["O'rtacha chek", fmt(K.a)], ['Yangi mijozlar', String(K.c)]];

  const attention = useMemo(() => {
    const tabs = tabsFor(role);
    const allowed = new Set<string>([...tabs, ...moreFor(role)]);
    const newCount = orders.filter((o) => o.status === 'new').length;
    const rxPending = rxs.filter((r) => r.status === 'pending').length;
    const unread = chats.reduce((a, c) => a + c.unread, 0);
    const low = products.filter((p) => p.stock < 10).length;
    const rows: { key: string; label: string; count: number; icon: IconName; bg: string; fg: string; go: () => void }[] = [
      { key: 'appts', label: 'Bugungi qabullar', count: appts.filter((a) => a.day === 0 && a.status !== 'done').length, icon: 'cal', bg: 'rgba(200,160,70,.18)', fg: '#7f5f12', go: () => { actions.setApDay(0); pushList('appts'); } },
      { key: 'orders', label: 'Yangi buyurtmalar', count: newCount, icon: 'bag', bg: colors.infoFill, fg: colors.info, go: () => { actions.setOFilter('new'); tabTo('orders'); } },
      { key: 'rx', label: 'Retseptlar kutilmoqda', count: rxPending, icon: 'rx', bg: colors.dangerFill, fg: colors.danger, go: () => { actions.setRxFilter('pending'); openTabOrList('rx'); } },
      { key: 'inventory', label: 'Kam qolgan mahsulotlar', count: low, icon: 'alert', bg: colors.warningFill, fg: colors.warning, go: () => { actions.setInvFilter('low'); openTabOrList('inventory'); } },
      { key: 'chats', label: "O'qilmagan xabarlar", count: unread, icon: 'chat', bg: colors.accentFill, fg: colors.accentText, go: () => openTabOrList('chats') },
    ];
    return rows.filter((r) => allowed.has(r.key));
  }, [role, orders, rxs, chats, appts, products]);

  const allowedChats = (moreFor(role) as string[]).includes('chats') || (tabsFor(role) as string[]).includes('chats');

  return (
    <Screen
      title="Tabib Admin"
      root={root}
      kicker="Shanba, 4 oktabr"
      action={{
        icon: 'bell',
        label: 'Xabarlar',
        onPress: () => (allowedChats ? openTabOrList('chats') : tabTo('orders')),
      }}
    >
      <Stack gap={14} style={{ paddingTop: 4 }}>
        <Segmented options={RANGES.map((r) => r[1])} index={RANGES.findIndex((r) => r[0] === range)} onChange={(i) => actions.setRange(RANGES[i][0])} />

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Kpi label={kpis[0][0]} value={kpis[0][1]} delta={K.d[0] + ' oldingi davrga'} deltaColor={K.d[0][0] === '+' ? colors.success : colors.danger} />
          <Kpi label={kpis[1][0]} value={kpis[1][1]} delta={K.d[1] + ' oldingi davrga'} deltaColor={K.d[1][0] === '+' ? colors.success : colors.danger} />
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Kpi label={kpis[2][0]} value={kpis[2][1]} delta={K.d[2] + ' oldingi davrga'} deltaColor={K.d[2][0] === '+' ? colors.success : colors.danger} />
          <Kpi label={kpis[3][0]} value={kpis[3][1]} delta={K.d[3] + ' oldingi davrga'} deltaColor={K.d[3][0] === '+' ? colors.success : colors.danger} />
        </View>

        <Card gap={14}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>Savdo</Text>
            <Text style={{ fontSize: 13, color: colors.muted }}>{K.cap + ' · ' + fmt(K.s)}</Text>
          </View>
          <View style={{ height: 130, flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
            {K.bars.map((b, i) => (
              <View key={i} style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                <View style={{ width: '100%', height: Math.round((b / mx) * 100), borderRadius: 6, backgroundColor: b === mx ? colors.accent : 'rgba(27,138,85,.22)' }} />
                <Text style={{ fontSize: 11, color: colors.muted }}>{K.labels[i]}</Text>
              </View>
            ))}
          </View>
        </Card>

        <SectionLabel>Diqqat talab qiladi</SectionLabel>
        <Group>
          {attention.map((a) => (
            <ListRow key={a.key} onPress={a.go} style={{ paddingVertical: 13 }}>
              <IconTile name={a.icon} bg={a.bg} fg={a.fg} />
              <Text style={{ flex: 1, fontSize: 15, color: colors.text }}>{a.label}</Text>
              <Text style={[{ fontSize: 15, fontWeight: '700', color: colors.text }, tabular]}>{a.count}</Text>
              <Chevron />
            </ListRow>
          ))}
        </Group>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4, paddingTop: 4 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: colors.muted, textTransform: 'uppercase', letterSpacing: 0.65 }}>So'nggi buyurtmalar</Text>
          <Pressable onPress={() => { actions.setOFilter('all'); openTabOrList('orders'); }} hitSlop={8}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.accentText }}>Barchasi</Text>
          </Pressable>
        </View>
        <View style={{ gap: 8 }}>
          {orders.slice(0, 3).map((o) => {
            const [label, tone] = ADMIN_ORDER_STATUS[o.status];
            return (
              <Pressable key={o.id} onPress={() => openOrder(o.id)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 16 }}>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>{o.name}</Text>
                  <Text style={{ fontSize: 13, color: colors.muted, marginTop: 2 }}>{o.id + ' · ' + o.time}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <Text style={[{ fontSize: 14, fontWeight: '600', color: colors.text }, tabular]}>{fmt(orderTotal(o))}</Text>
                  <Badge label={label} tone={tone} />
                </View>
              </Pressable>
            );
          })}
        </View>
      </Stack>
    </Screen>
  );
}
