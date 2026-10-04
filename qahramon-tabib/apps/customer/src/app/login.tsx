import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Input, colors } from '@qt/shared';
import { Monogram } from '../components/common';
import { actions } from '../store';

const OTP = ['4', '8', '2', '7'];

export default function Login() {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [busy, setBusy] = useState(false);
  const digits = phone.replace(/\D/g, '');

  const next = async () => {
    if (!otpStep) { setOtpStep(true); return; }
    setBusy(true);
    await actions.login(phone || '90 123 45 67');
    setBusy(false);
    router.replace('/home');
  };
  const guest = () => { actions.enterAsGuest(); router.replace('/home'); };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: colors.page }}>
      <StatusBar style="dark" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top + 24, paddingHorizontal: 24, paddingBottom: Math.max(insets.bottom, 20) + 16, gap: 14 }}
      >
        <Monogram size={64} border={1.5} fontSize={20} />
        <View style={{ marginTop: 8 }}>
          <Text style={styles.h1}>Xush kelibsiz</Text>
          <Text style={styles.sub}>Telefon raqamingizni kiriting — tasdiqlash kodini SMS orqali yuboramiz.</Text>
        </View>
        <View style={{ height: 4 }} />
        <Input
          label="Telefon raqam"
          placeholder="90 123 45 67"
          keyboardType="number-pad"
          leadingText="+998"
          value={phone}
          onChangeText={(v) => setPhone(v.replace(/[^\d ]/g, '').slice(0, 12))}
        />
        {otpStep ? (
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 13, fontWeight: '500', color: colors.secondary }}>SMS kod</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {OTP.map((v, i) => (
                <View key={i} style={styles.cell}><Text style={styles.cellText}>{v}</Text></View>
              ))}
            </View>
            <Text style={{ fontSize: 13, color: colors.muted }}>Namuna uchun kod avtomatik to'ldirildi · Qayta yuborish 0:42</Text>
          </View>
        ) : null}
        <View style={{ flex: 1, minHeight: 24 }} />
        <Button title={otpStep ? 'Tasdiqlash' : 'Kod olish'} size="lg" fullWidth disabled={digits.length < 9} loading={busy} onPress={next} />
        <Pressable onPress={guest} style={{ padding: 10, alignItems: 'center' }}>
          <Text style={{ color: colors.secondary, fontSize: 14, fontWeight: '600' }}>Mehmon sifatida ko'rish</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/admin/login' as never)} style={{ padding: 8, alignItems: 'center' }}>
          <Text style={{ color: colors.accentText, fontSize: 13.5, fontWeight: '600' }}>Xodimlar uchun kirish</Text>
        </Pressable>
        <Text style={styles.legal}>
          Davom etib, <Text style={styles.link}>Foydalanish shartlari</Text> va <Text style={styles.link}>Maxfiylik siyosati</Text>ga rozilik bildirasiz.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 30, fontWeight: '700', color: colors.text, letterSpacing: -0.6 },
  sub: { fontSize: 15, lineHeight: 22.5, color: colors.secondary, marginTop: 6 },
  cell: { flex: 1, height: 56, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  cellText: { fontSize: 24, fontWeight: '700', color: colors.text },
  legal: { fontSize: 12, lineHeight: 18, color: colors.muted, textAlign: 'center' },
  link: { color: colors.accentText, textDecorationLine: 'underline' },
});
