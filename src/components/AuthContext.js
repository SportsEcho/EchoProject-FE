import React, {createContext, useContext, useEffect, useState} from 'react';

// AuthContext 생성
const AuthContext = createContext(null);

// 컨텍스트를 사용하기 위한 커스텀 훅
export const useAuth = () => useContext(AuthContext);

// AuthProvider 컴포넌트 정의
export const AuthProvider = ({ children }) => {
  // 로컬 스토리지에서 인증 토큰들을 읽어와서 상태에 저장
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));

  // 로그인 함수
  const login = (newAuthToken, newRefreshToken) => {
    localStorage.setItem('authToken', newAuthToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    setAuthToken(newAuthToken);
    setRefreshToken(newRefreshToken);
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    setAuthToken(null);
    setRefreshToken(null);
  };
  useEffect(() => {
    const handleStorageChange = () => {
      setAuthToken(localStorage.getItem('authToken'));
      setRefreshToken(localStorage.getItem('refreshToken'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  // 컨텍스트 프로바이더를 사용하여 children 렌더링
  return (
      <AuthContext.Provider value={{ authToken, refreshToken, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};