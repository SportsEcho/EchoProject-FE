import React from 'react';
import '../assets/styles/signup.css'; // 별도로 스타일링을 위한 CSS 파일
import googleIcon from '../assets/images/web_light_rd_na@2x.png';
import naverIcon from '../assets/images/btnG_아이콘원형.png';
import kakaoIcon from '../assets/images/kakao원형.png';
import { useNavigate } from 'react-router-dom';
function Signup() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login'); // login 페이지로 이동
  };

  return (
      <div className="gradient-custom d-flex vh-100 justify-content-center align-items-center">
        <div className="container-fluid row justify-content-center align-content-center">
          <div className="card bg-dark text-center" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-5" style={{ textAlign: 'center' }}>
              <h2 className="text-white" style={{ marginBottom: '20px' }}>SIGN UP</h2>
              <p className="text-white-50 mt-2 mb-5" style={{ marginBottom: '20px' }}>서비스 사용을 위해 회원 가입 해주세요!</p>

              <div className="icon-container mb-4">
                {/* Google, Naver, Kakao 인증 링크 */}
                <div className="mb-2">
                  <a href="https://accounts.google.com/o/oauth2/auth?client_id=...&redirect_uri=...&response_type=code&scope=...">
                    <img src={googleIcon} className="login-icon" alt="Google Signup" />
                  </a>
                </div>
                <div className="mb-2">
                  <a href="https://nid.naver.com/oauth2.0/authorize?client_id=...&redirect_uri=...&response_type=code">
                    <img src={naverIcon} className="login-icon" alt="Naver Signup" />
                  </a>
                </div>
                <div className="mb-2">
                  <a href="https://kauth.kakao.com/oauth/authorize?client_id=...&redirect_uri=...&response_type=code">
                    <img src={kakaoIcon} className="login-icon" alt="Kakao Signup" />
                  </a>
                </div>
              </div>

              {/* 회원가입 양식 */}
              <form action="/api/signup" method="POST">
                <div className="form-group">
                  <input type="email" className="form-control" name="email" placeholder="이메일 주소" required />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" name="password" placeholder="비밀번호" required />
                </div>
                {/* 추가적인 필드는 여기에 포함 */}
                <button type="submit" className="btn btn-primary btn-block">가입하기</button>
                <button className="btn btn-secondary btn-block mt-2" onClick={handleBackToLogin}>돌아가기</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Signup;