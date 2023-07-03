import { Box } from '@mui/material';
import { pxToRem } from '@/assets/theme/functions/pxToRem';
import { useSoftUI } from '@/hooks/useSoftUI';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export function DashboardLayout({ children }: Props) {
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
      {children}
    </Box>
  );
}
