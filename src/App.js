import React from 'react';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Calendar from './components/Calender/Calendar';
import './assets/styles/index.css';

function App() {
  return (
      <div>
        <Header />
        <Navigation />
        <Calendar />
        {/* 여기에 경기 일정을 표시하는 컴포넌트를 추가 */}
        <Footer />
      </div>
  );
}

export default App;