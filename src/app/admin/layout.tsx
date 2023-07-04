'use client';

import { Box } from '@mui/material';
import { pxToRem } from '@/assets/theme/functions/pxToRem';
import { useSoftUI } from '@/hooks/useSoftUI';

import DashboardNavbar from './components/DashboardNavbar/DashboardNavbar';

interface Props {
  children: React.ReactNode;
}

function DashboardLayout({ children }: Props) {
  const { miniSidenav } = useSoftUI();

  return (
    <Box
      sx={({ breakpoints, transitions }) => ({
        p: 3,
        position: 'relative',
        [breakpoints.up('xl')]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(['margin-left', 'margin-right'], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      <DashboardNavbar />
      {children}
    </Box>
  );
}

export default DashboardLayout;
