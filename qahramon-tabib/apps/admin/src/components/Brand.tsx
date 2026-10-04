import React from 'react';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';
import { colors, unsplash } from '@qt/shared';

/** The "QT" monogram: gold on brand ink with a gold hairline (placeholder logo). */
export function Monogram({ size = 36, radius = 11, border = 1, fontSize = 13 }: { size?: number; radius?: number; border?: number; fontSize?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: radius, backgroundColor: colors.brandInk, borderWidth: border, borderColor: colors.goldLine, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.gold, fontWeight: '800', fontSize }}>QT</Text>
    </View>
  );
}

/** Unsplash photo by id (admin seed stores ids only). */
export function Photo({ id, w = 400, h = 400, style, grayscale }: { id: string; w?: number; h?: number; style?: object; grayscale?: boolean }) {
  return (
    <Image
      source={{ uri: unsplash(id, w, h) }}
      contentFit="cover"
      transition={150}
      style={[style, grayscale ? ({ filter: 'grayscale(1)' } as object) : null]}
    />
  );
}
