import React from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Navigation({ selectedDate, onDateChange }) {
  console.log("Rendering Navigation");

  return (
      <nav>
        <ul>
          <li>
            <Link to="/">오늘의 경기</Link>
            <ul id="sports-dropdown" className="dropdown-content">
              <li><Link to="/football">축구</Link></li>
              <li><Link to="/basketball">농구</Link></li>
              <li><Link to="/baseball">야구</Link></li>
            </ul>
          </li>
          <li>
            <a href="#comment">응원 댓글</a>
            <ul id="comment-dropdown" className="dropdown-content">
              <li><Link to="/comments/football">축구</Link></li>
              <li><Link to="/comments/basketball">농구</Link></li>
              <li><Link to="/comments/baseball">야구</Link></li>
            </ul>
          </li>
          <li><a href="#shop">상품 구매</a></li>
          <li><a href="#deals">핫 딜</a></li>
        </ul>
      </nav>
  );
}

export default Navigation;
