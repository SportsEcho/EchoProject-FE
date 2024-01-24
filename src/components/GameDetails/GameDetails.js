import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFootballGameDetails } from '../../api/gameApi';
import GameChat from '../GameChat/GameChat';
import '../../assets/styles/GameDetails.css';

function FootballGameDetails() {
  const { gameId } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchFootballGameDetails(gameId);
        setGameDetails(data);
      } catch (error) {
        console.error('경기 세부 정보를 불러오는데 실패했습니다.', error);
      } finally {
        setLoading(false); // 데이터를 받아온 후 로딩 상태를 false로 설정
      }
    };

    fetchDetails();
  }, [gameId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!gameDetails) {
    return <div>경기 세부 정보를 불러올 수 없습니다.</div>;
  }
  
  const matchTime = new Date(gameDetails.date).toLocaleTimeString();

  return (
      <div className='game-details'>
        <h1>Game Details</h1>
        <div className="game-details-container-info">
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
              <tr style={{ cursor: 'pointer' }}>
                <td>{matchTime}</td>
                <td>
                  <img src={gameDetails.homeTeamLogo} alt={gameDetails.homeTeamName} className="schedule-logo" />
                  {gameDetails.homeTeamName}
                </td>
                <td>{gameDetails.homeGoal} : {gameDetails.awayGoal}</td>
                <td>
                  <img src={gameDetails.awayTeamLogo} alt={gameDetails.awayTeamName} className="schedule-logo" />
                  {gameDetails.awayTeamName}
                </td>
                <td>{gameDetails.venueName}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='game-details-container-gamechat'>
          <GameChat gameId={gameId} />
        </div>
      </div>
  );
}

export default FootballGameDetails;