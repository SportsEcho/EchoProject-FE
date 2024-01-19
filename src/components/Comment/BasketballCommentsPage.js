import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/comment.css';

function BasketballCommentsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // 로그인 상태 확인
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);

    // 경기 목록 불러오기
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/games`);
      setGames(response.data);
    } catch (error) {
      console.error('경기 목록을 불러오는데 실패했습니다.', error);
    }
  };

  const fetchComments = async (gameId, token) => {
    if (!gameId) return;
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/games/${gameId}/comments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setComments(response.data);
    } catch (error) {
      console.error('댓글을 불러오는데 실패했습니다.', error);
    }
  };

  const handleGameSelect = (e) => {
    const gameId = e.target.value;
    setSelectedGameId(gameId);
    const token = localStorage.getItem('authToken');
    fetchComments(gameId, token);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/games/${selectedGameId}/comments`, { content: newComment }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNewComment('');
      fetchComments(selectedGameId, token); // 댓글 목록 갱신
    } catch (error) {
      console.error('댓글 작성에 실패했습니다.', error);
    }
  };

  return (
      <main>
        <section id="basketball-comments">
          <h2>농구 경기 댓글</h2>
          <select onChange={handleGameSelect} value={selectedGameId || ''}>
            <option value="">경기를 선택하세요</option>
            {games.map(game => (
                <option key={game.id} value={game.id}>
                  {game.name} {/* 경기 이름 또는 적절한 식별자 */}
                </option>
            ))}
          </select>
          {isLoggedIn && (
              <form id="comment-form" onSubmit={handleCommentSubmit}>
                <textarea
                    id="comment-text"
                    placeholder="댓글을 입력하세요"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button type="submit">댓글 작성</button>
              </form>
          )}
          <div id="comments-container">
            {comments.map(comment => (
                <div key={comment.id} className="comment">
                  <p>{comment.memberName}: {comment.content}</p>
                  <small>{new Date(comment.createdDate).toLocaleString()}</small>
                </div>
            ))}
          </div>
        </section>
      </main>
  );
}

export default BasketballCommentsPage;