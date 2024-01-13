import React, { useState, useEffect } from 'react';
import FootballSchedule from './GameSchedule/FootballSchedule';
import BasketballSchedule from './GameSchedule/BasketballSchedule';
import BaseballSchedule from './GameSchedule/BaseballSchedule';
import { fetchFootballGames, fetchBasketballGames, fetchBaseballGames } from '../api/gameApi';

function MainPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [footballGames, setFootballGames] = useState([]);
  const [basketballGames, setBasketballGames] = useState([]);
  const [baseballGames, setBaseballGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const footballData = await fetchFootballGames(selectedDate);
      setFootballGames(footballData);
      const basketballData = await fetchBasketballGames(selectedDate);
      setBasketballGames(basketballData);
      const baseballData = await fetchBaseballGames(selectedDate);
      setBaseballGames(baseballData);
    };

    fetchData();
  }, [selectedDate]);

  return (
      <div>
        <FootballSchedule games={footballGames} />
        <BasketballSchedule games={basketballGames} />
        <BaseballSchedule games={baseballGames} />
      </div>
  );
}

export default MainPage;