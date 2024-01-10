import React from 'react';
import logo from '../assets/images/EchoLogo.jpeg';
import shoppingCart from '../assets/images/shopping-cart.png';
import userImage from '../assets/images/IMG_1851.JPG';

function Header() {
  return (
      <header>
        <div id="logo">
          <img src={logo} alt="EchoSports Logo" />
        </div>
        <h1>EchoSports</h1>
        <div id="user-profile">
          <img src={shoppingCart} alt="Shopping Cart" />
          <img src={userImage} alt="User Profile" />
        </div>
      </header>
  );
}

export default Header;
