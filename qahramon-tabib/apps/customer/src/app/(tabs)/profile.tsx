import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Icon, IconName, colors } from '@qt/shared';
import { Card, Group, Page } from '../../components/common';
import { actions, notify, useApp } from '../../store';

export default function Profile() {
  const user = useApp((s) => s.user);
  const orders = useApp((s) => s.orders);
  const appts = useApp((s) => s.appts);
  const rxs = useApp((s) => s.rxs);
  const favs = useApp((s) => s.favs);
  const addrs = useApp((s) => s.addrs);
  const notifs = useApp((s) => s.notifs);

  const stats = [{ k: 'Buyurtma', v: String(orders.length) }, { k: 'Qabul', v: String(appts.length) }, { k: 'Bonus', v: '12 400' }];
  const unread = notifs.filter((n) => !n.read).length;
  const menu: { label: string; icon: IconName; val: string; go: () => void }[] = [
    { label: 'Buyurtmalarim', icon: 'box', val: String(orders.length), go: () => router.push('/orders') },
    { label: 'Qabullarim', icon: 'cal', val: String(appts.length), go: () => router.push('/appointments') },
    { label: 'Retseptlarim', icon: 'rx', val: String(rxs.length), go: () => router.push('/rx') },
    { label: 'Sevimlilar', icon: 'heart', val: String(favs.length), go: () => router.push('/favorites') },
    { label: 'Manzillar', icon: 'pin', val: String(addrs.length), go: () => router.push('/addresses') },
    { label: 'Savol-javob', icon: 'chat', val: '', go: () => router.push('/chat') },
    { label: 'Til', icon: 'globe', val: "O'zbekcha", go: () => notify("Til: O'zbekcha") },
    { label: 'Bildirishnomalar', icon: 'bell', val: unread ? String(unread) : '', go: () => router.push('/notifications') },
    { label: 'Yordam', icon: 'help', val: '', go: () => router.push('/chat') },
  ];

  return (
    <Page title="Profil" large tabBar gap={16}>
      <Card radius={24} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 }}>
        <View style={{ width: 58, height: 58, borderRadius: 29, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 19 }}>{user?.initials ?? 'AK'}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text }}>{user?.fullName ?? 'Aziza Karimova'}</Text>
          <Text style={{ fontSize: 14, color: colors.muted }}>+998 {user?.phone || '90 123 45 67'}</Text>
        </View>
      </Card>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {stats.map((s) => (
          <Card key={s.k} radius={18} style={{ flex: 1, padding: 12, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text }}>{s.v}</Text>
            <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>{s.k}</Text>
          </Card>
        ))}
      </View>
      <Group>
        {menu.map((m) => (
          <Pressable key={m.label} onPress={m.go} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 13, paddingHorizontal: 14, backgroundColor: colors.card }}>
            <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: colors.inset, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={m.icon} size={18} color={colors.text} />
            </View>
            <Text style={{ flex: 1, fontSize: 15, color: colors.text }}>{m.label}</Text>
            <Text style={{ fontSize: 13.5, color: colors.muted }}>{m.val}</Text>
            <Icon name="chev" size={18} color={colors.placeholder} />
          </Pressable>
        ))}
      </Group>
      <Pressable
        onPress={() => { actions.logout(); router.replace('/login'); }}
        style={{ height: 50, borderRadius: 16, borderWidth: 1, borderColor: colors.borderSubtle, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ color: colors.danger, fontSize: 15, fontWeight: '600' }}>Hisobdan chiqish</Text>
      </Pressable>
    </Page>
  );
}
