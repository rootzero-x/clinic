import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  ADMIN_FALLBACK_IMAGE, ADMIN_PRODUCT_IMAGES, Badge, Button, Icon, Input, SwipeAction, SwipeRow, Switch, colors, fmt, stockOf, tabular,
} from '@qt/shared';
import { Screen, Stack } from '../components/Screen';
import { Chevron, ChipsRow, CountStepper, Empty, Group, SearchField, SwipeHint } from '../components/Ui';
import { Photo } from '../components/Brand';
import { ActionSheet, SelectField, useConfirmDelete } from '../components/Sheets';
import { actions, draftFromProduct, emptyProductDraft, useAdmin, type ProductDraft } from '../store';
import { goBack, openProduct } from '../nav';

export function ProductsScreen({ root = true }: { root?: boolean }) {
  const products = useAdmin((s) => s.products);
  const pCat = useAdmin((s) => s.pCat);
  const [query, setQuery] = useState('');
  const askDelete = useConfirmDelete();
  const q = query.toLowerCase();

  const cats = useMemo(() => ['Hammasi', ...Array.from(new Set(products.map((p) => p.cat)))], [products]);
  const nArch = products.filter((p) => p.archived).length;
  const chips = [
    ...cats.map((c) => ({ label: c, selected: pCat === c, onPress: () => actions.setPCat(c) })),
    { label: 'Arxiv ' + nArch, selected: pCat === 'Arxiv', onPress: () => actions.setPCat('Arxiv') },
  ];
  const list = products.filter(
    (p) => (pCat === 'Arxiv' ? p.archived : !p.archived && (pCat === 'Hammasi' || p.cat === pCat)) && (!q || p.name.toLowerCase().includes(q)),
  );

  return (
    <Screen title="Mahsulotlar" root={root} action={{ icon: 'plus', label: "Mahsulot qo'shish", onPress: () => openProduct('new') }}>
      <View style={{ gap: 12, paddingTop: 4 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <SearchField value={query} onChangeText={setQuery} placeholder="Mahsulot qidirish" />
        </View>
        <ChipsRow items={chips} />
        {list.length ? (
          <Group style={{ marginHorizontal: 16 }}>
            {list.map((p) => {
              const del = () => askDelete(p.name + " o'chirilsinmi?", "Mahsulot katalogdan butunlay o'chiriladi.", () => actions.deleteProduct(p.id, true));
              const acts: SwipeAction[] = p.archived
                ? [
                    { label: 'Tiklash', icon: 'restore', bg: colors.swipeShow, onPress: () => actions.restoreProduct(p.id) },
                    { label: "O'chirish", icon: 'del', bg: colors.swipeDelete, onPress: del },
                  ]
                : [
                    { label: p.active ? 'Yashirish' : "Ko'rsatish", icon: p.active ? 'eyeOff' : 'eye', bg: p.active ? colors.swipeHide : colors.swipeShow, onPress: () => actions.toggleProduct(p.id) },
                    { label: 'Arxiv', icon: 'archive', bg: colors.swipeArchive, onPress: () => actions.archiveProduct(p.id) },
                    { label: "O'chirish", icon: 'del', bg: colors.swipeDelete, onPress: del },
                  ];
              const [stockL, stockTone] = stockOf(p);
              return (
                <SwipeRow key={p.id} radius={0} actions={acts} onPress={() => openProduct(p.id)}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, paddingHorizontal: 14, backgroundColor: colors.card }}>
                    <Photo id={ADMIN_PRODUCT_IMAGES[p.id] ?? ADMIN_FALLBACK_IMAGE} w={120} h={120} style={{ width: 52, height: 52, borderRadius: 12, opacity: p.active && !p.archived ? 1 : 0.5 }} />
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: '600', color: p.active ? colors.text : colors.muted }}>{p.name}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                        <Text style={[{ fontSize: 13, color: colors.muted }, tabular]}>{fmt(p.price)}</Text>
                        <Badge label={stockL} tone={stockTone} pill={false} />
                        {p.rx ? <Badge label="Rx" tone="danger" pill={false} /> : null}
                        {!p.active ? <Badge label="Yashirin" tone="neutral" pill={false} /> : null}
                      </View>
                    </View>
                    <Chevron />
                  </View>
                </SwipeRow>
              );
            })}
          </Group>
        ) : (
          <Empty icon="box" title="Mahsulot yo'q" sub="Tanlangan toifada mahsulot topilmadi." />
        )}
        <View style={{ paddingHorizontal: 16 }}>
          <SwipeHint text="Chapga suring: yashirish, arxivlash yoki o'chirish" />
        </View>
      </View>
    </Screen>
  );
}

