import React, { useState, useEffect } from 'react';
import { fetchFootballGames } from '../../api/gameApi';
import '../../assets/styles/FootballSchedule.css';
import Calendar from "../Calendar/Calendar";

function FootballSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const footballData = await fetchFootballGames(selectedDate.toISOString().split('T')[0]);
        setGames(footballData || []);
        setError('');
      } catch (error) {
        setGames([]); // Clear previous games
        setError('축구 경기 정보를 불러오는데 실패했습니다.');
      }
    };

    fetchGames();
  }, [selectedDate]);

  return (
      <div>
        <h2>축구 경기 일정</h2>
        <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
        {error && <div>{error}</div>}
        {games.length === 0 && !error && <div>해당 날짜에 축구 경기가 없습니다.</div>}
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
                  <td className="team-cell">
                    <img src={teams.home.logo} alt={teams.home.name} className="schedule-logo" />
                    <span className="team-name">{teams.home.name}</span>
                  </td>
                  <td className="score">{goals.home} : {goals.away}</td>
                  <td className="team-cell">
                    <img src={teams.away.logo} alt={teams.away.name} className="schedule-logo" />
                    <span className="team-name">{teams.away.name}</span>
                  </td>
                  <td className="venue-name">{fixture.venue.name || 'TBC'}</td>
                </tr>
            );
          })}
          </tbody>
        </table>
      </div>
  );
}

export default FootballSchedule;