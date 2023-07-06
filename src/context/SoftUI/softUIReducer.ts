import { SidenavColor, UIState } from '@/interfaces/interfaces';

export type UIActions =
  | { type: 'MINI_SIDENAV'; payload: boolean }
  | { type: 'TRANSPARENT_SIDENAV'; payload: boolean }
  | { type: 'SIDENAV_COLOR'; payload: SidenavColor }
  | { type: 'TRANSPARENT_NAVBAR'; payload: boolean }
  | { type: 'FIXED_NAVBAR'; payload: boolean }
  | { type: 'OPEN_CONFIGURATOR'; payload: boolean };

export const softUIReducer = (state: UIState, action: UIActions): UIState => {
  switch (action.type) {
    case 'MINI_SIDENAV':
      return { ...state, miniSidenav: action.payload };
    case 'TRANSPARENT_SIDENAV': {
      return { ...state, transparentSidenav: action.payload };
    }
    case 'SIDENAV_COLOR': {
      return { ...state, sidenavColor: action.payload };
    }
    case 'TRANSPARENT_NAVBAR': {
      return { ...state, transparentNavbar: action.payload };
    }
    case 'FIXED_NAVBAR': {
      return { ...state, fixedNavbar: action.payload };
    }
    case 'OPEN_CONFIGURATOR': {
      return { ...state, openConfigurator: action.payload };
    }
    default:
      return state;
  }
};
