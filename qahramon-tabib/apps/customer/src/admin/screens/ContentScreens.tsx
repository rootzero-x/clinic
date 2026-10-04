import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  ADMIN_ART_TAGS, ADMIN_COVER_POOL, Badge, Button, Chip, GlassSurface, Icon, Input, Segmented, SwipeAction, SwipeRow, Switch, colors,
  ini, unsplash,
} from '@qt/shared';
import { Screen, Stack } from '../components/Screen';
import { Avatar, EmptyText, Group, PillButton, SectionLabel, SquareIconButton, SwipeHint } from '../components/Ui';
import { Photo } from '../components/Brand';
import { ActionSheet, SelectField, useConfirmDelete } from '../components/Sheets';
import { actions, emptyArticleDraft, useAdmin, type ArticleDraft } from '../store';
import { goBack, openArticle } from '../nav';
import { Image } from 'expo-image';

/* ------------------------------------------------------------------ articles */
export function ArticlesScreen({ root = false }: { root?: boolean }) {
  const arts = useAdmin((s) => s.arts);
  const askDelete = useConfirmDelete();
  return (
    <Screen title="Maqolalar" root={root} action={{ icon: 'plus', label: 'Yangi maqola', onPress: () => openArticle('new') }}>
      <Stack gap={10} style={{ paddingTop: 4 }}>
        <SwipeHint text="Chapga suring: nashr, arxiv yoki o'chirish" />
        {arts.filter((a) => !a.archived).map((a) => {
          const acts: SwipeAction[] = [
            { label: a.published ? 'Qoralama' : 'Nashr', icon: a.published ? 'eyeOff' : 'eye', bg: a.published ? colors.swipeHide : colors.swipeShow, onPress: () => actions.toggleArticle(a.id) },
            { label: 'Arxiv', icon: 'archive', bg: colors.swipeArchive, onPress: () => actions.archiveArticle(a.id) },
            { label: "O'chirish", icon: 'del', bg: colors.swipeDelete, onPress: () => askDelete("Maqola o'chirilsinmi?", a.title, () => actions.deleteArticle(a.id)) },
          ];
          return (
            <SwipeRow key={a.id} actions={acts} radius={18} onPress={() => openArticle(a.id)} style={{ borderWidth: 1, borderColor: colors.borderSubtle, backgroundColor: colors.card }}>
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', padding: 8, backgroundColor: colors.card }}>
                <Photo id={a.img} w={200} h={200} style={{ width: 76, height: 76, borderRadius: 12 }} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={{ flex: 1, fontSize: 11.5, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase', color: '#7f5f12' }}>{a.tag}</Text>
                    <Badge label={a.published ? 'Nashrda' : 'Qoralama'} tone={a.published ? 'success' : 'neutral'} />
                  </View>
                  <Text style={{ fontSize: 14.5, fontWeight: '600', color: colors.text, lineHeight: 19, marginTop: 4 }}>{a.title}</Text>
                  <Text style={{ fontSize: 12.5, color: colors.muted, marginTop: 3 }}>{a.published ? a.views + " o'qilgan · " + a.date : 'Saqlangan qoralama'}</Text>
                </View>
              </View>
            </SwipeRow>
          );
        })}
      </Stack>
    </Screen>
  );
}

export function ArticleEditorScreen({ id }: { id: string }) {
  const existing = useAdmin((s) => (id === 'new' ? undefined : s.arts.find((a) => a.id === +id)));
  const products = useAdmin((s) => s.products);
  const [d, setD] = useState<ArticleDraft>(() => (existing ? { ...existing } : emptyArticleDraft(ADMIN_ART_TAGS[0])));
  const [tried, setTried] = useState(false);
  const set = <K extends keyof ArticleDraft>(k: K, v: ArticleDraft[K]) => setD((x) => ({ ...x, [k]: v }));
  const err = tried && !d.title.trim();

  const cycleCover = () => {
    const i = (ADMIN_COVER_POOL.indexOf(d.img) + 1) % ADMIN_COVER_POOL.length;
    set('img', ADMIN_COVER_POOL[i]);
  };
  const save = () => {
    if (!actions.saveArticle(d)) { setTried(true); return; }
    goBack();
  };

  return (
    <Screen title={d.id ? 'Tahrirlash' : 'Yangi maqola'} bar={<Button title="Saqlash" size="lg" style={{ flex: 1 }} onPress={save} />}>
      <Stack gap={14} style={{ paddingTop: 8 }}>
        <Pressable
          onPress={cycleCover}
          style={{
            height: 180, borderRadius: 20, borderWidth: 1.5, borderStyle: d.img ? 'solid' : 'dashed', borderColor: d.img ? 'transparent' : colors.borderStrong,
            backgroundColor: colors.inset, overflow: 'hidden', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {d.img ? (
            <>
              <Image source={{ uri: unsplash(d.img, 800, 400) }} contentFit="cover" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
              <View style={{ position: 'absolute', right: 10, bottom: 10 }}>
                <GlassSurface radius={15} tint={0.75} noShadow contentStyle={{ height: 30, paddingHorizontal: 12, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text }}>Muqovani almashtirish</Text>
                </GlassSurface>
              </View>
            </>
          ) : (
            <Text style={{ fontSize: 13, fontWeight: '600', color: colors.accentText }}>Muqova rasmini qo'shish</Text>
          )}
        </Pressable>

        <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 18, padding: 16, gap: 14 }}>
          <Input label="Sarlavha *" placeholder="Masalan, Bo'g'im og'rig'ida 5 odat" value={d.title} onChangeText={(t) => set('title', t)} error={err ? 'Sarlavhani kiriting' : undefined} />
          <SelectField label="Mavzu" value={d.tag} options={ADMIN_ART_TAGS} onChange={(v) => set('tag', v)} />
        </View>

        <SectionLabel>Qisqa tavsif</SectionLabel>
        <Input multiline minHeight={72} placeholder="Ro'yxatda ko'rinadigan 1–2 jumla" value={d.lead} onChangeText={(t) => set('lead', t)} />
        <SectionLabel>Matn</SectionLabel>
        <Input multiline minHeight={190} placeholder="Maqola matni" value={d.body} onChangeText={(t) => set('body', t)} />

        <SectionLabel>Bog'langan mahsulotlar</SectionLabel>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {products.filter((p) => !p.rx).slice(0, 8).map((p) => (
            <Chip
              key={p.id}
              label={p.name}
              selected={d.recs.includes(p.id)}
              onPress={() => set('recs', d.recs.includes(p.id) ? d.recs.filter((r) => r !== p.id) : [...d.recs, p.id])}
            />
          ))}
        </View>

        <Group>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, paddingHorizontal: 16, backgroundColor: colors.card }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, color: colors.text }}>Nashr qilingan</Text>
              <Text style={{ fontSize: 12.5, color: colors.muted }}>O'chirilsa, qoralama sifatida saqlanadi</Text>
            </View>
            <Switch value={d.published} onValueChange={(v) => set('published', v)} />
          </View>
        </Group>
      </Stack>
    </Screen>
  );
}

