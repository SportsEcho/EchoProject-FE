import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../assets/styles/ProductPage.css';
import { throttle } from 'lodash';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const itemsPerPage = 20;
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(async (page) => {
    setIsLoading(true);
    try {
      const headers = {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
        'If-Modified-Since': '0'
      };
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`, {
        params: {
          page: page,
          limit: itemsPerPage
        },
        headers
      });
      return response.data.data || [];
    } catch (error) {
      setError('상품을 불러오는 데 실패했습니다.');
      console.error("Error fetching products", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(currentPage).then(newProducts => {
      setProducts(prevProducts => [...prevProducts, ...newProducts]);
      setHasMore(newProducts.length === itemsPerPage);
    });
  }, [currentPage, fetchProducts]);

// 스크롤 이벤트 핸들러
  const handleScroll = useCallback(throttle(() => {
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight || isLoading || !hasMore) {
      return;
    }
    setCurrentPage(prevPage => prevPage + 1);
  }, 200), [isLoading, hasMore]); //200ms 간격으로 이벤트를 처리

  useEffect(() => {
    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);

    return () => {
      // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (error) {
    return <div>{error}</div>;
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
                  <img src={product.imageUrlList[0]} alt={product.title} />
                </Link>
                <h2>{product.title}</h2>
                <p>{product.content}</p>
                <p>가격: {product.price}원</p>
              </div>
          ))}
          {isLoading && <div>Loading more products...</div>}
        </div>
      </div>
  );
}

export default ProductPage;