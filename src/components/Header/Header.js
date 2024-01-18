import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import logo from '../../assets/images/EchoLogo.jpeg';
import shoppingCart from '../../assets/images/shopping-cart.png';
import '../../assets/styles/index.css';
import axios from 'axios';

function Header({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      await axios.post('${process.env.REACT_APP_API_BASE_URL}/api/members/logout');
      handleLogout(); // 상태 업데이트 및 UI 변경
      navigate('/'); // 로그아웃 후 리다이렉트
    } catch (error) {
      console.error('Logout error:', error);
      alert('로그아웃 중 문제가 발생했습니다. 다시 시도해 주세요.'); // 사용자에게 에러 알림
    }
  };

  return (
      <header>
        <div id="logo">
          <img src={logo} alt="EchoSports Logo" />
        </div>
        <h1>EchoSports</h1>
        <div id="user-profile">
          <img src={shoppingCart} alt="Shopping Cart" />
          {isLoggedIn ? (
              <button onClick={handleLogoutClick}>로그아웃</button>
          ) : (
              <Link to="/login">로그인</Link>
          )}
        </div>
      </header>
  );
}

export default Header;