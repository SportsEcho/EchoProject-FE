import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import logo from '../../assets/images/EchoLogo.jpeg';
import shoppingCart from '../../assets/images/shopping-cart.png';
import '../../assets/styles/index.css';
import axios from 'axios';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 토큰 확인
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogoutClick = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/members/logout`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
          'RefreshAuthorization': 'Bearer ' + localStorage.getItem('refreshToken'),
        }
      });

      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      if(error.response.status == 401) {
        alert('접속시간이 만료되었습니다. 다시 로그인 해주세요.');
      
        setIsLoggedIn(false);
        navigate('/login');
      }
    }

    // 로그아웃 성공, 토큰만료 시 토큰 삭제 및 상태 업데이트
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  };
  const handleCartClick = () => {
    navigate('/cart'); // 장바구니 페이지로 이동
  };

  return (
      <header>
        <div id="logo">
          <img src={logo} alt="EchoSports Logo" />
        </div>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>EchoSports</h1>
        </Link>
        <div id="user-profile">
          <img src={shoppingCart} alt="Shopping Cart" onClick={handleCartClick} />
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