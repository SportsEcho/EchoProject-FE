import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

const KakaoRedirect = async () => {  

    const code = new URL(window.location.href).searchParams.get("code");

    const navigate = useNavigate();
  
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/members/kakao/callback?code=${code}`);

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
    } catch(error) {
        console.log(error);
    }
      
    return <div>로그인 중입니다.</div>;
  };
  
  export default KakaoRedirect;