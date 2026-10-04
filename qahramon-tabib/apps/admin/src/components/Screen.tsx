import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomActionBar, IconName, NavBar, colors, useHeaderHeight, useTabBarInset } from '@qt/shared';
import { goBack } from '../nav';

type Props = {
  title: string;
  /** Tab root: 31pt large title, no back button, room for the floating tab bar. */
  root?: boolean;
  kicker?: string;
  action?: { icon: IconName; label: string; onPress: () => void };
  children: React.ReactNode;
  /** Buttons for the floating glass bottom action bar. */
  bar?: React.ReactNode;
  /** Custom absolutely positioned footer (chat composer). */
  footer?: React.ReactNode;
  footerHeight?: number;
  scrollRef?: React.RefObject<ScrollView | null>;
  contentStyle?: StyleProp<ViewStyle>;
};

/** Scrolling screen with the glass NavBar overlay, bottom bar and safe insets. */
export function Screen({ title, root, kicker, action, children, bar, footer, footerHeight = 150, scrollRef, contentStyle }: Props) {
  const header = useHeaderHeight(!!root);
  const tabInset = useTabBarInset();
  const insets = useSafeAreaInsets();
  const bottom = root ? tabInset : footer ? footerHeight : bar ? 140 : insets.bottom + 40;
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.page }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingTop: header + 4, paddingBottom: bottom }, contentStyle]}
      >
        {children}
      </ScrollView>
      <NavBar title={title} large={root} kicker={kicker} onBack={root ? undefined : goBack} action={action} />
      {bar ? <BottomActionBar>{bar}</BottomActionBar> : null}
      {footer}
    </KeyboardAvoidingView>
  );
}

/** Standard vertical stack with 16pt gutters used inside Screen. */
export function Stack({ children, gap = 12, style }: { children: React.ReactNode; gap?: number; style?: StyleProp<ViewStyle> }) {
  return <View style={[{ paddingHorizontal: 16, gap }, style]}>{children}</View>;
}
