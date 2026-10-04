import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, shadow } from '../theme';

type Props = { options: string[]; index: number; onChange: (i: number) => void };

/** iOS segmented control: inset track, cream selected capsule. */
export function Segmented({ options, index, onChange }: Props) {
  return (
    <View style={styles.track}>
      {options.map((o, i) => (
        <Pressable key={o} onPress={() => onChange(i)} style={[styles.seg, i === index && styles.on]}>
          <Text style={{ fontSize: 13.5, fontWeight: '600', color: i === index ? colors.text : colors.secondary }}>{o}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  track: { flexDirection: 'row', backgroundColor: colors.inset, borderRadius: 12, padding: 3 },
  seg: { flex: 1, height: 34, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  on: { backgroundColor: colors.card, ...shadow.soft },
});
