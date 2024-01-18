import React from 'react';
import axios from 'axios';
import '../assets/styles/signup.css';
import googleIcon from '../assets/images/web_light_rd_na@2x.png';
import naverIcon from '../assets/images/btnG_아이콘원형.png';
import kakaoIcon from '../assets/images/kakao원형.png';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await axios.post('http://43.202.64.138:8080/api/members/signup', formData);
      alert('회원가입이 완료되었습니다!'); // 성공 알림
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message); // 서버에서 제공하는 오류 메시지
      } else {
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };



  return (
      <div className="gradient-custom d-flex vh-100 justify-content-center align-items-center">
        <div className="container-fluid row justify-content-center align-content-center">
          <div className="card bg-dark text-center" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-5" style={{ textAlign: 'center' }}>
              <h2 className="text-white">SIGN UP</h2>
              <p className="text-white-50 mt-2 mb-5">서비스 사용을 위해 회원 가입 해주세요!</p>

              <div className="icon-container mb-4">
                {/* Google 로그인 링크 */}
                <div className="mb-2">
                  <a href={`https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:8080/api/members/google/callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`}>
                    <img src={googleIcon} className="login-icon" alt="Google Login" />
                  </a>
                </div>
                {/* Naver 로그인 링크 */}
                <div className="mb-2">
                  <a href={`https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=http://localhost:8080/api/members/naver/callback&response_type=code`}>
                    <img src={naverIcon} className="login-icon" alt="Naver Login" />
                  </a>
                </div>
                {/* Kakao 로그인 링크 */}
                <div className="mb-2">
                  <a href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=http://localhost:8080/api/members/kakao/callback&response_type=code`}>
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
                <button type="submit" className="btn btn-primary btn-block">가입하기</button>
              </form>
              <button className="btn btn-secondary btn-block mt-2" onClick={handleBackToLogin}>돌아가기</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Signup;
