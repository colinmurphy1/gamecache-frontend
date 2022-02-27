const getAllPlatforms = async() => {
  const platforms = await fetch(`/api/device`, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => data);

  // Abort if user does not exist
  if (platforms.message != "OK") {
    throw(platforms.message);
  }

  return platforms.data;
};

module.exports = getAllPlatforms;
