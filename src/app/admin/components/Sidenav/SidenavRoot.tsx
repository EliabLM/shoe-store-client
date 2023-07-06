import { Theme, Drawer } from '@mui/material';

import { boxShadows } from '@/assets/theme/base/boxShadows';
import { colors } from '@/assets/theme/base/colors';
import { pxToRem } from '@/assets/theme/functions/pxToRem';

interface Props {
  children: React.ReactNode;
  ownerState: OwnerState;
}

interface OwnerState {
  transparentSidenav: boolean;
  miniSidenav: boolean;
}

const SidenavRoot = ({ children, ownerState }: Props) => {
  return (
    <Drawer
      variant='permanent'
      sx={(theme) => styleSidenavRoot(theme, ownerState)}
    >
      {children}
    </Drawer>
  );
};

export default SidenavRoot;

function styleSidenavRoot(theme: Theme, ownerState: OwnerState) {
  const { transitions, breakpoints } = theme;
  const { transparentSidenav, miniSidenav } = ownerState;

  const sidebarWidth = 250;
  const { white, transparent } = colors;
  const { xxl } = boxShadows;

  // styles for the sidenav when miniSidenav={false}
  const drawerOpenStyles = () => ({
    transform: 'translateX(0)',
    transition: transitions.create('transform', {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter,
    }),

    [breakpoints.up('xl')]: {
      backgroundColor: transparentSidenav ? transparent.main : white.main,
      boxShadow: transparentSidenav ? 'none' : xxl,
      marginBottom: transparentSidenav ? 0 : 'inherit',
      left: '0',
      width: sidebarWidth,
      transform: 'translateX(0)',
      transition: transitions.create(['width', 'background-color'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen,
      }),
    },
  });

  // styles for the sidenav when miniSidenav={true}
  const drawerCloseStyles = () => ({
    transform: `translateX(${pxToRem(-320)})`,
    transition: transitions.create('transform', {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter,
    }),

    [breakpoints.up('xl')]: {
      backgroundColor: transparentSidenav ? transparent.main : white.main,
      boxShadow: transparentSidenav ? 'none' : xxl,
      marginBottom: transparentSidenav ? 0 : 'inherit',
      left: '0',
      width: pxToRem(96),
      overflowX: 'hidden',
      transform: 'translateX(0)',
      transition: transitions.create(['width', 'background-color'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter,
      }),
    },
  });

  return {
    '& .MuiDrawer-paper': {
      boxShadow: xxl,
      border: 'none',

      ...(miniSidenav ? drawerCloseStyles() : drawerOpenStyles()),
    },
  };
}
