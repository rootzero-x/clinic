import {
  ADMIN_COURIER_PICKS, ADMIN_LOGIN, ADMIN_PUSH_AUDIENCES, ADMIN_RESCHEDULE_SLOTS,
  adminApi, adminSnapshot, createStore, useStore,
  type AdminArticle, type AdminProduct, type AdminRole, type AdminRange, type AdminTabKey, type OrderStatus, type RxStatus,
} from '@qt/shared';

/* ------------------------------------------------------------------ toast bridge */
let toastFn: (t: string) => void = () => {};
export const setToastFn = (fn: (t: string) => void) => { toastFn = fn; };
const toast = (t: string) => toastFn(t);

/* ------------------------------------------------------------------ state */
export type OrderFilter = 'all' | OrderStatus;
export type ReviewFilter = 'all' | 'open' | 'hidden';
export type InvFilter = 'low' | 'all';

const snap = adminSnapshot();

const initial = {
  ...snap,
  loggedIn: false,
  role: 'Admin' as AdminRole,
  user: { name: ADMIN_LOGIN.name, initials: ADMIN_LOGIN.initials, email: ADMIN_LOGIN.email },
  /* shared UI filters: the dashboard deep-links set these before navigating */
  range: 'today' as AdminRange,
  oFilter: 'all' as OrderFilter,
  pCat: 'Hammasi',
  rxFilter: 'pending' as RxStatus,
  invFilter: 'low' as InvFilter,
  apDay: 0,
  rvFilter: 'all' as ReviewFilter,
  catEdit: false,
};
export type AdminState = typeof initial;

export const store = createStore<AdminState>(initial);
export const useAdmin = <T,>(selector: (s: AdminState) => T) => useStore(store, selector);

const set = store.set;
const upd = <K extends keyof AdminState>(k: K, m: (v: AdminState[K]) => AdminState[K]) =>
  set((s) => ({ [k]: m(s[k]) } as Partial<AdminState>));

/* ------------------------------------------------------------------ product / article drafts */
export type ProductDraft = {
  id: number | null; name: string; cat: string; price: string; old: string; stock: number;
  rx: boolean; active: boolean; desc: string;
};
export const emptyProductDraft = (cat?: string): ProductDraft => ({
  id: null, name: '', cat: cat ?? 'Asal va aralashmalar', price: '', old: '', stock: 0, rx: false, active: true, desc: '',
});
export const draftFromProduct = (p: AdminProduct): ProductDraft => ({
  id: p.id, name: p.name, cat: p.cat, price: String(p.price), old: p.old ? String(p.old) : '', stock: p.stock,
  rx: p.rx, active: p.active, desc: p.desc,
});
export type ArticleDraft = Omit<AdminArticle, 'id' | 'views' | 'date'> & { id: number | null; views?: string; date?: string };
export const emptyArticleDraft = (tag: string): ArticleDraft => ({ id: null, title: '', tag, img: '', lead: '', body: '', recs: [], published: false });

/* ------------------------------------------------------------------ actions */
const swap = <T,>(arr: T[], i: number, j: number) => { const a = [...arr]; [a[i], a[j]] = [a[j], a[i]]; return a; };

