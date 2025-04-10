import React, {type ReactNode} from 'react';
import type {Props} from '@theme/Icon/LightMode';
import {IconBook} from '@tabler/icons-react'; // Import Tabler icon

export default function IconLightMode({className, ...props}: Props): ReactNode {
  return <IconBook size={24} stroke={1.5} className={className} />;
}