// Function for adding a game
const addGame = async (title, year, developerId, platformId, token) => {
  /* REQUIRES: Title, Year, Developer ID, Platform ID, authentication token */

  // API request data
  const apiRequest = {
    title,
    year,
    developerId,
    device: platformId
  };

  // Make an add game request to the /api/games endpoint
  const req = await fetch('/api/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': token
    },
    body: JSON.stringify(apiRequest)
  })
  .then(response => response.json()) // Convert the response to json
  .then(data => data);

  // Look at the response message
  if (req.message != "OK") {
    throw(req.message);
  }

  // Login successful, return data
  return req.data;
};

module.exports = addGame;
