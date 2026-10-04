import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { AdminMoreKey } from '@qt/shared';
import { AppointmentsScreen } from '@admin/screens/AppointmentsScreen';
import { ArticlesScreen, BannersScreen, ReviewsScreen } from '@admin/screens/ContentScreens';
import { CategoriesScreen, CouriersScreen, StaffScreen, AnalyticsScreen } from '@admin/screens/OpsScreens';
import { PromosScreen, PushScreen } from '@admin/screens/MarketingScreens';
import { ChatsScreen, CustomersScreen, InventoryScreen } from '@admin/screens/PeopleScreens';
import { OrdersScreen } from '@admin/screens/OrdersScreen';
import { ProductsScreen } from '@admin/screens/ProductsScreen';
import { RxScreen } from '@admin/screens/RxScreen';
import { SettingsScreen } from '@admin/screens/SettingsScreen';

/** Pushed list screens reached from "Ko'proq" and dashboard deep links (always with a back button). */
const SCREENS: Record<AdminMoreKey | 'orders', React.ComponentType<{ root?: boolean }>> = {
  appts: AppointmentsScreen,
  chats: ChatsScreen,
  articles: ArticlesScreen,
  reviews: ReviewsScreen,
  inventory: InventoryScreen,
  categories: CategoriesScreen,
  couriers: CouriersScreen,
  customers: CustomersScreen,
  promos: PromosScreen,
  banners: BannersScreen,
  push: PushScreen,
  analytics: AnalyticsScreen,
  staff: StaffScreen,
  settings: SettingsScreen,
  products: ProductsScreen,
  rx: RxScreen,
  orders: OrdersScreen,
};

export default function PushedList() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const C = SCREENS[name as AdminMoreKey];
  return C ? <C root={false} /> : null;
}
