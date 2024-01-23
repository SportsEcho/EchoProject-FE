import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect } from 'react';

const NaverRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const code = new URL(window.location.href).searchParams.get("code");

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/members/naver/callback?code=${code}`);

        if (response.status === 200) {
          const authToken = response.headers.authorization || response.headers.Authorization;
          const refreshToken = response.headers.refreshauthorization || response.headers.Refreshauthorization;

          // 로컬 스토리지에 토큰 저장
          if (authToken) {
            localStorage.setItem('authToken', authToken.split(' ')[1]); // 'Bearer '을 제거하고 토큰만 저장
          }
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken.split(' ')[1]); // 'Bearer '을 제거하고 토큰만 저장
          }

          // 메인 페이지로 리디렉션
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [navigate]);

  return <div>로그인 중입니다.</div>;
};

export default NaverRedirect;
