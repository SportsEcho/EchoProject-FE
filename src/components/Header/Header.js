import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/EchoLogo.jpeg';
import shoppingCart from '../../assets/images/shopping-cart.png';
import '../../assets/styles/index.css';

function Header({ isLoggedIn, handleLogout }) {
  return (
      <header>
        <div id="logo">
          <img src={logo} alt="EchoSports Logo" />
        </div>
        <h1>EchoSports</h1>
        <div id="user-profile">
          <img src={shoppingCart} alt="Shopping Cart" />
          {isLoggedIn ? (
              <button onClick={handleLogout}>로그아웃</button>
          ) : (
              <Link to="/login">로그인</Link>
          )}
        </div>
      </header>
  );
}

export default Header;