/* ------------------------------------------------------------------ banners */
export function BannersScreen({ root = false }: { root?: boolean }) {
  const banners = useAdmin((s) => s.banners);
  const askDelete = useConfirmDelete();
  return (
    <Screen title="Bannerlar" root={root} action={{ icon: 'plus', label: "Banner qo'shish", onPress: () => actions.addBanner() }}>
      <Stack style={{ paddingTop: 4 }}>
        <Text style={{ fontSize: 13, lineHeight: 20, color: colors.muted, paddingHorizontal: 4 }}>Bannerlar bosh sahifada shu tartibda aylanadi. Chapga suring: yoqish yoki o'chirish.</Text>
        {banners.map((b, i) => {
          const acts: SwipeAction[] = [
            { label: b.active ? 'Pauza' : 'Yoqish', icon: b.active ? 'eyeOff' : 'eye', bg: b.active ? colors.swipeHide : colors.swipeShow, onPress: () => actions.toggleBanner(b.id) },
            { label: "O'chirish", icon: 'del', bg: colors.swipeDelete, onPress: () => askDelete("Banner o'chirilsinmi?", b.title, () => actions.deleteBanner(b.id)) },
          ];
          return (
            <SwipeRow key={b.id} actions={acts} radius={18} style={{ borderWidth: 1, borderColor: colors.borderSubtle, backgroundColor: colors.card }}>
              <View style={{ backgroundColor: colors.card }}>
                <View style={{ height: 130 }}>
                  <Photo id={b.img} w={800} h={320} style={{ width: '100%', height: '100%', opacity: b.active ? 1 : 0.55 }} />
                  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(14,28,18,.35)' }} />
                  <Text style={{ position: 'absolute', left: 14, right: 14, bottom: 12, color: '#fff', fontSize: 17, fontWeight: '700', lineHeight: 21 }}>{b.title}</Text>
                  <View style={{ position: 'absolute', top: 10, left: 10 }}>
                    <GlassSurface radius={12} tint={0.75} noShadow contentStyle={{ height: 24, paddingHorizontal: 10, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 12, fontWeight: '700', color: colors.text }}>{i + 1 + '-slayd'}</Text>
                    </GlassSurface>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12, paddingHorizontal: 14 }}>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={{ fontSize: 13.5, color: colors.secondary }}>{b.target}</Text>
                    <Text style={{ fontSize: 12.5, color: colors.muted, marginTop: 2 }}>{b.active ? b.clicks + ' marta bosilgan' : 'Faol emas'}</Text>
                  </View>
                  <Badge label={b.active ? 'Faol' : 'Nofaol'} tone={b.active ? 'success' : 'neutral'} />
                  <SquareIconButton icon="up" label="Yuqoriga" onPress={() => actions.moveBanner(b.id, -1)} />
                  <SquareIconButton icon="down" label="Pastga" onPress={() => actions.moveBanner(b.id, 1)} />
                </View>
              </View>
            </SwipeRow>
          );
        })}
      </Stack>
    </Screen>
  );
}

