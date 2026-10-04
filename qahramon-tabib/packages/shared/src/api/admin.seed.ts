// Seed data for the admin app. Source of truth: prototype/Qahramon Tabib Admin.dc.html.
// Product data, prices, names and images are placeholders; the client supplies the real data.
// Constants are ADMIN_-prefixed so they never collide with the customer seed exports.
import type { Tone } from '../theme';
import type { ApptStatus, OrderStatus, RxStatus } from './types';

/* ----------------------------------------------------------------- types */

export type AdminRole = 'Admin' | 'Farmatsevt' | "Qo'llab-quvvatlash";
export type AdminTabKey = 'dash' | 'orders' | 'products' | 'rx' | 'inventory' | 'chats' | 'customers' | 'more';
export type AdminMoreKey =
  | 'appts' | 'chats' | 'articles' | 'reviews' | 'inventory' | 'categories' | 'couriers' | 'customers'
  | 'promos' | 'banners' | 'push' | 'analytics' | 'staff' | 'settings' | 'products' | 'rx';
export type AdminRange = 'today' | 'week' | 'month';

export type AdminOrderItem = { n: string; q: number; p: number };
export type AdminOrder = {
  id: string; name: string; phone: string; time: string; status: OrderStatus; pay: string; addr: string;
  items: AdminOrderItem[]; rx?: string; courier?: string; reason?: string;
};
export type AdminProduct = {
  id: number; name: string; cat: string; price: number; stock: number; old: number | '';
  active: boolean; rx: boolean; desc: string; archived?: boolean;
};
export type AdminRx = {
  id: string; patient: string; doctor: string; clinic: string; date: string; order?: string;
  items: string[]; status: RxStatus; reason?: string;
};
export type AdminCustomer = { id: number; name: string; phone: string; orders: number; spent: number; since: string; blocked?: boolean };
export type ChatMsg = { me: boolean; t: string; time: string };
export type AdminChat = { id: number; name: string; time: string; unread: number; msgs: ChatMsg[] };
export type AdminPromo = { code: string; val: string; used: number; limit: number; till: string; active: boolean };
export type AdminCourierPick = { name: string; sub: string };
export type ApptType = 'video' | 'chat' | 'clinic';
export type AdminAppt = {
  id: number; day: number; time: string; name: string; phone: string; age: number; type: ApptType;
  complaint: string; status: ApptStatus; note: string; recs: number[];
};
export type AdminArticle = {
  id: number; title: string; tag: string; img: string; views: string; date: string; published: boolean;
  lead: string; body: string; recs: number[]; archived?: boolean;
};
export type AdminBanner = { id: number; title: string; target: string; img: string; active: boolean; clicks: number };
export type AdminReview = { id: number; name: string; product: string; stars: number; date: string; text: string; reply: string; hidden?: boolean };
export type AdminCategory = { name: string; img: string; active: boolean; archived?: boolean };
export type AdminStaff = { id: number; name: string; role: AdminRole; last: string; active: boolean };
export type CourierState = 'busy' | 'free' | 'off';
export type AdminCourier = { name: string; status: CourierState; today: number; rating: number; where: string };
export type AdminKpi = { s: number; o: number; a: number; c: number; bars: number[]; labels: string[]; cap: string; d: string[] };
export type AdminSettings = {
  allDay: boolean; delivery: boolean; cash: boolean; click: boolean; payme: boolean; uzcard: boolean;
  nOrders: boolean; nRx: boolean; nChat: boolean; faceid: boolean;
};

/* ------------------------------------------------------- status metadata */

export const ADMIN_ORDER_STATUS: Record<OrderStatus, [string, Tone]> = {
  new: ['Yangi', 'info'],
  preparing: ['Tayyorlanmoqda', 'warning'],
  onway: ["Yo'lda", 'accent'],
  delivered: ['Yetkazildi', 'success'],
  cancelled: ['Bekor qilindi', 'neutral'],
};
export const ADMIN_RX_STATUS: Record<RxStatus, [string, Tone]> = {
  pending: ['Kutilmoqda', 'warning'],
  approved: ['Tasdiqlangan', 'success'],
  rejected: ['Rad etilgan', 'danger'],
};

