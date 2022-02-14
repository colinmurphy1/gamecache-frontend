const getProfile = async (username, token=null) => {
  let headers = {}

  // Add token if one is present
  if(token) {
    headers.Authorization = token;
  }

  const profileReq = await fetch(`/api/profile/user/${username}`, {
    method: 'GET',
    headers
  })
  .then(response => response.json())
  .then(data => data);

  // Abort if user does not exist
  if (profileReq.message != "OK") {
    throw(profileReq.message);
  }

  return profileReq.data;
};

module.exports = getProfile;
