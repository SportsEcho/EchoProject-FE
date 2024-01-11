
const fetchFootballGames = async (date) => {
  try {
    const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${date}&league=39&season=2021`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Football Data:', data);
    // 여기에서 경기 일정 데이터 처리
  } catch (error) {
    console.error('Error fetching football data:', error);
  }
};
const fetchBasketballGames = async (date) => {
  try {
    const response = await fetch(`https://api-basketball.p.rapidapi.com/games?date=${date}&league=12&season=2021`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Basketball Data:', data);
    // 여기에서 경기 일정 데이터 처리
  } catch (error) {
    console.error('Error fetching basketball data:', error);
  }
};
const fetchBaseballGames = async (date) => {
  try {
    const response = await fetch(`https://api-baseball.p.rapidapi.com/games?date=${date}&league=1&season=2021`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'api-baseball.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Baseball Data:', data);
    // 여기에서 경기 일정 데이터 처리
  } catch (error) {
    console.error('Error fetching baseball data:', error);
  }
};
