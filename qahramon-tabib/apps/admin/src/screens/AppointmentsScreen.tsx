import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  ADMIN_APPT_DAYS, ADMIN_APPT_STATUS, ADMIN_APPT_TYPES, ADMIN_RESCHEDULE_SLOTS, Badge, Button, Chip, Icon, Input, Segmented, colors, ini, tabular, useToast,
} from '@qt/shared';
import { Screen, Stack } from '../components/Screen';
import { Avatar, EmptyText, SectionLabel, StatTile } from '../components/Ui';
import { ActionSheet, OptionList } from '../components/Sheets';
import { actions, useAdmin } from '../store';
import { openAppt } from '../nav';

export function AppointmentsScreen({ root = false }: { root?: boolean }) {
  const appts = useAdmin((s) => s.appts);
  const apDay = useAdmin((s) => s.apDay);
  const day = appts.filter((a) => a.day === apDay).sort((a, b) => a.time.localeCompare(b.time));
  return (
    <Screen title="Qabullar" root={root}>
      <Stack style={{ paddingTop: 4 }}>
        <Segmented options={ADMIN_APPT_DAYS} index={apDay} onChange={actions.setApDay} />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <StatTile k="Qabul" v={String(day.length)} />
          <StatTile k="Yangi" v={String(day.filter((a) => a.status === 'new').length)} />
          <StatTile k="Onlayn" v={String(day.filter((a) => a.type !== 'clinic').length)} />
        </View>
        {day.map((a) => {
          const [typeL, , typeIcon, dur] = ADMIN_APPT_TYPES[a.type];
          const [statusL, tone] = ADMIN_APPT_STATUS[a.status];
          const done = a.status === 'done';
          return (
            <Pressable
              key={a.id}
              onPress={() => openAppt(a.id)}
              style={{ flexDirection: 'row', gap: 14, alignItems: 'stretch', padding: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 18 }}
            >
              <View style={{ width: 56, borderRadius: 14, backgroundColor: done ? colors.inset : colors.brandInk, alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Text style={[{ fontSize: 16, fontWeight: '800', color: done ? colors.muted : colors.gold }, tabular]}>{a.time}</Text>
                <Text style={{ fontSize: 11, opacity: 0.8, color: done ? colors.muted : colors.gold }}>{dur ? dur + ' daq' : 'yozma'}</Text>
              </View>
              <View style={{ flex: 1, minWidth: 0, gap: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={{ flex: 1, fontSize: 15.5, fontWeight: '600', color: colors.text }}>{a.name}</Text>
                  <Badge label={statusL} tone={tone} />
                </View>
                <Text numberOfLines={2} style={{ fontSize: 13.5, lineHeight: 19, color: colors.secondary }}>{a.complaint}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Icon name={typeIcon as 'video'} size={14} color={colors.muted} />
                  <Text style={{ fontSize: 12.5, color: colors.muted }}>{`${typeL} · ${a.age} yosh`}</Text>
                </View>
              </View>
            </Pressable>
          );
        })}
        {day.length === 0 ? <EmptyText text="Bu kunga qabul yo'q." /> : null}
      </Stack>
    </Screen>
  );
}

export function AppointmentScreen({ id }: { id: number }) {
  const ap = useAdmin((s) => s.appts.find((a) => a.id === id));
  const products = useAdmin((s) => s.products);
  const toast = useToast();
  const [sheet, setSheet] = useState(false);
  const [sel, setSel] = useState(0);
  if (!ap) return <Screen title="Qabul"><View /></Screen>;

  const [typeL] = ADMIN_APPT_TYPES[ap.type];
  const [statusL, tone] = ADMIN_APPT_STATUS[ap.status];

  let bar: React.ReactNode;
  if (ap.status === 'new') {
    bar = (
      <>
        <Button title="Ko'chirish" variant="secondary" size="lg" style={{ flex: 1 }} onPress={() => { setSel(0); setSheet(true); }} />
        <Button title="Tasdiqlash" size="lg" style={{ flex: 1.4 }} onPress={() => actions.confirmAppt(ap.id)} />
      </>
    );
  } else if (ap.status === 'confirmed') {
    bar = (
      <>
        <Button title={ap.type === 'video' ? "Video qo'ng'iroq" : "Qo'ng'iroq"} variant="secondary" size="lg" style={{ flex: 1 }} onPress={() => toast.show("Qo'ng'iroq boshlanmoqda")} />
        <Button title="Yakunlash va yuborish" size="lg" style={{ flex: 1.4 }} onPress={() => actions.finishAppt(ap.id)} />
      </>
    );
  }

  return (
    <Screen title="Qabul" bar={bar}>
      <Stack style={{ paddingTop: 8 }}>
        <View style={{ borderRadius: 22, backgroundColor: colors.brandInk, padding: 18, gap: 12, overflow: 'hidden' }}>
          <View style={{ position: 'absolute', right: -50, top: -50, width: 170, height: 170, borderRadius: 85, borderWidth: 1, borderColor: 'rgba(217,180,95,.25)' }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 48, height: 48, borderRadius: 24, borderWidth: 1.5, borderColor: colors.goldLine, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: colors.gold, fontWeight: '700' }}>{ini(ap.name)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#fff' }}>{ap.name}</Text>
              <Text style={{ fontSize: 13, color: 'rgba(255,255,255,.72)' }}>{`${ap.age} yosh · ${ap.phone}`}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {([['Vaqt', `${ADMIN_APPT_DAYS[ap.day] ?? ''}, ${ap.time}`], ['Turi', typeL]] as const).map(([k, v]) => (
              <View key={k} style={{ flex: 1, borderRadius: 14, backgroundColor: 'rgba(255,255,255,.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,.12)', paddingVertical: 10, paddingHorizontal: 12 }}>
                <Text style={{ fontSize: 11.5, color: 'rgba(255,255,255,.65)' }}>{k}</Text>
                <Text style={{ fontSize: 15, fontWeight: '700', color: colors.gold, marginTop: 2 }}>{v}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 4 }}>
          <Text style={{ fontSize: 13, color: colors.muted }}>Holat</Text>
          <Badge label={statusL} tone={tone} />
        </View>

        <SectionLabel>Mijoz shikoyati</SectionLabel>
        <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 18, paddingVertical: 14, paddingHorizontal: 16 }}>
          <Text style={{ fontSize: 15, lineHeight: 23, color: colors.body }}>{ap.complaint}</Text>
        </View>

        <SectionLabel>Tabib xulosasi</SectionLabel>
        <Input multiline minHeight={110} placeholder="Tavsiyalar, parhez, qo'llash tartibi" value={ap.note} onChangeText={(t) => actions.setApptNote(ap.id, t)} />

        <SectionLabel>Tavsiya etilgan mahsulotlar</SectionLabel>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {products.filter((p) => !p.rx).slice(0, 8).map((p) => (
            <Chip key={p.id} label={p.name} selected={ap.recs.includes(p.id)} onPress={() => actions.toggleApptRec(ap.id, p.id)} />
          ))}
        </View>
        <Text style={{ fontSize: 12.5, color: colors.muted, paddingHorizontal: 4 }}>Tanlangan mahsulotlar qabul yakunida mijoz ilovasiga tavsiya sifatida yuboriladi.</Text>
      </Stack>

      <ActionSheet
        visible={sheet}
        onClose={() => setSheet(false)}
        title="Qabulni ko'chirish"
        sub="Mijozga yangi vaqt haqida SMS va push yuboriladi."
        confirmLabel="Ko'chirish"
        onConfirm={() => { actions.rescheduleAppt(ap.id, sel); setSheet(false); }}
      >
        <OptionList options={ADMIN_RESCHEDULE_SLOTS.map((t) => ({ label: t[0] }))} selected={sel} onSelect={setSel} />
      </ActionSheet>
    </Screen>
  );
}
