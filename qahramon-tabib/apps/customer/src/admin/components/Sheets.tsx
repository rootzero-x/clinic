import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BottomSheet, Button, Icon, colors, useToast } from '@qt/shared';
import { Group } from './Ui';

type SheetProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  sub?: string;
  children?: React.ReactNode;
  confirmLabel: string;
  onConfirm: () => void;
  disabled?: boolean;
};

/** Prototype sheet: title + subtitle, optional body, [Bekor | primary] buttons. */
export function ActionSheet({ visible, onClose, title, sub, children, confirmLabel, onConfirm, disabled }: SheetProps) {
  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View>
        <Text style={{ fontSize: 19, fontWeight: '700', color: colors.text }}>{title}</Text>
        {sub ? <Text style={{ fontSize: 14, lineHeight: 21, color: colors.secondary, marginTop: 4 }}>{sub}</Text> : null}
      </View>
      {children}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Button title="Bekor" variant="secondary" size="lg" onPress={onClose} style={{ flex: 1 }} />
        <Button title={confirmLabel} size="lg" disabled={disabled} onPress={onConfirm} style={{ flex: 1.4 }} />
      </View>
    </BottomSheet>
  );
}

export type SheetOption = { label: string; sub?: string };

/** Radio-style option list with a trailing check. */
export function OptionList({ options, selected, onSelect }: { options: SheetOption[]; selected: number; onSelect: (i: number) => void }) {
  return (
    <Group style={{ borderRadius: 16 }}>
      {options.map((o, i) => (
        <Pressable
          key={o.label}
          onPress={() => onSelect(i)}
          style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13, paddingHorizontal: 14, backgroundColor: pressed ? colors.raised : colors.card })}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, color: colors.text }}>{o.label}</Text>
            {o.sub ? <Text style={{ fontSize: 12.5, color: colors.muted }}>{o.sub}</Text> : null}
          </View>
          <View style={{ opacity: i === selected ? 1 : 0 }}>
            <Icon name="check" size={22} color={colors.accent} />
          </View>
        </Pressable>
      ))}
    </Group>
  );
}

/* ------------------------------------------------------------------ delete confirmation */
type Req = { title: string; sub: string; run: () => void };
type Ask = (title: string, sub: string, run: () => void) => void;
const Ctx = createContext<Ask>(() => {});
export const useConfirmDelete = () => useContext(Ctx);

/** One shared "delete? confirm" sheet. Delete always asks first. */
export function ConfirmDeleteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [req, setReq] = useState<Req>({ title: '', sub: '', run: () => {} });
  const toast = useToast();
  const reqRef = useRef(req);
  reqRef.current = req;
  const ask = useCallback<Ask>((title, sub, run) => {
    setReq({ title, sub, run });
    setOpen(true);
  }, []);
  return (
    <Ctx.Provider value={ask}>
      {children}
      <ActionSheet
        visible={open}
        onClose={() => setOpen(false)}
        title={req.title}
        sub={req.sub}
        confirmLabel="O'chirish"
        onConfirm={() => {
          setOpen(false);
          reqRef.current.run();
          toast.show("O'chirildi");
        }}
      />
    </Ctx.Provider>
  );
}

/* ------------------------------------------------------------------ select field */
/** Label + field that opens a bottom sheet with the options (replaces the DS Select). */
export function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ fontSize: 13, fontWeight: '500', color: colors.secondary }}>{label}</Text>
      <Pressable
        onPress={() => setOpen(true)}
        style={{ minHeight: 52, borderRadius: 14, borderWidth: 1, borderColor: colors.borderDefault, backgroundColor: colors.card, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 8 }}
      >
        <Text style={{ flex: 1, fontSize: 15, color: colors.text }}>{value}</Text>
        <Icon name="down" size={18} color={colors.muted} />
      </Pressable>
      <BottomSheetList open={open} onClose={() => setOpen(false)} title={label} options={options} value={value} onChange={(v) => { onChange(v); setOpen(false); }} />
    </View>
  );
}

function BottomSheetList({ open, onClose, title, options, value, onChange }: { open: boolean; onClose: () => void; title: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <BottomSheet visible={open} onClose={onClose}>
      <Text style={{ fontSize: 19, fontWeight: '700', color: colors.text }}>{title}</Text>
      <OptionList options={options.map((o) => ({ label: o }))} selected={options.indexOf(value)} onSelect={(i) => onChange(options[i])} />
    </BottomSheet>
  );
}
