import React from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Badge, colors } from '@qt/shared';
import { Card, EmptyState, Page } from '../components/common';
import { useApp } from '../store';

export default function Appointments() {
  const appts = useApp((s) => s.appts);
  return (
    <Page title="Qabullarim" gap={10}>
      {appts.map((a, i) => (
        <Card key={i} style={{ flexDirection: 'row', gap: 14, alignItems: 'center', padding: 14 }}>
          <View style={{ width: 56, borderRadius: 14, backgroundColor: colors.brandInk, paddingVertical: 8, alignItems: 'center' }}>
            <Text style={{ fontSize: 11, color: colors.gold, fontWeight: '700' }}>{a.w}</Text>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#fff' }}>{a.n}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>{a.type}</Text>
            <Text style={{ fontSize: 13, color: colors.muted, marginTop: 2 }}>{`${a.time} · Qahramon Tabib`}</Text>
          </View>
          <Badge label="Tasdiqlangan" tone="success" />
        </Card>
      ))}
      {appts.length === 0 ? (
        <EmptyState icon="cal" title="Qabullar yo'q" text="Tabib bilan maslahatga yoziling." cta="Yozilish" onCta={() => router.navigate('/consult')} />
      ) : null}
    </Page>
  );
}
