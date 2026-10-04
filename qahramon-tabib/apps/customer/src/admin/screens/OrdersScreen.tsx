import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  ADMIN_COURIER_PICKS, ADMIN_CANCEL_REASONS, ADMIN_ORDER_STATUS, ADMIN_RX_STATUS, Badge, Button, Icon, colors, fmt, ini,
  orderItemCount, orderStep, orderSubtotal, orderTotal, tabular, useToast, ADMIN_DELIVERY_FEE,
} from '@qt/shared';
import { Screen, Stack } from '../components/Screen';
import { Card, ChipsRow, Empty, IconTile, OutlineAction, SearchField, Avatar } from '../components/Ui';
import { ActionSheet, OptionList } from '../components/Sheets';
import { actions, useAdmin, type OrderFilter } from '../store';
import { openChatByName, openOrder, openRx } from '../nav';

const FILTERS: [OrderFilter, string][] = [['all', 'Hammasi'], ['new', 'Yangi'], ['preparing', 'Tayyorlanmoqda'], ['onway', "Yo'lda"], ['delivered', 'Yetkazildi'], ['cancelled', 'Bekor']];

export function OrdersScreen({ root = true }: { root?: boolean }) {
  const orders = useAdmin((s) => s.orders);
  const filter = useAdmin((s) => s.oFilter);
  const [query, setQuery] = useState('');
  const q = query.toLowerCase();

  const chips = FILTERS.map(([k, l]) => ({
    label: `${l} ${k === 'all' ? orders.length : orders.filter((o) => o.status === k).length}`,
    selected: filter === k,
    onPress: () => actions.setOFilter(k),
  }));
  const list = useMemo(
    () => orders.filter((o) => (filter === 'all' || o.status === filter) && (!q || (o.name + o.id + o.phone).toLowerCase().includes(q))),
    [orders, filter, q],
  );

  return (
    <Screen title="Buyurtmalar" root={root}>
      <View style={{ gap: 12, paddingTop: 4 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <SearchField value={query} onChangeText={setQuery} placeholder="Ism, telefon yoki buyurtma raqami" />
        </View>
        <ChipsRow items={chips} />
        <Stack gap={8}>
          {list.map((o) => {
            const [label, tone] = ADMIN_ORDER_STATUS[o.status];
            return (
              <Pressable
                key={o.id}
                onPress={() => openOrder(o.id)}
                style={{ gap: 8, padding: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 18 }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={[{ fontSize: 13, fontWeight: '600', color: colors.muted }, tabular]}>{o.id}</Text>
                  <Text style={{ fontSize: 13, color: colors.muted }}>{'· ' + o.time}</Text>
                  <View style={{ flex: 1 }} />
                  <Badge label={label} tone={tone} dot />
                </View>
                <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>{o.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={{ fontSize: 13.5, color: colors.secondary }}>{`${orderItemCount(o)} ta mahsulot · ${o.pay}`}</Text>
                  {o.rx ? <Badge label="Rx" tone="danger" /> : null}
                  <View style={{ flex: 1 }} />
                  <Text style={[{ fontSize: 15, fontWeight: '700', color: colors.text }, tabular]}>{fmt(orderTotal(o))}</Text>
                </View>
              </Pressable>
            );
          })}
          {list.length === 0 ? <Empty icon="bag" title="Buyurtma yo'q" sub="Tanlangan filtr bo'yicha buyurtma topilmadi." /> : null}
        </Stack>
      </View>
    </Screen>
  );
}

const STEP_LABELS = ['Qabul qilindi', 'Tayyorlanmoqda', "Yo'lda", 'Yetkazildi'];

export function OrderDetailScreen({ id }: { id: string }) {
  const o = useAdmin((s) => s.orders.find((x) => x.id === id));
  const rx = useAdmin((s) => (o?.rx ? s.rxs.find((r) => r.id === o.rx) : undefined));
  const toast = useToast();
  const [sheet, setSheet] = useState<null | 'courier' | 'cancel'>(null);
  const [sel, setSel] = useState(0);

  if (!o) return <Screen title="Buyurtma"><View /></Screen>;

  const [label, tone] = ADMIN_ORDER_STATUS[o.status];
  const idx = orderStep(o);
  const sub = orderSubtotal(o);

  const primary = {
    new: { l: 'Tayyorlashni boshlash', f: () => actions.startPreparing(o.id) },
    preparing: { l: 'Kuryerga topshirish', f: () => { setSel(1); setSheet('courier'); } },
    onway: { l: 'Yetkazildi deb belgilash', f: () => actions.markDelivered(o.id) },
    delivered: null,
    cancelled: null,
  }[o.status];
  const canCancel = o.status === 'new' || o.status === 'preparing';

  const bar = primary ? (
    <>
      {canCancel ? <Button title="Bekor qilish" variant="secondary" size="lg" style={{ flex: 1 }} onPress={() => { setSel(0); setSheet('cancel'); }} /> : null}
      <Button title={primary.l} size="lg" style={{ flex: 1.4 }} onPress={primary.f} />
    </>
  ) : undefined;

  return (
    <Screen title={'Buyurtma ' + o.id} bar={bar}>
      <Stack style={{ paddingTop: 8 }}>
        <Card gap={14}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 13, color: colors.muted }}>{'Bugun, ' + o.time}</Text>
              <Text style={[{ fontSize: 22, fontWeight: '700', color: colors.text, marginTop: 2 }, tabular]}>{fmt(orderTotal(o))}</Text>
            </View>
            <Badge label={label} tone={tone} dot />
          </View>
          {o.status !== 'cancelled' ? (
            <View style={{ flexDirection: 'row', gap: 4 }}>
              {STEP_LABELS.map((l, i) => (
                <View key={l} style={{ flex: 1, gap: 6 }}>
                  <View style={{ height: 4, borderRadius: 2, backgroundColor: i <= idx ? colors.accent : colors.borderSubtle }} />
                  <Text style={{ fontSize: 11, fontWeight: i === idx ? '700' : '500', color: i <= idx ? colors.text : colors.muted }}>{l}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={{ fontSize: 13.5, lineHeight: 20, color: colors.danger, backgroundColor: colors.dangerFill, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12, overflow: 'hidden' }}>
              {'Bekor qilingan: ' + (o.reason ?? '')}
            </Text>
          )}
        </Card>

        <Card pad={0} style={{ paddingVertical: 14, paddingHorizontal: 16 }} gap={12}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Avatar text={ini(o.name)} size={42} fontSize={15} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>{o.name}</Text>
              <Text style={[{ fontSize: 13.5, color: colors.muted }, tabular]}>{o.phone}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <OutlineAction icon="phone" label="Qo'ng'iroq" onPress={() => toast.show(o.phone + " raqamiga qo'ng'iroq")} />
            <OutlineAction icon="chat" label="Yozish" onPress={() => openChatByName(o.name)} />
          </View>
          <View style={{ height: 1, backgroundColor: colors.borderSubtle }} />
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
            <View style={{ marginTop: 1 }}><Icon name="pin" size={18} color={colors.muted} /></View>
            <Text style={{ flex: 1, fontSize: 14, lineHeight: 20, color: colors.body }}>{o.addr}</Text>
          </View>
          {o.courier ? (
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <Icon name="truck" size={18} color={colors.muted} />
              <Text style={{ fontSize: 14, color: colors.body }}>{'Kuryer: '}<Text style={{ fontWeight: '700', color: colors.text }}>{o.courier}</Text></Text>
            </View>
          ) : null}
        </Card>

        {o.rx ? (
          <Pressable
            onPress={() => openRx(o.rx!)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, paddingHorizontal: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 18 }}
          >
            <IconTile name="rx" bg={colors.dangerFill} fg={colors.danger} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>Retsept biriktirilgan</Text>
              <Text style={{ fontSize: 13, color: colors.muted }}>{rx ? ADMIN_RX_STATUS[rx.status][0] : ''}</Text>
            </View>
            <Icon name="chev" size={18} color={colors.placeholder} />
          </Pressable>
        ) : null}

        <Card pad={0} style={{ paddingVertical: 6, paddingHorizontal: 16 }}>
          {o.items.map((it) => (
            <View key={it.n} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.borderSubtle }}>
              <IconTile name="pill" bg={colors.inset} fg={colors.muted} size={40} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={{ fontSize: 14.5, fontWeight: '500', color: colors.text }}>{it.n}</Text>
                <Text style={[{ fontSize: 13, color: colors.muted }, tabular]}>{`${it.q} × ${fmt(it.p)}`}</Text>
              </View>
              <Text style={[{ fontSize: 14.5, fontWeight: '600', color: colors.text }, tabular]}>{fmt(it.p * it.q)}</Text>
            </View>
          ))}
          <View style={{ gap: 6, paddingTop: 12, paddingBottom: 10 }}>
            <TotalRow l="Mahsulotlar" v={fmt(sub)} />
            <TotalRow l="Yetkazib berish" v={fmt(ADMIN_DELIVERY_FEE)} />
            <TotalRow l="Jami" v={fmt(sub + ADMIN_DELIVERY_FEE)} strong />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 14, color: colors.secondary }}>{"To'lov"}</Text>
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.success }}>{o.pay + ' · ' + (o.pay === 'Naqd' ? 'Qabulda' : "To'langan")}</Text>
            </View>
          </View>
        </Card>
      </Stack>

      <ActionSheet
        visible={sheet === 'courier'}
        onClose={() => setSheet(null)}
        title="Kuryerni tanlang"
        sub="Buyurtma kuryerga topshiriladi va mijozga xabar yuboriladi."
        confirmLabel="Topshirish"
        onConfirm={() => { actions.handToCourier(o.id, sel); setSheet(null); }}
      >
        <OptionList options={ADMIN_COURIER_PICKS.map((c) => ({ label: c.name, sub: c.sub }))} selected={sel} onSelect={setSel} />
      </ActionSheet>
      <ActionSheet
        visible={sheet === 'cancel'}
        onClose={() => setSheet(null)}
        title="Buyurtmani bekor qilish"
        sub="Sababni tanlang. Mijozga xabar va to'lov qaytarilishi haqida bildirishnoma yuboriladi."
        confirmLabel="Bekor qilish"
        onConfirm={() => { actions.cancelOrder(o.id, ADMIN_CANCEL_REASONS[sel]); setSheet(null); }}
      >
        <OptionList options={ADMIN_CANCEL_REASONS.map((r) => ({ label: r }))} selected={sel} onSelect={setSel} />
      </ActionSheet>
    </Screen>
  );
}

function TotalRow({ l, v, strong }: { l: string; v: string; strong?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: strong ? 4 : 0 }}>
      <Text style={[{ fontSize: strong ? 16 : 14, fontWeight: strong ? '700' : '400', color: strong ? colors.text : colors.secondary }, tabular]}>{l}</Text>
      <Text style={[{ fontSize: strong ? 16 : 14, fontWeight: strong ? '700' : '400', color: strong ? colors.text : colors.secondary }, tabular]}>{v}</Text>
    </View>
  );
}
