import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/carts`);
      setCartItems(response.data);
    };

    fetchCartItems();
  }, []);

  // 가격의 총합 계산
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.productsQuantity * item.price);
  }, 0);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/carts/products/${productId}`);
      setCartItems(cartItems.filter(item => item.productId !== productId));
      alert('상품이 장바구니에서 삭제되었습니다.');
    } catch (error) {
      console.error("장바구니 삭제 중 오류 발생: ", error);
      alert('장바구니 삭제 중 오류가 발생했습니다.');
    }
  };

  const handlePurchase = async () => {
    try {
      // 구매 처리 로직 추가
      alert('모든 상품이 구매되었습니다.');
      setCartItems([]); // 장바구니 비우기
    } catch (error) {
      console.error("구매 처리 중 오류 발생: ", error);
      alert('구매 처리 중 오류가 발생했습니다.');
    }
  };

  return (
      <div>
        <h1>장바구니</h1>
        {cartItems.map(item => (
            <div key={item.productId}>
              <p>{item.productName}</p>
              <p>수량: {item.productsQuantity}</p>
              <button onClick={() => handleDelete(item.productId)}>삭제하기</button>
            </div>
        ))}
        <p>총합: {totalPrice}원</p> {/* 가격의 총합 표시 */}
        <button onClick={handlePurchase}>구매하기</button>
      </div>
  );
}

export default CartPage;