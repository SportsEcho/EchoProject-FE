import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBasketballGameDetails } from '../../api/gameApi';

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

  // 데이터 구조가 농구에 특화된 정보를 반영하도록 조정합니다.
  const { fixture, teams, scores } = gameDetails;
  const matchTime = new Date(fixture.date).toLocaleString();

  return (
      <div>
        <h1>Basketball Game Details</h1>
        <div className="game-details-container">
          <h2>{`${teams.home.name} vs ${teams.away.name}`}</h2>
          <p>시간: {matchTime}</p>
          <p>장소: {fixture.venue.name}</p>
          <p>최종 점수: {scores.home.total} - {scores.away.total}</p>
          <div className="quarter-scores-container">
            <div className="quarter-score">Q1: {scores.home.quarter_1} - {scores.away.quarter_1}</div>
            <div className="quarter-score">Q2: {scores.home.quarter_2} - {scores.away.quarter_2}</div>
            <div className="quarter-score">Q3: {scores.home.quarter_3} - {scores.away.quarter_3}</div>
            <div className="quarter-score">Q4: {scores.home.quarter_4} - {scores.away.quarter_4}</div>
          </div>
        </div>
      </div>
  );
}

export default BasketballGameDetails;