import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFootballGameDetails } from '../../api/gameApi';

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

  const { fixture, teams, goals, venue } = gameDetails;
  const matchTime = new Date(fixture.date).toLocaleString();

  return (
      <div>
        <h1>Game Details</h1>
        <div className="game-details-container">
          <h2>{`${teams.home.name} vs ${teams.away.name}`}</h2>
          <p>시간: {matchTime}</p>
          <p>장소: {venue.name}</p>
          <p>점수: {goals.home} - {goals.away}</p>
        </div>
      </div>
  );
}

export default FootballGameDetails;