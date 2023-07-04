import { forwardRef } from 'react';
import { Typography, Box, MenuItem } from '@mui/material';

import { menuItem, menuImage } from './styles';

const NotificationItem = forwardRef(
  ({ color, image, title, date, ...rest }, ref: React.ForwardedRef<any>) => (
    <MenuItem ref={ref}></MenuItem>
  )
);
