// Function for logging in the user
const addDeveloper = async (name, token) => {

  // API request data
  const apiRequest = {
    name
  };

  // Make an add game request to the /api/developer endpoint
  const req = await fetch('/api/developer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': token
    },
    body: JSON.stringify(apiRequest)
  })
  .then(response => response.json()) // Convert the response to json
  .then(data => data);

  // Look at the response message
  if (req.message != "OK") {
    throw(req.message);
  }

  // Login successful, return data
  return req.data;
};

module.exports = addDeveloper;
