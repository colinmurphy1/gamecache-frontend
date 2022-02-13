const getProfileGames = async (username, token=null) => {
  let headers = {}

  // Add token if one is present
  if(token) {
    headers.Authorization = token;
  }

  const gamesReq = await fetch(`https://gamecache.net/api/collection/user/${username}`, {
    method: 'GET',
    headers
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
