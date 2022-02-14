// Function for creating an account
const createUser = async (username, password, email) => {
  // API request data
  const apiRequest = {
    username,
    password,
    email
  };

  // Make an authentication request to the /api/auth/login endpoint
  const registerReq = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(apiRequest)
  })
  .then(response => response.json()) // Convert the response to json
  .then(data => data);

  // Look at the response message
  if (registerReq.message != "OK") {
    throw(registerReq.message);
  }

  // Login successful, return data
  return registerReq.data;
};

module.exports = createUser;
