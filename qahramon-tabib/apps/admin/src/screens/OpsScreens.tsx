import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import {
  ADMIN_CHANNELS, ADMIN_CONSULT_SUMMARY, ADMIN_CONVERSION, ADMIN_COURIER_STATUS, ADMIN_ROLES, ADMIN_ROLE_PERMS, ADMIN_TOP_SOLD,
  Badge, GlassSurface, Icon, Input, Segmented, SwipeAction, SwipeRow, colors, ini, tabular, useToast, type AdminRole,
} from '@qt/shared';
import { Screen, Stack } from '../components/Screen';
import { Avatar, Card, Chevron, Group, Kpi, SectionLabel, SquareIconButton, StatTile, SwipeHint } from '../components/Ui';
import { Photo } from '../components/Brand';
import { ActionSheet, OptionList, useConfirmDelete } from '../components/Sheets';
import { actions, useAdmin } from '../store';
import { pushList } from '../nav';

const RANGES = [['today', 'Bugun'], ['week', 'Hafta'], ['month', 'Oy']] as const;

/* ------------------------------------------------------------------ analytics */
export function AnalyticsScreen({ root = false }: { root?: boolean }) {
  const range = useAdmin((s) => s.range);
  const products = useAdmin((s) => s.products);
  const kpis: [string, string, string][] = [
    ['Konversiya', ADMIN_CONVERSION[range], '+0.4 p.p.'],
    ['Qaytgan mijozlar', '41%', '+6%'],
    ['Maslahatdan xarid', '62%', '+9%'],
    ['Ilova reytingi', '4.9', '+0.1'],
  ];
  const top = ADMIN_TOP_SOLD.map((t) => ({ name: products.find((p) => p.id === t.productId)?.name ?? '', n: t.n }));
  return (
    <Screen title="Analitika" root={root}>
      <Stack gap={14} style={{ paddingTop: 4 }}>
        <Segmented options={RANGES.map((r) => r[1])} index={RANGES.findIndex((r) => r[0] === range)} onChange={(i) => actions.setRange(RANGES[i][0])} />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Kpi label={kpis[0][0]} value={kpis[0][1]} delta={kpis[0][2]} valueSize={21} />
          <Kpi label={kpis[1][0]} value={kpis[1][1]} delta={kpis[1][2]} valueSize={21} />
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Kpi label={kpis[2][0]} value={kpis[2][1]} delta={kpis[2][2]} valueSize={21} />
          <Kpi label={kpis[3][0]} value={kpis[3][1]} delta={kpis[3][2]} valueSize={21} />
        </View>
        <Card gap={12}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>Eng ko'p sotilganlar</Text>
          {top.map((t) => (
            <View key={t.name} style={{ gap: 6 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, color: colors.text }}>{t.name}</Text>
                <Text style={[{ fontSize: 14, color: colors.muted }, tabular]}>{t.n + ' dona'}</Text>
              </View>
              <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.inset }}>
                <View style={{ height: '100%', width: `${Math.round((t.n / ADMIN_TOP_SOLD[0].n) * 100)}%`, borderRadius: 3, backgroundColor: colors.accent }} />
              </View>
            </View>
          ))}
        </Card>
        <Card gap={12}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>Mijozlar qayerdan keladi</Text>
          <View style={{ flexDirection: 'row', height: 12, borderRadius: 6, overflow: 'hidden', gap: 2 }}>
            {ADMIN_CHANNELS.map((c) => <View key={c.name} style={{ width: `${c.pct}%`, backgroundColor: c.color }} />)}
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 8 }}>
            {ADMIN_CHANNELS.map((c) => (
              <View key={c.name} style={{ width: '50%', flexDirection: 'row', alignItems: 'center', gap: 8, paddingRight: 8 }}>
                <View style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: c.color }} />
                <Text style={{ fontSize: 13.5, color: colors.secondary }}>{c.name}</Text>
                <Text style={{ marginLeft: 'auto', fontSize: 13.5, fontWeight: '700', color: colors.text }}>{c.pct + '%'}</Text>
              </View>
            ))}
          </View>
        </Card>
        <Card gap={6}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>Maslahatlar</Text>
          <Text style={{ fontSize: 14, lineHeight: 21, color: colors.secondary }}>{ADMIN_CONSULT_SUMMARY[range]}</Text>
        </Card>
      </Stack>
    </Screen>
  );
}

