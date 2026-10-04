import React, { useState } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { colors } from '../theme';
import { Icon, IconName } from './Icon';

type Props = Omit<TextInputProps, 'style'> & {
  label?: string;
  error?: string;
  hint?: string;
  /** Text prefix such as `+998`. */
  leadingText?: string;
  leadingIcon?: IconName;
  containerStyle?: StyleProp<ViewStyle>;
  minHeight?: number;
};

export function Input({ label, error, hint, leadingText, leadingIcon, containerStyle, multiline, minHeight, ...rest }: Props) {
  const [focus, setFocus] = useState(false);
  const mh = minHeight ?? 96;
  return (
    <View style={[{ gap: 6 }, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.field,
          multiline && { minHeight: mh, alignItems: 'flex-start', paddingVertical: 12 },
          { borderColor: error ? colors.danger : focus ? colors.accent : colors.borderDefault, borderWidth: focus ? 1.5 : 1 },
        ]}
      >
        {leadingIcon ? <Icon name={leadingIcon} size={18} color={colors.muted} /> : null}
        {leadingText ? <Text style={styles.lead}>{leadingText}</Text> : null}
        <TextInput
          {...rest}
          multiline={multiline}
          placeholderTextColor={colors.placeholder}
          onFocus={(e) => { setFocus(true); rest.onFocus?.(e); }}
          onBlur={(e) => { setFocus(false); rest.onBlur?.(e); }}
          style={[styles.input, multiline && { textAlignVertical: 'top', minHeight: mh - 24 }]}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 13, fontWeight: '500', color: colors.secondary },
  field: { minHeight: 52, borderRadius: 14, backgroundColor: colors.card, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 8 },
  lead: { fontSize: 15, fontWeight: '600', color: colors.secondary },
  input: { flex: 1, fontSize: 15, color: colors.text, paddingVertical: 0 },
  error: { fontSize: 12.5, color: colors.danger },
  hint: { fontSize: 12.5, color: colors.muted },
});
