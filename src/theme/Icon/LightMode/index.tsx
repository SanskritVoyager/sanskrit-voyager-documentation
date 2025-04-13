import React, {type ReactNode} from 'react';
import type {Props} from '@theme/Icon/LightMode';
import {IconMoon} from '@tabler/icons-react';
import classes from './LightMode.module.css';

export default function IconLightMode({className, ...props}: Props): ReactNode {

  const {ref, ...iconProps} = props;
  
  return <IconMoon 
        size={22} 
        stroke={1.5} 
        className={`${classes.themeIcon} ${classes.moonIcon} ${className}`} 
        {...iconProps} 
      />;
}