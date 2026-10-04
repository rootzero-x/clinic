import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ICON_PATHS, IconName } from '../icon-paths';

export type { IconName };

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
};

/** 24-grid outline icon: stroke 1.7 (2 when active), round caps. */
export function Icon({ name, size = 22, color = '#18241c', strokeWidth = 1.7, fill = 'none' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <Path d={ICON_PATHS[name]} />
    </Svg>
  );
}