/* ------------------------------------------------------------------ data */

const it = (n: string, q: number, p: number): AdminOrderItem => ({ n, q, p });

export const ADMIN_ORDERS: AdminOrder[] = [
  { id: '#10482', name: 'Aziza Karimova', phone: '+998 90 123 45 67', time: '10:42', status: 'new', pay: 'Click', addr: "Toshkent, Chilonzor 9-kvartal, 14-uy, 32-xonadon", items: [it("Tog' asali (Zomin)", 2, 12000), it("Zanjabil-asal aralashmasi", 1, 48000)] },
  { id: '#10481', name: 'Jasur Toshmatov', phone: '+998 93 555 12 09', time: '10:35', status: 'new', pay: 'Payme', rx: 'R-2041', addr: "Toshkent, Yunusobod 4-mavze, 21-uy", items: [it('Amoksitsillin 500 mg', 1, 36000), it("Oshqozon choyi yig'masi", 1, 62000)] },
  { id: '#10480', name: 'Malika Yusupova', phone: '+998 97 210 44 18', time: '10:12', status: 'preparing', pay: 'Naqd', addr: "Toshkent, Mirzo Ulug'bek, Buyuk Ipak yo'li 112", items: [it("Bo'g'im moyi «Qahramon»", 1, 34500), it("Teri malhami", 1, 89000)] },
  { id: '#10479', name: 'Sardor Aliyev', phone: '+998 90 777 31 52', time: '09:58', status: 'onway', courier: 'Bekzod Rahimov', pay: 'Click', addr: "Toshkent, Shayxontohur, Navoiy ko'chasi 30", items: [it("Na'matak damlamasi", 2, 56000)] },
  { id: '#10478', name: 'Dilnoza Rahimova', phone: '+998 99 401 22 70', time: '09:20', status: 'delivered', courier: 'Sherzod Qodirov', pay: 'Payme', addr: "Toshkent, Sergeli 7-mavze, 5-uy", items: [it("Soch uchun o'simlik moyi", 1, 74000), it("Tinchlantiruvchi choy", 2, 20500)] },
  { id: '#10477', name: 'Otabek Nazarov', phone: '+998 94 618 90 03', time: '08:47', status: 'delivered', courier: 'Anvar Tursunov', pay: 'Uzcard', addr: "Toshkent, Yakkasaroy, Shota Rustaveli 41", items: [it("Tabiiy parvarish to'plami", 1, 98000)] },
  { id: '#10476', name: 'Nigora Saidova', phone: '+998 91 302 17 45', time: '08:15', status: 'cancelled', reason: "Mijoz bekor qildi", pay: 'Click', addr: "Toshkent, Olmazor, Qorasaroy 18", items: [it("Zanjabil-asal aralashmasi", 1, 22000)] },
  { id: '#10475', name: 'Kamola Ergasheva', phone: '+998 90 845 66 21', time: '08:02', status: 'preparing', pay: 'Naqd', addr: "Toshkent, Bektemir, Husayn Boyqaro 7", items: [it("Teri malhami", 1, 86000), it("Soch uchun o'simlik moyi", 1, 92000)] },
];

const pr = (id: number, name: string, cat: string, price: number, stock: number, o: Partial<AdminProduct> = {}): AdminProduct =>
  ({ id, name, cat, price, stock, old: '', active: true, rx: false, desc: '', ...o });

