import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function HotdealDetail() {
  const { hotdealId } = useParams();
  const [hotdeal, setHotdeal] = useState(null);

  useEffect(() => {
    const fetchHotdeal = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/hotdeals/${hotdealId}`);
        setHotdeal(response.data);
      } catch (error) {
        console.error('Error fetching hotdeal:', error);
      }
    };

    fetchHotdeal();
  }, [hotdealId]);

  const handlePurchase = async () => {
    try {
      // 핫딜 구매 요청을 보내는 로직
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/hotdeals/${hotdealId}/purchase`, {
        // 필요한 데이터를 전송
      });

      alert('핫딜 구매가 완료되었습니다.');
    } catch (error) {
      console.error('구매 중 오류 발생:', error);
      alert('구매 처리 중 오류가 발생했습니다.');
    }
  };

  if (!hotdeal) return <div>Loading...</div>;

  return (
      <div>
        <h1>{hotdeal.title}</h1>
        <p>{hotdeal.description}</p>
        <p>{hotdeal.sale}% 할인</p>
        <button onClick={handlePurchase}>바로 구매하기</button>
        {/* 추가적인 핫딜 정보 표시 */}
      </div>
  );
}

export default HotdealDetail;