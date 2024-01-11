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
        <Calendar onDateChange={setSelectedDate} />
        <FootballSchedule footballGames={footballGames} />
        <BasketballSchedule basketballGames={basketballGames} />
        <BaseballSchedule baseballGames={baseballGames} />

        <Footer />
      </div>
  );
}

export default App;
