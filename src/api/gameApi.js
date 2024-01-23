export const fetchGames = async (date, sportsType) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/games?date=${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${sportsType} data:`, error);
    throw error;
  }
};

// api/gameApi.js
export const fetchFootballGameDetails = async (gameId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/games/details/${gameId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data; // 백엔드에서 받은 경기 세부 정보 반환
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error; // 오류를 다시 throw하여 컴포넌트에서 처리할 수 있도록 합니다.
  }
};

export const fetchBasketballGameDetails = async (gameId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/games/details/${gameId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data; // 백엔드에서 받은 경기 세부 정보 반환
  } catch (error) {
    console.error('Error fetching basketball game details:', error);
    throw error;
  }
};
export const fetchBaseballGameDetails = async (gameId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/games/details/${gameId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data; // 백엔드에서 받은 경기 세부 정보 반환
  } catch (error) {
    console.error('Error fetching baseball game details:', error);
    throw error;
  }
};
