# Handoff: Qahramon Tabib — customer app + admin app (iOS / Android)

## Overview
Two mobile apps for **Qahramon Tabib**, a natural-remedies brand (herbal teas, honey, oils, balms) that also sells prescription drugs and offers paid consultations with the Tabib himself.

- **Customer app** (`Qahramon Tabib.dc.html`) covers the shop, consultation booking, Q&A chat, articles, prescription upload, checkout, order tracking and profile.
- **Admin app** (`Qahramon Tabib Admin.dc.html`) is a mobile staff app. It covers orders, products, prescriptions, appointments, articles, banners, reviews, analytics, categories, couriers, staff/roles and settings, with role-based access.

UI language: **Uzbek (Latin)**. Currency: **UZS**, formatted `120 000 so'm` with a space as the thousands separator. The target is a single codebase for iOS and Android with an **iOS visual language** (large titles, Liquid Glass bars, bottom sheets, swipe actions).

## About the design files
The files in `prototype/` are **design references built in HTML**: working prototypes that show the intended look and behavior. They are not production code. Your task is to **recreate them in a real mobile stack**. Recommended: **React Native + Expo** with `expo-blur` for glass, `react-native-reanimated` + `react-native-gesture-handler` for swipe rows and sheets, and `expo-router` for navigation. Flutter or SwiftUI/Compose are also acceptable. If a target codebase already exists, follow its patterns.

### How to open and run the prototypes (do this first)
```
cd prototype
npx serve .          # or: python -m http.server 8000
# open http://localhost:3000/Qahramon%20Tabib.dc.html
# and  http://localhost:3000/Qahramon%20Tabib%20Admin.dc.html
```
- The files must be served over HTTP, not opened as `file://`, because `support.js` and `_ds/` load relatively.
- Each page shows a 393×852 iPhone frame plus a **left sidebar that jumps to every screen**. Click through every screen and flow before writing code.
- In the admin page, open the host "Tweaks" props (or edit `role` in the `data-props` JSON) to switch the role between `Admin`, `Farmatsevt` and `Qo'llab-quvvatlash`. Tabs and menus change by role.

### How to read a `.dc.html` file
- **Markup** is the content between `<x-dc>` and `</x-dc>`. Every style is inline and every value is final. `{{ name }}` holes are filled from the logic class.
- **Logic** is in `<script type="text/x-dc" data-dc-script>` at the bottom. Its parts:
  - top-level `const`s: **all seed data** (products, articles, orders, appointments, etc.), icon paths `P`, formatters;
  - a `Component` class: `state` holds every state variable;
  - `renderVals()` / `baseVals()` / `enhance()`: derive what each screen shows. Use these as the spec for business logic.
- `FintruckDesignSystem_557fba.Button / Input / Select / Badge / Switch` are small UI primitives from `_ds/…/_ds_bundle.js`. Their source shows exact sizes and states. Recreate them as your own components.

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, glass treatments, motion and copy are final. Recreate them pixel-close. Product data, prices, images and the Tabib's stats are **placeholder seed data**; the client will supply the real catalog.

## Design tokens
Brand: deep herbal green and gold on warm cream.

| Token | Value | Use |
|---|---|---|
| brand-ink | `#17301f` | splash bg, dark cards, selected chips, monogram bg |
| accent | `#2f5a40` (hover `#264b35`, active `#1e3c2a`) | primary buttons, active tab, success |
| accent-text | `#2a5139` | links, active tab label |
| accent-fill | `rgba(47,90,64,.10)` | tinted icon tiles, avatars |
| gold | `#d9b45f` (line `#c8a24c`, text-on-cream `#8a6a1f` / `#7f5f12`) | monogram, kickers, stars, accents on dark |
| page | `#f4f0e6` | screen background |
| card | `#fffdf8` | cards, list rows |
| inset | `#ece6d8` | segmented track, steppers, placeholders |
| border-subtle / default / strong | `#e6dfcf` / `#d8cfbb` / `#bfb49c` | hairlines, inputs, dashed slots |
| text primary / body / secondary / muted / placeholder | `#18241c` / `#2c362f` / `#535c54` / `#6f766c` / `#8f9488` | |
| danger | `#b5403a` (fill `rgba(181,64,58,.09)`) | Rx badge, delete, errors |
| warning | `#7f5f12` (fill `rgba(200,160,70,.18)`) | low stock, pending |
| info | `#2d5f9a` (fill `rgba(60,110,180,.10)`) | new order |
| swipe actions | hide `#8f9488`, show/restore `#2f5a40`, archive `#b08a2e`, delete `#b5403a` | |

