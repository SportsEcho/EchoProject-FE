import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
      <div><h1>{product.name}</h1>
        <img src={product.imageUrl} alt={product.name} />
        <p>{product.description}</p>
        <p>가격: {product.price}원</p>
        <button onClick={() => handlePurchase(product)}>구매하기</button>
      </div>
  );
}

import axios from 'axios';

const handlePurchase = async (product) => {
  try {
    // 백엔드 서버에 구매 요청을 보냅니다.
    // 이 부분은 실제 백엔드 API의 URL과 요청 구조에 따라 달라질 수 있습니다.
    const response = await axios.post('http://your-backend-server.com/purchase', {
      productId: product.id,
      // 기타 필요한 정보 (예: 구매 수량, 사용자 정보 등)
    });

    // 요청이 성공적으로 처리된 경우
    console.log("구매 완료: ", response.data);
    alert(`${product.name} 구매가 완료되었습니다.`);
  } catch (error) {
    // 에러 처리
    console.error("구매 처리 중 오류 발생: ", error);
    alert('구매 처리 중 오류가 발생했습니다.');
  }
};
export default ProductDetailPage;


