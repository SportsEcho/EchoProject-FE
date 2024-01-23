import React, {useState} from 'react';
import axios from 'axios';
import '../assets/styles/signup.css';
import naverIcon from '../assets/images/btnG_아이콘원형.png';
import kakaoIcon from '../assets/images/kakao원형.png';
import {useNavigate} from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const validateInput = (email, password) => {
    const emailRegex = /^[a-zA-Z0-9_]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~@#$%^&+=!])(?=\\S+$).{8,15}$/;

    if (!emailRegex.test(email)) {
      return "유효하지 않은 이메일 형식입니다.";
    }
    if (!passwordRegex.test(password)) {
      return "비밀번호는 8~15자리, 대소문자, 숫자, 특수문자를 포함해야 합니다.";
    }
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    const email = event.target.email.value;
    const password = event.target.password.value;
    const memberName = event.target.memberName.value;

    const validationError = validateInput(email, password);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const data = { email, password, memberName };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/members/signup`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 201) {
        alert('회원가입이 완료되었습니다!');
        navigate('/login');
      }
    } catch (error) {
      const errorResponse = error.response?.data?.message || '회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.';
      setErrorMessage(errorResponse);
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
                {/*<div className="mb-2">*/}
                {/*  <a href={`https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_API_KEY}&redirect_uri=${process.env.REACT_APP_API_BASE_DNS}/api/members/google/callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`}>*/}
                {/*    <img src={googleIcon} className="login-icon" alt="Google Login" />*/}
                {/*  </a>*/}
                {/*</div>*/}
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
                <div className="form-group">
                  <input type="text" className="form-control" name="memberName" placeholder="멤버 이름" required />
                </div>
                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
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
