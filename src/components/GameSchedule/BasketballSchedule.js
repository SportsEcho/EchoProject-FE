import React, { useState, useEffect } from 'react';
import { fetchBasketballGames } from '../../api/gameApi'; // 이 함수는 API 호출을 담당합니다.

function BasketballSchedule({ selectedDate }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // 농구 경기 정보 불러오기
    const fetchGames = async () => {
      try {
        const data = await fetchBasketballGames(selectedDate);
        setGames(data.response); // API 응답 구조에 따라 수정 필요
      } catch (error) {
        console.error('Error fetching basketball data:', error);
      }
    };

    fetchGames();
  }, [selectedDate]);

  // API 응답으로부터 경기 정보를 표로 표시합니다.
  return (
      <div>
        <h2>농구 경기 일정</h2>
        <table>
          <thead>
          <tr>
            <th>시간</th>
            <th>홈 팀</th>
            <th>점수</th>
            <th>어웨이 팀</th>
            <th>쿼터별 점수</th>
          </tr>
          </thead>
          <tbody>
          {games.map((game, index) => {
            const { teams, scores } = game;
            const matchTime = new Date(game.date).toLocaleTimeString();
            return (
                <tr key={index}>
                  <td>{matchTime}</td>
                  <td>
                    <img src={teams.home.logo} alt={teams.home.name} />
                    {teams.home.name}
                  </td>
                  <td>{scores.home.total} : {scores.away.total}</td>
                  <td>
                    <img src={teams.away.logo} alt={teams.away.name} />
                    {teams.away.name}
                  </td>
                  <td>
                    {scores.home.quarter_1} : {scores.away.quarter_1},
                    {scores.home.quarter_2} : {scores.away.quarter_2},
                    {scores.home.quarter_3} : {scores.away.quarter_3},
                    {scores.home.quarter_4} : {scores.away.quarter_4}
                  </td>
                </tr>
            );
          })}
          </tbody>
        </table>
      </div>
  );
}

export default BasketballSchedule;
