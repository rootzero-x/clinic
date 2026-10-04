import React, { useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import {
  ADMIN_PUSH_AUDIENCES, Badge, Button, Icon, Input, SwipeAction, SwipeRow, colors, tabular,
} from '@qt/shared';
import { Screen, Stack } from '../components/Screen';
import { Group, SectionLabel, SwipeHint } from '../components/Ui';
import { Monogram } from '../components/Brand';
import { ActionSheet, useConfirmDelete } from '../components/Sheets';
import { actions, useAdmin } from '../store';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'ui-monospace, monospace' }) as string;

/* ------------------------------------------------------------------ promos */
export function PromosScreen({ root = false }: { root?: boolean }) {
  const promos = useAdmin((s) => s.promos);
  const askDelete = useConfirmDelete();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState('');
  const [val, setVal] = useState('');
  const [limit, setLimit] = useState('');

  const close = () => setOpen(false);
  const create = () => {
    actions.addPromo(code, +val, +limit);
    setCode(''); setVal(''); setLimit('');
    close();
  };

  return (
    <Screen title="Aksiyalar" root={root} action={{ icon: 'plus', label: 'Promokod yaratish', onPress: () => setOpen(true) }}>
      <Stack gap={10} style={{ paddingTop: 4 }}>
        <SwipeHint text="Chapga suring: yoqish, o'chirish" />
        {promos.map((p) => {
          const acts: SwipeAction[] = [
            { label: p.active ? 'Pauza' : 'Yoqish', icon: p.active ? 'eyeOff' : 'eye', bg: p.active ? colors.swipeHide : colors.swipeShow, onPress: () => actions.togglePromo(p.code) },
            { label: "O'chirish", icon: 'del', bg: colors.swipeDelete, onPress: () => askDelete(p.code + " o'chirilsinmi?", 'Promokod endi ishlamaydi.', () => actions.deletePromo(p.code)) },
          ];
          const pct = p.limit ? Math.min(100, Math.round((p.used / p.limit) * 100)) : 0;
          return (
            <SwipeRow key={p.code} actions={acts} radius={18} style={{ borderWidth: 1, borderColor: colors.borderSubtle, backgroundColor: colors.card }}>
              <View style={{ padding: 14, paddingHorizontal: 16, gap: 10, backgroundColor: colors.card }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Text style={{ fontFamily: MONO, fontWeight: '700', fontSize: 15, letterSpacing: 0.6, color: colors.text, backgroundColor: colors.inset, borderRadius: 8, paddingVertical: 4, paddingHorizontal: 8, overflow: 'hidden' }}>{p.code}</Text>
                  <View style={{ flex: 1 }} />
                  <Badge label={p.active ? 'Faol' : 'Nofaol'} tone={p.active ? 'success' : 'neutral'} />
                </View>
                <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>{p.val}</Text>
                <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.inset, overflow: 'hidden' }}>
                  <View style={{ height: '100%', width: `${pct}%`, backgroundColor: colors.accent, borderRadius: 3 }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={[{ fontSize: 12.5, color: colors.muted }, tabular]}>{p.limit ? `${p.used} / ${p.limit} ishlatilgan` : `${p.used} ishlatilgan`}</Text>
                  <Text style={[{ fontSize: 12.5, color: colors.muted }, tabular]}>{'Muddat: ' + p.till}</Text>
                </View>
              </View>
            </SwipeRow>
          );
        })}
      </Stack>

      <ActionSheet
        visible={open}
        onClose={close}
        title="Yangi promokod"
        sub="Kod mijoz ilovasida checkout bosqichida ishlaydi."
        confirmLabel="Yaratish"
        disabled={!(code.trim() && +val > 0)}
        onConfirm={create}
      >
        <View style={{ gap: 12 }}>
          <Input label="Promokod *" placeholder="Masalan, QISH15" autoCapitalize="characters" value={code} onChangeText={setCode} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Input containerStyle={{ flex: 1 }} label="Chegirma, % *" keyboardType="number-pad" placeholder="10" value={val} onChangeText={(t) => setVal(t.replace(/\D/g, ''))} />
            <Input containerStyle={{ flex: 1 }} label="Limit" keyboardType="number-pad" placeholder="500" value={limit} onChangeText={(t) => setLimit(t.replace(/\D/g, ''))} />
          </View>
        </View>
      </ActionSheet>
    </Screen>
  );
}

/* ------------------------------------------------------------------ push */
export function PushScreen({ root = false }: { root?: boolean }) {
  const push = useAdmin((s) => s.push);
  return (
    <Screen
      title="Bildirishnoma"
      root={root}
      bar={<Button title="Yuborish" size="lg" style={{ flex: 1 }} onPress={() => actions.sendPush()} />}
    >
      <Stack gap={14} style={{ paddingTop: 8 }}>
        <View style={{ borderRadius: 22, backgroundColor: '#2b312d', paddingVertical: 18, paddingHorizontal: 12 }}>
          <View style={{ backgroundColor: 'rgba(255,255,255,.72)', borderWidth: 1, borderColor: 'rgba(255,255,255,.6)', borderRadius: 20, paddingVertical: 12, paddingHorizontal: 14, flexDirection: 'row', gap: 10 }}>
            <Monogram size={36} radius={9} fontSize={12} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#121713' }}>{push.title || 'Sarlavha'}</Text>
                <Text style={{ fontSize: 13, color: '#4f5751' }}>hozir</Text>
              </View>
              <Text style={{ fontSize: 13.5, lineHeight: 19, color: '#2b312d', marginTop: 2 }}>{push.body || 'Xabar matni'}</Text>
            </View>
          </View>
          <Text style={{ textAlign: 'center', fontSize: 11.5, color: 'rgba(255,255,255,.7)', marginTop: 10 }}>Qulflangan ekranda ko'rinishi</Text>
        </View>

        <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 18, padding: 16, gap: 14 }}>
          <Input label="Sarlavha *" value={push.title} onChangeText={(t) => actions.setPush({ title: t })} />
          <Input label="Matn" multiline minHeight={90} value={push.body} onChangeText={(t) => actions.setPush({ body: t })} />
        </View>

        <SectionLabel style={{ paddingTop: 0 }}>Kimga</SectionLabel>
        <Group>
          {ADMIN_PUSH_AUDIENCES.map(([label, n], i) => (
            <Pressable key={label} onPress={() => actions.setPush({ aud: i })} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, paddingHorizontal: 16, backgroundColor: colors.card }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, color: colors.text }}>{label}</Text>
                <Text style={[{ fontSize: 12.5, color: colors.muted }, tabular]}>{n}</Text>
              </View>
              <View style={{ opacity: push.aud === i ? 1 : 0 }}>
                <Icon name="check" size={22} color={colors.accent} />
              </View>
            </Pressable>
          ))}
        </Group>
      </Stack>
    </Screen>
  );
}
