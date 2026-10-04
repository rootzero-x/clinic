import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Input, Stepper, SwipeRow, colors, customerApi, fmt, productById, tabular } from '@qt/shared';
import { Card, EmptyState, Page, Photo, PrimaryBar } from '../../components/common';
import { actions, useApp } from '../../store';

export default function Cart() {
  const cart = useApp((s) => s.cart);
  const promo = useApp((s) => s.promo);
  const deliv = useApp((s) => s.deliv);
  const t = useMemo(() => customerApi.totals(cart, promo, deliv), [cart, promo, deliv]);
  const promoOk = promo.trim().toUpperCase() === 'TABIB10';
  const has = cart.length > 0;

  return (
    <Page
      title="Savat"
      large
      tabBar
      actionBar={has}
      action={has ? { icon: 'trash', label: 'Savatni tozalash', onPress: actions.clearCart } : undefined}
      bottomOverlay={has ? <PrimaryBar aboveTabBar label={`Rasmiylashtirish · ${fmt(t.total)}`} onPress={() => router.push('/checkout')} /> : null}
    >
      {cart.map((c) => {
        const p = productById(c.id);
        if (!p) return null;
        return (
          <SwipeRow
            key={c.id}
            radius={20}
            onPress={() => router.push(`/product/${p.id}`)}
            style={{ borderWidth: 1, borderColor: colors.borderSubtle, backgroundColor: colors.card }}
            actions={[
              { label: 'Sevimli', icon: 'heart', bg: colors.swipeArchive, onPress: () => actions.addFav(p.id) },
              { label: "O'chirish", icon: 'del', bg: colors.swipeDelete, onPress: () => actions.removeCart(p.id) },
            ]}
          >
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', padding: 8, backgroundColor: colors.card }}>
              <Photo id={p.img} w={300} h={300} style={{ width: 78, height: 78, borderRadius: 14 }} />
              <View style={{ flex: 1, minWidth: 0, gap: 6 }}>
                <Text style={{ fontSize: 14.5, fontWeight: '600', color: colors.text, lineHeight: 19 }}>{p.name}</Text>
                <Text style={{ fontSize: 12.5, color: colors.muted }}>{p.size}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={[{ fontSize: 15, fontWeight: '700', color: colors.text }, tabular]}>{fmt(p.price * c.q)}</Text>
                  <Stepper size="sm" value={c.q} trashAtOne onInc={() => actions.incCart(p.id)} onDec={() => actions.decCart(p.id)} />
                </View>
              </View>
            </View>
          </SwipeRow>
        );
      })}

      {has ? (
        <>
          <Input label="Promokod" placeholder="TABIB10" value={promo} onChangeText={actions.setPromo} autoCapitalize="characters" hint={promoOk ? "TABIB10 qo'llandi — 10% chegirma" : 'Namuna: TABIB10'} />
          <Card style={{ padding: 16, gap: 8 }}>
            <Row k="Mahsulotlar" v={fmt(t.sub)} />
            {t.disc > 0 ? <Row k="Chegirma" v={'−' + fmt(t.disc)} color={colors.success} /> : null}
            <Row k="Yetkazib berish" v={t.del ? fmt(t.del) : 'Bepul'} />
            <View style={{ height: 1, backgroundColor: colors.borderSubtle, marginVertical: 2 }} />
            <Row k="Jami" v={fmt(t.total)} big />
          </Card>
        </>
      ) : (
        <EmptyState big icon="bag" title="Savat bo'sh" text="Tabiiy mahsulotlarni do'kondan tanlang." cta="Do'konga o'tish" onCta={() => { actions.openShop(); router.navigate('/shop'); }} />
      )}
    </Page>
  );
}

function Row({ k, v, color, big }: { k: string; v: string; color?: string; big?: boolean }) {
  const c = color ?? (big ? colors.text : colors.secondary);
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: big ? 17 : 14.5, fontWeight: big ? '700' : '400', color: c }}>{k}</Text>
      <Text style={[{ fontSize: big ? 17 : 14.5, fontWeight: big ? '700' : '400', color: c }, tabular]}>{v}</Text>
    </View>
  );
}
