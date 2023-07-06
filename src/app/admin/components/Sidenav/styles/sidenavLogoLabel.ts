import { pxToRem } from '@/assets/theme/functions/pxToRem';
import { Theme } from '@mui/material';

interface OwnerState {
  miniSidenav: boolean;
}

export default function sidenavLogoLabel(theme: Theme, ownerState: OwnerState) {
  const { transitions, typography, breakpoints } = theme;
  const { miniSidenav } = ownerState;

  const { fontWeightMedium } = typography;

  return {
    ml: 0.5,
    fontWeight: fontWeightMedium,
    wordSpacing: pxToRem(-1),
    transition: transitions.create('opacity', {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    [breakpoints.up('xl')]: {
      opacity: miniSidenav ? 0 : 1,
    },
  };
}