/* ------------------------------------------------------------------ categories */
export function CategoriesScreen({ root = false }: { root?: boolean }) {
  const cats = useAdmin((s) => s.cats);
  const products = useAdmin((s) => s.products);
  const edit = useAdmin((s) => s.catEdit);
  const askDelete = useConfirmDelete();
  const live = cats.filter((c) => !c.archived);
  const archived = cats.filter((c) => c.archived);

  return (
    <Screen
      title="Toifalar"
      root={root}
      action={{ icon: edit ? 'check' : 'sort', label: edit ? 'Tayyor' : 'Tartiblash', onPress: () => actions.toggleCatEdit() }}
    >
      <View style={{ gap: 14, paddingTop: 4 }}>
        <SectionLabel style={{ paddingHorizontal: 20 }}>Mijoz ilovasida ko'rinishi</SectionLabel>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingHorizontal: 16 }} style={{ flexGrow: 0 }}>
          {live.filter((c) => c.active).map((c) => (
            <View key={c.name} style={{ width: 96, height: 118, borderRadius: 20, overflow: 'hidden' }}>
              <Photo id={c.img} w={200} h={240} style={{ width: '100%', height: '100%' }} />
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(14,28,18,.32)' }} />
              <View style={{ position: 'absolute', left: 6, right: 6, bottom: 6 }}>
                <GlassSurface variant="dark" radius={12} contentStyle={{ padding: 6 }}>
                  <Text style={{ color: '#fff', fontSize: 11.5, fontWeight: '700', lineHeight: 14, textAlign: 'center' }}>{c.name}</Text>
                </GlassSurface>
              </View>
            </View>
          ))}
        </ScrollView>

        <Stack gap={10}>
          <Group>
            {live.map((c) => {
              const count = products.filter((p) => p.cat === c.name && !p.archived).length;
              const body = (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, paddingHorizontal: 12, backgroundColor: colors.card }}>
                  <Photo id={c.img} w={140} h={140} style={{ width: 60, height: 60, borderRadius: 14, opacity: c.active ? 1 : 0.5 }} />
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={{ fontSize: 15.5, fontWeight: '600', color: colors.text }}>{c.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <Text style={{ fontSize: 12.5, color: colors.muted }}>{count + ' ta mahsulot'}</Text>
                      {!c.active ? <Badge label="Yashirin" tone="neutral" pill={false} /> : null}
                    </View>
                  </View>
                  {edit ? (
                    <>
                      <SquareIconButton icon="up" label="Yuqoriga" onPress={() => actions.moveCat(c.name, -1)} />
                      <SquareIconButton icon="down" label="Pastga" onPress={() => actions.moveCat(c.name, 1)} />
                    </>
                  ) : <Chevron />}
                </View>
              );
              if (edit) return <View key={c.name}>{body}</View>;
              const acts: SwipeAction[] = [
                { label: c.active ? 'Yashirish' : "Ko'rsatish", icon: c.active ? 'eyeOff' : 'eye', bg: c.active ? colors.swipeHide : colors.swipeShow, onPress: () => actions.toggleCat(c.name) },
                { label: 'Arxiv', icon: 'archive', bg: colors.swipeArchive, onPress: () => actions.archiveCat(c.name) },
                { label: "O'chirish", icon: 'del', bg: colors.swipeDelete, onPress: () => askDelete(c.name + " o'chirilsinmi?", "Toifadagi mahsulotlar o'chirilmaydi, toifasiz qoladi.", () => actions.deleteCat(c.name)) },
              ];
              return (
                <SwipeRow key={c.name} radius={0} actions={acts} onPress={() => { actions.setPCat(c.name); pushList('products'); }}>
                  {body}
                </SwipeRow>
              );
            })}
          </Group>
          <SwipeHint text="Chapga suring: yashirish, arxivlash yoki o'chirish. Tartib uchun yuqoridagi tugma." />
          {archived.length ? (
            <>
              <SectionLabel style={{ paddingTop: 6 }}>Arxiv</SectionLabel>
              <Group>
                {archived.map((c) => {
                  const acts: SwipeAction[] = [
                    { label: 'Tiklash', icon: 'restore', bg: colors.swipeShow, onPress: () => actions.restoreCat(c.name) },
                    { label: "O'chirish", icon: 'del', bg: colors.swipeDelete, onPress: () => askDelete(c.name + " o'chirilsinmi?", "Toifa butunlay o'chiriladi.", () => actions.deleteCat(c.name)) },
                  ];
                  return (
                    <SwipeRow key={c.name} radius={0} actions={acts}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, paddingHorizontal: 12, backgroundColor: colors.card }}>
                        <Photo id={c.img} w={120} h={120} grayscale style={{ width: 48, height: 48, borderRadius: 12, opacity: 0.6 }} />
                        <Text style={{ flex: 1, fontSize: 15, color: colors.secondary }}>{c.name}</Text>
                      </View>
                    </SwipeRow>
                  );
                })}
              </Group>
            </>
          ) : null}
        </Stack>
      </View>
    </Screen>
  );
}

