import React, { useState, useEffect } from 'react';
import { fetchBaseballGames } from '../../api/gameApi'; // 이 함수는 API 호출을 담당합니다.

function BaseballSchedule({ selectedDate }) {
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await fetchBaseballGames(selectedDate);
        if (data && data.length > 0) {
          setGames(data);
          setError('');
        } else {
          setError('해당 날짜에 야구 경기가 없습니다.');
        }
      } catch (error) {
        setError('야구 경기 정보를 불러오는데 실패했습니다.');
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

            // 이닝별 점수와 총점을 계산하는 함수
            const renderInnings = (innings) => {
              if (!innings || typeof innings !== 'object') {
                return '이닝 정보가 없습니다';
              }

              const inningsScores = Object.entries(innings).map(([inning, score], index) => (
                  <span key={index} className="inning-score">{inning}회: {score || '-'}</span>
              ));
              // 총점 계산
              const totalScore = Object.values(innings).reduce((acc, score) => acc + (Number(score) || 0), 0);
              inningsScores.push(<span key="total" className="total-score">합계: {totalScore}</span>);

              return inningsScores;
            };

            return (
                <tr key={index}>
                  <td>{matchTime}</td>
                  <td>
                    <div className="team-cell">
                      <img src={teams.home.logo} alt={teams.home.name} className="schedule-logo" />
                      <span className="team-name">{teams.home.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="team-cell">
                      <img src={teams.away.logo} alt={teams.away.name} className="schedule-logo" />
                      <span className="team-name">{teams.away.name}</span>
                    </div>
                  </td>
                  <td className="inning-scores">
                    <div>{renderInnings(scores.home.innings)}</div>
                    <div>{renderInnings(scores.away.innings)}</div>
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
