const getNews = async () => {
  const req = await fetch("/api/news/", {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => data)

  // Abort if request fails
  if (req.message != "OK") {
    throw(req.message);
  }

  return req.data;
}

module.exports = getNews;
