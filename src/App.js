import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Calendar from './components/Calendar/Calendar';
import './assets/styles/index.css';
import FootballSchedule from './components/GameSchedule/FootballSchedule';
import BasketballSchedule from './components/GameSchedule/BasketballSchedule';
import BaseballSchedule from './components/GameSchedule/BaseballSchedule';
import MainPage from "./components/MainPage";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
      <Router>
        <div>
          <Header />
          <Navigation/>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/football" element={<FootballSchedule selectedDate={selectedDate} />} />
            <Route path="/basketball" element={<BasketballSchedule selectedDate={selectedDate} />} />
            <Route path="/baseball" element={<BaseballSchedule selectedDate={selectedDate} />} />
            {/* 다른 경로들을 여기에 추가 */}
          </Routes>
          <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
          <Footer />
        </div>
      </Router>
  );
}

export default App;