const getUsersAdmin = async (token=null) => {
  const req = await fetch('/api/admin/users', {
    method: 'GET',
    headers: {
      Authorization: token
    }
  })
  .then(response => response.json())
  .then(data => data);

  // Abort if user does not exist
  if (req.message != "OK") {
    throw(req.message);
  }

  return req.data;
};

module.exports = getUsersAdmin;
