import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ADMIN_REJECT_REASONS, ADMIN_RX_STATUS, Badge, Button, Icon, Segmented, colors, type RxStatus } from '@qt/shared';
import { Screen, Stack } from '../components/Screen';
import { Card, Empty, Group, IconTile, SectionLabel } from '../components/Ui';
import { ActionSheet, OptionList } from '../components/Sheets';
import { actions, useAdmin } from '../store';
import { openOrder, openRx } from '../nav';

const KEYS: RxStatus[] = ['pending', 'approved', 'rejected'];

export function RxScreen({ root = true }: { root?: boolean }) {
  const rxs = useAdmin((s) => s.rxs);
  const filter = useAdmin((s) => s.rxFilter);
  const list = rxs.filter((r) => r.status === filter);
  return (
    <Screen title="Retseptlar" root={root}>
      <Stack style={{ paddingTop: 4 }}>
        <Segmented
          options={KEYS.map((k) => `${ADMIN_RX_STATUS[k][0]} ${rxs.filter((r) => r.status === k).length}`)}
          index={KEYS.indexOf(filter)}
          onChange={(i) => actions.setRxFilter(KEYS[i])}
        />
        {list.map((r) => (
          <Pressable
            key={r.id}
            onPress={() => openRx(r.id)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 18 }}
          >
            <View style={{ width: 48, height: 60, borderRadius: 10, backgroundColor: colors.inset, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="rx" size={22} color={colors.muted} />
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={{ fontSize: 15.5, fontWeight: '600', color: colors.text }}>{r.patient}</Text>
              <Text style={{ fontSize: 13, color: colors.muted, marginTop: 2 }}>{r.id + ' · ' + r.date}</Text>
              <Text style={{ fontSize: 13, color: colors.secondary, marginTop: 4 }}>{`${r.items.length} ta dori · ${r.doctor}`}</Text>
            </View>
            <Badge label={ADMIN_RX_STATUS[r.status][0]} tone={ADMIN_RX_STATUS[r.status][1]} />
          </Pressable>
        ))}
        {list.length === 0 ? <Empty icon="check" title="Hammasi ko'rib chiqilgan" sub="Yangi retsept kelganda bildirishnoma olasiz." /> : null}
      </Stack>
    </Screen>
  );
}

export function RxDetailScreen({ id }: { id: string }) {
  const r = useAdmin((s) => s.rxs.find((x) => x.id === id));
  const [sheet, setSheet] = useState(false);
  const [sel, setSel] = useState(0);
  if (!r) return <Screen title="Retsept"><View /></Screen>;
  const [label, tone] = ADMIN_RX_STATUS[r.status];
  const rows: [string, string][] = [['Bemor', r.patient], ['Shifokor', r.doctor], ['Muassasa', r.clinic], ['Retsept raqami', r.id]];

  const bar = r.status === 'pending' ? (
    <>
      <Button title="Rad etish" variant="secondary" size="lg" style={{ flex: 1 }} onPress={() => { setSel(0); setSheet(true); }} />
      <Button title="Tasdiqlash" size="lg" style={{ flex: 1.4 }} onPress={() => actions.approveRx(r.id)} />
    </>
  ) : undefined;

  return (
    <Screen title={'Retsept ' + r.id} bar={bar}>
      <Stack style={{ paddingTop: 8 }}>
        <View style={{ height: 240, borderRadius: 18, backgroundColor: colors.inset, borderWidth: 1, borderColor: colors.borderSubtle, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Icon name="image" size={22} color={colors.muted} />
          <Text style={{ fontSize: 13, color: colors.muted }}>Mijoz yuklagan retsept rasmi</Text>
          <Text style={{ fontSize: 12, color: colors.muted }}>Kattalashtirish uchun bosing</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 4 }}>
          <Text style={{ fontSize: 13, color: colors.muted }}>{r.date}</Text>
          <Badge label={label} tone={tone} dot />
        </View>
        <Group>
          {rows.map(([k, v]) => (
            <View key={k} style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingVertical: 12, paddingHorizontal: 16, backgroundColor: colors.card }}>
              <Text style={{ fontSize: 14.5, color: colors.muted }}>{k}</Text>
              <Text style={{ flex: 1, fontSize: 14.5, fontWeight: '500', color: colors.text, textAlign: 'right' }}>{v}</Text>
            </View>
          ))}
        </Group>
        <SectionLabel>So'ralgan dorilar</SectionLabel>
        <Card pad={0} style={{ paddingVertical: 4, paddingHorizontal: 16 }}>
          {r.items.map((it) => (
            <View key={it} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 11 }}>
              <Icon name="pill" size={18} color={colors.muted} />
              <Text style={{ fontSize: 14.5, color: colors.text }}>{it}</Text>
            </View>
          ))}
        </Card>
        {r.status === 'rejected' ? (
          <Text style={{ fontSize: 13.5, lineHeight: 20, color: colors.danger, backgroundColor: colors.dangerFill, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12, overflow: 'hidden' }}>
            {'Rad etish sababi: ' + (r.reason ?? '')}
          </Text>
        ) : null}
        {r.order ? (
          <Pressable
            onPress={() => openOrder(r.order!)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, paddingHorizontal: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 18 }}
          >
            <Icon name="bag" size={18} color={colors.muted} />
            <Text style={{ flex: 1, fontSize: 15, fontWeight: '500', color: colors.text }}>{'Buyurtma ' + r.order}</Text>
            <Icon name="chev" size={18} color={colors.placeholder} />
          </Pressable>
        ) : null}
      </Stack>

      <ActionSheet
        visible={sheet}
        onClose={() => setSheet(false)}
        title="Retseptni rad etish"
        sub="Sabab mijozga ilovada ko'rsatiladi."
        confirmLabel="Rad etish"
        onConfirm={() => { actions.rejectRx(r.id, ADMIN_REJECT_REASONS[sel]); setSheet(false); }}
      >
        <OptionList options={ADMIN_REJECT_REASONS.map((x) => ({ label: x }))} selected={sel} onSelect={setSel} />
      </ActionSheet>
    </Screen>
  );
}
