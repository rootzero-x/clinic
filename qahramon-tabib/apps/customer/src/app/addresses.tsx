import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Badge, BottomSheet, Button, Icon, Input, SwipeRow, colors } from '@qt/shared';
import { Group, Page } from '../components/common';
import { actions, useApp } from '../store';

const LABELS = ['Uy', 'Ish', 'Boshqa'];

export default function Addresses() {
  const addrs = useApp((s) => s.addrs);
  const mainAddr = useApp((s) => s.mainAddr);
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState('Uy');
  const [street, setStreet] = useState('');
  const [flat, setFlat] = useState('');
  const [floor, setFloor] = useState('');

  const save = () => {
    actions.addAddress(label, street, flat, floor);
    setOpen(false);
    setStreet(''); setFlat(''); setFloor(''); setLabel('Uy');
  };

  return (
    <Page title="Manzillarim" gap={12}>
      <Group>
        {addrs.map((a) => {
          const isMain = a.id === mainAddr;
          return (
            <SwipeRow
              key={a.id}
              radius={0}
              actions={[
                ...(isMain ? [] : [{ label: 'Asosiy', icon: 'check' as const, bg: colors.swipeShow, onPress: () => actions.setMainAddr(a.id) }]),
                { label: "O'chirish", icon: 'del' as const, bg: colors.swipeDelete, onPress: () => actions.removeAddr(a.id) },
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, paddingHorizontal: 14, backgroundColor: colors.card }}>
                <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: colors.accentFill, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="pin" size={18} color={colors.accentText} />
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>{a.label}</Text>
                    {isMain ? <Badge label="Asosiy" tone="accent" /> : null}
                  </View>
                  <Text style={{ fontSize: 13, color: colors.muted, marginTop: 2 }}>{a.text}</Text>
                </View>
              </View>
            </SwipeRow>
          );
        })}
      </Group>
      <Pressable onPress={() => setOpen(true)} style={{ height: 52, borderRadius: 18, borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.borderStrong, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Icon name="plus" size={18} color={colors.accentText} />
        <Text style={{ color: colors.accentText, fontSize: 15, fontWeight: '600' }}>Yangi manzil</Text>
      </Pressable>
      <Text style={{ fontSize: 12.5, lineHeight: 18.75, color: colors.muted, paddingHorizontal: 4 }}>
        Chapga suring: asosiy qilish yoki o'chirish. Hozircha faqat Toshkent bo'ylab yetkazamiz.
      </Text>

      <BottomSheet visible={open} onClose={() => setOpen(false)}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>Yangi manzil</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {LABELS.map((t) => {
            const on = label === t;
            return (
              <Pressable key={t} onPress={() => setLabel(t)} style={{ flex: 1, height: 38, borderRadius: 19, borderWidth: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: on ? colors.brandInk : colors.card, borderColor: on ? colors.brandInk : colors.borderDefault }}>
                <Text style={{ fontSize: 13.5, fontWeight: '600', color: on ? '#fff' : colors.text }}>{t}</Text>
              </Pressable>
            );
          })}
        </View>
        <Input label="Ko'cha, uy *" placeholder="Masalan, Bobur ko'chasi 12" value={street} onChangeText={setStreet} />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Input containerStyle={{ flex: 1 }} label="Xonadon" placeholder="32" keyboardType="number-pad" value={flat} onChangeText={setFlat} />
          <Input containerStyle={{ flex: 1 }} label="Qavat" placeholder="4" keyboardType="number-pad" value={floor} onChangeText={setFloor} />
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1 }}><Button title="Bekor" variant="secondary" size="lg" fullWidth onPress={() => setOpen(false)} /></View>
          <View style={{ flex: 1.4 }}><Button title="Saqlash" size="lg" fullWidth disabled={!street.trim()} onPress={save} /></View>
        </View>
      </BottomSheet>
    </Page>
  );
}
