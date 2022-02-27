// Function for adding a platform/device
const addPlatform = async (name, shortname, manufacturerId, year, token) => {
  // API request data
  const apiRequest = {
    name,
    shortname,
    year,
    manufacturer: manufacturerId
  };

  // Make an add game request to the /api/device endpoint
  const req = await fetch('/api/device', {
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

module.exports = addPlatform;
