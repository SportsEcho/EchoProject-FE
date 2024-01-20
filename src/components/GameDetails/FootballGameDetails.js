import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFootballGameDetails } from '../../api/gameApi';
import GameChat from '../GameChat/GameChat';

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

  console.log("check ");

  return (
      <div>
        <h1>Game Details</h1>
        <div className="game-details-container">
          <h2>{`${gameDetails.homeTeamName} vs ${gameDetails.awayTeamName}`}</h2>
          <p>시간: {matchTime}</p>
          <p>장소: {gameDetails.venueName}</p>
          <p>점수: {gameDetails.homeGoal} - {gameDetails.awayGoal}</p>
        </div>
        <GameChat />
      </div>
  );
}

export default FootballGameDetails;