const getGame = async(gameId) => {

  const gameReq = await fetch(`https://gamecache.net/api/games/id/${gameId}`, {
    method: 'GET',
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
