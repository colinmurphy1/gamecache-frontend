const deleteGame = async (gameId, token=null) => {

  const deleteGameReq = await fetch(`/api/collection/${gameId}`, {
    method: 'DELETE',
    headers: {
      Authorization: token
    }
  })
  .then(response => response.json())
  .then(data => data);

  // Abort if user does not exist
  if (deleteGameReq.message != "OK") {
    throw(deleteGameReq.message);
  }

  return true;
};

module.exports = deleteGame;
