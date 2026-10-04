import React from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Icon, SwipeRow, colors } from '@qt/shared';
import { Page } from '../components/common';
import { actions, useApp } from '../store';

const KIND = {
  acc: { bg: colors.accentFill, fg: colors.accentText },
  gold: { bg: colors.goldFill, fg: colors.goldTextDeep },
};

/** Deep-link targets from NOTIFS[].to */
function open(to: string, firstOrderId?: string) {
  switch (to) {
    case 'track': return router.push({ pathname: '/tracking/[id]', params: { id: firstOrderId ?? '' } });
    case 'appts': return router.push('/appointments');
    case 'rx': return router.push('/rx');
    case 'shop': return router.navigate('/shop');
    case 'articles': return router.push('/articles');
    default: return undefined;
  }
}

export default function Notifications() {
  const notifs = useApp((s) => s.notifs);
  const orders = useApp((s) => s.orders);
  const anyUnread = notifs.some((n) => !n.read);

  return (
    <Page
      title="Bildirishnomalar"
      gap={8}
      action={anyUnread ? { icon: 'check', label: "Hammasini o'qilgan", onPress: actions.readAllNotifs } : undefined}
    >
      {notifs.map((n) => (
        <SwipeRow
          key={n.id}
          radius={20}
          style={{ borderWidth: 1, borderColor: colors.borderSubtle }}
          onPress={() => { actions.markNotif(n.id, true); open(n.to, orders[0]?.id); }}
          actions={[
            { label: n.read ? 'Yangi' : "O'qildi", icon: 'eye', bg: colors.swipeShow, onPress: () => actions.markNotif(n.id) },
            { label: "O'chirish", icon: 'del', bg: colors.swipeDelete, onPress: () => actions.removeNotif(n.id) },
          ]}
        >
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start', padding: 14, backgroundColor: n.read ? colors.card : 'rgba(47,90,64,.05)' }}>
            <View style={{ width: 40, height: 40, borderRadius: 13, backgroundColor: KIND[n.kind].bg, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={n.icon} size={19} color={KIND[n.kind].fg} />
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                <Text style={{ flex: 1, fontSize: 15, fontWeight: '600', color: colors.text }}>{n.title}</Text>
                <Text style={{ fontSize: 12, color: colors.muted }}>{n.time}</Text>
              </View>
              <Text style={{ fontSize: 13.5, lineHeight: 19.5, color: colors.secondary, marginTop: 3 }}>{n.body}</Text>
            </View>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent, marginTop: 6, opacity: n.read ? 0 : 1 }} />
          </View>
        </SwipeRow>
      ))}
    </Page>
  );
}
