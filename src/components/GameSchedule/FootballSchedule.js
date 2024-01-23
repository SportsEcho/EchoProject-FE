import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFootballGames } from '../../api/gameApi';
import '../../assets/styles/FootballSchedule.css';
import Calendar from "../Calendar/Calendar";

function FootballSchedule() {
  const navigate = useNavigate();
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
        setGames([]);
        setError('축구 경기 정보를 불러오는데 실패했습니다.');
      }
    };

    fetchGames();
  }, [selectedDate]);

  // 경기 상세 페이지로 이동하는 함수
  const handleGameClick = (gameId) => {
    //login 정보 확인 후 로그인 안되어있으면 로그인 페이지로 이동

    

    navigate(`/games/${gameId}`);
  };

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
            const matchTime = new Date(game.date).toLocaleTimeString();
            return (
                <tr key={index} onClick={() => handleGameClick(game.id)} style={{ cursor: 'pointer' }}>
                  <td>{matchTime}</td>
                  <td>
                    <img src={game.homeTeamLogo} alt={game.homeTeamName} className="schedule-logo" />
                    {game.homeTeamName}
                  </td>
                  <td>{game.homeGoal} : {game.awayGoal}</td>
                  <td>
                    <img src={game.awayTeamLogo} alt={game.awayTeamName} className="schedule-logo" />
                    {game.awayTeamName}
                  </td>
                  <td>{game.venueName}</td>
                </tr>
            );
          })}
          </tbody>
        </table>
      </div>
  );
}

export default FootballSchedule;