export const ADMIN_PRODUCTS: AdminProduct[] = [
  pr(1, "Tog' asali (Zomin)", 'Asal va aralashmalar', 120000, 140),
  pr(2, "Bo'g'im moyi «Qahramon»", 'Moy va malhamlar', 95000, 8),
  pr(3, 'Amoksitsillin 500 mg', 'Dorixona', 36000, 22, { rx: true }),
  pr(4, 'Zanjabil-asal aralashmasi', 'Asal va aralashmalar', 85000, 65, { old: 98000 }),
  pr(5, "Na'matak damlamasi", 'Damlamalar', 65000, 4),
  pr(6, "Oshqozon choyi yig'masi", "O'simlik choylari", 48000, 31),
  pr(7, 'Tinchlantiruvchi choy', "O'simlik choylari", 42000, 0),
  pr(8, 'Teri malhami', 'Moy va malhamlar', 78000, 17),
  pr(9, "Soch uchun o'simlik moyi", 'Moy va malhamlar', 89000, 3),
  pr(10, "Tabiiy parvarish to'plami", "To'plamlar", 240000, 12, { active: false }),
];

export const ADMIN_PRODUCT_IMAGES: Record<number, string> = {
  1: '1471943311424-646960669fbc', 2: '1515377905703-c4788e51af15', 3: '1584017911766-d451b3d0e843',
  4: '1558642452-9d2a7deb7f62', 5: '1608571423902-eed4a5ad8108', 6: '1563822249548-9a72b6353cd1',
  7: '1576092768241-dec231879fc3', 8: '1620916566398-39f1143ab7be', 9: '1624454002302-36b824d7bd0a',
  10: '1612817288484-6f916006741a',
};
export const ADMIN_FALLBACK_IMAGE = '1514733670139-4d87a1941d55';

export const ADMIN_RXS: AdminRx[] = [
  { id: 'R-2041', patient: 'Jasur Toshmatov', doctor: 'Dr. N. Qodirova', clinic: 'Shifo Med klinikasi', date: 'Bugun, 10:35', order: '#10481', items: ['Amoksitsillin 500 mg × 1'], status: 'pending' },
  { id: 'R-2040', patient: 'Feruza Olimova', doctor: 'Dr. A. Rasulov', clinic: '3-son oilaviy poliklinika', date: 'Bugun, 09:12', items: ['Sertralin 50 mg × 1', 'Gidroksizin 25 mg × 1'], status: 'pending' },
  { id: 'R-2039', patient: 'Bobur Xolmatov', doctor: 'Dr. S. Mirzayeva', clinic: 'Respublika shoshilinch yordam markazi', date: 'Kecha, 18:40', items: ['Azitromitsin 500 mg × 1'], status: 'pending' },
  { id: 'R-2038', patient: 'Madina Qosimova', doctor: 'Dr. N. Qodirova', clinic: 'Shifo Med klinikasi', date: 'Kecha, 14:05', items: ['Metformin 850 mg × 2'], status: 'approved' },
  { id: 'R-2037', patient: 'Rustam Ahmedov', doctor: 'Dr. B. Islomov', clinic: '12-son poliklinika', date: '2 okt, 11:20', items: ['Tramadol 50 mg × 1'], status: 'rejected', reason: "Retsept muddati o'tgan" },
];

export const ADMIN_CUSTOMERS: AdminCustomer[] = [
  { id: 1, name: 'Aziza Karimova', phone: '+998 90 123 45 67', orders: 14, spent: 1240000, since: 'Mart 2025' },
  { id: 2, name: 'Jasur Toshmatov', phone: '+998 93 555 12 09', orders: 6, spent: 486000, since: 'Iyun 2025' },
  { id: 3, name: 'Malika Yusupova', phone: '+998 97 210 44 18', orders: 22, spent: 2310000, since: 'Yanvar 2025' },
  { id: 4, name: 'Sardor Aliyev', phone: '+998 90 777 31 52', orders: 3, spent: 198000, since: 'Avgust 2026' },
  { id: 5, name: 'Dilnoza Rahimova', phone: '+998 99 401 22 70', orders: 9, spent: 812000, since: 'Aprel 2025' },
  { id: 6, name: 'Nigora Saidova', phone: '+998 91 302 17 45', orders: 2, spent: 64000, since: 'Sentabr 2026', blocked: true },
];

