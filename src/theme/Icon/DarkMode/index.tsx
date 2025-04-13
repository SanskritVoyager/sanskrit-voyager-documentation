import React, {type ReactNode} from 'react';
import type {Props} from '@theme/Icon/DarkMode';
import {IconSun} from '@tabler/icons-react';
import classes from './DarkMode.module.css';

export default function IconLightMode({className, ...props}: Props): ReactNode {

  const {ref, ...iconProps} = props;
  
  return <IconSun 
        size={24}
        stroke={1.5} 
        className={`${classes.themeIcon} ${classes.moonIcon} ${className}`} 
        {...iconProps} 
      />;
}