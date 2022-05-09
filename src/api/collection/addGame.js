const addGame = async (gameId, token) => {

  // API request (token is sent as header)
  // As of right now, this will just add the game to the collection with no
  // notes, rating, or status. TODO: Add this functionality.
  const reqBody = {
    gameId,
    notes: "",
    rating: 0,
    status: 0
  };

  // Make a request to the collection endpoint
  const addGameReq = await fetch('/api/collection/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': token
    },
    body: JSON.stringify(reqBody)
  })
  .then(response => response.json()) // Convert the response to json
  .then(data => data);

  // Look at the response message
  if (addGameReq.message != "OK") {
    throw(addGameReq.message);
  }

  // Login successful, return data
  return addGameReq.data;
};

module.exports = addGame;
