import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

function PurchaseHistoryPage() {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/purchase`, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setPurchaseHistory(response.data);
      } catch (error) {
        console.error("Error fetching purchase history", error);
        // 오류 처리
      }
    };

    fetchPurchaseHistory();
  }, [authToken]);

  return (
      <div>
        <h1>구매 내역</h1>
        <ul>
          {purchaseHistory.map(purchase => (
              <li key={purchase.id}>
                <p>주문 번호: {purchase.id}</p>
                <p>총 금액: {purchase.totalPrice}</p>
                {/* 필요한 추가 정보 표시 */}
              </li>
          ))}
        </ul>
      </div>
  );
}

export default PurchaseHistoryPage;