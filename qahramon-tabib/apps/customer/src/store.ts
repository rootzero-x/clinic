import {
  Address, Appt, CHAT_GREETING, CartLine, Msg, Notification, Order, Product, Article, Review, Rx,
  createStore, customerApi, useStore, catalog, productById,
} from '@qt/shared';

/**
 * Client-side app state. Server-owned data (products, orders, ...) comes from the mock
 * `customerApi` so it can be replaced by the real backend shared with the admin app.
 */
export type State = {
  hydrated: boolean;
  user: { name: string; initials: string; fullName: string; phone: string } | null;
  guest: boolean;
  products: Product[];
  articles: Article[];
  reviews: Review[];
  myRevs: Record<number, Review[]>;
  notifs: Notification[];
  addrs: Address[];
  mainAddr: number;
  cart: CartLine[];
  favs: number[];
  ail: string;
  query: string;
  cType: number;
  day: number;
  slot: number | null;
  bookNote: string;
  appts: Appt[];
  rxs: Rx[];
  rxImgs: number;
  rxName: string;
  orders: Order[];
  msgs: Msg[];
  typing: boolean;
  addr: number;
  deliv: number;
  pay: number;
  promo: string;
};

export const store = createStore<State>({
  hydrated: false,
  user: null,
  guest: false,
  products: [],
  articles: [],
  reviews: [],
  myRevs: {},
  notifs: [],
  addrs: [],
  mainAddr: 1,
  cart: [{ id: 3, q: 1 }, { id: 1, q: 2 }],
  favs: [1, 3],
  ail: 'Hammasi',
  query: '',
  cType: 0,
  day: 0,
  slot: null,
  bookNote: '',
  appts: [],
  rxs: [],
  rxImgs: 0,
  rxName: 'Aziza Karimova',
  orders: [],
  msgs: [CHAT_GREETING],
  typing: false,
  addr: 0,
  deliv: 1,
  pay: 0,
  promo: '',
});

export const useApp = <T,>(sel: (s: State) => T) => useStore(store, sel);

/* ---- toast bridge: ToastBridge (in _layout) registers the real toast function ---- */
let toastFn: (t: string) => void = () => {};
export const setToastFn = (f: (t: string) => void) => { toastFn = f; };
export const notify = (t: string) => toastFn(t);

const set = store.set;
const get = store.get;

