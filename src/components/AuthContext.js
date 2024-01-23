import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));

  const login = (newAuthToken, newRefreshToken) => {
    localStorage.setItem('authToken', newAuthToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    setAuthToken(newAuthToken);
    setRefreshToken(newRefreshToken);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    setAuthToken(null);
    setRefreshToken(null);
  };

  return (
      <AuthContext.Provider value={{ authToken, refreshToken, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};