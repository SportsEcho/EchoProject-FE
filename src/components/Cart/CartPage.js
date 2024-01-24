import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          alert('로그인이 필요합니다.');
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/carts`, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setCartItems(response.data.data); // 응답 구조에 맞게 수정
      } catch (error) {
        console.error("장바구니 정보 조회 중 오류 발생: ", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const authToken = localStorage.getItem('authToken');
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/carts/products/${productId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setCartItems(cartItems.filter(item => item.id !== productId)); // 'id'로 변경
      alert('상품이 장바구니에서 삭제되었습니다.');
    } catch (error) {
      console.error("장바구니 삭제 중 오류 발생: ", error);
      alert('장바구니 삭제 중 오류가 발생했습니다.');
    }
  };
  const handleGoToOrder = () => {
    navigate('/order'); // 주문 페이지로 이동
  };
  const totalPrice = cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);

  if (!cartItems.length) return <div>장바구니가 비어있습니다.</div>;

  return (
      <div>
        <h1>장바구니</h1>
        {cartItems.map(item => (
            <div key={item.id}>
              {item.imageUrlList && item.imageUrlList.length > 0 && (
                  <img src={item.imageUrlList[0]} alt={item.title} style={{ width: '50px', height: '50px' }} />
              )}
              <p>{item.title}</p>
              <p>수량: {item.quantity}</p>
              <p>가격: {item.price}원</p>
              <button onClick={() => handleDelete(item.id)}>삭제하기</button> {/* 'item.id' 사용 */}
            </div>
        ))}
        <p>총합: {totalPrice}원</p>
        <button onClick={handleGoToOrder}>구매하기</button>
      </div>
  );
}

export default CartPage;