/* ------------------------------------------------------------------ edit form */
export function ProductEditScreen({ id }: { id: string }) {
  const existing = useAdmin((s) => (id === 'new' ? undefined : s.products.find((p) => p.id === +id)));
  const catNames = useAdmin((s) => s.cats);
  const [draft, setDraft] = useState<ProductDraft>(() => (existing ? draftFromProduct(existing) : emptyProductDraft()));
  const [tried, setTried] = useState(false);
  const [imgs, setImgs] = useState(existing ? 1 : 0);
  const [confirm, setConfirm] = useState(false);

  const set = <K extends keyof ProductDraft>(k: K, v: ProductDraft[K]) => setDraft((d) => ({ ...d, [k]: v }));
  const err = { name: tried && !draft.name.trim(), price: tried && !(+draft.price > 0) };
  const catOptions = useMemo(() => Array.from(new Set([...catNames.filter((c) => !c.archived).map((c) => c.name), draft.cat])), [catNames, draft.cat]);

  const save = () => {
    if (!actions.saveProduct(draft)) { setTried(true); return; }
    goBack();
  };

  return (
    <Screen
      title={draft.id ? 'Tahrirlash' : 'Yangi mahsulot'}
      bar={<Button title={draft.id ? 'Saqlash' : "Qo'shish"} size="lg" style={{ flex: 1 }} onPress={save} />}
    >
      <Stack gap={16} style={{ paddingTop: 8 }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {[0, 1, 2].map((i) => {
            const filled = i < imgs;
            return (
              <Pressable
                key={i}
                onPress={() => setImgs(filled ? imgs : Math.min(3, imgs + 1))}
                style={{
                  flex: 1, aspectRatio: 1, borderRadius: 16, borderWidth: 1.5, borderStyle: filled ? 'solid' : 'dashed',
                  borderColor: filled ? 'transparent' : colors.borderStrong, backgroundColor: filled ? colors.inset : '#fff',
                  alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                <Icon name={filled ? 'image' : 'plus'} size={20} color={filled ? colors.muted : colors.accentText} />
                <Text style={{ fontSize: 12, fontWeight: '500', color: filled ? colors.muted : colors.accentText }}>
                  {filled ? (i === 0 ? 'Asosiy rasm' : 'Rasm') : "Rasm qo'shish"}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 18, padding: 16, gap: 14 }}>
          <Input label="Nomi *" placeholder="Masalan, Tog' asali 500 g" value={draft.name} onChangeText={(t) => set('name', t)} error={err.name ? 'Nomini kiriting' : undefined} />
          <SelectField label="Toifa" value={draft.cat} options={catOptions} onChange={(v) => set('cat', v)} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Input containerStyle={{ flex: 1 }} label="Narxi, so'm *" keyboardType="number-pad" placeholder="0" value={draft.price} onChangeText={(t) => set('price', t.replace(/\D/g, ''))} error={err.price ? 'Narxni kiriting' : undefined} />
            <Input containerStyle={{ flex: 1 }} label="Eski narx" keyboardType="number-pad" placeholder="Ixtiyoriy" value={draft.old} onChangeText={(t) => set('old', t.replace(/\D/g, ''))} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: colors.text }}>Ombordagi soni</Text>
              <Text style={{ fontSize: 12.5, color: colors.muted }}>10 donadan kam bo'lsa ogohlantiriladi</Text>
            </View>
            <CountStepper value={draft.stock} onDec={() => set('stock', Math.max(0, draft.stock - 1))} onInc={() => set('stock', draft.stock + 1)} />
          </View>
        </View>

        <Group>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, paddingHorizontal: 16, backgroundColor: colors.card }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, color: colors.text }}>Retsept talab qilinadi</Text>
              <Text style={{ fontSize: 12.5, color: colors.muted }}>Mijoz buyurtmada retsept yuklaydi</Text>
            </View>
            <Switch value={draft.rx} onValueChange={(v) => set('rx', v)} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, paddingHorizontal: 16, backgroundColor: colors.card }}>
            <Text style={{ flex: 1, fontSize: 15, color: colors.text }}>Ilovada ko'rsatish</Text>
            <Switch value={draft.active} onValueChange={(v) => set('active', v)} />
          </View>
        </Group>

        <View style={{ gap: 6 }}>
          <Text style={{ fontSize: 13, fontWeight: '500', color: colors.secondary, paddingHorizontal: 4 }}>Tavsif</Text>
          <Input multiline minHeight={110} placeholder="Qo'llanilishi, tarkibi, saqlash shartlari" value={draft.desc} onChangeText={(t) => set('desc', t)} />
        </View>

        {draft.id ? (
          <Pressable
            onPress={() => setConfirm(true)}
            style={{ height: 48, borderRadius: 14, borderWidth: 1, borderColor: colors.borderSubtle, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ fontSize: 15, fontWeight: '600', color: colors.danger }}>Mahsulotni o'chirish</Text>
          </Pressable>
        ) : null}
      </Stack>

      <ActionSheet
        visible={confirm}
        onClose={() => setConfirm(false)}
        title="Mahsulotni o'chirasizmi?"
        sub="Mahsulot katalogdan butunlay o'chiriladi. Buni qaytarib bo'lmaydi."
        confirmLabel="O'chirish"
        onConfirm={() => { setConfirm(false); actions.deleteProduct(draft.id!); goBack(); }}
      />
    </Screen>
  );
}
