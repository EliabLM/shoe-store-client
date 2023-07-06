import { createTheme } from '@mui/material';

import { colors } from './base/colors';
import { breakpoints } from './base/breakpoints';
import { typography } from './base/typography';
import { globals } from './base/globals';
import { borders } from './base/borders';

import { pxToRem } from './functions/pxToRem';
import { rgba } from './functions/rgba';

import divider from '../components/divider';

const { white, transparent } = colors;
const { borderRadius } = borders;

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
    MuiList: {
      styleOverrides: {
        padding: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiListItem: {
      defaultProps: {
        disableGutters: true,
      },

      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0,
        },
      },
    },
    MuiDivider: { ...divider },
    MuiDrawer: {
      styleOverrides: {
        root: {
          width: pxToRem(250),
          whiteSpace: 'nowrap',
          border: 'none',
        },

        paper: {
          width: pxToRem(250),
          backgroundColor: rgba(white.main, 0.8),
          backdropFilter: `saturate(200%) blur(${pxToRem(30)})`,
          height: `calc(100vh - ${pxToRem(32)})`,
          margin: pxToRem(16),
          borderRadius: borderRadius.xl,
          border: 'none',
        },

        paperAnchorDockedLeft: {
          borderRight: 'none',
        },
      },
    },
    MuiIcon: {
      defaultProps: {
        baseClassName: 'material-icons-round',
        fontSize: 'inherit',
      },

      styleOverrides: {
        fontSizeInherit: {
          fontSize: 'inherit !important',
        },

        fontSizeSmall: {
          fontSize: `${pxToRem(20)} !important`,
        },

        fontSizeLarge: {
          fontSize: `${pxToRem(36)} !important`,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: transparent.main,
          },
        },
      },
    },
  },
});
