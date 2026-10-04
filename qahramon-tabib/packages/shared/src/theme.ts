import { Platform } from 'react-native';

export const colors = {
  brandInk: '#17301f',
  accent: '#2f5a40',
  accentHover: '#264b35',
  accentActive: '#1e3c2a',
  accentText: '#2a5139',
  accentFill: 'rgba(47,90,64,.10)',
  gold: '#d9b45f',
  goldLine: '#c8a24c',
  goldText: '#8a6a1f',
  goldTextDeep: '#7f5f12',
  goldFill: 'rgba(200,160,70,.18)',
  page: '#f4f0e6',
  card: '#fffdf8',
  inset: '#ece6d8',
  raised: '#efe9dc',
  borderSubtle: '#e6dfcf',
  borderDefault: '#d8cfbb',
  borderStrong: '#bfb49c',
  text: '#18241c',
  body: '#2c362f',
  secondary: '#535c54',
  muted: '#6f766c',
  placeholder: '#8f9488',
  onAccent: '#ffffff',
  success: '#2a6b44',
  successFill: 'rgba(47,120,72,.11)',
  danger: '#b5403a',
  dangerFill: 'rgba(181,64,58,.09)',
  warning: '#7f5f12',
  warningFill: 'rgba(200,160,70,.18)',
  info: '#2d5f9a',
  infoFill: 'rgba(60,110,180,.10)',
  disabled: '#9aa59b',
  scrim: 'rgba(18,30,22,.33)',
  // swipe action colours
  swipeHide: '#8f9488',
  swipeShow: '#2f5a40',
  swipeArchive: '#b08a2e',
  swipeDelete: '#b5403a',
  star: '#c8a24c',
} as const;

export type Tone = 'neutral' | 'success' | 'danger' | 'warning' | 'info' | 'accent';

export const toneStyle: Record<Tone, { bg: string; fg: string; border?: string }> = {
  neutral: { bg: colors.raised, fg: colors.secondary, border: colors.borderSubtle },
  success: { bg: colors.successFill, fg: colors.success },
  danger: { bg: colors.dangerFill, fg: colors.danger },
  warning: { bg: colors.warningFill, fg: colors.warning },
  info: { bg: colors.infoFill, fg: colors.info },
  accent: { bg: colors.accentFill, fg: colors.accentText },
};

export const radii = { card: 20, group: 18, sheet: 34, tabBar: 32, pill: 999, chip: 18, tile: 22, icon: 12 };

export const space = { gutter: 16, card: 16, row: 13 };

export const fontFamily = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'Inter, -apple-system, system-ui, sans-serif',
}) as string;

/** Tabular numerals for prices. */
export const tabular = { fontVariant: ['tabular-nums' as const] };

export const type = {
  largeTitle: { fontSize: 31, fontWeight: '700' as const, letterSpacing: -0.62, color: colors.text },
  section: { fontSize: 19, fontWeight: '700' as const, letterSpacing: -0.19, color: colors.text },
  navTitle: { fontSize: 17, fontWeight: '600' as const, color: colors.text },
  body: { fontSize: 15, color: colors.body },
  meta: { fontSize: 13, color: colors.muted },
  kicker: { fontSize: 11.5, fontWeight: '700' as const, letterSpacing: 0.8, textTransform: 'uppercase' as const },
};

export const shadow = {
  glass: {
    shadowColor: '#18241c',
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  card: {
    shadowColor: '#18241c',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  soft: {
    shadowColor: '#18241c',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
};

/** Motion timings from the prototype. */
export const motion = {
  sheet: 240,
  snap: 320,
  toast: 2000,
  splash: 3600,
  typing: 1600,
};
