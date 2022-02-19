const updateGame = async (gameData, token) => {

  // Make an authentication request to the /api/auth/login endpoint
  const update = await fetch('/api/collection/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': token
    },
    body: JSON.stringify(gameData)
  })
  .then(response => response.json()) // Convert the response to json
  .then(data => data);

  // Look at the response message
  if (update.message != "OK") {
    throw(update.message);
  }

  // Login successful, return data
  return update.data;
};

module.exports = updateGame;
