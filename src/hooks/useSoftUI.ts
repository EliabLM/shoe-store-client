import { useContext } from 'react';
import { SoftUIContext } from '@/context/SoftUI/SoftUIContext';

export const useSoftUI = () => {
  const { state, dispatch } = useContext(SoftUIContext);

  // Context module functions
  const setMiniSidenav = (payload: boolean) =>
    dispatch({ type: 'FIXED_NAVBAR', payload });

  const setTransparentSidenav = (payload: boolean) =>
    dispatch({ type: 'TRANSPARENT_SIDENAV', payload });

  const setSidenavColor = (payload: sidenavColor) =>
    dispatch({ type: 'SIDENAV_COLOR', payload });

  const setTransparentNavbar = (payload: boolean) =>
    dispatch({ type: 'TRANSPARENT_NAVBAR', payload });

  const setFixedNavbar = (payload: boolean) =>
    dispatch({ type: 'FIXED_NAVBAR', payload });

  const setOpenConfigurator = (payload: boolean) =>
    dispatch({ type: 'OPEN_CONFIGURATOR', payload });

  const setLayout = (payload: layout) => dispatch({ type: 'LAYOUT', payload });

  return {
    ...state,
    setMiniSidenav,
    setTransparentSidenav,
    setSidenavColor,
    setTransparentNavbar,
    setFixedNavbar,
    setOpenConfigurator,
    setLayout,
  };
};
