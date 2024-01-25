import React, { useState, useEffect } from 'react';
import FootballSchedule from './GameSchedule/FootballSchedule';
import BasketballSchedule from './GameSchedule/BasketballSchedule';
import BaseballSchedule from './GameSchedule/BaseballSchedule';
import { fetchGamesByDate } from '../api/gameApi';

function MainPage({ selectedDate }) {
  const [footballGames, setFootballGames] = useState([]);
  const [basketballGames, setBasketballGames] = useState([]);
  const [baseballGames, setBaseballGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const games = await fetchGamesByDate(formattedDate);
        // 필터링하여 각 스포츠별 게임을 설정합니다.
        setFootballGames(games.filter(game => game.sports_type === 0));
        setBasketballGames(games.filter(game => game.sports_type === 1));
        setBaseballGames(games.filter(game => game.sports_type === 2));
      } catch (error) {
        console.error("Error fetching games data:", error);
      }
    };

    fetchData();
  }, [selectedDate]);

  return (
      <div>
        <h1>경기 일정</h1>
        <h3>(경기를 클릭시 실시간 채팅으로 이동!!)</h3>
        <FootballSchedule games={footballGames} selectedDate={selectedDate.toISOString().split('T')[0]} />
        <BasketballSchedule games={basketballGames} selectedDate={selectedDate.toISOString().split('T')[0]} />
        <BaseballSchedule games={baseballGames} selectedDate={selectedDate.toISOString().split('T')[0]} />
      </div>
  );
}

export default MainPage;
