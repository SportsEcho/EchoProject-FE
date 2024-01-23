import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBasketballGameDetails } from '../../api/gameApi';
import '../../assets/styles/GameDetails.css';
import GameChat from "../GameChat/GameChat";

function BasketballGameDetails() {
  const { gameId } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchBasketballGameDetails(gameId);
        setGameDetails(data);
      } catch (error) {
        console.error('경기 세부 정보를 불러오는데 실패했습니다.', error);
      } finally {
        setLoading(false);
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
        <h1>Basketball Game Details</h1>
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

export default BasketballGameDetails;
