import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Badge, BottomSheet, Button, Icon, REVS, Segmented, colors, fmt, ini, productById, tabular } from '@qt/shared';
import { Card, FloatBtn, Kicker, Page, Photo, PrimaryBar, SectionTitle } from '../../components/common';
import { Stepper } from '@qt/shared';
import { Input } from '@qt/shared';
import { actions, hasApprovedRx, useApp } from '../../store';

const DIST = [78, 15, 4, 2, 1];

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = productById(Number(id)) ?? productById(1)!;
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState(0);
  const [qty, setQty] = useState(1);
  const [sheet, setSheet] = useState(false);
  const [stars, setStars] = useState(5);
  const [text, setText] = useState('');
  const faved = useApp((s) => s.favs.includes(p.id));
  const rxs = useApp((s) => s.rxs);
  const myRevs = useApp((s) => s.myRevs);
  const approved = hasApprovedRx(rxs);
  const blocked = p.rx && !approved;
  const reviews = useMemo(() => (myRevs[p.id] || []).concat(REVS).slice(0, 3), [myRevs, p.id]);
  const off = p.old ? fmt(p.old) : '';

  const send = () => {
    actions.addReview(p.id, stars, text);
    setSheet(false);
    setText('');
    setStars(5);
  };

  return (
    <Page
      noHeader
      padded={false}
      gap={0}
      actionBar
      bottomOverlay={
        <>
          <View pointerEvents="box-none" style={[styles.floatRow, { top: insets.top + 4 }]}>
            <FloatBtn icon="back" label="Orqaga" onPress={() => router.back()} />
            <FloatBtn
              icon="heart"
              label="Sevimlilarga"
              onPress={() => actions.toggleFav(p.id)}
              color={faved ? colors.danger : colors.text}
              fill={faved ? colors.danger : 'none'}
              strokeWidth={1.8}
            />
          </View>
          <PrimaryBar
            label={blocked ? 'Retsept yuklash' : `Savatga · ${fmt(p.price * qty)}`}
            onPress={() => (blocked ? router.push('/rx') : actions.addCart(p.id, qty))}
            left={blocked ? undefined : <View style={styles.qty}><Stepper value={qty} onDec={() => setQty(Math.max(1, qty - 1))} onInc={() => setQty(qty + 1)} /></View>}
          />
        </>
      }
    >
      <StatusBar style="light" />
      <Photo id={p.img} w={900} h={900} style={{ width: '100%', height: 400 }} />
      <View style={styles.sheetBody}>
        <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
          {p.rx ? <Badge label="Retsept bilan" tone="danger" /> : <Badge label="100% tabiiy" tone="accent" />}
          <Badge label={p.ail} tone="neutral" />
        </View>
        <View>
          <Text style={styles.name}>{p.name}</Text>
          <Text style={{ fontSize: 14, color: colors.muted, marginTop: 6 }}>{`${p.size} · ★ ${p.rating} (${p.reviews} ta sharh)`}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10 }}>
          <Text style={[{ fontSize: 26, fontWeight: '800', color: colors.text, letterSpacing: -0.26 }, tabular]}>{fmt(p.price)}</Text>
          {off ? <Text style={{ fontSize: 16, color: colors.muted, textDecorationLine: 'line-through' }}>{off}</Text> : null}
        </View>
        <Segmented options={['Tavsif', 'Tarkibi', "Qo'llash"]} index={tab} onChange={setTab} />
        <Text style={{ fontSize: 15, lineHeight: 24, color: colors.body }}>{[p.desc, p.comp, p.use][tab]}</Text>

        <View style={styles.note}>
          <View style={styles.noteMono}><Text style={{ color: colors.gold, fontWeight: '800', fontSize: 13 }}>QT</Text></View>
          <View style={{ flex: 1 }}>
            <Kicker color={colors.gold}>Tabib izohi</Kicker>
            <Text style={{ fontSize: 14.5, lineHeight: 21.75, color: 'rgba(255,255,255,.92)', marginTop: 4 }}>{p.note}</Text>
          </View>
        </View>

        <View style={{ gap: 12 }}>
          <SectionTitle title="Sharhlar" action="Sharh yozish" onAction={() => { setStars(5); setText(''); setSheet(true); }} style={{ paddingHorizontal: 0 }} />
          <Card style={{ flexDirection: 'row', gap: 16, alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 34, fontWeight: '800', color: colors.text, lineHeight: 36 }}>{p.rating}</Text>
              <Text style={{ color: colors.star, fontSize: 13, letterSpacing: 1, marginTop: 4 }}>★★★★★</Text>
              <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>{`${p.reviews} ta sharh`}</Text>
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              {DIST.map((w, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={{ width: 8, fontSize: 12, color: colors.muted }}>{5 - i}</Text>
                  <View style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: colors.inset }}>
                    <View style={{ height: '100%', width: `${w}%`, borderRadius: 3, backgroundColor: colors.star }} />
                  </View>
                </View>
              ))}
            </View>
          </Card>
          {reviews.map((r, i) => (
            <Card key={i} style={{ paddingVertical: 14, paddingHorizontal: 16, gap: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: colors.accentFill, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: colors.accentText, fontWeight: '700', fontSize: 12.5 }}>{ini(r.name)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14.5, fontWeight: '600', color: colors.text }}>{r.name}</Text>
                  <Text style={{ fontSize: 12, color: colors.muted }}>{r.date}</Text>
                </View>
                <Text style={{ color: colors.star, fontSize: 13, letterSpacing: 1 }}>{'★'.repeat(r.stars) + '☆'.repeat(5 - r.stars)}</Text>
              </View>
              <Text style={{ fontSize: 14.5, lineHeight: 21.75, color: colors.body }}>{r.text}</Text>
              {r.reply ? (
                <View style={{ borderRadius: 12, backgroundColor: colors.inset, paddingVertical: 10, paddingHorizontal: 12 }}>
                  <Text style={{ fontSize: 13.5, lineHeight: 20, color: colors.secondary }}>
                    <Text style={{ fontWeight: '700', color: colors.text }}>Qahramon Tabib: </Text>{r.reply}
                  </Text>
                </View>
              ) : null}
            </Card>
          ))}
        </View>

        <Text style={{ fontSize: 12.5, lineHeight: 18.75, color: colors.muted }}>
          Surunkali kasallik, homiladorlik yoki dori qabul qilayotgan bo'lsangiz, avval mutaxassis bilan maslahatlashing.
        </Text>
        {p.rx ? (
          <View style={{ borderRadius: 16, backgroundColor: colors.dangerFill, paddingVertical: 12, paddingHorizontal: 14 }}>
            <Text style={{ fontSize: 14, lineHeight: 21, color: colors.danger }}>
              {approved ? "Tasdiqlangan retseptingiz bor — savatga qo'shishingiz mumkin." : 'Bu dori faqat shifokor retsepti bilan beriladi. Avval retsept rasmini yuklang.'}
            </Text>
          </View>
        ) : null}
      </View>

      <BottomSheet visible={sheet} onClose={() => setSheet(false)}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>Sharh yozish</Text>
        <Text style={{ fontSize: 14, color: colors.secondary, marginTop: -8 }}>{p.name}</Text>
        <View style={{ flexDirection: 'row', gap: 6, justifyContent: 'center' }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Pressable key={n} accessibilityLabel={`${n} yulduz`} onPress={() => setStars(n)} style={{ width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="star" size={32} strokeWidth={1.4} color={n <= stars ? colors.star : colors.borderStrong} fill={n <= stars ? colors.star : 'none'} />
            </Pressable>
          ))}
        </View>
        <Input multiline minHeight={110} value={text} onChangeText={setText} placeholder="Mahsulot sizga qanday yordam berdi?" />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1 }}><Button title="Bekor" variant="secondary" size="lg" fullWidth onPress={() => setSheet(false)} /></View>
          <View style={{ flex: 1.4 }}><Button title="Yuborish" size="lg" fullWidth disabled={!text.trim()} onPress={send} /></View>
        </View>
      </BottomSheet>
    </Page>
  );
}

const styles = StyleSheet.create({
  floatRow: { position: 'absolute', left: 14, right: 14, flexDirection: 'row', justifyContent: 'space-between', zIndex: 20 },
  sheetBody: { marginTop: -34, borderTopLeftRadius: 32, borderTopRightRadius: 32, backgroundColor: colors.page, paddingTop: 22, paddingHorizontal: 20, gap: 16 },
  name: { fontSize: 25, fontWeight: '700', color: colors.text, letterSpacing: -0.5, lineHeight: 30 },
  note: { borderRadius: 20, backgroundColor: colors.brandInk, padding: 16, flexDirection: 'row', gap: 12 },
  noteMono: { width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, borderColor: colors.goldLine, alignItems: 'center', justifyContent: 'center' },
  qty: { height: 44, justifyContent: 'center' },
});
