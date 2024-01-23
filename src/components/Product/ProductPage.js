import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../../assets/styles/ProductPage.css';

function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          // response.data.data가 배열이 아닐 경우, 적절한 처리
          console.error("Received data is not an array:", response.data.data);
        }
      } catch (error) {
        console.error("Error fetching products", error);
        // 에러 발생 시 전체 응답 로깅
        console.error("Response data:", error.response.data);
      }
    };

    fetchProducts();
  }, []);

  // 데이터가 배열이 아니면 렌더링하지 않음
  if (!Array.isArray(products)) {
    return <div>Loading or error...</div>;
  }

  return (
      <div className="product-page">
        <h1>상품 목록</h1>
        <div className="add-button-container">
        <Link to="/add-product" className="btn btn-primary">상품 추가</Link>
        </div>
        <div className="product-list">
          {products.map(product => (
              <div key={product.id} className="product">
                <Link to={`/products/${product.id}`}>
                  {/* 이미지 URL 수정 */}
                  <img src={product.imageUrlList[0]} alt={product.title} />
                </Link>
                {/* 제목 및 내용 참조 수정 */}
                <h2>{product.title}</h2>
                <p>{product.content}</p>
                <p>가격: {product.price}원</p>
              </div>
          ))}
        </div>
      </div>
  );
}

export default ProductPage;
