/** `120 000 so'm` — space as thousands separator. */
export const fmt = (n: number | string) =>
  String(Math.round(+n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + " so'm";

export const ini = (n: string) =>
  n
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

export const unsplash = (id: string, w = 600, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=75`;
