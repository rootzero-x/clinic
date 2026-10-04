import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ADMIN_QUICK_REPLIES, Badge, GlassSurface, Icon, Segmented, Switch, colors, fmt, ini, stockState, tabular, useToast,
} from '@qt/shared';
import { Screen, Stack } from '../components/Screen';
import { Avatar, Chevron, CountPill, CountStepper, EmptyText, Group, ListRow, OutlineAction } from '../components/Ui';
import { actions, useAdmin } from '../store';
import { openChat, openChatByName, openCustomer } from '../nav';

/* ------------------------------------------------------------------ inventory */
export function InventoryScreen({ root = true }: { root?: boolean }) {
  const products = useAdmin((s) => s.products);
  const filter = useAdmin((s) => s.invFilter);
  const low = products.filter((p) => p.stock < 10).length;
  const list = products.filter((p) => filter === 'all' || p.stock < 10).sort((a, b) => a.stock - b.stock);
  return (
    <Screen title="Ombor" root={root}>
      <Stack style={{ paddingTop: 4 }}>
        <Segmented options={[`Kam qolgan ${low}`, 'Hammasi']} index={filter === 'low' ? 0 : 1} onChange={(i) => actions.setInvFilter(i === 0 ? 'low' : 'all')} />
        <Group>
          {list.map((p) => {
            const [state, kind] = stockState(p);
            const fg = kind === 'danger' ? colors.danger : kind === 'warning' ? colors.warning : colors.muted;
            return (
              <ListRow key={p.id}>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>{p.name}</Text>
                  <Text style={{ fontSize: 12.5, fontWeight: '500', color: fg, marginTop: 2 }}>{state}</Text>
                </View>
                <CountStepper size={38} bold value={p.stock} onDec={() => actions.setStock(p.id, -1)} onInc={() => actions.setStock(p.id, 1)} />
              </ListRow>
            );
          })}
          {list.length === 0 ? <View style={{ backgroundColor: colors.card }}><EmptyText text="Kam qolgan mahsulot yo'q." /></View> : null}
        </Group>
      </Stack>
    </Screen>
  );
}

/* ------------------------------------------------------------------ customers */
export function CustomersScreen({ root = true }: { root?: boolean }) {
  const customers = useAdmin((s) => s.customers);
  return (
    <Screen title="Mijozlar" root={root}>
      <Stack style={{ paddingTop: 4 }}>
        <Group>
          {customers.map((c) => (
            <ListRow key={c.id} onPress={() => openCustomer(c.id)}>
              <Avatar text={ini(c.name)} size={40} bg={c.blocked ? colors.dangerFill : colors.accentFill} fg={c.blocked ? colors.danger : colors.accentText} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>{c.name}</Text>
                <Text style={{ fontSize: 13, color: colors.muted }}>{`${c.orders} ta buyurtma · ${fmt(c.spent)}`}</Text>
              </View>
              {c.blocked ? <Badge label="Bloklangan" tone="danger" /> : null}
              <Chevron />
            </ListRow>
          ))}
        </Group>
      </Stack>
    </Screen>
  );
}

export function CustomerScreen({ id }: { id: number }) {
  const c = useAdmin((s) => s.customers.find((x) => x.id === id));
  const toast = useToast();
  if (!c) return <Screen title="Mijoz"><View /></Screen>;
  const stats: [string, string][] = [['Buyurtma', String(c.orders)], ['Jami xarid', fmt(c.spent).replace(" so'm", '')], ["O'rtacha chek", fmt(c.spent / c.orders).replace(" so'm", '')]];
  return (
    <Screen title="Mijoz">
      <Stack gap={14} style={{ paddingTop: 8 }}>
        <View style={{ alignItems: 'center', gap: 8, paddingVertical: 8 }}>
          <Avatar text={ini(c.name)} size={76} fontSize={24} />
          <Text style={{ fontSize: 21, fontWeight: '700', color: colors.text }}>{c.name}</Text>
          <Text style={[{ fontSize: 14, color: colors.muted }, tabular]}>{`${c.phone} · ${c.since} dan beri`}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {stats.map(([k, v]) => (
            <View key={k} style={{ flex: 1, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 16, padding: 12, alignItems: 'center' }}>
              <Text style={[{ fontSize: 16, fontWeight: '700', color: colors.text }, tabular]}>{v}</Text>
              <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>{k}</Text>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <OutlineAction icon="phone" label="Qo'ng'iroq" height={44} radius={14} onPress={() => toast.show(c.phone + " raqamiga qo'ng'iroq")} />
          <OutlineAction icon="chat" label="Yozish" height={44} radius={14} onPress={() => openChatByName(c.name)} />
        </View>
        <Group>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, paddingHorizontal: 16, backgroundColor: colors.card }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, color: colors.text }}>Hisobni bloklash</Text>
              <Text style={{ fontSize: 12.5, color: colors.muted }}>Mijoz yangi buyurtma bera olmaydi</Text>
            </View>
            <Switch value={!!c.blocked} onValueChange={() => actions.toggleBlockCustomer(c.id)} />
          </View>
        </Group>
      </Stack>
    </Screen>
  );
}

