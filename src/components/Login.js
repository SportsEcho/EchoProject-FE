import React from 'react';
import axios from 'axios';
import '../assets/styles/login.css';
import googleIcon from '../assets/images/web_light_rd_na@2x.png';
import naverIcon from '../assets/images/btnG_아이콘원형.png';
import kakaoIcon from '../assets/images/kakao원형.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const data = { email, password };

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/members/login`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('로그인이 완료되었습니다! 환영합니다!');
      navigate('/'); // 로그인 성공 시 메인 페이지로 이동
    } catch (error) {
      console.error("Login error", error);
      alert('로그인 중 오류가 발생했습니다. 이메일과 비밀번호를 확인해 주세요.');
    }
  };

  return (
      <div className="gradient-custom d-flex vh-100 justify-content-center align-items-center">
        <div className="container-fluid row justify-content-center align-content-center">
          <div className="card bg-dark text-center" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-5" style={{ textAlign: 'center' }}>
              <h2 className="text-white">LOGIN</h2>
              <p className="text-white-50 mt-2 mb-5">서비스 사용을 위해 로그인을 해주세요!</p>

              <div className="icon-container mb-4">
                {/* Google 로그인 링크 */}
                <div className="mb-2">
                  <a href={`https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_API_KEY}&redirect_uri=${process.env.REACT_APP_API_BASE_URL}/api/members/google/callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`}>
                    <img src={googleIcon} className="login-icon" alt="Google Login" />
                  </a>
                </div>
                {/* Naver 로그인 링크 */}
                <div className="mb-2">
                  <a href={`https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_NAVER_API_KEY}&redirect_uri=${process.env.REACT_APP_API_BASE_URL}/api/members/naver/callback&response_type=code`}>
                    <img src={naverIcon} className="login-icon" alt="Naver Login" />
                  </a>
                </div>
                {/* Kakao 로그인 링크 */}
                <div className="mb-2">
                  <a href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_API_BASE_URL}/api/members/kakao/callback&response_type=code`}>
                    <img src={kakaoIcon} className="login-icon" alt="Kakao Login" />
                  </a>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input type="email" className="form-control" name="email" placeholder="이메일 주소" required />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" name="password" placeholder="비밀번호" required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">로그인하기</button>
              </form>
              <button type="button" className="btn btn-secondary btn-block mt-2" onClick={handleSignupClick}>회원가입</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Login;
