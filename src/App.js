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
          </Routes>
          <Footer />
        </div>
      </Router>
  );
}

export default App;