import React from 'react';
import { Tabs } from 'expo-router';
import { FloatingTabBar, IconName, TabItem } from '@qt/shared';
import { useApp } from '../../store';

const TABS: { name: string; label: string; icon: IconName }[] = [
  { name: 'home', label: 'Asosiy', icon: 'home' },
  { name: 'shop', label: "Do'kon", icon: 'leaf' },
  { name: 'consult', label: 'Maslahat', icon: 'video' },
  { name: 'cart', label: 'Savat', icon: 'bag' },
  { name: 'profile', label: 'Profil', icon: 'user' },
];

export default function TabsLayout() {
  const cartCount = useApp((s) => s.cart.reduce((a, c) => a + c.q, 0));
  return (
    <Tabs
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: '#f4f0e6' } }}
      tabBar={({ state, navigation }) => {
        const items: TabItem[] = TABS.map((t) => ({ key: t.name, label: t.label, icon: t.icon, badge: t.name === 'cart' ? cartCount : undefined }));
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
      {TABS.map((t) => <Tabs.Screen key={t.name} name={t.name} />)}
    </Tabs>
  );
}
