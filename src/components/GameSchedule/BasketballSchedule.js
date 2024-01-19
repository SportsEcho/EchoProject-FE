import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBasketballGames } from '../../api/gameApi';
import '../../assets/styles/BasketballSchedule.css';
import Calendar from "../Calendar/Calendar";

function BasketballSchedule() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await fetchBasketballGames(selectedDate.toISOString().split('T')[0]);
        setGames(data || []);
        setError('');
      } catch (error) {
        setGames([]);
        setError('농구 경기 정보를 불러오는데 실패했습니다.');
      }
    };

    fetchGames();
  }, [selectedDate]);

  const handleGameClick = (gameId) => {
    navigate(`/basketball/games/${gameId}`);
  };

  return (
      <div>
        <h2>농구 경기 일정</h2>
        <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
        {error && <div>{error}</div>}
        {games.length === 0 && !error && <div>해당 날짜에 농구 경기가 없습니다.</div>}
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
                <tr key={index} onClick={() => handleGameClick(game.id)} style={{ cursor: 'pointer' }}>
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
