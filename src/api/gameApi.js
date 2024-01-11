
const fetchFootballGames = async (date) => {
  const year = new Date(date).getFullYear(); // 연도 추출
  try {
    const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${date}&league=39&season=${year}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd789e7aa74msh95a2867cc80a6d0p11239ajsna2c01db4ee85',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.response; // 경기 정보 반환
  } catch (error) {
    console.error('Error fetching football data:', error);
  }
};

const fetchBasketballGames = async (date) => {
  const year = new Date(date).getFullYear(); // 연도 추출
  try {
    const response = await fetch(`https://api-basketball.p.rapidapi.com/games?date=${date}&league=12&season=${year}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd789e7aa74msh95a2867cc80a6d0p11239ajsna2c01db4ee85',
        'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.response; // 경기 정보 반환
  } catch (error) {
    console.error('Error fetching basketball data:', error);
  }
};

const fetchBaseballGames = async (date) => {
  const year = new Date(date).getFullYear(); // 연도 추출
  try {
    const response = await fetch(`https://api-baseball.p.rapidapi.com/games?date=${date}&league=1&season=${year}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd789e7aa74msh95a2867cc80a6d0p11239ajsna2c01db4ee85',
        'X-RapidAPI-Host': 'api-baseball.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.response; // 경기 정보 반환
  } catch (error) {
    console.error('Error fetching baseball data:', error);
  }
};