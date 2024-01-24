import React, {useEffect, useState} from 'react';
import {fetchGamesByDate} from '../../api/gameApi';
import {useNavigate} from 'react-router-dom';
import Calendar from '../Calendar/Calendar';
import '../../assets/styles/FootballSchedule.css';

function BaseballSchedule() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const allGames = await fetchGamesByDate(formattedDate);
        const baseballGames = allGames.filter(game => game.sportsType === "MLB"); // 야구 경기만 필터링
        setGames(baseballGames || []);
        setError('');
      } catch (error) {
        setGames([]);
        setError('야구 경기 정보를 불러오는데 실패했습니다.');
      }
    };

    fetchData();
  }, [selectedDate]);
  // 경기 클릭 핸들러
  const handleGameClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  return (
      <div>
        <h2>야구 경기 일정</h2>
        <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
        {error && <div>{error}</div>}
        {games.length === 0 && !error && <div>해당 날짜에 야구 경기가 없습니다.</div>}
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

export default BaseballSchedule;