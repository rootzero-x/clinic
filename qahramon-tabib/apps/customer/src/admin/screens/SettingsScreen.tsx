import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ADMIN_ROLES, Switch, colors, type AdminRole } from '@qt/shared';
import { Screen, Stack } from '../components/Screen';
import { Group, SectionLabel } from '../components/Ui';
import { ActionSheet, OptionList } from '../components/Sheets';
import { actions, useAdmin, type AdminState } from '../store';
import { gotoRoleHome } from '../nav';

type SettingKey = keyof AdminState['settings'];
type Row = { label: string; val?: string; sw?: SettingKey; role?: boolean };

export function SettingsScreen({ root = false }: { root?: boolean }) {
  const S = useAdmin((s) => s.settings);
  const role = useAdmin((s) => s.role);
  const [sheet, setSheet] = useState(false);
  const [sel, setSel] = useState(0);

  const groups: { title: string; rows: Row[] }[] = [
    { title: 'Dorixona', rows: [{ label: 'Nomi', val: 'Qahramon Tabib' }, { label: 'Telefon', val: '+998 71 200 30 40' }, { label: 'Manzil', val: 'Chilonzor, 9-kvartal' }] },
    { title: 'Ish vaqti', rows: [{ label: '24/7 ishlash', sw: 'allDay' }, { label: 'Har kuni', val: S.allDay ? 'Kecha-kunduz' : '08:00 – 23:00' }] },
    { title: 'Yetkazib berish', rows: [{ label: 'Yetkazib berish faol', sw: 'delivery' }, { label: 'Narxi', val: "15 000 so'm" }, { label: 'Bepul', val: "200 000 so'mdan" }] },
    { title: "To'lov usullari", rows: [{ label: 'Naqd pul', sw: 'cash' }, { label: 'Click', sw: 'click' }, { label: 'Payme', sw: 'payme' }, { label: 'Uzcard / Humo', sw: 'uzcard' }] },
    { title: 'Bildirishnomalar', rows: [{ label: 'Yangi buyurtma', sw: 'nOrders' }, { label: 'Yangi retsept', sw: 'nRx' }, { label: 'Mijoz xabari', sw: 'nChat' }] },
    { title: 'Xavfsizlik', rows: [{ label: 'Face ID bilan kirish', sw: 'faceid' }, { label: 'Rol', val: role, role: true }] },
  ];

  return (
    <Screen title="Sozlamalar" root={root}>
      <Stack gap={10} style={{ paddingTop: 4 }}>
        {groups.map((g) => (
          <View key={g.title} style={{ gap: 6, marginBottom: 8 }}>
            <SectionLabel style={{ paddingTop: 0 }}>{g.title}</SectionLabel>
            <Group>
              {g.rows.map((r) => {
                const content = (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 16, backgroundColor: colors.card, minHeight: 48 }}>
                    <Text style={{ flex: 1, fontSize: 15, color: colors.text }}>{r.label}</Text>
                    {r.sw ? (
                      <Switch value={S[r.sw]} onValueChange={() => actions.toggleSetting(r.sw!)} />
                    ) : (
                      <Text style={{ fontSize: 14.5, color: colors.muted, textAlign: 'right' }}>{r.val}</Text>
                    )}
                  </View>
                );
                return r.role ? (
                  <Pressable key={r.label} onPress={() => { setSel(ADMIN_ROLES.indexOf(role)); setSheet(true); }}>{content}</Pressable>
                ) : (
                  <View key={r.label}>{content}</View>
                );
              })}
            </Group>
          </View>
        ))}
      </Stack>

      <ActionSheet
        visible={sheet}
        onClose={() => setSheet(false)}
        title="Rolni almashtirish"
        sub="Tab bar va «Ko'proq» bo'limlari rolga qarab o'zgaradi."
        confirmLabel="Almashtirish"
        onConfirm={() => {
          const next: AdminRole = ADMIN_ROLES[sel];
          setSheet(false);
          actions.setRole(next);
          gotoRoleHome(next);
        }}
      >
        <OptionList options={ADMIN_ROLES.map((r) => ({ label: r }))} selected={sel} onSelect={setSel} />
      </ActionSheet>
    </Screen>
  );
}