/* ------------------------------------------------------------------ reviews */
const RV: ['all' | 'open' | 'hidden', string][] = [['all', 'Hammasi'], ['open', 'Javobsiz'], ['hidden', 'Yashirilgan']];

export function ReviewsScreen({ root = false }: { root?: boolean }) {
  const reviews = useAdmin((s) => s.reviews);
  const filter = useAdmin((s) => s.rvFilter);
  const [replyId, setReplyId] = useState<number | null>(null);
  const [text, setText] = useState('');
  const open = reviews.filter((r) => !r.reply && !r.hidden).length;
  const list = reviews.filter((r) => (filter === 'all' ? true : filter === 'open' ? !r.reply && !r.hidden : !!r.hidden));

  return (
    <Screen title="Sharhlar" root={root}>
      <Stack gap={10} style={{ paddingTop: 4 }}>
        <Segmented options={RV.map(([k, l]) => (k === 'open' ? l + ' ' + open : l))} index={RV.findIndex((x) => x[0] === filter)} onChange={(i) => actions.setRvFilter(RV[i][0])} />
        {list.map((r) => (
          <View key={r.id} style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 18, paddingVertical: 14, paddingHorizontal: 16, gap: 8, opacity: r.hidden ? 0.6 : 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Avatar text={ini(r.name)} size={36} fontSize={13} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={{ fontSize: 14.5, fontWeight: '600', color: colors.text }}>{r.name}</Text>
                <Text style={{ fontSize: 12, color: colors.muted }}>{r.product + ' · ' + r.date}</Text>
              </View>
              <Text style={{ color: colors.star, fontSize: 14, letterSpacing: 1 }}>{'★'.repeat(r.stars) + '☆'.repeat(5 - r.stars)}</Text>
            </View>
            <Text style={{ fontSize: 14.5, lineHeight: 22, color: colors.body }}>{r.text}</Text>
            {r.reply ? (
              <Text style={{ borderRadius: 12, backgroundColor: colors.inset, paddingVertical: 10, paddingHorizontal: 12, fontSize: 13.5, lineHeight: 20, color: colors.secondary, overflow: 'hidden' }}>
                <Text style={{ fontWeight: '700', color: colors.text }}>Qahramon Tabib:</Text>{' ' + r.reply}
              </Text>
            ) : null}
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <PillButton label={r.reply ? 'Javobni tahrirlash' : 'Javob berish'} onPress={() => { setReplyId(r.id); setText(r.reply || ''); }} />
              <PillButton tone="secondary" label={r.hidden ? "Ko'rsatish" : 'Yashirish'} onPress={() => actions.toggleReviewHidden(r.id)} />
            </View>
          </View>
        ))}
        {list.length === 0 ? <EmptyText text="Bu bo'limda sharh yo'q." /> : null}
      </Stack>

      <ActionSheet
        visible={replyId !== null}
        onClose={() => setReplyId(null)}
        title="Sharhga javob"
        sub="Javob mahsulot sahifasida hammaga ko'rinadi."
        confirmLabel="Yuborish"
        disabled={!text.trim()}
        onConfirm={() => { actions.replyReview(replyId!, text); setReplyId(null); setText(''); }}
      >
        <Input multiline minHeight={110} placeholder="Javobingiz" value={text} onChangeText={setText} />
      </ActionSheet>
    </Screen>
  );
}

