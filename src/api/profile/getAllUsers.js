const getAllProfiles = async (token=null) => {

  const allProfileReq = await fetch('https://gamecache.net/api/profile/all', {
    method: 'GET',
    //headers: {
    //  Authorization: $userData.token
    //}
  })
  .then(response => response.json())
  .then(data => data);

  // Abort if user does not exist
  if (allProfileReq.message != "OK") {
    throw(allProfileReq.message);
  }

  return allProfileReq.data;
};

module.exports = getAllProfiles;
