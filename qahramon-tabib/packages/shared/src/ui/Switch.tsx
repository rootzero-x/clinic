import React from 'react';
import { Switch as RNSwitch } from 'react-native';
import { colors } from '../theme';

/** Standard iOS switch, accent-coloured. Used in settings only; lists use swipe rows. */
export function Switch({ value, onValueChange }: { value: boolean; onValueChange: (v: boolean) => void }) {
  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: colors.borderDefault, true: colors.accent }}
      thumbColor="#fff"
      ios_backgroundColor={colors.borderDefault}
    />
  );
}
