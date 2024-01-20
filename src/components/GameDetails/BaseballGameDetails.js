import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBaseballGameDetails } from '../../api/gameApi';

function BaseballGameDetails() {
  const { gameId } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchBaseballGameDetails(gameId);
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

  const { fixture, teams, scores } = gameDetails; // 예시 데이터 구조, 실제 구조에 따라 변경 필요
  const matchTime = new Date(fixture.date).toLocaleString();

  return (
      <div>
        <h1>Baseball Game Details</h1>
        <div className="game-details-container">
          <h2>{`${teams.home.name} vs ${teams.away.name}`}</h2>
          <p>시간: {matchTime}</p>
          <p>장소: {fixture.venue.name}</p>
          <p>점수: {scores.home} - {scores.away}</p>
          {/* 여기에 추가적인 세부 정보를 표시 */}
        </div>
      </div>
  );
}

export default BaseballGameDetails;
