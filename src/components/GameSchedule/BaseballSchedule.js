import React, { useState, useEffect } from 'react';
import { fetchBaseballGames } from '../../api/gameApi';
import { useNavigate } from 'react-router-dom';
import Calendar from '../Calendar/Calendar';
import '../../assets/styles/BaseballSchedule.css';

function BaseballSchedule() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const data = await fetchBaseballGames(formattedDate);
        if (data && data.length > 0) {
          setGames(data);
          setError('');
        } else {
          setGames([]); // 경기가 없으면 게임 리스트를 비웁니다.
          setError('해당 날짜에 야구 경기가 없습니다.');
        }
      } catch (error) {
        setGames([]); // 에러가 발생하면 게임 리스트를 비웁니다.
        setError('야구 경기 정보를 불러오는데 실패했습니다.');
      }
    };

    fetchData();
  }, [selectedDate]);

  // 경기 클릭 핸들러
  const handleGameClick = (gameId) => {
    navigate(`/baseball/games/${gameId}`);
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
            <th>어웨이 팀</th>
            <th>이닝별 점수</th>
          </tr>
          </thead>
          <tbody>
          {games.map((game, index) => {
            const { teams, scores, date, id } = game; // 게임 ID 추가
            const matchTime = new Date(date).toLocaleTimeString();

            return (
                <tr key={index} onClick={() => handleGameClick(id)} style={{ cursor: 'pointer' }}>
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