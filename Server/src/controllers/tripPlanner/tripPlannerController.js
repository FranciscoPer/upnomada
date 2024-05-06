const axios = require("axios")

const getTripPlan = async (days, destination) => {
  const options = {
    method: 'GET',
    url: 'https://ai-trip-planner.p.rapidapi.com/',
    params: { days, destination },
    headers: {
        'X-RapidAPI-Key': '9f099a41ffmshafe5f296be6bb60p19ecdejsn7dec0a2766d5',
        'X-RapidAPI-Host': 'ai-trip-planner.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching trip plan:", error);
    throw error;
  }
};

module.exports = {getTripPlan}
