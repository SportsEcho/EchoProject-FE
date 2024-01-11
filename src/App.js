import React, { useState ,useEffect} from 'react';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Calendar from './components/Calender/Calendar';
import './assets/styles/index.css';
import FootballSchedule from './components/GameSchedule/FootballSchedule';
import BasketballSchedule from './components/GameSchedule/BasketballSchedule';
import BaseballSchedule from './components/GameSchedule/BaseballSchedule';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
      <div>
        <Header />
        <Navigation />
        <Calendar selectedDate={selectedDate} onDateChange={(date) => setSelectedDate(date)} />
        <FootballSchedule selectedDate={selectedDate.toISOString().split('T')[0]} />
        <BasketballSchedule selectedDate={selectedDate.toISOString().split('T')[0]} />
        <BaseballSchedule selectedDate={selectedDate.toISOString().split('T')[0]} />
        <Footer />
      </div>
  );
}

export default App;
