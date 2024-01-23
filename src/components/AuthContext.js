import React, { createContext, useContext, useState } from 'react';

// Context 생성
const AuthContext = createContext();

// Context를 사용하기 위한 커스텀 훅
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider 컴포넌트
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 변경 함수
  const login = () => {
    setIsLoggedIn(true);
  };

  // 로그아웃 상태 변경 함수
  const logout = () => {
    setIsLoggedIn(false);
  };

  // Context 값 제공
  return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
}
