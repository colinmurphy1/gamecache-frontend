const getProfileGames = async (username, token=null) => {

  const gamesReq = await fetch(`https://gamecache.net/api/collection/user/${username}`, {
    method: 'GET',
    //headers: {
    //  Authorization: $userData.token
    //}
  })
  .then(response => response.json())
  .then(data => data);

  // Abort if user does not exist
  if (gamesReq.message != "OK") {
    throw(gamesReq.message);
  }

  return gamesReq.data;
};

module.exports = getProfileGames;
