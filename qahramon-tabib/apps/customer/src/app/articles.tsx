import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@qt/shared';
import { Kicker, Page, Photo } from '../components/common';
import { useApp } from '../store';

export default function Articles() {
  const articles = useApp((s) => s.articles);
  return (
    <Page title="Tabib maslahatlari" gap={14}>
      {articles.map((a) => (
        <Pressable
          key={a.id}
          onPress={() => router.push(`/article/${a.id}`)}
          style={{ borderRadius: 24, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle, overflow: 'hidden' }}
        >
          <Photo id={a.img} w={800} h={340} style={{ width: '100%', height: 170 }} />
          <View style={{ paddingTop: 14, paddingHorizontal: 16, paddingBottom: 16 }}>
            <Kicker style={{ letterSpacing: 0.7 }}>{`${a.tag} · ${a.read}`}</Kicker>
            <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text, lineHeight: 22, marginTop: 6 }}>{a.title}</Text>
            <Text style={{ fontSize: 14, lineHeight: 21, color: colors.secondary, marginTop: 6 }}>{a.lead}</Text>
          </View>
        </Pressable>
      ))}
    </Page>
  );
}
