import React, { useState, useEffect } from 'react';
import { fetchBasketballGames } from '../../api/gameApi'; // 이 함수는 API 호출을 담당합니다.
import '../../assets/styles/BasketballSchedule.css';
function BasketballSchedule({ selectedDate }) {
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await fetchBasketballGames(selectedDate);
        if (data && data.length > 0) {
          setGames(data);
          setError('');
        } else {
          setError('해당 날짜에 농구 경기가 없습니다.');
        }
      } catch (error) {
        setError('농구 경기 정보를 불러오는데 실패했습니다.');
      }
    };

    fetchGames();
  }, [selectedDate]);

  if (error) {
    return <div>{error}</div>;
  }

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
                  <td className="team-cell">
                    <img src={teams.home.logo} alt={teams.home.name} className="team-logo" />
                    <span className="team-name">{teams.home.name}</span>
                  </td>
                  <td className="score">{scores.home.total} : {scores.away.total}</td>
                  <td className="team-cell">
                    <img src={teams.away.logo} alt={teams.away.name} className="team-logo" />
                    <span className="team-name">{teams.away.name}</span>
                  </td>
                  <td>
                    <div className="quarter-scores-container">
                      <div className="quarter-score">Q1: {scores.home.quarter_1} : {scores.away.quarter_1}</div>
                      <div className="quarter-score">Q2: {scores.home.quarter_2} : {scores.away.quarter_2}</div>
                      <div className="quarter-score">Q3: {scores.home.quarter_3} : {scores.away.quarter_3}</div>
                      <div className="quarter-score">Q4: {scores.home.quarter_4} : {scores.away.quarter_4}</div>
                    </div>
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