/* ------------------------------------------------------------------ chats */
export function ChatsScreen({ root = true }: { root?: boolean }) {
  const chats = useAdmin((s) => s.chats);
  return (
    <Screen title="Xabarlar" root={root}>
      <Stack style={{ paddingTop: 4 }}>
        <Group>
          {chats.map((c) => {
            const m = c.msgs[c.msgs.length - 1];
            const last = m ? (m.me ? 'Siz: ' : '') + m.t : '';
            return (
              <ListRow key={c.id} onPress={() => openChat(c.id)}>
                <Avatar text={ini(c.name)} size={44} fontSize={14} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>{c.name}</Text>
                    <Text style={{ fontSize: 12.5, color: colors.muted }}>{c.time}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 }}>
                    <Text numberOfLines={1} style={{ flex: 1, fontSize: 13.5, color: c.unread ? colors.text : colors.muted }}>{last}</Text>
                    {c.unread > 0 ? <CountPill n={c.unread} size={20} /> : null}
                  </View>
                </View>
              </ListRow>
            );
          })}
          {chats.length === 0 ? <View style={{ backgroundColor: colors.card }}><EmptyText text="Hozircha xabar yo'q." /></View> : null}
        </Group>
      </Stack>
    </Screen>
  );
}

export function ChatScreen({ id }: { id: number }) {
  const chat = useAdmin((s) => s.chats.find((c) => c.id === id));
  const toast = useToast();
  const insets = useSafeAreaInsets();
  const [msg, setMsg] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const send = () => {
    if (!msg.trim()) return;
    actions.sendMessage(id, msg);
    setMsg('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  };

  const footer = (
    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
      <GlassSurface radius={0} tint={0.66} noShadow contentStyle={{ paddingTop: 10, paddingHorizontal: 12, paddingBottom: Math.max(insets.bottom, 14) + 6, gap: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }} style={{ flexGrow: 0 }} keyboardShouldPersistTaps="handled">
          {ADMIN_QUICK_REPLIES.map((t) => (
            <Pressable key={t} onPress={() => setMsg(t)} style={{ height: 32, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1, borderColor: colors.borderDefault, backgroundColor: 'rgba(255,255,255,.8)', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 13, fontWeight: '500', color: colors.text }}>{t}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <TextInput
            value={msg}
            onChangeText={setMsg}
            onSubmitEditing={send}
            returnKeyType="send"
            placeholder="Xabar yozing"
            placeholderTextColor={colors.placeholder}
            style={{ flex: 1, height: 42, borderRadius: 21, borderWidth: 1, borderColor: colors.borderDefault, backgroundColor: colors.card, paddingHorizontal: 16, fontSize: 15, color: colors.text }}
          />
          <Pressable accessibilityLabel="Yuborish" onPress={send} style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="send" size={18} color="#fff" />
          </Pressable>
        </View>
      </GlassSurface>
    </View>
  );

  return (
    <Screen
      title={chat?.name ?? 'Suhbat'}
      action={{ icon: 'phone', label: "Qo'ng'iroq", onPress: () => toast.show("Qo'ng'iroq qilinmoqda") }}
      footer={footer}
      footerHeight={190}
      scrollRef={scrollRef}
    >
      <Stack gap={8} style={{ paddingTop: 8 }}>
        <Text style={{ alignSelf: 'center', fontSize: 12, color: colors.muted, paddingTop: 4, paddingBottom: 8 }}>Bugun</Text>
        {(chat?.msgs ?? []).map((m, i) => (
          <View key={i} style={{ flexDirection: 'row', justifyContent: m.me ? 'flex-end' : 'flex-start' }}>
            <View
              style={{
                maxWidth: '76%', paddingVertical: 9, paddingHorizontal: 13, borderRadius: 18,
                backgroundColor: m.me ? colors.accent : '#fff', borderWidth: m.me ? 0 : 1, borderColor: colors.borderSubtle,
              }}
            >
              <Text style={{ fontSize: 14.5, lineHeight: 20, color: m.me ? '#fff' : colors.text }}>{m.t}</Text>
              <Text style={{ fontSize: 11, opacity: 0.7, marginTop: 3, textAlign: 'right', color: m.me ? '#fff' : colors.text }}>{m.time}</Text>
            </View>
          </View>
        ))}
      </Stack>
    </Screen>
  );
}
