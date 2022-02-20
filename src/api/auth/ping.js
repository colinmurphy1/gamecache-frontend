const pingUser = async(token = null) => {

  // Require token
  if (! token) {
    return false;
  }

  // Log out using the logout endpoint
  const pingReq = await fetch('/api/auth/ping', {
    method: 'PUT',
    headers: {
      Authorization: token
    }
  })
  .then(response => response.json())
  .then(data => data);

  // Could not log out using the API. Still going to clear the data
  
  if (pingReq.message != "OK") {
    return false;
  }

  return pingReq.data;
};

module.exports = pingUser;
