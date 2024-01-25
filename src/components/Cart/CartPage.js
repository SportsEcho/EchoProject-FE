import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/carts`, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("장바구니 정보 조회 중 오류 발생: ", error);
      }
    };

    fetchCartItems();
  }, [navigate]);

  const handleDelete = async (memberProductId) => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/carts/products/${memberProductId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      if (response.status === 204) { // 상태 코드 204가 반환되면 성공
        setCartItems(cartItems.filter(item => item.memberProductId !== memberProductId));
        alert('상품이 장바구니에서 삭제되었습니다.');
      } else {
        alert('상품 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error("장바구니 삭제 중 오류 발생: ", error);
      alert('장바구니 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteAll = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/carts`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      if (response.status === 204) { // 상태 코드 204가 반환되면 성공
        setCartItems([]);
        alert('장바구니가 비워졌습니다.');
      } else {
        alert('장바구니 비우기에 실패했습니다.');
      }
    } catch (error) {
      console.error("전체 장바구니 삭제 중 오류 발생: ", error);
      alert('장바구니 전체 삭제 중 오류가 발생했습니다.');
    }
  };
  const handleGoToOrder = () => {
    navigate('/order');
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const quantity = Number(item.productsQuantity) || 0;
    const price = Number(item.price) || 0;
    return total + (quantity * price);
  }, 0);

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
              <p>수량: {item.productsQuantity}</p>
              <p>가격: {item.price}원</p>
              <button onClick={() => handleDelete(item.memberProductId)}>삭제하기</button>
            </div>
        ))}
        <button onClick={handleDeleteAll}>장바구니 비우기</button>
        <p>총합: {totalPrice}원</p>
        <button onClick={handleGoToOrder}>구매하기</button>
      </div>
  );
}

export default CartPage;