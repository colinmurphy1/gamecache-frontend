// Function for logging in the user
const logInUser = async (username, password) => {
  /* logs in the user with their username and password */

  // API request data
  const apiRequest = {
    username: username,
    password: password
  };

  // Make an authentication request to the /api/auth/login endpoint
  const loginReq = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(apiRequest)
  })
  .then(response => response.json()) // Convert the response to json
  .then(data => data);

  // Look at the response message
  if (loginReq.message != "OK") {
    throw(loginReq.message);
  }

  // Login successful, return data
  return loginReq.data;
};

module.exports = logInUser;
