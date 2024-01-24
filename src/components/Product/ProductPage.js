import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../assets/styles/ProductPage.css';
function ProductPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`, {
          params: {
            page: currentPage,
            limit: itemsPerPage
          }
        });
        if (response.data) {
          setProducts(response.data.data);
          const totalItemsCount = response.data.totalCount;
          setTotalPages(Math.ceil(totalItemsCount / itemsPerPage)); // 여기서 전체 페이지 수 계산
        }
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, [currentPage]);


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
                  <img src={product.imageUrlList[0]} alt={product.title} />
                </Link>
                <h2>{product.title}</h2>
                <p>{product.content}</p>
                <p>가격: {product.price}원</p>
              </div>
          ))}
        </div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </div>
  );
}
const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  // 페이지네이션 버튼 생성 로직
  return (
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
            <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={currentPage === pageNumber ? 'active' : ''}
            >
              {pageNumber}
            </button>
        ))}
      </div>
  );
};

export default ProductPage;