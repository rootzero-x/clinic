import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tone, toneStyle } from '../theme';

type Props = { label: string; tone?: Tone; pill?: boolean; dot?: boolean };

export function Badge({ label, tone = 'neutral', pill = true, dot }: Props) {
  const t = toneStyle[tone];
  return (
    <View style={[styles.base, { backgroundColor: t.bg, borderRadius: pill ? 999 : 7, borderColor: t.border ?? 'transparent' }]}>
      {dot ? <View style={[styles.dot, { backgroundColor: t.fg }]} /> : null}
      <Text style={{ color: t.fg, fontSize: 12, fontWeight: '600' }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 9, height: 24, borderWidth: 1, alignSelf: 'flex-start' },
  dot: { width: 6, height: 6, borderRadius: 3 },
});
