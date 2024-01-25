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
  const [searchTerm, setSearchTerm] = useState('');
  // 정렬 관련 상태 삭제
  // const [sortOrder, setSortOrder] = useState('');

  const fetchProducts = useCallback(async (page, keyword = '') => {
    setIsLoading(true);
    try {
      const params = {
        page: page,
        size: itemsPerPage,
        keyword: keyword, // 'keyword' 파라미터 사용
      };
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`, { params });
      const newProducts = response.data || [];
      if (newProducts.length < itemsPerPage) {
        setHasMore(false);
      }
      return newProducts;
    } catch (error) {
      setError('상품을 불러오는 데 실패했습니다.');
      console.error("Error fetching products", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [itemsPerPage, searchTerm]);

  useEffect(() => {
    fetchProducts(currentPage, searchTerm).then(newProducts => {
      setProducts(prevProducts => [...prevProducts, ...newProducts]);
    });
  }, [currentPage, searchTerm, fetchProducts]);

  useEffect(() => {
    const throttledHandleScroll = throttle(() => {
      if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight || isLoading || !hasMore) {
        return;
      }
      setCurrentPage(prevPage => prevPage + 1);
    }, 200);

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      throttledHandleScroll.cancel();
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [isLoading, hasMore]);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchProducts(1, searchTerm);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
      <div className="product-page">
        <h1>상품 목록</h1>
        <div className="search-and-sort-container">
          <div className="search-container">
            <input
                type="text"
                placeholder="상품 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
            />
            <button onClick={() => fetchProducts(1, searchTerm)}>검색</button>
          </div>
          {/*<div className="sort-container">*/}
          {/*  <select onChange={(e) => setSortOrder(e.target.value)}>*/}
          {/*    <option value="">정렬</option>*/}
          {/*    <option value="price_high">가격 높은순</option>*/}
          {/*    <option value="price_low">가격 낮은순</option>*/}
          {/*  </select>*/}
          {/*</div>*/}
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