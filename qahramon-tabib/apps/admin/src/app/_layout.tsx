import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider, colors, useToast } from '@qt/shared';
import { ConfirmDeleteProvider } from '../components/Sheets';
import { setToastFn } from '../store';

function ToastBridge() {
  const { show } = useToast();
  useEffect(() => { setToastFn(show); }, [show]);
  return null;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.page }}>
      <SafeAreaProvider>
        <ToastProvider>
          <ToastBridge />
          <ConfirmDeleteProvider>
            <StatusBar style="dark" />
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.page } }}>
              <Stack.Screen name="index" options={{ animation: 'fade' }} />
              <Stack.Screen name="login" options={{ animation: 'fade', gestureEnabled: false }} />
              <Stack.Screen name="(tabs)" options={{ animation: 'fade', gestureEnabled: false }} />
            </Stack>
          </ConfirmDeleteProvider>
        </ToastProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