/* ------------------------------------------------------------------ couriers */
export function CouriersScreen({ root = false }: { root?: boolean }) {
  const couriers = useAdmin((s) => s.couriers);
  const toast = useToast();
  return (
    <Screen title="Kuryerlar" root={root}>
      <Stack gap={10} style={{ paddingTop: 4 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <StatTile k="Faol" v={String(couriers.filter((c) => c.status !== 'off').length)} />
          <StatTile k="Yetkazmoqda" v={String(couriers.filter((c) => c.status === 'busy').length)} />
          <StatTile k="Bugun" v={String(couriers.reduce((a, c) => a + c.today, 0))} />
        </View>
        {couriers.map((c) => {
          const [label, tone, dot] = ADMIN_COURIER_STATUS[c.status];
          return (
            <View key={c.name} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderSubtle, borderRadius: 18 }}>
              <View>
                <Avatar text={ini(c.name)} size={44} fontSize={15} />
                <View style={{ position: 'absolute', right: 0, bottom: 0, width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: colors.card, backgroundColor: dot }} />
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>{c.name}</Text>
                <Text style={{ fontSize: 12.5, color: colors.muted, marginTop: 2 }}>{`${c.where} · ★ ${c.rating} · bugun ${c.today}`}</Text>
              </View>
              <Badge label={label} tone={tone} />
              <Pressable accessibilityLabel="Qo'ng'iroq" onPress={() => toast.show(c.name + "ga qo'ng'iroq")} style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="phone" size={18} color="#fff" />
              </Pressable>
            </View>
          );
        })}
      </Stack>
    </Screen>
  );
}

/* ------------------------------------------------------------------ staff */
const roleTone = (r: AdminRole) => (r === 'Admin' ? 'accent' : r === 'Farmatsevt' ? 'info' : 'warning') as 'accent' | 'info' | 'warning';

export function StaffScreen({ root = false }: { root?: boolean }) {
  const staff = useAdmin((s) => s.staff);
  const askDelete = useConfirmDelete();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [sel, setSel] = useState(1);

  return (
    <Screen title="Xodimlar" root={root} action={{ icon: 'plus', label: 'Xodim taklif qilish', onPress: () => { setSel(1); setOpen(true); } }}>
      <Stack gap={10} style={{ paddingTop: 4 }}>
        <Group>
          {staff.map((s) => {
            const acts: SwipeAction[] = [
              { label: s.active ? 'Bloklash' : 'Faollashtirish', icon: s.active ? 'eyeOff' : 'eye', bg: s.active ? colors.swipeHide : colors.swipeShow, onPress: () => actions.toggleStaff(s.id) },
              { label: "O'chirish", icon: 'del', bg: colors.swipeDelete, onPress: () => askDelete(s.name + " o'chirilsinmi?", 'Xodim ilovaga kira olmaydi.', () => actions.deleteStaff(s.id)) },
            ];
            return (
              <SwipeRow key={s.id} radius={0} actions={acts}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: colors.card }}>
                  <Avatar text={ini(s.name.replace('+998 ', ''))} size={40} bg={s.active ? colors.accentFill : colors.inset} fg={s.active ? colors.accentText : colors.muted} />
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>{s.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 }}>
                      <Badge label={s.role} tone={roleTone(s.role)} />
                      <Text style={{ fontSize: 12, color: colors.muted, flexShrink: 1 }} numberOfLines={1}>{s.last}</Text>
                    </View>
                  </View>
                  {!s.active ? <Badge label="Bloklangan" tone="danger" /> : null}
                </View>
              </SwipeRow>
            );
          })}
        </Group>
        <SectionLabel>Rol huquqlari</SectionLabel>
        <Group>
          {ADMIN_ROLE_PERMS.map((r) => (
            <View key={r.role} style={{ paddingVertical: 12, paddingHorizontal: 16, backgroundColor: colors.card }}>
              <Text style={{ fontSize: 14.5, fontWeight: '600', color: colors.text }}>{r.role}</Text>
              <Text style={{ fontSize: 13, lineHeight: 19, color: colors.muted, marginTop: 2 }}>{r.perms}</Text>
            </View>
          ))}
        </Group>
      </Stack>

      <ActionSheet
        visible={open}
        onClose={() => setOpen(false)}
        title="Xodim taklif qilish"
        sub="Xodimga ilovaga kirish havolasi SMS orqali yuboriladi."
        confirmLabel="Taklif yuborish"
        disabled={phone.replace(/\D/g, '').length < 9}
        onConfirm={() => { actions.inviteStaff(phone, ADMIN_ROLES[sel]); setOpen(false); setPhone(''); }}
      >
        <Input label="Telefon raqam" keyboardType="number-pad" placeholder="90 123 45 67" value={phone} onChangeText={(t) => setPhone(t.replace(/[^\d ]/g, '').slice(0, 12))} />
        <OptionList options={ADMIN_ROLES.map((r) => ({ label: r }))} selected={sel} onSelect={setSel} />
      </ActionSheet>
    </Screen>
  );
}
