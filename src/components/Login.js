import React from 'react';
import '../assets/styles/login.css'; // 로그인 페이지 스타일
import googleIcon from '../assets/images/web_light_rd_na@2x.png';
import naverIcon from '../assets/images/btnG_아이콘원형.png';
import kakaoIcon from '../assets/images/kakao원형.png';

function Login() {
  return (
      <div className="gradient-custom d-flex vh-100 justify-content-center align-items-center"> {/* 여기에 스타일 추가 */}
        <div className="container-fluid row justify-content-center align-content-center">
          <div className="card bg-dark text-center" style={{ borderRadius: '1rem' }}> {/* text-center 추가 */}
            <div className="card-body p-5" style={{ textAlign: 'center' }}>
            <h2 className="text-white" style={{ marginBottom: '20px' }}>LOGIN</h2>
<p className="text-white-50 mt-2 mb-5" style={{ marginBottom: '20px' }}>서비스 사용을 위해 로그인을 해주세요!</p>

              <div className="icon-container mb-4">
                {/* Google 로그인 링크 */}
                <div className="mb-2">
                  <a href="https://accounts.google.com/o/oauth2/auth?client_id=...&redirect_uri=...&response_type=code&scope=...">
                    <img src={googleIcon} className="login-icon" alt="Google Login" />
                  </a>
                </div>
                {/* Naver 로그인 링크 */}
                <div className="mb-2">
                  <a href="https://nid.naver.com/oauth2.0/authorize?client_id=...&redirect_uri=...&response_type=code">
                    <img src={naverIcon} className="login-icon" alt="Naver Login" />
                  </a>
                </div>
                {/* Kakao 로그인 링크 */}
                <div className="mb-2">
                  <a href="https://kauth.kakao.com/oauth/authorize?client_id=...&redirect_uri=...&response_type=code">
                    <img src={kakaoIcon} className="login-icon" alt="Kakao Login" />
                  </a>
                </div>
              </div>

              {/* 이메일 및 패스워드 로그인 양식 */}
              <form action="/api/login" method="POST">
                <div className="form-group">
                  <input type="email" className="form-control" name="username" placeholder="이메일 주소" required />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" name="password" placeholder="비밀번호" required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">로그인하기</button>
                <button type="button" className="btn btn-secondary btn-block mt-2">회원가입</button> {/* 회원가입 버튼 추가 */}
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}
export default Login;