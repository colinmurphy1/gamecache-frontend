const getAllProfiles = async (token=null) => {
  let headers = {}

  if(token) {
    headers.Authorization = token;  
  }

  const allProfileReq = await fetch('https://gamecache.net/api/profile/all', {
    method: 'GET',
    headers
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
