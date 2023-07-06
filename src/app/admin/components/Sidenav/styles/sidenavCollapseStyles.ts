import { Theme } from '@mui/material';
import { borders } from '@/assets/theme/base/borders';
import { colors } from '@/assets/theme/base/colors';
import { boxShadows } from '@/assets/theme/base/boxShadows';
import { pxToRem } from '@/assets/theme/functions/pxToRem';
import { ColorsRoot } from '@/assets/theme/interfaces/colors';
import { typography } from '@/assets/theme/base/typography';
import { rgba } from '@/assets/theme/functions/rgba';

interface CollapseItemOwnerState {
  active: boolean;
  transparentSidenav: boolean;
}

export function collapseItem(theme: Theme, ownerState: CollapseItemOwnerState) {
  const { transitions, breakpoints } = theme;
  const { active, transparentSidenav } = ownerState;

  const { dark, white, text, transparent } = colors;
  const { xxl } = boxShadows;
  const { borderRadius } = borders;

  return {
    background: active && transparentSidenav ? white.main : transparent.main,
    color: active ? dark.main : text.primary,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: `${pxToRem(10.8)} ${pxToRem(12.8)} ${pxToRem(10.8)} ${pxToRem(
      16
    )}`,
    margin: `0 ${pxToRem(16)}`,
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    boxShadow: active && transparentSidenav ? xxl : 'none',
    [breakpoints.up('xl')]: {
      boxShadow: () => {
        if (active) {
          return transparentSidenav ? xxl : 'none';
        }

        return 'none';
      },
      transition: transitions.create('box-shadow', {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.shorter,
      }),
    },
  };
}

interface CollapseIconBoxOwnerState extends CollapseItemOwnerState {
  sidenavColor:
    | 'default'
    | 'background'
    | 'text'
    | 'transparent'
    | 'white'
    | 'black'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark';
}

export function collapseIconBox(
  theme: Theme,
  ownerState: CollapseIconBoxOwnerState
) {
  const { transitions, breakpoints } = theme;
  const { active, transparentSidenav, sidenavColor } = ownerState;

  const { white, info, light, gradients } = colors;
  const { md } = boxShadows;
  const { borderRadius } = borders;

  return {
    background: () => {
      if (active) {
        return sidenavColor === 'default'
          ? info.main
          : colors[sidenavColor].main;
      }

      return light.main;
    },
    minWidth: pxToRem(32),
    minHeight: pxToRem(32),
    borderRadius: borderRadius.md,
    display: 'grid',
    placeItems: 'center',
    boxShadow: md,
    transition: transitions.create('margin', {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    [breakpoints.up('xl')]: {
      background: () => {
        let background;

        if (!active) {
          background = transparentSidenav ? white.main : light.main;
        } else if (sidenavColor === 'default') {
          background = info.main;
        } else if (sidenavColor === 'warning') {
          background = gradients.warning.main;
        } else {
          background = colors[sidenavColor].main;
        }

        return background;
      },
    },

    '& svg, svg g': {
      fill: active ? white.main : gradients.dark.state,
    },
  };
}

export const collapseIcon = (
  colorsProps: { colors: ColorsRoot },
  { active }: { active?: boolean }
) => {
  const {
    colors: { white, gradients },
  } = colorsProps;
  return {
    color: active ? white.main : gradients.dark.state,
  };
};

interface CollapseTextOwnerState extends CollapseItemOwnerState {
  miniSidenav: boolean;
}

export function collapseText(theme: Theme, ownerState: CollapseTextOwnerState) {
  const { transitions, breakpoints } = theme;
  const { miniSidenav, transparentSidenav, active } = ownerState;

  const { fontWeightMedium, fontWeightRegular, size } = typography;

  return {
    marginLeft: pxToRem(12.8),

    [breakpoints.up('xl')]: {
      opacity: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
      maxWidth: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : '100%',
      marginLeft:
        miniSidenav || (miniSidenav && transparentSidenav) ? 0 : pxToRem(12.8),
      transition: transitions.create(['opacity', 'margin'], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    '& span': {
      fontWeight: active ? fontWeightMedium : fontWeightRegular,
      fontSize: size.sm,
      lineHeight: 0,
    },
  };
}

interface CollapseArrowOwnerState {
  open: boolean;
}

export function collapseArrow(
  theme: Theme,
  ownerState: CollapseArrowOwnerState
) {
  const { transitions, breakpoints } = theme;
  const { open } = ownerState;

  const { dark, gradients } = colors;
  const { size } = typography;

  return {
    fontSize: `${size.md} !important`,
    fontWeight: 700,
    marginBottom: pxToRem(-1),
    transform: open ? 'rotate(0)' : 'rotate(-180deg)',
    color: open ? dark.main : rgba(gradients.dark.state, 0.4),
    transition: transitions.create(['color', 'transform', 'opacity'], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.shorter,
    }),

    [breakpoints.up('xl')]: {
      display: 'block !important',
    },
  };
}
