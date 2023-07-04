import { Theme } from '@mui/material';

import { boxShadows } from '@/assets/theme/base/boxShadows';
import { borders } from '@/assets/theme/base/borders';
import { colors } from '@/assets/theme/base/colors';
import { typography } from '@/assets/theme/base/typography';
import { pxToRem } from '@/assets/theme/functions/pxToRem';
import { rgba } from '@/assets/theme/functions/rgba';

interface PropsOwnerState {
  transparentNavbar?: boolean;
  absolute?: boolean;
  light?: boolean;
}

export function navbarStyle(theme: Theme, ownerState: PropsOwnerState) {
  const { palette, transitions, breakpoints } = theme;
  const { absolute, light, transparentNavbar } = ownerState;

  const { text } = palette;
  const { dark, white, transparent } = colors;
  const { navbarBoxShadow } = boxShadows;
  const { borderRadius } = borders;

  return {
    boxShadow: transparentNavbar || absolute ? 'none' : navbarBoxShadow,
    backdropFilter:
      transparentNavbar || absolute
        ? 'none'
        : `saturate(200%) blur(${pxToRem(30)})`,
    backgroundColor:
      transparentNavbar || absolute
        ? `${transparent.main} !important`
        : rgba(white.main, 0.8),

    color: () => {
      let color;

      if (light) {
        color = white.main;
      } else if (transparentNavbar) {
        color = text.primary;
      } else {
        color = dark.main;
      }

      return color;
    },
    top: absolute ? 0 : pxToRem(12),
    minHeight: pxToRem(75),
    display: 'grid',
    alignItems: 'center',
    borderRadius: borderRadius.xl,
    paddingTop: pxToRem(8),
    paddingBottom: pxToRem(8),
    paddingRight: absolute ? pxToRem(8) : 0,
    paddingLeft: absolute ? pxToRem(16) : 0,

    '& > *': {
      transition: transitions.create('all', {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    '& .MuiToolbar-root': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      [breakpoints.up('sm')]: {
        minHeight: 'auto',
        padding: `${pxToRem(4)} ${pxToRem(16)}`,
      },
    },
  };
}

export const navbarContainer = ({ breakpoints }: Theme) => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  pt: 0.5,
  pb: 0.5,

  [breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '0',
    paddingBottom: '0',
  },
});

export const navbarRow = (
  { breakpoints }: Theme,
  { isMini }: { isMini?: boolean }
) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',

  [breakpoints.up('md')]: {
    justifyContent: isMini ? 'space-between' : 'stretch',
    width: isMini ? '100%' : 'max-content',
  },

  [breakpoints.up('xl')]: {
    justifyContent: 'stretch !important',
    width: 'max-content !important',
  },
});

export const navbarIconButton = ({ breakpoints }: Theme) => ({
  px: 0.75,

  '& .material-icons, .material-icons-round': {
    fontSize: `${typography.size.md} !important`,
  },

  '& .MuiTypography-root': {
    display: 'none',

    [breakpoints.up('sm')]: {
      display: 'inline-block',
      lineHeight: 1.2,
      ml: 0.5,
    },
  },
});

export const navbarDesktopMenu = ({ breakpoints }: Theme) => ({
  display: 'none !important',
  cursor: 'pointer',

  [breakpoints.up('xl')]: {
    display: 'inline-block !important',
  },
});

export const navbarMobileMenu = ({ breakpoints }: Theme) => ({
  display: 'inline-block',
  lineHeight: 0,

  [breakpoints.up('xl')]: {
    display: 'none',
  },
});
