import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../assets/styles/ProductPage.css';


function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handlePurchase = async (product) => {
    try {
      // 백엔드 서버에 구매 요청을 보냅니다.
      const response = await axios.post('http://your-backend-server.com/purchase', {
        productId: product.id,
        // 기타 필요한 정보
      });

      console.log("구매 완료: ", response.data);
      alert(`${product.name} 구매가 완료되었습니다.`);
    } catch (error) {
      console.error("구매 처리 중 오류 발생: ", error);
      alert('구매 처리 중 오류가 발생했습니다.');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
      <div>
        <h1>{product.name}</h1>
        <img src={product.imageUrl} alt={product.name} />
        <p>{product.description}</p>
        <p>가격: {product.price}원</p>
        <button onClick={() => handlePurchase(product)}>구매하기</button>
      </div>
  );
}

export default ProductDetailPage;

