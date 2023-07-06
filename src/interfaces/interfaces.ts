import { SvgIconProps } from '@mui/material';

export type SidenavColor = 'info' | 'white';

export interface UIState {
  miniSidenav: boolean;
  transparentSidenav: boolean;
  sidenavColor: SidenavColor;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
}

export interface CustomIconProps extends Omit<SvgIconProps, 'color'> {
  color?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'dark'
    | 'light'
    | 'white';
  size?: string;
}
