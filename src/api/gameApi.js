export const fetchFootballGames = async (date) => {
  try {
    const response = await fetch(`http://43.202.64.138:8080/api/games/football?date=${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data; // 백엔드에서 받은 경기 정보 반환
  } catch (error) {
    console.error('Error fetching football data:', error);
  }
};

export const fetchBasketballGames = async (date) => {
  const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
  const year = new Date(date).getFullYear();
  let season;

  if (year === 2024) {
    // 2024년일 경우 -를 사용하여 시즌 설정
    season = `${year - 1}-${year}`;
  } else if (year === 2023) {
    // 2023년일 경우 +를 사용하여 시즌 설정
    season = `${year}-${year + 1}`;
  }

  try {
    const response = await fetch(`https://api-basketball.p.rapidapi.com/games?season=${season}&league=12&date=${date}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Response data:', data); // 응답 데이터 로그
    return data.response; // 경기 정보 반환
  } catch (error) {
    console.error('Error fetching basketball data:', error);
  }
};

export const fetchBaseballGames = async (date) => {
  const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
  const year = new Date(date).getFullYear();
  try {
    const response = await fetch(`https://api-baseball.p.rapidapi.com/games?season=${year}&league=1&date=${date}&`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'api-baseball.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Response data:', data); // 응답 데이터 로그
    return data.response; // 경기 정보 반환
  } catch (error) {
    console.error('Error fetching baseball data:', error);
  }
};