const setUserStatus = async (username, token) => {
  const apiBody = {
    username
  }
  
  const req = await fetch('/api/admin/setstatus', {
    method: 'PUT',
    body: JSON.stringify(apiBody),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': token
    }
  })
  .then(response => response.json())
  .then(data => data);

  if (req.message != "OK") {
    throw(req.message);
  }

  return req.data;
};

module.exports = setUserStatus;