Full CSS-variable override block: `html:root{…}` in the `<helmet><style>` of either file.

- **Type:** a single sans (Inter is a stand-in; use SF Pro on iOS and Roboto/Inter on Android).
  - Sizes: large title 30–31/700/-0.02em; section 19/700; nav title 17/600; body 14.5–15/400–600; meta 12–13.5; kicker 11.5–12/700, uppercase, +0.06–0.08em.
  - Use tabular numerals for all prices.
- **Radii:**
  - cards 18–24;
  - list groups 18–20;
  - sheets 34–36;
  - tab bar 32;
  - buttons 24 (pill) or 14;
  - chips 17–19;
  - category tiles 20–24;
  - icon tiles 10–14.
- **Spacing:** 4-pt grid. Screen gutters 16, card padding 14–16, row padding 12–14, section gaps 12–20.
- **Liquid Glass recipe:**
  - surface: `background: rgba(255,253,248,.56–.72)`, `backdrop-filter: blur(22–28px) saturate(180–190%)`;
  - border: `1px solid rgba(255,255,255,.9)`;
  - shadow: `0 12px 36px rgba(24,36,28,.16), inset 0 1px 0 rgba(255,255,255,.95)`;
  - over photos, use the darker variant: `rgba(255,255,255,.22)` + `1px rgba(255,255,255,.45)` border.
- **Glass applies to:** floating tab bar, nav bars, bottom action bars, floating back/fav buttons, sheets, toasts, search pill and category tile labels.
- **Minimum hit target:** 44 pt.

## Global patterns
- **Status bar:** 54 pt. The home indicator is 134×5 at the bottom.
- **Floating tab bar:**
  - position: left/right 14, bottom 24, height 64, radius 32, glass;
  - active item: a white capsule (`rgba(255,253,248,.95)`, shadow `0 2px 10px rgba(24,36,28,.10)`) with accent icon/label at stroke 2 (inactive 1.7);
  - badge: red 17 pt pill.
- **Nav bars:**
  - tab roots: glass header with a 31 pt large title;
  - pushed screens: 52 pt glass bar with a 40 pt circular glass back button on the left and a centered 17/600 title;
  - optional circular action on the right.
- **Bottom action bar:** floating glass capsule (radius 30, padding 8) with a 48 pt pill primary button. Product detail adds a quantity stepper.
- **Bottom sheets:**
  - inset 8 pt from the edges, radius 34–36, glass at .86–.9;
  - 38×5 grabber; scrim `rgba(18,30,22,.32–.34)`;
  - slide-up animation .22–.24 s `cubic-bezier(.2,0,.2,1)`.
- **Toast:** top-center glass pill with a check icon, auto-hides after about 2 s.
- **Swipe-to-reveal rows** (replaces all list switches):
  - drag left to reveal 76 pt-wide colored action buttons (icon above a 11.5/600 label);
  - snaps open past 38% of the action width and rubber-bands 28 pt;
  - tap the row while open to close it; vertical scroll is preserved;
  - snap easing `transform .32s cubic-bezier(.2,.8,.2,1)`;
  - only one row is open at a time;
  - delete always asks for confirmation in a sheet.
- **Settings toggles** stay as standard iOS switches.

