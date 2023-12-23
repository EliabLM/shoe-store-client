import React, { useEffect, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { SET_USER } from './authActions';

// Utils
import {
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
} from 'utils/handleSessionStorage';

const INITIAL_STATE = {
  user: null,
};

const SESSION_KEYS = {
  user: 'user',
  accessToken: 'accessToken',
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  const authenticateUser = () => {
    const userInfo = getSessionStorage({ key: SESSION_KEYS.user });

    if (userInfo) {
      setUser({ user: userInfo });

      return;
    }

    logout();
  };

  const setUser = ({ user }) => {
    dispatch({ type: SET_USER, payload: user });

    setSessionStorage({ key: SESSION_KEYS.user, value: user });
  };

  const logout = () => {
    dispatch({ type: SET_USER, payload: null });

    removeSessionStorage({ key: SESSION_KEYS.user });
  };

  const values = useMemo(() => ({ ...state, setUser, logout }), [state]);

  useEffect(() => {
    authenticateUser();
  }, []);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
