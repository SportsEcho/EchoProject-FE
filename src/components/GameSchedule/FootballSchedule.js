import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../assets/styles/FootballSchedule.css';
import Calendar from "../Calendar/Calendar";
import {fetchGamesByDate} from "../../api/gameApi";

function FootballSchedule() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const allGames = await fetchGamesByDate(formattedDate);
        const footballGames = allGames.filter(game => game.sports_type === 0); // 축구 경기만 필터링
        setGames(footballGames);
        setError('');
      } catch (error) {
        setGames([]);
        setError('축구 경기 정보를 불러오는데 실패했습니다.');
      }
    };

    fetchGamesData();
  }, [selectedDate]);


  // 경기 상세 페이지로 이동하는 함수
  const handleGameClick = (gameId) => {
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