## Motion
- **Splash** (3.6 s, then onboarding):
  - background `#17301f` with a pulsing gold radial glow (`qtGlow` 3 s);
  - three expanding gold rings (`qtRing` 2.6 s, staggered 0.55 s);
  - a glass logo tile pops in (`qtPop` .9 s);
  - the leaf stroke draws (`qtDraw` 1.4 s);
  - a light sheen sweeps across (`qtShine`);
  - "Qahramon Tabib" rises letter by letter (`qtUp` .6 s, 45 ms stagger; "Tabib" in gold);
  - the tagline fades in, and a gold progress bar fills (`qtBar` 3.2 s).
- **Order success:** the check circle pops and the check path draws, with two pulse rings.
- **Chat typing indicator:** three bouncing dots (`qtDot` 1.2 s).

Keyframes are in `<helmet><style>` of `Qahramon Tabib.dc.html`. Respect reduced-motion settings.

## Screens: customer app
Use the sidebar in the prototype to reach each screen.

**Entry flow**
1. **Splash**: animated, see Motion.
2. **Onboarding (3 slides)**:
   - full-bleed photo with a 28% dark overlay;
   - glass bottom card holding progress dots (active dot 22 pt wide), gold kicker, 26/700 title, body text and CTA;
   - "O'tkazib yuborish" glass pill at the top right.
3. **Login**:
   - phone input with a `+998` prefix;
   - "Kod olish" is disabled until 9 digits are entered;
   - the 4-cell SMS code then appears and the CTA becomes "Tasdiqlash";
   - "Mehmon sifatida ko'rish" lets the user browse as a guest.

**Tabs**

4. **Home (tab)**:
   - 300 pt hero photo with greeting, bell (gold unread dot), chat and avatar glass buttons;
   - 27 pt headline; a glass search pill overlaps the hero bottom by 24 pt;
   - 4 quick tiles: Do'kon, Maslahat, Retsept, Savol;
   - dark consultation promo card with a gold "Yozilish" button;
   - **"Muammo bo'yicha" image category tiles**: 108×132, radius 24, photo with a glass label;
   - "Ommabop mahsulotlar" carousel: 156 pt cards with a gold discount pill and a round + button;
   - "Tabib maslahatlari" article rows.
5. **Shop (tab)**:
   - search field;
   - **image category filter**: 66 pt rounded-square photos with labels; the selected one gets a 2 pt accent ring and bold accent label;
   - result count and a 2-column product grid (fav heart glass button, Rx or discount pill, rating, price, + button);
   - empty state with a "Savol berish" CTA.
6. **Consult (tab)**:
   - dark Tabib profile card with three glass stats;
   - three consultation types as selectable cards (Video 100 000, Yozma 50 000, Klinika 150 000);
   - shortcuts to Q&A chat and Rx upload.
