import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ADMIN_LOGIN, ADMIN_ROLES, Button, GlassSurface, Icon, Input, Segmented, colors, type AdminRole } from '@qt/shared';
import { Monogram } from '../components/Brand';
import { actions, store } from '../store';
import { enterApp } from '../nav';

export function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState(ADMIN_LOGIN.email);
  const [pass, setPass] = useState(ADMIN_LOGIN.password);
  const [role, setRole] = useState<AdminRole>(store.get().role);
  const [busy, setBusy] = useState(false);

  const enter = async (faceId: boolean) => {
    if (busy) return;
    setBusy(true);
    try {
      await actions.login(role, email, pass, faceId);
      enterApp(role);
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.page }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top + 28, paddingBottom: Math.max(insets.bottom, 16) + 24, paddingHorizontal: 24, gap: 14 }}
      >
        <Monogram size={64} radius={20} border={1.5} fontSize={20} />
        <View style={{ marginTop: 8 }}>
          <Text style={{ fontSize: 30, fontWeight: '700', letterSpacing: -0.6, color: colors.text }}>Qahramon Tabib Admin</Text>
          <Text style={{ fontSize: 15, lineHeight: 22, color: colors.secondary, marginTop: 6 }}>Xodimlar uchun kirish. Login va parolingizni kiriting.</Text>
        </View>
        <View style={{ height: 6 }} />
        <Input label="Login" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" autoCorrect={false} />
        <Input label="Parol" value={pass} onChangeText={setPass} secureTextEntry autoCapitalize="none" />
        <View style={{ gap: 6 }}>
          <Text style={{ fontSize: 13, fontWeight: '500', color: colors.secondary }}>Rol</Text>
          <Segmented options={ADMIN_ROLES.map((r) => (r === "Qo'llab-quvvatlash" ? "Qo'llab-q." : r))} index={ADMIN_ROLES.indexOf(role)} onChange={(i) => setRole(ADMIN_ROLES[i])} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 13.5, color: colors.muted }}>{'Rol: ' + role}</Text>
          <Text style={{ fontSize: 13.5, color: colors.accentText }}>Parolni unutdingizmi?</Text>
        </View>
        <View style={{ flex: 1, minHeight: 12 }} />
        <Button title="Kirish" size="lg" fullWidth loading={busy} onPress={() => enter(false)} />
        <Pressable onPress={() => enter(true)} accessibilityRole="button">
          <GlassSurface radius={24} tint={0.62} contentStyle={{ height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Icon name="face" size={22} color={colors.text} />
            <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>Face ID bilan kirish</Text>
          </GlassSurface>
        </Pressable>
        <Pressable onPress={() => router.replace('/login' as never)} style={{ padding: 8, alignItems: 'center' }}>
          <Text style={{ color: colors.accentText, fontSize: 13.5, fontWeight: '600' }}>Mijoz ilovasiga qaytish</Text>
        </Pressable>
        <Text style={{ fontSize: 12.5, lineHeight: 19, color: colors.muted, textAlign: 'center' }}>Kirish huquqi faqat Qahramon Tabib xodimlariga beriladi.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
