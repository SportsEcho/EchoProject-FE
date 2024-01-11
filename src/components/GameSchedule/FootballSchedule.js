// FootballSchedule.js
import React, { useState, useEffect } from 'react';
import { fetchFootballGames } from '../../api/gameApi'; // 이 함수는 API 호출을 담당합니다.

function FootballSchedule({ selectedDate }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const footballData = await fetchFootballGames(selectedDate);
        setGames(footballData); // API에서 가져온 경기 정보를 상태로 저장
      } catch (error) {
        console.error('Error fetching football data:', error);
      }
    };

    fetchGames();
  }, [selectedDate]);

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