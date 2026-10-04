import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

type Props = { label: string; selected?: boolean; onPress?: () => void; count?: number | string };

/** Filter chip: selected = brand-ink fill, otherwise cream with hairline. */
export function Chip({ label, selected, onPress, count }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        { backgroundColor: selected ? colors.brandInk : colors.card, borderColor: selected ? colors.brandInk : colors.borderDefault },
      ]}
    >
      <Text style={{ color: selected ? '#fff' : colors.text, fontSize: 13.5, fontWeight: '600' }}>
        {label}
        {count !== undefined ? <Text style={{ opacity: 0.7 }}>{`  ${count}`}</Text> : null}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: { height: 36, paddingHorizontal: 14, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
});
