import { Theme } from '@mui/material';

import { colors } from '@/assets/theme/base/colors';
import { borders } from '@/assets/theme/base/borders';
import { linearGradient } from '@/assets/theme/functions/linearGradient';

export function menuItem(theme: Theme) {
  const { palette, transitions } = theme;

  const { secondary } = palette;
  const { light } = colors;
  const { borderRadius } = borders;

  return {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    color: secondary.main,
    py: 1,
    px: 2,
    borderRadius: borderRadius.md,
    transition: transitions.create('background-color', {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    '&:not(:last-child)': {
      mb: 1.25,
    },

    '&:hover': {
      backgroundColor: light.main,
    },
  };
}

interface Props {
  color: keyof Gradients;
}

type Gradient = { main: string; state: string };

interface Gradients {
  primary: Gradient;
  secondary: Gradient;
  success: Gradient;
  warning: Gradient;
  error: Gradient;
  light: Gradient;
  dark: Gradient;
}

export function menuImage(ownerState: Props) {
  const { color } = ownerState;
  const { gradients } = colors;
  const { borderRadius } = borders;

  return {
    display: 'grid',
    placeItems: 'center',
    backgroundImage: Boolean(gradients[color])
      ? linearGradient(gradients[color].main, gradients[color].state)
      : linearGradient(gradients.dark.main, gradients.dark.state),

    '& img': {
      width: '100%',
      borderRadius: borderRadius.lg,
    },
  };
}
