# Instructions for Claude Code

1. Read `README.md` fully.
2. Serve `prototype/` over HTTP (`npx serve prototype`). Open both `.dc.html` files in a browser (Playwright if available).
3. Use the left sidebar to visit **every** screen. Try these flows:
   - splash → onboarding → login;
   - add to cart → checkout → success → tracking;
   - book a consultation;
   - chat;
   - Rx upload;
   - swipe rows (cart, addresses, notifications; admin products, categories, articles, banners, promos, staff);
   - category edit mode;
   - admin role switch (`role` prop in the `data-props` JSON on the `<script data-dc-script>` tag).
   Take screenshots for your own reference.
4. Read each file's `<script data-dc-script>` block. The data consts and `renderVals` / `baseVals` / `enhance` are the source of truth for data shapes and business rules.
5. Build in React Native + Expo (expo-router, expo-blur, reanimated, gesture-handler) unless an existing codebase dictates otherwise.
   - Build shared tokens and primitives first: GlassSurface, TabBar, NavBar, BottomSheet, SwipeRow, Button, Input, Badge, Stepper, Toast.
   - Then build the screens.
6. Match the prototype pixel-close: colors, radii, spacing, type, motion timings. Copy all Uzbek text exactly.
7. Keep seed data in a mock API layer so it can later be replaced by the real backend shared by both apps.
