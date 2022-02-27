const getAllDevelopers = async() => {

  const developers = await fetch(`/api/developer`, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => data);

  // Abort if user does not exist
  if (developers.message != "OK") {
    throw(developers.message);
  }

  return developers.data;
};

module.exports = getAllDevelopers;
