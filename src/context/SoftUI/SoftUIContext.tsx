import { Dispatch, createContext } from 'react';
import { UIActions } from './softUIReducer';

export type SoftUIContextProps = {
  state: UIState;
  dispatch: Dispatch<UIActions>;
};

export const SoftUIContext = createContext<SoftUIContextProps>(
  {} as SoftUIContextProps
);
