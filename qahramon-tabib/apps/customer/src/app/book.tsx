import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { BUSY, BottomSheet, Button, CTYPES, DAYS, Icon, Input, SLOTS, colors, fmt } from '@qt/shared';
import { Page, PrimaryBar } from '../components/common';
import { actions, useApp } from '../store';

export default function Book() {
  const cType = useApp((s) => s.cType);
  const day = useApp((s) => s.day);
  const slot = useApp((s) => s.slot);
  const note = useApp((s) => s.bookNote);
  const appts = useApp((s) => s.appts);
  const [done, setDone] = useState(false);
  const ct = CTYPES[cType];
  const busy = BUSY[day] || [];
  const last = appts[0];

  return (
    <Page
      title="Qabulga yozilish"
      actionBar="tall"
      gap={18}
      bottomOverlay={
        <>
          <PrimaryBar
            label={slot == null ? 'Vaqtni tanlang' : `Tasdiqlash · ${fmt(ct.price)}`}
            disabled={slot == null}
            onPress={() => { actions.book(); setDone(true); }}
          />
          <BottomSheet visible={done} onClose={() => setDone(false)}>
            <View style={{ alignItems: 'center', gap: 14 }}>
              <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                <Icon name="check" size={28} color="#fff" strokeWidth={2.2} />
              </View>
              <Text style={{ fontSize: 21, fontWeight: '700', color: colors.text }}>Qabulga yozildingiz</Text>
              <Text style={{ fontSize: 15, lineHeight: 22.5, color: colors.secondary, textAlign: 'center' }}>
                {last ? `${last.type} · ${last.n}-oktabr, ${last.time}. Eslatma 1 soat oldin keladi.` : ''}
              </Text>
              <View style={{ alignSelf: 'stretch', gap: 8, marginTop: 4 }}>
                <Button title="Qabullarim" size="lg" fullWidth onPress={() => { setDone(false); router.replace('/appointments'); }} />
                <Button title="Yopish" variant="secondary" size="lg" fullWidth onPress={() => { setDone(false); router.back(); }} />
              </View>
            </View>
          </BottomSheet>
        </>
      }
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 18, backgroundColor: colors.accentFill }}>
        <Icon name={ct.icon} size={20} color={colors.accentText} />
        <Text style={{ flex: 1, fontSize: 14.5, fontWeight: '600', color: colors.text }}>{ct.label}</Text>
        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.text }}>{fmt(ct.price)}</Text>
      </View>

      <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text, paddingHorizontal: 4 }}>Kun</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }} contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}>
          {DAYS.map((d, i) => {
            const on = day === i;
            return (
              <Pressable key={d.n} onPress={() => actions.setDay(i)} style={{ width: 58, height: 72, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: on ? colors.brandInk : colors.card, borderColor: on ? colors.brandInk : colors.borderDefault }}>
                <Text style={{ fontSize: 12, fontWeight: '600', opacity: 0.8, color: on ? '#fff' : colors.text }}>{d.w}</Text>
                <Text style={{ fontSize: 20, fontWeight: '700', color: on ? '#fff' : colors.text }}>{d.n}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text, paddingHorizontal: 4 }}>Vaqt</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {SLOTS.map((t, i) => {
            const off = busy.includes(i);
            const on = slot === i;
            return (
              <Pressable
                key={t}
                disabled={off}
                onPress={() => actions.setSlot(i)}
                style={{ width: '23.4%', height: 44, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: on ? colors.accent : off ? colors.inset : colors.card, borderColor: on ? colors.accent : off ? 'transparent' : colors.borderDefault }}
              >
                <Text style={{ fontSize: 14, fontWeight: '600', color: on ? '#fff' : off ? colors.placeholder : colors.text, textDecorationLine: off ? 'line-through' : 'none' }}>{t}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={{ gap: 6 }}>
        <Text style={{ fontSize: 13, fontWeight: '500', color: colors.secondary, paddingHorizontal: 4 }}>Muammoni qisqacha yozing</Text>
        <Input multiline minHeight={96} value={note} onChangeText={actions.setBookNote} placeholder="Masalan: tizza og'rig'i, 2 oydan beri" />
      </View>
    </Page>
  );
}
