import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Badge, Icon, Input, Tone, colors } from '@qt/shared';
import { Group, Page, PrimaryBar } from '../components/common';
import { actions, useApp } from '../store';

const RS: Record<string, [string, Tone]> = {
  pending: ['Tekshirilmoqda', 'warning'],
  approved: ['Tasdiqlangan', 'success'],
  rejected: ['Rad etilgan', 'danger'],
};

export default function Rx() {
  const rxImgs = useApp((s) => s.rxImgs);
  const rxName = useApp((s) => s.rxName);
  const rxs = useApp((s) => s.rxs);
  const ready = rxImgs > 0 && rxName.trim().length > 0;

  return (
    <Page
      title="Retsept yuklash"
      actionBar
      gap={14}
      bottomOverlay={<PrimaryBar label={rxImgs ? 'Retseptni yuborish' : "Avval rasm qo'shing"} disabled={!ready} onPress={actions.submitRx} />}
    >
      <Text style={{ fontSize: 14.5, lineHeight: 22.5, color: colors.secondary, paddingHorizontal: 4 }}>
        Retsept bilan beriladigan dorilar uchun shifokor retseptining aniq rasmini yuklang. Farmatsevt 30 daqiqa ichida tekshiradi.
      </Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {[0, 1].map((i) => {
          const f = i < rxImgs;
          return (
            <Pressable
              key={i}
              onPress={() => !f && actions.addRxImage()}
              style={{
                flex: 1, aspectRatio: 3 / 4, borderRadius: 20, borderWidth: 1.5, borderStyle: f ? 'solid' : 'dashed',
                borderColor: f ? 'transparent' : colors.borderStrong, backgroundColor: f ? colors.inset : colors.card,
                alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <Icon name={f ? 'rx' : 'camera'} size={26} color={f ? colors.secondary : colors.accentText} />
              <Text style={{ fontSize: 13, fontWeight: '600', color: f ? colors.secondary : colors.accentText }}>
                {f ? `Retsept rasmi ${i + 1}` : i === 0 ? 'Rasmga olish' : 'Galereyadan'}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Input label="Bemor ismi *" value={rxName} onChangeText={actions.setRxName} />
      <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text, paddingTop: 6, paddingHorizontal: 4 }}>Yuborilgan retseptlar</Text>
      <Group>
        {rxs.map((r) => (
          <View key={r.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: colors.card }}>
            <View style={{ width: 40, height: 48, borderRadius: 10, backgroundColor: colors.inset, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="rx" size={18} color={colors.muted} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>{`${r.id} · ${r.name}`}</Text>
              <Text style={{ fontSize: 12.5, color: colors.muted }}>{r.date}</Text>
            </View>
            <Badge label={RS[r.status][0]} tone={RS[r.status][1]} />
          </View>
        ))}
      </Group>
    </Page>
  );
}
