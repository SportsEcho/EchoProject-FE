import React, { useState } from 'react';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Calendar from './components/Calendar';
import GamesSchedule from './components/GamesSchedule';
import './assets/styles/index.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
      <div>
        <Header />
        <Navigation />
        <Calendar onDateChange={setSelectedDate} />
        <GamesSchedule selectedDate={selectedDate.toISOString().split('T')[0]} />
        <Footer />
      </div>
  );
}

export default App;
