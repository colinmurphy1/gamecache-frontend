const getNews = async () => {
  const req = await fetch("https://gamecache.net/api/news/");

  // Abort if request fails
  if (! req.ok) {
    return false;
  }

  const json = await req.json();
  return json.data;
}

module.exports = getNews;