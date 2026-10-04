export type Product = {
  id: number; name: string; size: string; price: number; img: string; ail: string;
  old: number; rating: number; reviews: number; rx: boolean;
  desc: string; comp: string; use: string; note: string;
};
export type Article = {
  id: number; tag: string; read: string; img: string; title: string; lead: string; date: string;
  body: string[]; tips: string[]; rel: number[];
};
export type ConsultType = { k: string; label: string; sub: string; price: number; icon: 'video' | 'chat' | 'clinic' };
export type Review = { name: string; stars: number; date: string; text: string; reply: string };
export type Notification = {
  id: number; icon: 'truck' | 'cal' | 'rx' | 'leaf' | 'book'; title: string; body: string; time: string;
  to: string; kind: 'acc' | 'gold'; read?: boolean;
};

export type OrderStatus = 'new' | 'preparing' | 'onway' | 'delivered' | 'cancelled';
export type RxStatus = 'pending' | 'approved' | 'rejected';
export type ApptStatus = 'new' | 'confirmed' | 'done';
