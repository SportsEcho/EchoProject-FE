import React, { useState, useEffect } from 'react';
import { fetchFootballGames, fetchBasketballGames, fetchBaseballGames } from './api'; // API 호출 함수를 별도의 파일로 분리하여 임포트

function GamesSchedule({ selectedDate }) {
  const [footballGames, setFootballGames] = useState([]);
  const [basketballGames, setBasketballGames] = useState([]);
  const [baseballGames, setBaseballGames] = useState([]);

  useEffect(() => {
    // 축구 경기 정보 불러오기
    fetchFootballGames(selectedDate).then(data => {
      setFootballGames(data.fixtures); // API 응답 구조에 따라 수정 필요
    });
    // 농구 경기 정보 불러오기
    fetchBasketballGames(selectedDate).then(data => {
      setBasketballGames(data.games); // API 응답 구조에 따라 수정 필요
    });
    // 야구 경기 정보 불러오기
    fetchBaseballGames(selectedDate).then(data => {
      setBaseballGames(data.games); // API 응답 구조에 따라 수정 필요
    });
  }, [selectedDate]);

  // 경기 정보를 하나의 배열로 합치기 (예시 코드, 실제 구조에 따라 조정 필요)
  const allGames = [...footballGames, ...basketballGames, ...baseballGames];

  return (
      <div>
        <h2>경기 일정</h2>
        <table>
          <thead>
          <tr>
            <th>시간</th>
            <th>홈 팀</th>
            <th>스코어</th>
            <th>어웨이 팀</th>
            <th>장소</th>
          </tr>
          </thead>
          <tbody>
          {allGames.map((game, index) => (
              <tr key={index}>
                <td>{game.time}</td>
                <td>
                  <img src={game.homeTeam.logo} alt={game.homeTeam.name} />
                  {game.homeTeam.name}
                </td>
                <td>{game.homeTeam.score} : {game.awayTeam.score}</td>
                <td>
                  <img src={game.awayTeam.logo} alt={game.awayTeam.name} />
                  {game.awayTeam.name}
                </td>
                <td>{game.venue}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

export default GamesSchedule;
