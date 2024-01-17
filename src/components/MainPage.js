import React, { useEffect } from 'react';
import FootballSchedule from './GameSchedule/FootballSchedule';
import BasketballSchedule from './GameSchedule/BasketballSchedule';
import BaseballSchedule from './GameSchedule/BaseballSchedule';
import { fetchFootballGames, fetchBasketballGames, fetchBaseballGames } from '../api/gameApi';


function MainPage({ selectedDate, setSelectedDate }) {
  // const [footballGames, setFootballGames] = useState([]);
  // const [basketballGames, setBasketballGames] = useState([]);
  // const [baseballGames, setBaseballGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 여기서 setFootballGames, setBasketballGames, setBaseballGames를 호출합니다.
        await fetchFootballGames(selectedDate);
        await fetchBasketballGames(selectedDate);
        await fetchBaseballGames(selectedDate);
      } catch (error) {
        console.error("Error fetching games data:", error);
      }
    };

    fetchData();
  }, [selectedDate]);

  return (
      <div>
        <h1>경기 일정</h1>
        <FootballSchedule selectedDate={selectedDate.toISOString().split('T')[0]} />
        <BasketballSchedule selectedDate={selectedDate.toISOString().split('T')[0]} />
        <BaseballSchedule selectedDate={selectedDate.toISOString().split('T')[0]} />
      </div>
  );
}

export default MainPage;