7. **Cart (tab)**:
   - swipe rows (Sevimli / O'chirish) with a stepper; at quantity 1 the minus becomes a trash icon;
   - promo code field (`TABIB10` gives 10% off);
   - totals; free delivery from 300 000;
   - the checkout bar floats above the tab bar.
8. **Profile (tab)**: user card, three stats, grouped menu with counts, and "Hisobdan chiqish".

**Pushed screens**

9. **Product detail**:
   - 400 pt photo; floating glass back and fav buttons;
   - the sheet overlaps the photo by 34 pt;
   - tags, name, size, rating, price with old price;
   - segmented control: Tavsif / Tarkibi / Qo'llash;
   - dark "Tabib izohi" note and a disclaimer;
   - **reviews**: summary score, 5-bar distribution and three reviews with Tabib replies; "Sharh yozish" opens a sheet with a 5-star picker and text;
   - Rx products show a red notice, and the bar becomes "Retsept yuklash" until a prescription is approved;
   - bottom bar: stepper + "Savatga · {total}".
10. **Book**:
    - selected type; horizontal day pills (58×72);
    - 4-column time grid; busy slots are struck through and disabled;
    - complaint textarea;
    - the CTA stays disabled until a time is chosen; on confirm, a success sheet opens with "Qabullarim".
11. **Chat (Q&A)**:
    - bubbles: mine in accent, theirs as cream cards;
    - quick-question chips above a glass composer;
    - after a message, a 1.6 s typing indicator, then an auto-reply.
12. **Articles list** and **article detail**: 320 pt cover, overlapping sheet, author row, paragraphs, a tips card with checks, and related products.
13. **Rx upload**:
    - two dashed photo slots (camera / gallery);
    - patient name; history list with status badges;
    - the CTA is disabled until a photo and a name are set.
14. **Checkout**:
    - address radio list;
    - three delivery options (Tezkor 20 000, Bugun 15 000, Ertaga bepul);
    - payment (Click, Payme, Uzcard/Humo, Naqd) and total.
15. **Success**: animated mark, then "Buyurtmani kuzatish" / "Bosh sahifaga".
16. **Tracking**:
    - dark ETA card;
    - vertical 4-step timeline: Qabul qilindi → Yig'ilmoqda → Yo'lda → Yetkazildi;
    - courier card with a call button; items and address.
17. **Orders**, **Appointments**, **Favorites** (grid with empty state), **Addresses** (swipe: Asosiy / O'chirish; "Yangi manzil" sheet with Uy/Ish/Boshqa, street, flat, floor), **Notifications** (unread rows tinted with a dot; swipe O'qildi / O'chirish; a header check marks all as read; tapping a row deep-links).

## Screens: admin app
- **Login:** email and password, "Face ID bilan kirish", role shown.
- **Tabs by role:**
  - Admin: Asosiy · Buyurtmalar · Mahsulotlar · Retseptlar · Ko'proq;
  - Farmatsevt: Asosiy · Buyurtmalar · Retseptlar · Ombor · Ko'proq;
  - Qo'llab-quvvatlash: Buyurtmalar · Xabarlar · Mijozlar · Ko'proq.
- **Ko'proq** is grouped into **Tabib** (Qabullar, Xabarlar, Maqolalar, Sharhlar), **Savdo** (Mahsulotlar, Retseptlar, Ombor, Toifalar, Kuryerlar, Mijozlar), **Marketing** (Aksiyalar, Bannerlar, Push, Analitika) and **Tizim** (Xodimlar, Sozlamalar), filtered by role (`ROLE_MORE`).

1. **Dashboard**:
   - range segment (Bugun / Hafta / Oy); 2×2 KPIs; sales bar chart;
   - "Diqqat talab qiladi" deep-link rows: today's appointments, new orders, pending prescriptions, low stock, unread messages;
   - recent orders.
2. **Orders**:
   - search and status chips with counts; cards;
   - **detail**: 4-step progress; customer with call/chat; address; courier; items; totals;
   - primary action by status: new → "Tayyorlashni boshlash"; preparing → courier picker sheet; on the way → "Yetkazildi deb belgilash";
   - cancel uses a reason sheet.
3. **Products**:
   - search, category chips and an **"Arxiv N" chip**;
   - rows with a photo; swipe: Yashirish/Ko'rsatish, Arxiv, O'chirish; in Arxiv: Tiklash, O'chirish;
   - **edit form**: three image slots; name* and price* are validated; category, old price, stock stepper, Rx and visibility toggles, description; delete with confirmation.
4. **Prescriptions**:
   - segment: pending / approved / rejected;
   - review screen: photo, patient, doctor, clinic, items, linked order;
   - Tasdiqlash, or Rad etish with a reason sheet.
5. **Appointments (Qabullar)**:
   - day segment and three stats; time-column cards;
   - **detail**: dark patient card, complaint, "Tabib xulosasi" textarea, recommended-product chips;
   - actions: new → Tasdiqlash / Ko'chirish (reschedule sheet); confirmed → "Yakunlash va yuborish" / call.
6. **Articles**:
   - rows with a status badge; swipe: Nashr/Qoralama, Arxiv, O'chirish;
   - **editor**: cover, title* (validated), topic select, lead, body, related products, publish toggle.
7. **Banners**: 130 pt image cards with a position pill and status badge, ↑/↓ reorder; swipe: Pauza/Yoqish, O'chirish; + adds a draft.
8. **Reviews**: segment Hammasi / Javobsiz / Yashirilgan; reply sheet; hide/show.
9. **Analytics**:
   - KPIs; top-5 products with bars;
   - traffic channel stacked bar (Instagram 46%, App 28%, Telegram 18%, Direct 8%);
   - consultation summary.
10. **Categories**:
    - "Mijoz ilovasida ko'rinishi" preview strip: 96×118 photo tiles with glass labels;
    - photo rows with a product count; swipe: Yashirish, Arxiv, O'chirish;
    - header **Tartiblash** toggles iOS edit mode with ↑/↓; archived section with Tiklash.
11. **Couriers**: three stats; rows with a status dot and badge; call.
12. **Staff and roles**:
    - rows with a role badge; swipe: Bloklash/Faollashtirish, O'chirish;
    - invite sheet (phone + role); role permission summary.
13. **Inventory**: low-stock / all segment; inline ± steppers.
14. **Customers**: list and profile (stats, call/chat, block toggle).
15. **Chats**: inbox with unread badges; conversation with quick replies.
16. **Promos**: swipe cards (Pauza/Yoqish, O'chirish) with usage bars; "Yangi promokod" sheet.
17. **Push**: lock-screen glass preview, title/body, audience picker, send.
18. **Settings**: grouped iOS rows with toggles (pharmacy info, hours/24-7, delivery, payment methods, notifications, Face ID, role).

## State and data
Everything is seeded in the `const`s at the top of each file's logic script. Map them to API models:
- **Customer:** `PRODUCTS`, `ARTICLES`, `CTYPES` (consult types), `DAYS`, `SLOTS`, `BUSY`, `ADDR`, `DELIV`, `PAY`, `REVS`, `NOTIFS`, `AIL` / `AIMG` (categories and images).
- **Admin:** `ORDERS`, `PRODUCTS` / `PIMG`, `RXS`, `CUSTOMERS`, `CHATS`, `PROMOS`, `APPTS`, `ARTS`, `BANNERS`, `REVIEWS`, `CATS`, `STAFF`, `COURIERS2`, `ROLE_TABS`, `ROLE_MORE`.
- **Shared backend:** the two apps must share one backend. Admin changes such as category visibility and order, product hidden or archived, banners, articles and appointment status drive the customer app.
- **Status enums:**
  - order: `new | preparing | onway | delivered | cancelled`;
  - prescription: `pending | approved | rejected`;
  - appointment: `new | confirmed | done`.
- **Business rules in the prototype:**
  - Rx-gated add-to-cart;
  - promo `TABIB10`;
  - free delivery from 300 000;
  - low stock below 10;
  - only one swipe row open at a time.

## Assets
- **Photos:** Unsplash placeholders (`images.unsplash.com/photo-<id>`, IDs in the data consts). Replace them with the client's product photography.
- **Icons:** inline 24-grid outline paths (`const P`), stroke 1.7 (2 when active), round caps. Map them to Lucide or SF Symbols equivalents.
- **Logo:** the "QT" monogram (gold on `#17301f`, 1–1.5 pt gold border) is a placeholder until the client provides one.

## Files
- `prototype/Qahramon Tabib.dc.html`: customer app prototype.
- `prototype/Qahramon Tabib Admin.dc.html`: admin app prototype.
- `prototype/support.js`: prototype runtime (needed only to view the prototypes).
- `prototype/_ds/…`: UI primitive bundle and base tokens used by the prototypes.
