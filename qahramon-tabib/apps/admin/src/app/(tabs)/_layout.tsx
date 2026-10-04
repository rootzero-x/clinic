import React, { useMemo } from 'react';
import { Tabs } from 'expo-router';
import { ADMIN_TAB_META, FloatingTabBar, tabsFor, type AdminTabKey, type IconName, type TabItem } from '@qt/shared';
import { badgeFor, useAdmin } from '../../store';

const ALL: AdminTabKey[] = ['dash', 'orders', 'products', 'rx', 'inventory', 'chats', 'customers', 'more'];

export default function TabsLayout() {
  const role = useAdmin((s) => s.role);
  const orders = useAdmin((s) => s.orders);
  const rxs = useAdmin((s) => s.rxs);
  const chats = useAdmin((s) => s.chats);
  const appts = useAdmin((s) => s.appts);
  const reviews = useAdmin((s) => s.reviews);
  const tabs = tabsFor(role);
  const badges = useMemo(() => badgeFor({ orders, rxs, chats, appts, reviews }), [orders, rxs, chats, appts, reviews]);

  return (
    <Tabs
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: '#f4f0e6' } }}
      tabBar={({ state, navigation }) => {
        const items: TabItem[] = tabs.map((k) => ({
          key: k,
          label: ADMIN_TAB_META[k][0],
          icon: ADMIN_TAB_META[k][1] as IconName,
          badge: badges[k] || undefined,
        }));
        return (
          <FloatingTabBar
            items={items}
            activeKey={state.routes[state.index].name}
            onPress={(key) => {
              const route = state.routes.find((r) => r.name === key);
              if (!route) return;
              const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              if (!event.defaultPrevented) navigation.navigate(route.name as never);
            }}
          />
        );
      }}
    >
      {ALL.map((k) => (
        <Tabs.Screen key={k} name={k} options={{ href: tabs.includes(k) ? undefined : null }} />
      ))}
    </Tabs>
  );
}
