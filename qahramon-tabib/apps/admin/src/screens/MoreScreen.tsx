import React from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import {
  ADMIN_MORE_META, Badge, Icon, colors, moreGroupsFor, useToast, type AdminMoreKey, type IconName,
} from '@qt/shared';
import { Screen, Stack } from '../components/Screen';
import { Card, Chevron, CountPill, Group, IconTile, ListRow, SectionLabel } from '../components/Ui';
import { badgeFor, useAdmin } from '../store';
import { pushList, toLogin } from '../nav';
import { actions } from '../store';

export function MoreScreen({ root = true }: { root?: boolean }) {
  const role = useAdmin((s) => s.role);
  const user = useAdmin((s) => s.user);
  const orders = useAdmin((s) => s.orders);
  const rxs = useAdmin((s) => s.rxs);
  const chats = useAdmin((s) => s.chats);
  const appts = useAdmin((s) => s.appts);
  const reviews = useAdmin((s) => s.reviews);
  const products = useAdmin((s) => s.products);
  const toast = useToast();

  const badges = badgeFor({ orders, rxs, chats, appts, reviews });
  const low = products.filter((p) => p.stock < 10).length;
  const groups = moreGroupsFor(role);

  const openCustomerApp = async () => {
    try {
      await Linking.openURL('qahramon-tabib://');
    } catch {
      toast.show('Mijoz ilovasi o\'rnatilmagan');
    }
  };

  return (
    <Screen title="Ko'proq" root={root}>
      <Stack gap={16} style={{ paddingTop: 4 }}>
        <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: colors.brandInk, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 17 }}>{user.initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 17, fontWeight: '600', color: colors.text }}>{user.name}</Text>
            <Text style={{ fontSize: 13.5, color: colors.muted }}>{user.email}</Text>
          </View>
          <Badge label={role} tone="accent" />
        </Card>

        {groups.map((g) => (
          <View key={g.title} style={{ gap: 6 }}>
            <SectionLabel>{g.title}</SectionLabel>
            <Group>
              {g.keys.map((k: AdminMoreKey) => {
                const [label, icon, sub] = ADMIN_MORE_META[k];
                const b = badges[k] || (k === 'inventory' ? low : 0);
                return (
                  <ListRow key={k} onPress={() => pushList(k)}>
                    <IconTile name={icon as IconName} bg={colors.inset} fg={colors.text} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 15, color: colors.text }}>{label}</Text>
                      <Text style={{ fontSize: 12.5, color: colors.muted }}>{sub}</Text>
                    </View>
                    {b ? <CountPill n={b} /> : null}
                    <Chevron />
                  </ListRow>
                );
              })}
            </Group>
          </View>
        ))}

        <Group>
          <Pressable onPress={openCustomerApp} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, backgroundColor: colors.card }}>
            <Icon name="ext" size={18} color={colors.muted} />
            <Text style={{ flex: 1, fontSize: 15, color: colors.text }}>Mijoz ilovasini ko'rish</Text>
          </Pressable>
          <Pressable
            onPress={() => { actions.logout(); toLogin(); }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, backgroundColor: colors.card }}
          >
            <Icon name="logout" size={18} color={colors.danger} />
            <Text style={{ fontSize: 15, color: colors.danger }}>Hisobdan chiqish</Text>
          </Pressable>
        </Group>
      </Stack>
    </Screen>
  );
}
