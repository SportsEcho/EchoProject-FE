import React, { useState, useEffect } from 'react';
import { fetchBaseballGames } from '../../api/gameApi'; // 이 함수는 API 호출을 담당합니다.

function BaseballSchedule({ selectedDate }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // 야구 경기 정보 불러오기
    const fetchGames = async () => {
      try {
        const data = await fetchBaseballGames(selectedDate);
        setGames(data.response); // API 응답 구조에 따라 수정 필요
      } catch (error) {
        console.error('Error fetching baseball data:', error);
      }
    };

    fetchGames();
  }, [selectedDate]);

  // API 응답으로부터 경기 정보를 표로 표시합니다.
  return (
      <div>
        <h2>야구 경기 일정</h2>
        <table>
          <thead>
          <tr>
            <th>시간</th>
            <th>홈 팀</th>
            <th>어웨이 팀</th>
            <th>이닝별 점수</th>
          </tr>
          </thead>
          <tbody>
          {games.map((game, index) => {
            const { teams, scores, date } = game;
            const matchTime = new Date(date).toLocaleTimeString();
            const homeTeamInnings = scores.home.innings;
            const awayTeamInnings = scores.away.innings;

            // 이닝별 점수를 표현하기 위한 함수
            const renderInnings = (innings) => {
              return Object.keys(innings).map((inning) => (
                  <span key={inning}>{`${inning}: ${innings[inning]} `}</span>
              ));
            };

            return (
                <tr key={index}>
                  <td>{matchTime}</td>
                  <td>
                    <img src={teams.home.logo} alt={teams.home.name} />
                    {teams.home.name}
                  </td>
                  <td>
                    <img src={teams.away.logo} alt={teams.away.name} />
                    {teams.away.name}
                  </td>
                  <td>
                    <div>홈: {renderInnings(homeTeamInnings)}</div>
                    <div>어웨이: {renderInnings(awayTeamInnings)}</div>
                  </td>
                </tr>
            );
          })}
          </tbody>
        </table>
      </div>
  );
}

export default BaseballSchedule;
