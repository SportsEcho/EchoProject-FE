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
        console.log(response.data); // 디버깅을 위한 로그
      } catch (error) {
        console.error("Error fetching purchase history", error);
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
                <p>총 금액: {purchase.totalPrice}원</p>
                {purchase.purchaseProductList && purchase.purchaseProductList.length > 0 ? (
                    <ul>
                      {purchase.purchaseProductList.map(product => (
                          <li key={product.id}>
                            <p>상품명: {product.title}</p>
                            <p>수량: {product.productsQuantity}</p>
                            <p>가격: {product.price}원</p>
                          </li>
                      ))}
                    </ul>
                ) : (
                    <p>주문된 상품이 없습니다.</p>
                )}
              </li>
          ))}
        </ul>
      </div>
  );
}

export default PurchaseHistoryPage;