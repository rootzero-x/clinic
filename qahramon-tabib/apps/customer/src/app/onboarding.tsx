import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, GlassSurface, ONB, colors } from '@qt/shared';
import { Kicker, Photo } from '../components/common';

export default function Onboarding() {
  const [i, setI] = useState(0);
  const insets = useSafeAreaInsets();
  const o = ONB[i];
  const next = () => (i < ONB.length - 1 ? setI(i + 1) : router.replace('/login'));
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <Photo id={o.img} w={800} h={1600} style={StyleSheet.absoluteFill} />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(14,26,18,.28)' }]} />
      <Pressable onPress={() => router.replace('/login')} style={{ position: 'absolute', top: insets.top + 6, right: 18 }}>
        <GlassSurface variant="dark" radius={17} contentStyle={styles.skip}>
          <Text style={styles.skipText}>O'tkazib yuborish</Text>
        </GlassSurface>
      </Pressable>
      <View style={[styles.cardHost, { bottom: Math.max(28, insets.bottom + 6) }]}>
        <GlassSurface radius={34} tint={0.72} intensity={60} contentStyle={styles.card}>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {ONB.map((_, k) => (
              <View key={k} style={{ height: 6, width: k === i ? 22 : 6, borderRadius: 3, backgroundColor: k === i ? colors.accent : colors.borderStrong }} />
            ))}
          </View>
          <Kicker style={{ fontSize: 12, letterSpacing: 0.96 }}>{o.kicker}</Kicker>
          <Text style={styles.title}>{o.title}</Text>
          <Text style={styles.body}>{o.body}</Text>
          <View style={{ height: 4 }} />
          <Button title={i < ONB.length - 1 ? 'Davom etish' : 'Boshlash'} size="lg" fullWidth onPress={next} />
        </GlassSurface>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.brandInk },
  skip: { height: 34, paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' },
  skipText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  cardHost: { position: 'absolute', left: 12, right: 12 },
  card: { padding: 22, paddingTop: 24, gap: 12 },
  title: { fontSize: 26, fontWeight: '700', lineHeight: 31, color: colors.text, letterSpacing: -0.52 },
  body: { fontSize: 15, lineHeight: 22.5, color: colors.secondary },
});
