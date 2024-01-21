import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import './assets/styles/index.css';
import FootballSchedule from './components/GameSchedule/FootballSchedule';
import BasketballSchedule from './components/GameSchedule/BasketballSchedule';
import BaseballSchedule from './components/GameSchedule/BaseballSchedule';
import MainPage from "./components/MainPage";
import Login from './components/Login';
import Signup from "./components/Signup";
import FootballCommentsPage from './components/Comment/FootballCommentsPage';
import BasketballCommentsPage
  from "./components/Comment/BasketballCommentsPage";
import BaseballCommentsPage from "./components/Comment/BaseballCommentsPage";
import AddProductPage from "./components/Product/AddProductPage";
import ProductDetailPage from "./components/Product/ProductDetailPage";
import ProductPage from "./components/Product/ProductPage";
import AddHotdeal from "./components/Hotdeal/AddHotdeal";
import HotdealDetail from "./components/Hotdeal/HotdealDetail";
import HotdealList from "./components/Hotdeal/HotdealList";
import CartPage from "./components/Cart/CartPage";
import FootballGameDetails from './components/GameDetails/FootballGameDetails';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
      <Router>
        <div>
          <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          <Navigation />
          <Routes>
            <Route path="/" element={<MainPage selectedDate={selectedDate} setSelectedDate={setSelectedDate} />} />
            <Route path="/football" element={<FootballSchedule selectedDate={selectedDate.toISOString().split('T')[0]} />} />
            <Route path="/basketball" element={<BasketballSchedule selectedDate={selectedDate.toISOString().split('T')[0]} />} />
            <Route path="/baseball" element={<BaseballSchedule selectedDate={selectedDate.toISOString().split('T')[0]} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/comments/football" element={<FootballCommentsPage />} />
            <Route path="/comments/basketball" element={<BasketballCommentsPage />} />
            <Route path="/comments/baseball" element={<BaseballCommentsPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:productId" element={<ProductDetailPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/hotdeals" element={<HotdealList />} />
            <Route path="/hotdeals/:hotdealId" element={<HotdealDetail />} />
            <Route path="/add-hotdeal" element={<AddHotdeal />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/games/:gameId" element={<FootballGameDetails />} />
          </Routes>
          <Footer />
        </div>
      </Router>
  );
}

export default App;