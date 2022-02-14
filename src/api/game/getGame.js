const getGame = async(gameId, token = null) => {
  let headers = {}

  // Add token if one is present
  if(token) {
    headers.Authorization = token;
  }

  const gameReq = await fetch(`/api/games/id/${gameId}`, {
    method: 'GET',
    headers
  })
  .then(response => response.json())
  .then(data => data);

  // Abort if user does not exist
  if (gameReq.message != "OK") {
    throw(gameReq.message);
  }

  return gameReq.data;
};

module.exports = getGame;
