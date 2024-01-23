import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/EchoLogo.jpeg';
import shoppingCart from '../../assets/images/shopping-cart.png';
import '../../assets/styles/index.css';
import axios from 'axios';
import { useAuth } from '../AuthContext';

function Header() {
  const navigate = useNavigate();
  const { authToken, logout } = useAuth();

  const handleLogoutClick = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/members/logout`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken,
          'RefreshAuthorization': 'Bearer ' + localStorage.getItem('refreshToken'),
        }
      });
      logout(); // AuthContext의 logout 함수를 호출하여 로그아웃 처리
      navigate('/');
    } catch (error) {
      console.error("Logout error", error);
      logout(); // 오류 발생 시에도 로그아웃 처리
      navigate('/login');
    }
  };

  const handleCartClick = () => {
    navigate('/cart'); // 장바구니 페이지로 이동
  };

  return (
      <header>
        // ... (기타 코드)
        <div id="user-profile">
          <img src={shoppingCart} alt="Shopping Cart" onClick={handleCartClick} />
          {authToken ? (
              <button onClick={handleLogoutClick}>로그아웃</button>
          ) : (
              <Link to="/login">로그인</Link>
          )}
        </div>
      </header>
  );
}

export default Header;