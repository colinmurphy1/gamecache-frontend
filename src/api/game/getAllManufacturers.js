const getAllManufacturers = async() => {
  const manufacturers = await fetch(`/api/manufacturer`, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => data);

  // Abort if user does not exist
  if (manufacturers.message != "OK") {
    throw(manufacturers.message);
  }

  return manufacturers.data;
};

module.exports = getAllManufacturers;