export const actions = {
  async hydrate() {
    if (get().hydrated) return;
    const [products, articles, reviews, notifs, addrs, orders, rxs] = await Promise.all([
      customerApi.getProducts(), customerApi.getArticles(), customerApi.getReviews(0),
      customerApi.getNotifications(), customerApi.getAddresses(), customerApi.getOrders(), customerApi.getPrescriptions(),
    ]);
    set({ products, articles, reviews, notifs, addrs, orders, rxs, hydrated: true });
  },

  /* auth */
  async login(phone: string) {
    const r = await customerApi.verifyOtp(phone, '4827');
    set({ user: { ...r.user, phone }, guest: false });
  },
  enterAsGuest() { set({ guest: true }); },
  logout() { set({ user: null, guest: false }); },

  /* cart */
  addCart(id: number, q = 1) {
    set((s) => {
      const ex = s.cart.find((c) => c.id === id);
      return { cart: ex ? s.cart.map((c) => (c.id === id ? { ...c, q: c.q + q } : c)) : [...s.cart, { id, q }] };
    });
    notify("Savatga qo'shildi");
  },
  incCart(id: number) { set((s) => ({ cart: s.cart.map((c) => (c.id === id ? { ...c, q: c.q + 1 } : c)) })); },
  decCart(id: number) {
    set((s) => {
      const c = s.cart.find((x) => x.id === id);
      if (!c) return {};
      return { cart: c.q === 1 ? s.cart.filter((x) => x.id !== id) : s.cart.map((x) => (x.id === id ? { ...x, q: x.q - 1 } : x)) };
    });
  },
  removeCart(id: number) { set((s) => ({ cart: s.cart.filter((x) => x.id !== id) })); notify('Savatdan olindi'); },
  clearCart() { set({ cart: [] }); notify('Savat tozalandi'); },
  setPromo(promo: string) { set({ promo }); },

  /* favourites */
  toggleFav(id: number) {
    const on = get().favs.includes(id);
    set((s) => ({ favs: on ? s.favs.filter((x) => x !== id) : [...s.favs, id] }));
    notify(on ? 'Sevimlilardan olindi' : "Sevimlilarga qo'shildi");
  },
  addFav(id: number) {
    if (!get().favs.includes(id)) set((s) => ({ favs: [...s.favs, id] }));
    notify("Sevimlilarga qo'shildi");
  },

  /* shop filters */
  setAil(ail: string) { set({ ail }); },
  setQuery(query: string) { set({ query }); },
  openShop(ail = 'Hammasi') { set({ ail, query: '' }); },

  /* checkout */
  setAddr(addr: number) { set({ addr }); },
  setDeliv(deliv: number) { set({ deliv }); },
  setPay(pay: number) { set({ pay }); },
  async placeOrder(): Promise<Order> {
    const s = get();
    const t = customerApi.totals(s.cart, s.promo, s.deliv);
    const order = await customerApi.placeOrder(s.cart, t.total, s.orders.length);
    set((x) => ({ orders: [order, ...x.orders], cart: [], promo: '' }));
    return order;
  },
  advanceOrder(id: string) {
    set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, step: Math.min(3, o.step + 1) } : o)) }));
  },

  /* consultation booking */
  setCType(cType: number) { set({ cType }); },
  setDay(day: number) { set({ day, slot: null }); },
  setSlot(slot: number) { set({ slot }); },
  setBookNote(bookNote: string) { set({ bookNote }); },
  book() {
    const s = get();
    if (s.slot == null) return;
    const d = catalog.days[s.day];
    const ct = catalog.consultTypes[s.cType];
    set((x) => ({
      appts: [{ w: d.w, n: d.n, time: catalog.slots[s.slot as number], type: ct.label }, ...x.appts],
      slot: null,
      bookNote: '',
    }));
  },

  /* chat */
  async sendMsg(text: string) {
    const t = text.trim();
    if (!t) return;
    set((s) => ({ msgs: [...s.msgs, { me: true, t, time: '10:46' }], typing: true }));
    const reply = await customerApi.sendChat(t);
    set((s) => ({ typing: false, msgs: [...s.msgs, reply] }));
  },

  /* prescriptions */
  addRxImage() { set((s) => ({ rxImgs: Math.min(2, s.rxImgs + 1) })); },
  setRxName(rxName: string) { set({ rxName }); },
  submitRx() {
    set((s) => ({
      rxs: [{ id: 'R-' + (1043 + s.rxs.length), name: s.rxName, date: 'Bugun, 10:46', status: 'pending' }, ...s.rxs],
      rxImgs: 0,
    }));
    notify('Retsept yuborildi');
  },

  /* addresses */
  addAddress(label: string, street: string, flat: string, floor: string) {
    const text = [street.trim(), flat && flat + '-xonadon', floor && floor + '-qavat'].filter(Boolean).join(', ');
    set((s) => ({ addrs: [...s.addrs, { id: Date.now(), label, text }] }));
    notify("Manzil qo'shildi");
  },
  setMainAddr(id: number) { set({ mainAddr: id }); notify("Asosiy manzil o'zgardi"); },
  removeAddr(id: number) { set((s) => ({ addrs: s.addrs.filter((a) => a.id !== id) })); notify("Manzil o'chirildi"); },

  /* notifications */
  markNotif(id: number, read?: boolean) {
    set((s) => ({ notifs: s.notifs.map((n) => (n.id === id ? { ...n, read: read ?? !n.read } : n)) }));
  },
  readAllNotifs() { set((s) => ({ notifs: s.notifs.map((n) => ({ ...n, read: true })) })); notify("Hammasi o'qildi"); },
  removeNotif(id: number) { set((s) => ({ notifs: s.notifs.filter((n) => n.id !== id) })); notify("Bildirishnoma o'chirildi"); },

  /* reviews */
  addReview(productId: number, stars: number, text: string) {
    const r: Review = { name: 'Aziza Karimova', stars, date: 'Hozir', text: text.trim(), reply: '' };
    set((s) => ({ myRevs: { ...s.myRevs, [productId]: [r, ...(s.myRevs[productId] || [])] } }));
    notify('Sharhingiz uchun rahmat');
  },
};

export const hasApprovedRx = (rxs: Rx[]) => rxs.some((r) => r.status === 'approved');
export { productById };
