import React from 'react';

function Navigation() {
  return (
      <nav>
        <ul>
          <li>
            <a href="#calendar">경기 일정</a>
            <ul id="sports-dropdown" className="dropdown-content">
              <li><a href="#football">축구</a></li>
              <li><a href="#basketball">농구</a></li>
              <li><a href="#baseball">야구</a></li>
            </ul>
          </li>
          <li>
            <a href="#comment">응원 댓글</a>
            <ul id="comment-dropdown" className="dropdown-content">
              <li><a href="#commentfootball">축구</a></li>
              <li><a href="#commentbasketball">농구</a></li>
              <li><a href="#commentbaseball">야구</a></li>
            </ul>
          </li>
          <li><a href="#shop">상품 구매</a></li>
          <li><a href="#deals">핫 딜</a></li>
        </ul>
      </nav>
  );
}

export default Navigation;
