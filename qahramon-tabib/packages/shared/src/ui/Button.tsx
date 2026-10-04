import React from 'react';
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { colors } from '../theme';
import { Icon, IconName } from './Icon';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold' | 'dark';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  /** pill (radius 24) by default; `false` gives radius 14 */
  pill?: boolean;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const HEIGHT: Record<Size, number> = { sm: 36, md: 44, lg: 48 };
const FONT: Record<Size, number> = { sm: 13, md: 14.5, lg: 15.5 };

function palette(v: Variant, pressed: boolean) {
  switch (v) {
    case 'secondary': return { bg: pressed ? '#e0d8c6' : colors.raised, fg: colors.body, bd: colors.borderDefault };
    case 'ghost': return { bg: pressed ? colors.raised : 'transparent', fg: colors.secondary, bd: 'transparent' };
    case 'danger': return { bg: pressed ? colors.dangerFill : 'transparent', fg: colors.danger, bd: colors.borderDefault };
    case 'gold': return { bg: colors.gold, fg: colors.brandInk, bd: 'transparent' };
    case 'dark': return { bg: colors.brandInk, fg: '#fff', bd: 'transparent' };
    default: return { bg: pressed ? colors.accentActive : colors.accent, fg: colors.onAccent, bd: 'transparent' };
  }
}

export function Button({
  title, onPress, variant = 'primary', size = 'md', disabled, loading, fullWidth, pill = true,
  leadingIcon, trailingIcon, style, textStyle,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => {
        const p = palette(variant, pressed);
        return [
          styles.base,
          {
            height: HEIGHT[size],
            borderRadius: pill ? 24 : size === 'sm' ? 10 : 14,
            backgroundColor: p.bg,
            borderColor: p.bd,
            paddingHorizontal: size === 'sm' ? 14 : 20,
            opacity: disabled ? 0.45 : 1,
            alignSelf: fullWidth ? 'stretch' : 'auto',
            transform: [{ translateY: pressed ? 0.5 : 0 }],
          },
          style,
        ];
      }}
    >
      {({ pressed }) => {
        const fg = palette(variant, pressed).fg;
        return (
          <View style={styles.row}>
            {loading ? <ActivityIndicator color={fg} /> : leadingIcon ? <Icon name={leadingIcon} size={18} color={fg} /> : null}
            <Text numberOfLines={1} style={[{ color: fg, fontSize: FONT[size], fontWeight: '600' }, textStyle]}>{title}</Text>
            {trailingIcon ? <Icon name={trailingIcon} size={18} color={fg} /> : null}
          </View>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
