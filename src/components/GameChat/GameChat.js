import React, { useState, useEffect } from 'react';
import * as StompJs from "@stomp/stompjs";
import $ from 'jquery';
import '../../assets/styles/GameChat.css';

const stompClient = new StompJs.Client({
  brokerURL: 'ws://13.125.46.61:8080/websocket',
});

function GameChat(props) {

  const [member, setMember] = useState(null);

  const readMember = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/members`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        },
      });

      //유효한 jwt가 없는 경우
      if (response.status === 401) {
        alert('로그인이 필요한 서비스입니다.');
        window.location.replace('/login');
      }
    
      const data = await response.json();

      setMember(data);
      
      // WebSocket 연결을 여기서 호출
      stompClient.activate();

      return data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    readMember();

    // 컴포넌트가 언마운트되거나 재렌더링될 때 실행되는 코드
    return () => {
      // 컴포넌트가 언마운트되거나 재렌더링될 때 websocket disconnect
      stompClient.deactivate();
    };
  }, []);

  const appendEnterMessage = (content) => {
    $("#messages").append("<tr><td>" + content + "</td></tr>");
  }

  const appendMessage = (sender, message, sendAt) => {
    if(sender == null) {
      appendEnterMessage(message);
      return;
    }

    $("#messages")
      .append("<tr><td>" + sender + " : " + sendAt + "</td>")
      .append("<td>" + message + "</td></tr>");
  }

  //websocket connection 요청
  stompClient.onConnect = (frame) => {
    console.log('Connected: ' + frame);

    //websocket connection 성공 후, /topic/gameId 구독
    stompClient.subscribe(`/topic/${props.gameId}`, (message) => {
      appendMessage(
        JSON.parse(message.body).sender,
        JSON.parse(message.body).content,
        JSON.parse(message.body).sendAt
      );
    });

    stompClient.publish({
      destination: `/app/gameChat/${props.gameId}/enter`,
      body: JSON.stringify({
        'sender': member.memberName
      })
    });
  };

  stompClient.onDisconnect = (frame) => {
    console.log('Disconnected: ' + frame);
  };

  const sendMessage = () => {
    stompClient.publish({
      destination: `/app/gameChat/${props.gameId}`,
      body: JSON.stringify({
        'sender': member.memberName,
        'message': $("#message").val()
      })
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // 페이지 새로고침 방지
    sendMessage(); // sendMessage 함수 호출
  };
  
  return(
    <div id="main-content" className="container">
      <div className="row">
        <div className="col-md-6">
          <form className="form-inline" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="message">채팅입력  </label>
              <input type="text" id="message" className="form-control" />
              <button className="btn btn-default" type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table id="conversation" className="table table-striped">
            <thead>
            <tr>
              <th>Messages</th>
            </tr>
            </thead>
            <tbody id="messages">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

export default GameChat;
