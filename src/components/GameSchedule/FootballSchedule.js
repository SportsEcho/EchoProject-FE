import React, { useState, useEffect } from 'react';
import { fetchFootballGames } from '../../api/gameApi';

function FootballSchedule({ selectedDate }) {
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const footballData = await fetchFootballGames(selectedDate);
        if (footballData && footballData.length > 0) {
          setGames(footballData);
          setError('');
        } else {
          setError('해당 날짜에 축구 경기가 없습니다.');
        }
      } catch (error) {
        setError('축구 경기 정보를 불러오는데 실패했습니다.');
      }
    };

    fetchGames();
  }, [selectedDate]);

  if (error) {
    return <div>{error}</div>;
  }
  return (
      <div>
        <h2>축구 경기 일정</h2>
        <table>
          <thead>
          <tr>
            <th>시간</th>
            <th>홈 팀</th>
            <th>점수</th>
            <th>어웨이 팀</th>
            <th>장소</th>
          </tr>
          </thead>
          <tbody>
          {games.map((game, index) => {
            const { fixture, teams, goals } = game;
            const matchTime = new Date(fixture.date).toLocaleTimeString();
            return (
                <tr key={index}>
                  <td>{matchTime}</td>
                  <td>
                    <img src={teams.home.logo} alt={teams.home.name} />
                    {teams.home.name}
                  </td>
                  <td>{goals.home} : {goals.away}</td>
                  <td>
                    <img src={teams.away.logo} alt={teams.away.name} />
                    {teams.away.name}
                  </td>
                  <td>{fixture.venue.name || 'TBC'}</td>
                </tr>
            );
          })}
          </tbody>
        </table>
      </div>
  );
}

export default FootballSchedule;