export const ADMIN_CHATS: AdminChat[] = [
  { id: 1, name: 'Aziza Karimova', time: '10:44', unread: 2, msgs: [{ me: false, t: "Assalomu alaykum, #10482 buyurtma berdim.", time: '10:43' }, { me: false, t: 'Buyurtmam qachon yetib keladi?', time: '10:44' }] },
  { id: 2, name: 'Jasur Toshmatov', time: '10:36', unread: 1, msgs: [{ me: false, t: 'Retseptni ilovaga yukladim, tekshirib bera olasizmi?', time: '10:36' }] },
  { id: 3, name: 'Malika Yusupova', time: '09:30', unread: 0, msgs: [{ me: false, t: "Bo'g'im moyi bormi?", time: '09:28' }, { me: true, t: "Ha, omborda bor. Buyurtmangizga qo'shdik.", time: '09:30' }] },
  { id: 4, name: 'Sardor Aliyev', time: 'Kecha', unread: 0, msgs: [{ me: false, t: 'Rahmat, oldim.', time: '19:02' }] },
];

export const ADMIN_PROMOS: AdminPromo[] = [
  { code: 'SHIFO10', val: "10% chegirma", used: 412, limit: 1000, till: '31.10.2026', active: true },
  { code: 'KUZ25', val: "25 000 so'm chegirma, 200 000 so'mdan", used: 87, limit: 200, till: '15.11.2026', active: true },
  { code: 'BEPUL', val: "Bepul yetkazib berish", used: 1200, limit: 1500, till: '30.09.2026', active: false },
];

export const ADMIN_COURIER_PICKS: AdminCourierPick[] = [
  { name: 'Bekzod Rahimov', sub: "1 ta faol buyurtma · 1,2 km" },
  { name: 'Sherzod Qodirov', sub: "Bo'sh · 2,8 km" },
  { name: 'Anvar Tursunov', sub: "Bo'sh · 3,5 km" },
];

export const ADMIN_CANCEL_REASONS = ["Mahsulot omborda yo'q", "Mijoz bilan bog'lanib bo'lmadi", "Mijoz bekor qildi", "Manzil yetkazish hududidan tashqarida"];
export const ADMIN_REJECT_REASONS = ["Retsept muddati o'tgan", "Rasm aniq emas", "Shifokor imzosi yoki muhri yo'q", "Dori retseptga mos kelmaydi"];

export const ADMIN_DELIVERY_FEE = 15000;

