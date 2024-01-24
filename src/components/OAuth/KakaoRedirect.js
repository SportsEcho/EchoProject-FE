import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect } from 'react';
import {useAuth} from "../AuthContext";

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const code = new URL(window.location.href).searchParams.get("code");

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/members/kakao/callback?code=${code}`);

        if (response.status === 200) {
          const authToken = response.headers.authorization || response.headers.Authorization;
          const refreshToken = response.headers.refreshauthorization || response.headers.Refreshauthorization;

          // 로컬 스토리지에 토큰 저장
          if (authToken && refreshToken) {
            login(authToken.split(' ')[1], refreshToken.split(' ')[1]); // 로그인 상태 업데이트
          }
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [navigate,login]);

  return <div>로그인 중입니다.</div>;
};

export default KakaoRedirect;
