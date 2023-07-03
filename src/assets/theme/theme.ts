import { createTheme } from '@mui/material';

import { colors } from './base/colors';
import { breakpoints } from './base/breakpoints';
import { typography } from './base/typography';
import { globals } from './base/globals';

import { pxToRem } from './functions/pxToRem';

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { mode: 'light', ...colors },
  typography: {
    ...typography,
    button: {
      fontFamily: typography.fontFamily,
      fontSize: pxToRem(12),
      fontWeight: typography.fontWeightBold,
      lineHeight: 1.5,
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
      },
    },
  },
});