export const actions = {
  /* auth / role */
  async login(role: AdminRole, email: string, password: string, faceId = false) {
    const res = faceId ? await adminApi.faceIdLogin(role) : await adminApi.login(email, password, role);
    set({ loggedIn: true, role, user: { name: res.user.name, initials: res.user.initials, email: res.user.email } });
  },
  logout() { set({ loggedIn: false }); },
  setRole(role: AdminRole) { set({ role }); },

  /* filters */
  setRange: (range: AdminRange) => set({ range }),
  setOFilter: (oFilter: OrderFilter) => set({ oFilter }),
  setPCat: (pCat: string) => set({ pCat }),
  setRxFilter: (rxFilter: RxStatus) => set({ rxFilter }),
  setInvFilter: (invFilter: InvFilter) => set({ invFilter }),
  setApDay: (apDay: number) => set({ apDay }),
  setRvFilter: (rvFilter: ReviewFilter) => set({ rvFilter }),
  toggleCatEdit: () => set((s) => ({ catEdit: !s.catEdit })),

  /* orders */
  startPreparing(id: string) {
    upd('orders', (a) => a.map((o) => (o.id === id ? { ...o, status: 'preparing' } : o)));
    toast('Buyurtma tayyorlanmoqda');
  },
  handToCourier(id: string, courierIdx: number) {
    upd('orders', (a) => a.map((o) => (o.id === id ? { ...o, status: 'onway', courier: ADMIN_COURIER_PICKS[courierIdx].name } : o)));
    toast("Buyurtma yo'lga chiqdi");
  },
  markDelivered(id: string) {
    upd('orders', (a) => a.map((o) => (o.id === id ? { ...o, status: 'delivered' } : o)));
    toast('Buyurtma yetkazildi');
  },
  cancelOrder(id: string, reason: string) {
    upd('orders', (a) => a.map((o) => (o.id === id ? { ...o, status: 'cancelled', reason } : o)));
    toast('Buyurtma bekor qilindi');
  },

  /* products */
  toggleProduct(id: number) {
    const p = store.get().products.find((x) => x.id === id);
    if (!p) return;
    upd('products', (a) => a.map((x) => (x.id === id ? { ...x, active: !x.active } : x)));
    toast(p.active ? 'Ilovada yashirildi' : "Ilovada ko'rsatildi");
  },
  archiveProduct(id: number) { upd('products', (a) => a.map((x) => (x.id === id ? { ...x, archived: true } : x))); toast('Arxivga olindi'); },
  restoreProduct(id: number) { upd('products', (a) => a.map((x) => (x.id === id ? { ...x, archived: false } : x))); toast('Arxivdan tiklandi'); },
  deleteProduct(id: number, silent = false) { upd('products', (a) => a.filter((x) => x.id !== id)); if (!silent) toast("Mahsulot o'chirildi"); },
  /** Returns false when validation fails (name* and price* are required). */
  saveProduct(d: ProductDraft): boolean {
    if (!d.name.trim() || !(+d.price > 0)) return false;
    const clean: AdminProduct = {
      id: d.id ?? Date.now(), name: d.name, cat: d.cat, price: +d.price, old: d.old ? +d.old : '', stock: d.stock,
      rx: d.rx, active: d.active, desc: d.desc,
    };
    if (d.id) upd('products', (a) => a.map((p) => (p.id === d.id ? { ...p, ...clean } : p)));
    else upd('products', (a) => [clean, ...a]);
    toast(d.id ? 'Mahsulot saqlandi' : "Mahsulot qo'shildi");
    return true;
  },
  setStock(id: number, delta: number) {
    upd('products', (a) => a.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p)));
  },

  /* prescriptions */
  approveRx(id: string) { upd('rxs', (a) => a.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))); toast('Retsept tasdiqlandi'); },
  rejectRx(id: string, reason: string) { upd('rxs', (a) => a.map((r) => (r.id === id ? { ...r, status: 'rejected', reason } : r))); toast('Retsept rad etildi'); },

  /* customers */
  toggleBlockCustomer(id: number) {
    const c = store.get().customers.find((x) => x.id === id);
    upd('customers', (a) => a.map((x) => (x.id === id ? { ...x, blocked: !x.blocked } : x)));
    toast(c?.blocked ? 'Blokdan chiqarildi' : 'Hisob bloklandi');
  },

  /* chats */
  readChat(id: number) { upd('chats', (a) => a.map((c) => (c.id === id ? { ...c, unread: 0 } : c))); },
  /** Opens (or creates) the conversation with a customer and returns its id. */
  chatIdByName(name: string): number {
    const found = store.get().chats.find((c) => c.name === name);
    if (found) { actions.readChat(found.id); return found.id; }
    const id = Date.now();
    upd('chats', (a) => [{ id, name, time: 'hozir', unread: 0, msgs: [] }, ...a]);
    return id;
  },
  sendMessage(id: number, t: string) {
    const text = t.trim();
    if (!text) return;
    upd('chats', (a) => a.map((c) => (c.id === id ? { ...c, time: 'hozir', msgs: [...c.msgs, { me: true, t: text, time: '10:46' }] } : c)));
  },

  /* promos */
  togglePromo(code: string) {
    const p = store.get().promos.find((x) => x.code === code);
    upd('promos', (a) => a.map((x) => (x.code === code ? { ...x, active: !x.active } : x)));
    toast(p?.active ? "Promokod to'xtatildi" : 'Promokod yoqildi');
  },
  deletePromo(code: string) { upd('promos', (a) => a.filter((x) => x.code !== code)); },
  addPromo(code: string, pct: number, limit: number) {
    upd('promos', (a) => [{ code: code.trim().toUpperCase(), val: `${pct}% chegirma`, used: 0, limit: limit || 0, till: '31.12.2026', active: true }, ...a]);
    toast('Promokod yaratildi');
  },

  /* appointments */
  confirmAppt(id: number) { upd('appts', (a) => a.map((x) => (x.id === id ? { ...x, status: 'confirmed' } : x))); toast('Qabul tasdiqlandi'); },
  rescheduleAppt(id: number, slotIdx: number) {
    const t = ADMIN_RESCHEDULE_SLOTS[slotIdx];
    upd('appts', (a) => a.map((x) => (x.id === id ? { ...x, day: t[1], time: t[2], status: 'confirmed' } : x)));
    toast("Qabul ko'chirildi");
  },
  finishAppt(id: number) { upd('appts', (a) => a.map((x) => (x.id === id ? { ...x, status: 'done' } : x))); toast('Xulosa mijozga yuborildi'); },
  setApptNote(id: number, note: string) { upd('appts', (a) => a.map((x) => (x.id === id ? { ...x, note } : x))); },
  toggleApptRec(id: number, pid: number) {
    upd('appts', (a) => a.map((x) => (x.id === id ? { ...x, recs: x.recs.includes(pid) ? x.recs.filter((r) => r !== pid) : [...x.recs, pid] } : x)));
  },

  /* articles */
  toggleArticle(id: number) {
    const a0 = store.get().arts.find((x) => x.id === id);
    upd('arts', (a) => a.map((x) => (x.id === id ? { ...x, published: !x.published } : x)));
    toast(a0?.published ? 'Nashrdan olindi' : 'Nashr qilindi');
  },
  archiveArticle(id: number) { upd('arts', (a) => a.map((x) => (x.id === id ? { ...x, archived: true } : x))); toast('Maqola arxivlandi'); },
  deleteArticle(id: number) { upd('arts', (a) => a.filter((x) => x.id !== id)); },
  /** Returns false when the title is empty. */
  saveArticle(d: ArticleDraft): boolean {
    if (!d.title.trim()) return false;
    const { id, ...rest } = d;
    if (id) upd('arts', (a) => a.map((x) => (x.id === id ? { ...x, ...rest, id } : x)));
    else upd('arts', (a) => [{ ...rest, id: Date.now(), views: '—', date: d.published ? 'Bugun' : 'Qoralama' }, ...a]);
    toast(d.published ? 'Maqola nashr qilindi' : 'Qoralama saqlandi');
    return true;
  },

  /* banners */
  toggleBanner(id: number) { upd('banners', (a) => a.map((x) => (x.id === id ? { ...x, active: !x.active } : x))); },
  deleteBanner(id: number) { upd('banners', (a) => a.filter((x) => x.id !== id)); },
  moveBanner(id: number, dir: -1 | 1) {
    upd('banners', (a) => { const i = a.findIndex((x) => x.id === id); const j = i + dir; return i < 0 || j < 0 || j >= a.length ? a : swap(a, i, j); });
  },
  addBanner() {
    upd('banners', (a) => [...a, { id: Date.now(), title: 'Yangi banner', target: 'Havola tanlanmagan', img: '1514733670139-4d87a1941d55', active: false, clicks: 0 }]);
    toast("Qoralama banner qo'shildi");
  },

  /* reviews */
  toggleReviewHidden(id: number) {
    const r = store.get().reviews.find((x) => x.id === id);
    upd('reviews', (a) => a.map((x) => (x.id === id ? { ...x, hidden: !x.hidden } : x)));
    toast(r?.hidden ? "Sharh ko'rsatildi" : 'Sharh yashirildi');
  },
  replyReview(id: number, text: string) { upd('reviews', (a) => a.map((x) => (x.id === id ? { ...x, reply: text.trim() } : x))); toast('Javob yuborildi'); },

  /* categories */
  toggleCat(name: string) {
    const c = store.get().cats.find((x) => x.name === name);
    upd('cats', (a) => a.map((x) => (x.name === name ? { ...x, active: !x.active } : x)));
    toast(c?.active ? 'Toifa yashirildi' : "Toifa ko'rsatildi");
  },
  archiveCat(name: string) { upd('cats', (a) => a.map((x) => (x.name === name ? { ...x, archived: true } : x))); toast('Toifa arxivlandi'); },
  restoreCat(name: string) { upd('cats', (a) => a.map((x) => (x.name === name ? { ...x, archived: false } : x))); toast('Toifa tiklandi'); },
  deleteCat(name: string) { upd('cats', (a) => a.filter((x) => x.name !== name)); },
  /** Moves a category up/down among the non-archived ones. */
  moveCat(name: string, dir: -1 | 1) {
    upd('cats', (a) => {
      const live = a.map((c, i) => ({ c, i })).filter((x) => !x.c.archived).map((x) => x.i);
      const pos = live.findIndex((i) => a[i].name === name);
      const j = live[pos + dir];
      if (pos < 0 || j == null) return a;
      return swap(a, live[pos], j);
    });
  },

  /* staff */
  toggleStaff(id: number) {
    const s = store.get().staff.find((x) => x.id === id);
    upd('staff', (a) => a.map((x) => (x.id === id ? { ...x, active: !x.active } : x)));
    toast(s?.active ? 'Xodim bloklandi' : 'Xodim faollashtirildi');
  },
  deleteStaff(id: number) { upd('staff', (a) => a.filter((x) => x.id !== id)); },
  inviteStaff(phone: string, role: AdminRole) {
    upd('staff', (a) => [...a, { id: Date.now(), name: '+998 ' + phone, role, last: 'Taklif yuborildi', active: false }]);
    toast('Taklif yuborildi');
  },

  /* settings & push */
  toggleSetting(k: keyof AdminState['settings']) { upd('settings', (s) => ({ ...s, [k]: !s[k] })); },
  setPush(patch: Partial<AdminState['push']>) { upd('push', (p) => ({ ...p, ...patch })); },
  async sendPush() {
    const { push } = store.get();
    const res = await adminApi.sendPush(push.title, push.body, push.aud);
    toast('Yuborildi · ' + res.recipients);
  },
};

/* ------------------------------------------------------------------ derived helpers */
export const badgeFor = (s: Pick<AdminState, 'orders' | 'rxs' | 'chats' | 'appts' | 'reviews'>): Partial<Record<string, number>> => ({
  orders: s.orders.filter((o) => o.status === 'new').length,
  rx: s.rxs.filter((r) => r.status === 'pending').length,
  chats: s.chats.reduce((a, c) => a + c.unread, 0),
  appts: s.appts.filter((a) => a.status === 'new').length,
  reviews: s.reviews.filter((r) => !r.reply && !r.hidden).length,
});

export const lowStockCount = (s: Pick<AdminState, 'products'>) => s.products.filter((p) => p.stock < 10).length;
