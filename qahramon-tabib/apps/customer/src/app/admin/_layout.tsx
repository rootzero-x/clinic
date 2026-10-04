import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { colors, useToast } from '@qt/shared';
import { ConfirmDeleteProvider } from '@admin/components/Sheets';
import { setToastFn } from '@admin/store';

function ToastBridge() {
  const { show } = useToast();
  useEffect(() => { setToastFn(show); }, [show]);
  return null;
}

/** Staff section (Admin / Farmatsevt / Qo'llab-quvvatlash) inside the single app, under /admin. */
export default function AdminLayout() {
  return (
    <>
      <ToastBridge />
      <ConfirmDeleteProvider>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.page } }}>
          <Stack.Screen name="index" options={{ animation: 'fade' }} />
          <Stack.Screen name="login" options={{ animation: 'fade', gestureEnabled: false }} />
          <Stack.Screen name="(tabs)" options={{ animation: 'fade', gestureEnabled: false }} />
        </Stack>
      </ConfirmDeleteProvider>
    </>
  );
}
