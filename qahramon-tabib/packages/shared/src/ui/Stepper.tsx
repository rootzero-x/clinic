import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, tabular } from '../theme';
import { Icon } from './Icon';

type Props = {
  value: number;
  onInc: () => void;
  onDec: () => void;
  /** Show a trash icon on the minus button when value is 1 (cart rows). */
  trashAtOne?: boolean;
  size?: 'sm' | 'md';
};

export function Stepper({ value, onInc, onDec, trashAtOne, size = 'md' }: Props) {
  const h = size === 'sm' ? 32 : 40;
  const trash = trashAtOne && value <= 1;
  return (
    <View style={[styles.wrap, { height: h, borderRadius: h / 2 }]}>
      <Pressable accessibilityLabel="Kamaytirish" hitSlop={6} onPress={onDec} style={[styles.btn, { width: h, height: h }]}>
        <Icon name={trash ? 'trash' : 'minus'} size={16} color={trash ? colors.danger : colors.text} />
      </Pressable>
      <Text style={[styles.val, tabular]}>{value}</Text>
      <Pressable accessibilityLabel="Ko'paytirish" hitSlop={6} onPress={onInc} style={[styles.btn, { width: h, height: h }]}>
        <Icon name="plus" size={16} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.inset },
  btn: { alignItems: 'center', justifyContent: 'center' },
  val: { minWidth: 22, textAlign: 'center', fontSize: 15, fontWeight: '700', color: colors.text },
});
