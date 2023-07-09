import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { SET_USER } from './authActions';

const INITIAL_STATE = {
  user: null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  const setUser = ({ user }) => {
    dispatch({ type: SET_USER, payload: user });
  };

  const logout = () => {
    dispatch({ type: SET_USER, payload: null });
  };

  return (
    <AuthContext.Provider value={{ ...state, setUser, logout }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
