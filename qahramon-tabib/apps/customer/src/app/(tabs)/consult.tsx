import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { CTYPES, Icon, colors, fmt, tabular } from '@qt/shared';
import { Card, Page } from '../../components/common';
import { actions, useApp } from '../../store';

const STATS = [{ k: 'Obunachi', v: '130K+' }, { k: 'Tajriba', v: '15 yil' }, { k: 'Reyting', v: '4.9' }];

export default function Consult() {
  const cType = useApp((s) => s.cType);
  return (
    <Page title="Maslahat" large tabBar gap={16}>
      <View style={styles.profile}>
        <View style={styles.ring} />
        <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: colors.goldLine, backgroundColor: '#21402b', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: colors.gold, fontWeight: '800', fontSize: 20 }}>QT</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}>Qahramon Tabib</Text>
            <Text style={{ fontSize: 13.5, color: 'rgba(255,255,255,.75)', marginTop: 2 }}>Tabiiy davolash bo'yicha mutaxassis</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {STATS.map((s) => (
            <View key={s.k} style={styles.stat}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.gold }}>{s.v}</Text>
              <Text style={{ fontSize: 11.5, color: 'rgba(255,255,255,.7)', marginTop: 2 }}>{s.k}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.h}>Maslahat turi</Text>
      {CTYPES.map((t, i) => (
        <Pressable
          key={t.k}
          onPress={() => { actions.setCType(i); router.push('/book'); }}
          style={[styles.type, { borderColor: cType === i ? colors.accent : colors.borderSubtle }]}
        >
          <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: colors.accentFill, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={t.icon} size={20} color={colors.accentText} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15.5, fontWeight: '600', color: colors.text }}>{t.label}</Text>
            <Text style={{ fontSize: 13, color: colors.muted, marginTop: 2 }}>{t.sub}</Text>
          </View>
          <Text style={[{ fontSize: 14.5, fontWeight: '700', color: colors.text }, tabular]}>{fmt(t.price)}</Text>
        </Pressable>
      ))}

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Card onPress={() => router.push('/chat')} style={styles.short}>
          <Icon name="chat" size={22} color={colors.accentText} />
          <Text style={styles.shortT}>Savol-javob</Text>
          <Text style={styles.shortS}>Bepul, 15 daqiqada javob</Text>
        </Card>
        <Card onPress={() => router.push('/rx')} style={styles.short}>
          <Icon name="rx" size={22} color={colors.accentText} />
          <Text style={styles.shortT}>Retsept yuklash</Text>
          <Text style={styles.shortS}>Shifokor retsepti bo'yicha</Text>
        </Card>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  profile: { borderRadius: 26, backgroundColor: colors.brandInk, padding: 20, gap: 14, overflow: 'hidden' },
  ring: { position: 'absolute', right: -50, top: -50, width: 180, height: 180, borderRadius: 90, borderWidth: 1, borderColor: 'rgba(217,180,95,.25)' },
  stat: { flex: 1, borderRadius: 14, backgroundColor: 'rgba(255,255,255,.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,.12)', padding: 10, alignItems: 'center' },
  h: { fontSize: 19, fontWeight: '700', color: colors.text, paddingHorizontal: 4 },
  type: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: 20, backgroundColor: colors.card, borderWidth: 1.5 },
  short: { flex: 1, padding: 14, gap: 8 },
  shortT: { fontSize: 15, fontWeight: '600', color: colors.text },
  shortS: { fontSize: 12.5, color: colors.muted },
});
