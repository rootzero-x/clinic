import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassSurface, Icon, NavBar, colors, useHeaderHeight } from '@qt/shared';
import { actions, useApp } from '../store';

const QUICK = ["Bo'g'im og'rig'iga nima tavsiya qilasiz?", 'Buyurtmam qayerda?', 'Homiladorlikda asal mumkinmi?'];

function Dot({ i, reduced }: { i: number; reduced: boolean }) {
  const p = useSharedValue(0);
  useEffect(() => {
    if (reduced) return;
    p.value = withDelay(i * 150, withRepeat(withSequence(withTiming(1, { duration: 480 }), withTiming(0, { duration: 720 })), -1));
  }, [i, p, reduced]);
  const style = useAnimatedStyle(() => ({ opacity: 0.25 + 0.75 * p.value, transform: [{ translateY: -3 * p.value }] }));
  return <Animated.View style={[{ width: 7, height: 7, borderRadius: 4, backgroundColor: colors.muted }, style]} />;
}

export default function Chat() {
  const msgs = useApp((s) => s.msgs);
  const typing = useApp((s) => s.typing);
  const insets = useSafeAreaInsets();
  const headerH = useHeaderHeight(false);
  const reduced = useReducedMotion();
  const [msg, setMsg] = useState('');
  const ref = useRef<ScrollView>(null);

  useEffect(() => { const t = setTimeout(() => ref.current?.scrollToEnd({ animated: true }), 60); return () => clearTimeout(t); }, [msgs.length, typing]);

  const send = (text?: string) => {
    const t = (text ?? msg).trim();
    if (!t) return;
    setMsg('');
    actions.sendMsg(t);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.page }}>
      <ScrollView
        ref={ref}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: headerH + 8, paddingBottom: 150 + insets.bottom, paddingHorizontal: 16, gap: 8 }}
      >
        <View style={styles.notice}><Text style={{ fontSize: 12, color: colors.muted }}>Tabib jamoasi odatda 15 daqiqada javob beradi</Text></View>
        {msgs.map((m, i) => (
          <View key={i} style={{ flexDirection: 'row', justifyContent: m.me ? 'flex-end' : 'flex-start' }}>
            <View style={[styles.bubble, m.me ? { backgroundColor: colors.accent } : { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle }]}>
              <Text style={{ fontSize: 15, lineHeight: 21, color: m.me ? '#fff' : colors.text }}>{m.t}</Text>
              <Text style={{ fontSize: 11, opacity: 0.65, marginTop: 3, textAlign: 'right', color: m.me ? '#fff' : colors.text }}>{m.time}</Text>
            </View>
          </View>
        ))}
        {typing ? (
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.bubble, { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle, paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', gap: 4 }]}>
              {[0, 1, 2].map((i) => <Dot key={i} i={i} reduced={reduced} />)}
            </View>
          </View>
        ) : null}
      </ScrollView>
      <NavBar title="Tabib jamoasi" onBack={() => router.back()} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        <View pointerEvents="box-none" style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 10, paddingBottom: Math.max(24, insets.bottom), gap: 8 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ gap: 6 }} style={{ flexGrow: 0 }}>
            {QUICK.map((q) => (
              <Pressable key={q} onPress={() => send(q)}>
                <GlassSurface radius={17} tint={0.7} contentStyle={{ height: 34, paddingHorizontal: 14, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 13, fontWeight: '500', color: colors.text }}>{q}</Text>
                </GlassSurface>
              </Pressable>
            ))}
          </ScrollView>
          <GlassSurface radius={28} tint={0.66} intensity={60} contentStyle={{ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 6 }}>
            <TextInput
              value={msg}
              onChangeText={setMsg}
              onSubmitEditing={() => send()}
              returnKeyType="send"
              placeholder="Savolingizni yozing"
              placeholderTextColor={colors.placeholder}
              style={{ flex: 1, height: 44, paddingHorizontal: 12, fontSize: 15, color: colors.text }}
            />
            <Pressable accessibilityLabel="Yuborish" onPress={() => send()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="send" size={18} color="#fff" />
            </Pressable>
          </GlassSurface>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: { alignSelf: 'center', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 10, backgroundColor: colors.inset },
  bubble: { maxWidth: '78%', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 20 },
});
