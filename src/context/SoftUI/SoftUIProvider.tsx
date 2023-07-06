import { useMemo, useReducer } from 'react';
import { SoftUIContext } from './SoftUIContext';
import { softUIReducer } from './softUIReducer';
import { UIState } from '@/interfaces/interfaces';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: UIState = {
  miniSidenav: false,
  transparentSidenav: true,
  sidenavColor: 'info',
  transparentNavbar: true,
  fixedNavbar: true,
  openConfigurator: false,
};

export const SoftUIProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(softUIReducer, INITIAL_STATE);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <SoftUIContext.Provider value={value}>{children}</SoftUIContext.Provider>
  );
};
