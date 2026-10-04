import {
  ADDR, AIL, AIMG, ARTICLES, BUSY, CTYPES, DAYS, DELIV, NOTIFS, ONB, OST, PAY, PRODUCTS, REVS, SLOTS, STEPS,
} from './customer.seed';
import { delay } from './store';

/**
 * Mock customer API. Every function is async and returns plain JSON so it can
 * be swapped for the real backend (shared with the admin app) without touching screens.
 */

export type CartLine = { id: number; q: number };
export type Order = { id: string; date: string; step: number; items: CartLine[]; total: number };
export type Rx = { id: string; name: string; date: string; status: 'pending' | 'approved' | 'rejected' };
export type Appt = { w: string; n: number; time: string; type: string };
export type Msg = { me: boolean; t: string; time: string };
export type Address = { id: number; label: string; text: string };

export const FREE_DELIVERY_FROM = 300000;
export const PROMO_CODE = 'TABIB10';
export const PROMO_PERCENT = 10;
export const LOW_STOCK = 10;

export const catalog = {
  ailments: AIL,
  ailmentImages: AIMG,
  onboarding: ONB,
  consultTypes: CTYPES,
  days: DAYS,
  slots: SLOTS,
  busy: BUSY,
  delivery: DELIV,
  payment: PAY,
  orderStatuses: OST,
  trackingSteps: STEPS,
};

export const customerApi = {
  async getProducts() { await delay(); return PRODUCTS; },
  async getArticles() { await delay(); return ARTICLES; },
  async getReviews(_productId: number) { await delay(); return REVS; },
  async getNotifications() { await delay(); return NOTIFS; },
  async getAddresses(): Promise<Address[]> { await delay(); return ADDR.map((a, i) => ({ ...a, id: i + 1 })); },
  async getOrders(): Promise<Order[]> {
    await delay();
    return [
      { id: '#QT-2051', date: 'Bugun', step: 2, items: [{ id: 3, q: 1 }, { id: 5, q: 1 }], total: 163000 },
      { id: '#QT-2038', date: '21 sentabr', step: 3, items: [{ id: 1, q: 1 }, { id: 6, q: 2 }], total: 219000 },
    ];
  },
  async getPrescriptions(): Promise<Rx[]> {
    await delay();
    return [{ id: 'R-1042', name: 'Aziza Karimova', date: '28 sentabr', status: 'approved' }];
  },

  /** Business rule: TABIB10 gives 10% off; free delivery from 300 000. */
  totals(cart: CartLine[], promo: string, delivIdx: number) {
    const sub = cart.reduce((a, c) => a + (PRODUCTS.find((p) => p.id === c.id)?.price ?? 0) * c.q, 0);
    const disc = promo.trim().toUpperCase() === PROMO_CODE ? Math.round((sub * PROMO_PERCENT) / 100) : 0;
    const del = sub >= FREE_DELIVERY_FROM ? 0 : DELIV[delivIdx].fee;
    return { sub, disc, del, total: sub - disc + del };
  },

  async requestOtp(_phone: string) { await delay(); return { ok: true, sample: '4827' }; },
  async verifyOtp(_phone: string, _code: string) { await delay(); return { ok: true, user: { name: 'Aziza', initials: 'AK', fullName: 'Aziza Karimova' } }; },

  async placeOrder(cart: CartLine[], total: number, existing: number): Promise<Order> {
    await delay(200);
    return { id: '#QT-' + (2052 + existing - 2), date: 'Bugun', step: 0, items: cart.map((c) => ({ ...c })), total };
  },
  async sendChat(_text: string): Promise<Msg> {
    await delay(1600); // typing indicator duration from the prototype
    return { me: false, t: "Rahmat, savolingiz qabul qilindi. Tabib yordamchisi tez orada batafsil javob beradi. Shoshilinch holatda 103 ga qo'ng'iroq qiling.", time: '10:47' };
  },
};

export const CHAT_GREETING: Msg = {
  me: false,
  t: "Assalomu alaykum! Qahramon Tabib jamoasi. Savolingizni yozing — tabiiy davolash, mahsulotlar yoki buyurtma bo'yicha.",
  time: '10:20',
};

export const productById = (id: number) => PRODUCTS.find((p) => p.id === id);