export const ADMIN_KPI: Record<AdminRange, AdminKpi> = {
  today: { s: 4860000, o: 38, a: 127900, c: 9, bars: [2, 5, 9, 7, 6, 8, 4, 3], labels: ['08', '10', '12', '14', '16', '18', '20', '22'], cap: "Bugun soat bo'yicha", d: ['+12%', '+8%', '+3%', '−4%'] },
  week: { s: 29400000, o: 241, a: 122000, c: 57, bars: [6, 7, 5, 8, 9, 10, 6], labels: ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'], cap: 'Shu hafta', d: ['+6%', '+5%', '+1%', '+9%'] },
  month: { s: 118700000, o: 962, a: 123400, c: 214, bars: [7, 8, 9, 10], labels: ['1-h', '2-h', '3-h', '4-h'], cap: 'Oktabr', d: ['+14%', '+11%', '+2%', '+18%'] },
};

export const ADMIN_TAB_META: Record<AdminTabKey, [string, string]> = {
  dash: ['Asosiy', 'home'],
  orders: ['Buyurtmalar', 'bag'],
  products: ['Mahsulotlar', 'box'],
  rx: ['Retseptlar', 'rx'],
  inventory: ['Ombor', 'layers'],
  chats: ['Xabarlar', 'chat'],
  customers: ['Mijozlar', 'users'],
  more: ["Ko'proq", 'grid'],
};
export const ADMIN_ROLE_TABS: Record<AdminRole, AdminTabKey[]> = {
  Admin: ['dash', 'orders', 'products', 'rx', 'more'],
  Farmatsevt: ['dash', 'orders', 'rx', 'inventory', 'more'],
  "Qo'llab-quvvatlash": ['orders', 'chats', 'customers', 'more'],
};

export const ADMIN_APPTS: AdminAppt[] = [
  { id: 1, day: 0, time: '09:00', name: 'Sherzod Aliyev', phone: '+998 90 211 40 08', age: 31, type: 'video', complaint: "Bosh terisi quruqligi va soch to'kilishi, 3 oydan beri", status: 'done', note: "Haftada 2 marta o'simlik moyi bilan uqalash. Ko'proq suv ichish, shirinlikni kamaytirish.", recs: [9] },
  { id: 2, day: 0, time: '10:00', name: 'Aziza Karimova', phone: '+998 90 123 45 67', age: 46, type: 'video', complaint: "Tizza og'rig'i, 2 oydan beri. Ertalab va zinadan tushganda kuchayadi.", status: 'confirmed', note: '', recs: [2] },
  { id: 3, day: 0, time: '11:00', name: 'Bahodir Usmonov', phone: '+998 93 640 18 22', age: 38, type: 'clinic', complaint: "Ovqatdan keyin oshqozonda achishish va og'irlik.", status: 'new', note: '', recs: [] },
  { id: 4, day: 0, time: '14:00', name: 'Gulnora Rashidova', phone: '+998 97 105 77 31', age: 52, type: 'chat', complaint: "Uyqusizlik, kechasi tez-tez uyg'onish, kunduzi charchoq.", status: 'new', note: '', recs: [] },
  { id: 5, day: 1, time: '10:00', name: 'Malika Yusupova', phone: '+998 97 210 44 18', age: 44, type: 'clinic', complaint: "Bel og'rig'i, uzoq o'tirgandan keyin kuchayadi.", status: 'confirmed', note: '', recs: [] },
  { id: 6, day: 1, time: '15:00', name: 'Javohir Qodirov', phone: '+998 99 330 12 64', age: 27, type: 'video', complaint: 'Tez-tez shamollash, immunitet pastligi.', status: 'new', note: '', recs: [] },
];
export const ADMIN_APPT_TYPES: Record<ApptType, [string, Tone, string, number]> = {
  video: ['Video', 'info', 'video', 30],
  chat: ['Yozma', 'accent', 'chat', 0],
  clinic: ['Klinika', 'warning', 'clinic', 45],
};
export const ADMIN_APPT_STATUS: Record<ApptStatus, [string, Tone]> = {
  new: ["Yangi so'rov", 'info'],
  confirmed: ['Tasdiqlangan', 'success'],
  done: ['Yakunlangan', 'neutral'],
};
export const ADMIN_APPT_DAYS = ['Bugun', 'Ertaga', 'Dush, 6', 'Sesh, 7'];
export const ADMIN_RESCHEDULE_SLOTS: [string, number, string][] = [['Bugun 16:00', 0, '16:00'], ['Bugun 17:00', 0, '17:00'], ['Ertaga 09:00', 1, '09:00'], ['Ertaga 12:00', 1, '12:00']];

export const ADMIN_ART_TAGS = ["Bo'g'imlar", 'Oshqozon', 'Immunitet', 'Asab va uyqu', 'Teri', 'Soch'];
export const ADMIN_ARTS: AdminArticle[] = [
  { id: 1, title: "Bo'g'im og'rig'ida uyda qilinadigan 5 odat", tag: "Bo'g'imlar", img: '1515377905703-c4788e51af15', views: '18.2K', date: '2 okt', published: true, lead: "Kundalik harakat, iliq kompress va to'g'ri ovqatlanish bo'g'imlarga yengillik beradi.", body: "Bo'g'im og'rig'i ko'pincha kam harakat, sovuq va ortiqcha yuk bilan kuchayadi.", recs: [2] },
  { id: 2, title: "Oshqozon uchun ertalabki o'simlik choyi", tag: 'Oshqozon', img: '1597318181409-cf64d0b5d8a2', views: '11.7K', date: '28 sen', published: true, lead: "Moychechak va yalpizli choy ovqat hazm qilishni yengillashtiradi.", body: "Ertalabki iliq o'simlik choyi oshqozonni kunga tayyorlaydi.", recs: [6] },
  { id: 3, title: "Kuz faslida immunitetni qanday qo'llash kerak", tag: 'Immunitet', img: '1556679343-c7306c1976bc', views: '24.9K', date: '24 sen', published: true, lead: "Uyqu, iliq ichimliklar va mavsumiy mevalar.", body: "Kuzda kunlar qisqaradi, organizm ko'proq yuklanadi.", recs: [1, 4] },
  { id: 4, title: 'Yaxshi uyqu uchun kechki odatlar', tag: 'Asab va uyqu', img: '1576092768241-dec231879fc3', views: '9.3K', date: '19 sen', published: true, lead: "Ekran vaqtini kamaytirish va iliq choy uyquni chuqurlashtiradi.", body: "Sifatli uyqu kayfiyat va immunitetga ta'sir qiladi.", recs: [7] },
  { id: 5, title: "Qishda teri parvarishi: 4 ta tabiiy usul", tag: 'Teri', img: '1612817288484-6f916006741a', views: '—', date: 'Qoralama', published: false, lead: "Sovuq havoda terini quruqlikdan asrash.", body: '', recs: [8] },
];
export const ADMIN_COVER_POOL = ['1514733670139-4d87a1941d55', '1612817288484-6f916006741a', '1597318181409-cf64d0b5d8a2', '1558642452-9d2a7deb7f62'];

export const ADMIN_BANNERS: AdminBanner[] = [
  { id: 1, title: "Kuzgi immunitet to'plami — 15% chegirma", target: 'Havola: Immunitet toifasi', img: '1558642452-9d2a7deb7f62', active: true, clicks: 1840 },
  { id: 2, title: 'Qahramon Tabib bilan onlayn maslahat', target: 'Havola: Maslahat sahifasi', img: '1597318181409-cf64d0b5d8a2', active: true, clicks: 960 },
  { id: 3, title: "300 000 so'mdan bepul yetkazish", target: "Havola: Do'kon", img: '1514733670139-4d87a1941d55', active: false, clicks: 0 },
];

export const ADMIN_REVIEWS: AdminReview[] = [
  { id: 1, name: 'Aziza Karimova', product: "Bo'g'im moyi «Qahramon»", stars: 5, date: 'Bugun', text: "Ikki haftadan beri ishlataman, ertalabki og'riq ancha kamaydi. Hidi ham yoqimli.", reply: '' },
  { id: 2, name: 'Dilnoza Rahimova', product: "Tog' asali (Zomin)", stars: 5, date: 'Kecha', text: "Haqiqiy tog' asali, bolalarga ham juda yoqdi.", reply: "Rahmat, Dilnoza! Sog'liq tilaymiz." },
  { id: 3, name: 'Otabek Nazarov', product: 'Tinchlantiruvchi choy', stars: 4, date: '2 okt', text: "Yaxshi ta'sir qiladi, lekin paketlar biroz kichik.", reply: '' },
  { id: 4, name: 'Anonim', product: "Oshqozon choyi yig'masi", stars: 2, date: '30 sen', text: 'Yetkazish kechikdi.', reply: '', hidden: true },
];

export const ADMIN_CATS: AdminCategory[] = [
  { name: 'Asal va aralashmalar', img: '1471943311424-646960669fbc', active: true },
  { name: 'Moy va malhamlar', img: '1515377905703-c4788e51af15', active: true },
  { name: "O'simlik choylari", img: '1576092768241-dec231879fc3', active: true },
  { name: 'Damlamalar', img: '1608571423902-eed4a5ad8108', active: true },
  { name: "To'plamlar", img: '1612817288484-6f916006741a', active: true },
  { name: 'Dorixona', img: '1584017911766-d451b3d0e843', active: true },
];

export const ADMIN_STAFF: AdminStaff[] = [
  { id: 1, name: 'Dilshod Rasulov', role: 'Admin', last: 'Hozir onlayn', active: true },
  { id: 2, name: 'Nilufar Tursunova', role: 'Farmatsevt', last: '12 daqiqa oldin', active: true },
  { id: 3, name: 'Sevara Ahmedova', role: "Qo'llab-quvvatlash", last: '1 soat oldin', active: true },
  { id: 4, name: "Ulug'bek Karimov", role: 'Farmatsevt', last: '3 kun oldin', active: false },
];

export const ADMIN_COURIERS: AdminCourier[] = [
  { name: 'Bekzod Rahimov', status: 'busy', today: 6, rating: 4.9, where: '#10479 · Shayxontohur' },
  { name: 'Sherzod Qodirov', status: 'free', today: 4, rating: 4.8, where: 'Chilonzor filiali yonida' },
  { name: 'Anvar Tursunov', status: 'free', today: 5, rating: 4.9, where: 'Yunusobod' },
  { name: 'Rustam Nazarov', status: 'off', today: 0, rating: 4.7, where: 'Bugun dam olish kuni' },
];
export const ADMIN_COURIER_STATUS: Record<CourierState, [string, Tone, string]> = {
  busy: ['Yetkazmoqda', 'accent', '#2f5a40'],
  free: ["Bo'sh", 'success', '#3f9a5f'],
  off: ['Offline', 'neutral', '#bfb49c'],
};

export const ADMIN_ROLES: AdminRole[] = ['Admin', 'Farmatsevt', "Qo'llab-quvvatlash"];
export const ADMIN_ROLE_MORE: Record<AdminRole, AdminMoreKey[]> = {
  Admin: ['appts', 'chats', 'articles', 'reviews', 'inventory', 'categories', 'couriers', 'customers', 'promos', 'banners', 'push', 'analytics', 'staff', 'settings'],
  Farmatsevt: ['appts', 'products', 'categories', 'chats', 'reviews', 'settings'],
  "Qo'llab-quvvatlash": ['appts', 'rx', 'reviews', 'couriers', 'settings'],
};
export const ADMIN_MORE_GROUPS: [string, AdminMoreKey[]][] = [
  ['Tabib', ['appts', 'chats', 'articles', 'reviews']],
  ['Savdo', ['products', 'rx', 'inventory', 'categories', 'couriers', 'customers']],
  ['Marketing', ['promos', 'banners', 'push', 'analytics']],
  ['Tizim', ['staff', 'settings']],
];
export const ADMIN_MORE_META: Record<AdminMoreKey, [string, string, string]> = {
  appts: ['Qabullar', 'cal', 'Maslahat va qabul jadvali'],
  articles: ['Maqolalar', 'book', 'Tabib maslahatlari'],
  reviews: ['Sharhlar', 'star', 'Mahsulot baholari'],
  categories: ['Toifalar', 'layers', "Do'kon tartibi"],
  couriers: ['Kuryerlar', 'truck', 'Holat va yetkazishlar'],
  banners: ['Bannerlar', 'image', 'Bosh sahifa slayderi'],
  analytics: ['Analitika', 'chart', 'Savdo va trafik'],
  staff: ['Xodimlar va rollar', 'shield', 'Kirish huquqlari'],
  inventory: ['Ombor', 'layers', 'Qoldiqni boshqarish'],
  customers: ['Mijozlar', 'users', 'Profil va buyurtmalar tarixi'],
  chats: ['Xabarlar', 'chat', 'Mijozlar bilan yozishma'],
  promos: ['Aksiyalar va promokodlar', 'tag', 'Chegirmalarni boshqarish'],
  push: ['Push-bildirishnoma', 'bell', 'Mijozlarga xabar yuborish'],
  settings: ['Sozlamalar', 'gear', "Dorixona, to'lov, yetkazish"],
  products: ['Mahsulotlar', 'box', 'Katalog va narxlar'],
  rx: ['Retseptlar', 'rx', 'Tekshiruv navbati'],
};
export const ADMIN_SCREEN_TITLES: Record<string, string> = {
  appts: 'Qabullar', appt: 'Qabul', articles: 'Maqolalar', article: 'Maqola', reviews: 'Sharhlar', categories: 'Toifalar',
  couriers: 'Kuryerlar', banners: 'Bannerlar', analytics: 'Analitika', staff: 'Xodimlar', dash: 'Tabib Admin',
  orders: 'Buyurtmalar', products: 'Mahsulotlar', rx: 'Retseptlar', more: "Ko'proq", inventory: 'Ombor',
  customers: 'Mijozlar', chats: 'Xabarlar', promos: 'Aksiyalar', push: 'Bildirishnoma', settings: 'Sozlamalar',
};

export const ADMIN_PUSH_AUDIENCES: [string, string][] = [
  ['Barcha mijozlar', '12 480 qabul qiluvchi'],
  ["So'nggi 30 kunda faol", '4 215 qabul qiluvchi'],
  ["60 kundan beri xarid qilmagan", '2 960 qabul qiluvchi'],
];
export const ADMIN_DEFAULT_PUSH = { title: 'Kuzgi chegirmalar', body: "Barcha vitaminlarga 15% chegirma — faqat shu hafta.", aud: 0 };

export const ADMIN_QUICK_REPLIES = ["Buyurtmangiz yo'lda, 20 daqiqada yetib boradi.", 'Retseptingiz tekshirilmoqda.', "Mahsulot hozir omborda yo'q."];

export const ADMIN_DEFAULT_SETTINGS: AdminSettings = {
  allDay: false, delivery: true, cash: true, click: true, payme: true, uzcard: true,
  nOrders: true, nRx: true, nChat: true, faceid: true,
};

export const ADMIN_ROLE_PERMS: { role: AdminRole; perms: string }[] = [
  { role: 'Admin', perms: "Hamma bo'limlar, xodimlar, sozlamalar va analitika" },
  { role: 'Farmatsevt', perms: 'Buyurtmalar, retseptlar, ombor, mahsulotlar, qabullar' },
  { role: "Qo'llab-quvvatlash", perms: 'Buyurtmalar, xabarlar, mijozlar, sharhlar' },
];

/* analytics */
export const ADMIN_TOP_SOLD: { productId: number; n: number }[] = [
  { productId: 1, n: 412 }, { productId: 2, n: 336 }, { productId: 4, n: 268 }, { productId: 6, n: 201 }, { productId: 9, n: 175 },
];
export const ADMIN_CHANNELS: { name: string; pct: number; color: string }[] = [
  { name: 'Instagram', pct: 46, color: '#2f5a40' },
  { name: 'Ilova', pct: 28, color: '#c8a24c' },
  { name: 'Telegram', pct: 18, color: '#6f9a7c' },
  { name: "To'g'ridan", pct: 8, color: '#d8cfbb' },
];
export const ADMIN_CONVERSION: Record<AdminRange, string> = { today: '3.8%', week: '4.1%', month: '4.4%' };
export const ADMIN_CONSULT_SUMMARY: Record<AdminRange, string> = {
  today: "Bugun 4 ta qabul, 2 tasi yakunlangan. Maslahatdan keyin o'rtacha xarid — 186 000 so'm.",
  week: "Shu hafta 27 ta qabul: 16 video, 6 yozma, 5 klinikada. Daromad 3 150 000 so'm.",
  month: "Oktabrda 104 ta qabul. Daromad 11 900 000 so'm, mijozlarning 62% i keyin xarid qilgan.",
};

/* login prefill from the prototype */
export const ADMIN_LOGIN = { email: 'admin@qahramontabib.uz', password: 'shifo2026', name: 'Dilshod Rasulov', initials: 'DR' };
