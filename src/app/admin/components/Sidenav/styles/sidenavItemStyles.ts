import { Theme } from '@mui/material/styles';
import { colors } from '@/assets/theme/base/colors';
import { typography } from '@/assets/theme/base/typography';
import { pxToRem } from '@/assets/theme/functions/pxToRem';
import { rgba } from '@/assets/theme/functions/rgba';

const item = {
  width: '100%',
  padding: 0,
  cursor: 'pointer',
};

interface ItemContentOwnerState {
  active: boolean;
  miniSidenav: boolean;
  name: string;
  nested: boolean;
}

function itemContent(theme: Theme, ownerState: ItemContentOwnerState) {
  const { transitions } = theme;
  const { active, miniSidenav, name, nested } = ownerState;

  const { dark, gradients } = colors;
  const { size, fontWeightMedium, fontWeightRegular } = typography;

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: `${pxToRem(7.2)} ${pxToRem(16)}`,
    margin: `0 ${pxToRem(16)} 0 ${pxToRem(21.6)}`,
    userSelect: 'none',
    position: 'relative',

    '& span': {
      color: active ? dark.main : rgba(gradients.dark.state, 0.7),
      fontWeight: active ? fontWeightMedium : fontWeightRegular,
      fontSize: size.sm,
      opacity: miniSidenav ? 0 : 1,
      transition: transitions.create(['opacity', 'color'], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    '&::before': {
      content: () => {
        if (nested) {
          return nested && miniSidenav && `"${name[0]}"`;
        }

        return miniSidenav ? `"${name[0]}"` : '""';
      },
      width: () => {
        if (!miniSidenav) {
          return active ? pxToRem(8) : pxToRem(5);
        }

        return 0;
      },
      height: () => {
        if (!miniSidenav) {
          return active ? pxToRem(8) : pxToRem(5);
        }

        return 0;
      },
      backgroundColor: active ? dark.main : rgba(gradients.dark.state, 0.5),
      color: active ? dark.main : rgba(gradients.dark.state, 0.5),
      fontWeight: active ? fontWeightMedium : fontWeightRegular,
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      left: pxToRem(-18),
      opacity: 1,
      borderRadius: '50%',
      fontSize: size.sm,
    },
  };
}

interface ItemArrowOwnerState {
  open: boolean;
  miniSidenav: boolean;
}

function itemArrow(theme: Theme, ownerState: ItemArrowOwnerState) {
  const { transitions } = theme;
  const { open, miniSidenav } = ownerState;

  const { dark, gradients } = colors;
  const { size } = typography;

  return {
    fontSize: `${size.md} !important`,
    fontWeight: 700,
    marginRight: pxToRem(-2.5),
    transform: () => {
      if (open) {
        return miniSidenav
          ? `translateX(${pxToRem(-24)}) rotate(0)`
          : 'rotate(0)';
      }

      return miniSidenav
        ? `translateX(${pxToRem(-24)}) rotate(-180deg)`
        : 'rotate(-180deg)';
    },
    color: open ? dark.main : rgba(gradients.dark.state, 0.4),
    transition: transitions.create(['color', 'transform'], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.shorter,
    }),
  };
}

export { item, itemContent, itemArrow };
