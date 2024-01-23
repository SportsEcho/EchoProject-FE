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
        setProduct(response.data.data); // 데이터 구조에 맞게 수정
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) {
      alert('상품 정보를 불러오는 중입니다.');
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/carts/products/${product.id}`,
          { productsQuantity: 1 },
          { headers: { Authorization: `Bearer ${authToken}` } }
      );
      alert(`${product.title}이(가) 장바구니에 추가되었습니다.`);
    } catch (error) {
      console.error("장바구니 추가 중 오류 발생: ", error);
      alert('장바구니 추가 중 오류가 발생했습니다.');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
      <div>
        <h1>{product.title}</h1>
        <img src={product.imageUrlList[0]} alt={product.title} />
        <p>{product.content}</p>
        <p>가격: {product.price}원</p>
        <button onClick={handleAddToCart}>장바구니에 추가</button>
      </div>
  );
}

export default ProductDetailPage;
