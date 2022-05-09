const getGameList = async(platformId=null, developerId=null) => {

  // TODO: Add filtering using platformId and/or developerId. Will need to be
  // implemented inside of the backend api. 

  const gameReq = await fetch(`/api/games`, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => data);

  // Abort if user does not exist
  if (gameReq.message != "OK") {
    throw(gameReq.message);
  }

  return gameReq.data;
};

module.exports = getGameList;
