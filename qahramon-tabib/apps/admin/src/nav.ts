import { router } from 'expo-router';
import { tabsFor, type AdminRole, type AdminTabKey } from '@qt/shared';
import { actions, store } from './store';

export const goBack = () => {
  if (router.canGoBack()) router.back();
  else router.replace('/');
};

/** Switch to a tab root (clears any pushed screens above it). */
export const tabTo = (key: AdminTabKey) => router.navigate(`/${key}` as never);

/** Push a list screen with a back button (the prototype's `go(k)`). */
export const pushList = (key: string) => router.push(`/p/${key}` as never);

/** Tab if the current role has it, otherwise push (prototype: dashboard deep links). */
export const openTabOrList = (key: AdminTabKey, role: AdminRole = store.get().role) => {
  if (tabsFor(role).includes(key)) tabTo(key);
  else pushList(key);
};

const bare = (id: string) => id.replace('#', '');
export const openOrder = (id: string) => router.push(`/order/${bare(id)}` as never);
export const openRx = (id: string) => router.push(`/rxd/${id}` as never);
export const openProduct = (id: number | 'new') => router.push(`/product/${id}` as never);
export const openCustomer = (id: number) => router.push(`/customer/${id}` as never);
export const openChat = (id: number) => {
  actions.readChat(id);
  router.push(`/chat/${id}` as never);
};
export const openChatByName = (name: string) => openChat(actions.chatIdByName(name));
export const openAppt = (id: number) => router.push(`/appt/${id}` as never);
export const openArticle = (id: number | 'new') => router.push(`/article/${id}` as never);

export const orderIdFromParam = (p: string | undefined) => '#' + (p ?? '');

/** After login or a role switch: land on the first tab of the role. */
export const enterApp = (role: AdminRole) => router.replace(`/${tabsFor(role)[0]}` as never);
/** Role switched while inside the app: pop to the tabs and focus the role's first tab. */
export const gotoRoleHome = (role: AdminRole) => tabTo(tabsFor(role)[0]);
export const toLogin = () => router.replace('/login');
