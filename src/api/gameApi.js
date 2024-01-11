import axios from 'axios';

const fetchFootballGames = async (date) => {
  const year = new Date(date).getFullYear();
  try {
    const response = await axios.get(`https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${date}&league=39&season=${year}`, {
      headers: {
        'X-RapidAPI-Key': 'd789e7aa74msh95a2867cc80a6d0p11239ajsna2c01db4ee85',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
      }
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching football data:', error);
  }
};

const fetchBasketballGames = async (date) => {
  const year = new Date(date).getFullYear();
  try {
    const response = await axios.get(`https://api-basketball.p.rapidapi.com/games?date=${date}&league=12&season=${year}`, {
      headers: {
        'X-RapidAPI-Key': 'd789e7aa74msh95a2867cc80a6d0p11239ajsna2c01db4ee85',
        'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com',
      }
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching basketball data:', error);
  }
};

const fetchBaseballGames = async (date) => {
  const year = new Date(date).getFullYear();
  try {
    const response = await axios.get(`https://api-baseball.p.rapidapi.com/games?date=${date}&league=1&season=${year}`, {
      headers: {
        'X-RapidAPI-Key': 'd789e7aa74msh95a2867cc80a6d0p11239ajsna2c01db4ee85',
        'X-RapidAPI-Host': 'api-baseball.p.rapidapi.com',
      }
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching baseball data:', error);
  }
};
