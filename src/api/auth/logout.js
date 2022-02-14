const logOutUser = async(token = null) => {
  let headers = {}

  // Add token if one is present
  if(token) {
    headers.Authorization = token;
  }

  // Log out using the logout endpoint
  const logoutReq = await fetch('/api/auth/logout', {
    method: 'POST',
    headers
  })
  .then(response => response.json())
  .then(data => data);

  // Could not log out using the API. Still going to clear the data
  
  if (logoutReq.message != "OK") {
    console.log('Could not log out at the API endpoint');
  }

  return true;

};

module.exports = logOutUser;