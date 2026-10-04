import {
  ADMIN_APPTS, ADMIN_ARTS, ADMIN_BANNERS, ADMIN_CATS, ADMIN_CHATS, ADMIN_COURIERS, ADMIN_CUSTOMERS,
  ADMIN_DEFAULT_PUSH, ADMIN_DEFAULT_SETTINGS, ADMIN_DELIVERY_FEE, ADMIN_KPI, ADMIN_LOGIN, ADMIN_MORE_GROUPS,
  ADMIN_ORDERS, ADMIN_PRODUCTS, ADMIN_PROMOS, ADMIN_PUSH_AUDIENCES, ADMIN_REVIEWS, ADMIN_ROLE_MORE,
  ADMIN_ROLE_TABS, ADMIN_RXS, ADMIN_STAFF,
  type AdminMoreKey, type AdminOrder, type AdminProduct, type AdminRange, type AdminRole, type AdminTabKey,
} from './admin.seed';
import { delay } from './store';

/**
 * Mock admin API. Every function returns plain JSON (cloned from the seed) so it can be
 * swapped for the real backend shared with the customer app without touching screens.
 * The admin app keeps its live, optimistic copy in `apps/admin/src/store.ts`.
 */

export const ADMIN_LOW_STOCK = 10;

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));

/** Everything the admin app needs on first launch (synchronous so the store can hydrate immediately). */
export function adminSnapshot() {
  return {
    orders: clone(ADMIN_ORDERS),
    products: clone(ADMIN_PRODUCTS),
    rxs: clone(ADMIN_RXS),
    customers: clone(ADMIN_CUSTOMERS),
    chats: clone(ADMIN_CHATS),
    promos: clone(ADMIN_PROMOS),
    appts: clone(ADMIN_APPTS),
    arts: clone(ADMIN_ARTS),
    banners: clone(ADMIN_BANNERS),
    reviews: clone(ADMIN_REVIEWS),
    cats: clone(ADMIN_CATS),
    staff: clone(ADMIN_STAFF),
    couriers: clone(ADMIN_COURIERS),
    settings: { ...ADMIN_DEFAULT_SETTINGS },
    push: { ...ADMIN_DEFAULT_PUSH },
  };
}

/* ---- pure business rules (mirror the prototype's derived values) ---- */

export const orderSubtotal = (o: AdminOrder) => o.items.reduce((a, i) => a + i.q * i.p, 0);
export const orderItemCount = (o: AdminOrder) => o.items.reduce((a, i) => a + i.q, 0);
export const orderTotal = (o: AdminOrder) => orderSubtotal(o) + ADMIN_DELIVERY_FEE;
/** 0..3 position in the 4-step progress bar; cancelled orders have none. */
export const orderStep = (o: AdminOrder) => ({ new: 0, preparing: 1, onway: 2, delivered: 3, cancelled: -1 }[o.status]);

export const stockOf = (p: AdminProduct): [string, 'danger' | 'warning' | 'neutral'] =>
  p.stock === 0 ? ['Tugagan', 'danger'] : p.stock < ADMIN_LOW_STOCK ? [`Kam: ${p.stock}`, 'warning'] : [`${p.stock} dona`, 'neutral'];
export const stockState = (p: AdminProduct): [string, 'danger' | 'warning' | 'muted'] =>
  p.stock === 0 ? ['Tugagan', 'danger'] : p.stock < ADMIN_LOW_STOCK ? ['Kam qolgan', 'warning'] : ['Yetarli', 'muted'];

export const tabsFor = (role: AdminRole): AdminTabKey[] => ADMIN_ROLE_TABS[role] ?? ADMIN_ROLE_TABS.Admin;
export const moreFor = (role: AdminRole): AdminMoreKey[] => ADMIN_ROLE_MORE[role] ?? ADMIN_ROLE_MORE.Admin;
export const moreGroupsFor = (role: AdminRole) =>
  ADMIN_MORE_GROUPS.map(([title, keys]) => ({ title, keys: keys.filter((k) => moreFor(role).includes(k)) })).filter((g) => g.keys.length);

export const adminApi = {
  async login(email: string, _password: string, role: AdminRole) {
    await delay(250);
    return { ok: true, user: { name: ADMIN_LOGIN.name, initials: ADMIN_LOGIN.initials, email: email || ADMIN_LOGIN.email, role } };
  },
  async faceIdLogin(role: AdminRole) {
    await delay(300);
    return { ok: true, user: { name: ADMIN_LOGIN.name, initials: ADMIN_LOGIN.initials, email: ADMIN_LOGIN.email, role } };
  },
  async getOrders() { await delay(); return clone(ADMIN_ORDERS); },
  async getProducts() { await delay(); return clone(ADMIN_PRODUCTS); },
  async getPrescriptions() { await delay(); return clone(ADMIN_RXS); },
  async getCustomers() { await delay(); return clone(ADMIN_CUSTOMERS); },
  async getChats() { await delay(); return clone(ADMIN_CHATS); },
  async getPromos() { await delay(); return clone(ADMIN_PROMOS); },
  async getAppointments() { await delay(); return clone(ADMIN_APPTS); },
  async getArticles() { await delay(); return clone(ADMIN_ARTS); },
  async getBanners() { await delay(); return clone(ADMIN_BANNERS); },
  async getReviews() { await delay(); return clone(ADMIN_REVIEWS); },
  async getCategories() { await delay(); return clone(ADMIN_CATS); },
  async getStaff() { await delay(); return clone(ADMIN_STAFF); },
  async getCouriers() { await delay(); return clone(ADMIN_COURIERS); },
  async getKpi(range: AdminRange) { await delay(); return ADMIN_KPI[range]; },
  async sendPush(_title: string, _body: string, audience: number) {
    await delay(300);
    return { ok: true, recipients: ADMIN_PUSH_AUDIENCES[audience][1].replace(' qabul qiluvchi', ' kishi') };
  },
};
