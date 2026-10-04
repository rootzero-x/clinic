import React, { useMemo } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { EmptyState, Page, ProductGrid } from '../components/common';
import { actions, useApp } from '../store';

export default function Favorites() {
  const products = useApp((s) => s.products);
  const favs = useApp((s) => s.favs);
  const list = useMemo(() => products.filter((p) => favs.includes(p.id)), [products, favs]);
  return (
    <Page title="Sevimlilar" gap={12}>
      <ProductGrid items={list} variant="fav" />
      {list.length === 0 ? (
        <EmptyState
          big
          icon="heart"
          title="Sevimlilar bo'sh"
          text="Yoqqan mahsulotni yurakcha bilan saqlang — keyin tez topasiz."
          cta="Do'konga o'tish"
          onCta={() => { actions.openShop(); router.navigate('/shop'); }}
        />
      ) : <View />}
    </Page>
  );
}
